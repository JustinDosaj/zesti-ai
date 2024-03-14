import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { db } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { SendErrorToFirestore, updateUserWithTikTokTokens } from '../firebase/functions';
import { fetchTikTokDisplayName } from '../handler/tiktok';

interface UserData {
  account_status?: string;
  affiliate_code?: string;
  display_name?: string,
  email?: string;
  stripeId?: string;
  stripeLink?: string;
  tiktokAccessToken?: string;
  tiktokOpenId?: string;
  tiktokRefreshToken?: string;
  tokens?: number;
}

interface CreatorData {
  affiliate_code?: string;
  avatar_url?: string;
  bio_description?: string;
  display_name?: string;
  follower_count?: number;
  is_verified?: boolean;
  likes_count?: number;
  open_id?: string,
  profile_deep_link?: string;
  socials?: {
    instagram_link?: string,
    twitter_link?: string,
    website_link?: string,
    youtube_link?:string
  },
  union_id?: string,
  video_count?: number,
  page_image?: string,
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  auth: any;
  provider: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  stripeRole: string | null;
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmailPassword: (email: string, password: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  loginWithTikTok: () => void;
  handleTikTokCallback: (code: string) => Promise<void>;
  userData: UserData | null;
  creatorData: CreatorData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Default to loading
  const [stripeRole, setStripeRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null);
  const auth = getAuth();
  const router = useRouter();
  const provider = new GoogleAuthProvider();


// Function to initiate TikTok login
  const loginWithTikTok = async () => {

  const tikTokUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY}&scope=user.info.basic,user.info.profile,video.list&response_type=code&redirect_uri=${encodeURIComponent(`https://www.zesti.ai/auth/redirect`)}&state=true`;
  //const tikTokUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY}&scope=user.info.basic,user.info.profile,video.list&response_type=code&redirect_uri=${encodeURIComponent(`https://zesti.ngrok.app/auth/redirect`)}&state=true`;
    // Redirect the user
    window.location.href = tikTokUrl;
  };

  // Function to handle TikTok callback
  const handleTikTokCallback = async (code: string) => {

    try {
        const params = new URLSearchParams({});
        params.append('code', code);

        const tokenResponse = await fetch('/api/tiktokaccesstoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Cache-Control": "no-cache",
            },
            body: params.toString()
        });

        if (!tokenResponse.ok) {
            console.error("HTTP Error Response:", tokenResponse.status, tokenResponse.statusText);
            const errorResponse = await tokenResponse.text();
            console.error("Error Response Body:", errorResponse);
            throw new Error(`HTTP error ${tokenResponse.status}: ${errorResponse}`);
        }

        const tokenData = await tokenResponse.json();

        if (tokenData.access_token && tokenData.refresh_token && tokenData.open_id) {
          const res = await fetchTikTokDisplayName(tokenData.access_token)
          await updateUserWithTikTokTokens(tokenData, user!.uid, res.data.user);
        } else {
          console.error("Invalid TikTok token data:", tokenData);
        }
        
    } catch (error) {
        console.error("Error in handleTikTokCallback:", error);
        // Optionally, rethrow or handle the error further
    }
  };


  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user

      if(user) {
        const userRef = db.collection('users').doc(user.uid);
        const doc = await userRef.get();

        if(!doc.exists) {
          await userRef.set({
            tokens: 2,
            email: user.email,
            account_status: 'user'
          })
          router.push('/')
        } else {
          router.push('/')
        }
      }

    } catch (error) {
      SendErrorToFirestore(null, error, null, __filename)
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).catch((error) => {
        console.error("Error Signing In: ", error)
        throw error;
      })
    } catch (error) {
      console.error("Error logging in with email and password:", error);
      throw error;
    }
  };

  const signUpWithEmailPassword = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password).catch(async () => {
        await loginWithEmailPassword(email, password)
      });
      
      const user = result?.user

      if(user) {
        const userRef = db.collection('users').doc(user.uid);
        const doc = await userRef.get();

        if(!doc.exists) {
          await userRef.set({
            tokens: 2,
            email: user.email,
            account_status: 'user'
          })
        }
      }
    } catch (error) {
      console.error("Error signing up with email and password:", error);
      throw error;
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      const result = await sendPasswordResetEmail(auth, email)
    } catch(error) {
      console.error("Error: ", error)
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if ((currentUser as any)?.reloadUserInfo?.customAttributes) {

          setStripeRole(JSON.parse((currentUser as any)?.reloadUserInfo.customAttributes).stripeRole);

      } else {
          setStripeRole(null);
      }

      if (currentUser) {
        // User Firestore listener
        const userRef = db.collection('users').doc(currentUser.uid);
        const unsubscribeUser = userRef.onSnapshot(doc => {
          const data = doc.data();
          setUserData(data!);
        });
  
        // Creator Firestore listener
        const creatorRef = db.collection('creators').doc(currentUser.uid);
        const unsubscribeCreator = creatorRef.onSnapshot(doc => {
          const data = doc.data();
          setCreatorData(data!);
        });
      } 
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);


  return (
    <AuthContext.Provider value={{ user, isLoading, auth, provider, login, logout, stripeRole, loginWithEmailPassword, signUpWithEmailPassword, sendPasswordReset, loginWithTikTok, handleTikTokCallback, userData, creatorData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
