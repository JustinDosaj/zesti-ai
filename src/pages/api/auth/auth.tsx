import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { db } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { updateUserWithTikTokTokens } from '../firebase/functions';

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
  isCreator: boolean;
  tikTokAccessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Default to loading
  const [stripeRole, setStripeRole] = useState<string | null>(null);
  const [tikTokAccessToken, setTikTokAccessToken] = useState(null);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const auth = getAuth();
  const router = useRouter();
  const provider = new GoogleAuthProvider();


// Function to initiate TikTok login
  const loginWithTikTok = async () => {

    const tikTokUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY}&scope=user.info.basic,user.info.profile,video.list&response_type=code&redirect_uri=${encodeURIComponent("https://zesti.ngrok.app/auth/redirect")}&state=true`;

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
          await updateUserWithTikTokTokens(tokenData, user!.uid);
        } else {
          console.error("Invalid TikTok token data:", tokenData);
        }
        // ... (rest of your code)
        
    } catch (error) {
        console.error("Error in handleTikTokCallback:", error);
        // Optionally, rethrow or handle the error further
    }
  };

  const checkIsCreatorStatus = async (userId: string) => {
    try {
      const userRef = db.collection('users').doc(userId);
      const doc = await userRef.get();
      if (doc.exists && doc.data()?.isCreator) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking isCreator status:", error);
      throw error;
    }
  };

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Result: ", result.user.metadata.creationTime)
      const user = result.user

      if(user) {
        const userRef = db.collection('users').doc(user.uid);
        const doc = await userRef.get();

        if(!doc.exists) {
          await userRef.set({
            tokens: 3,
            email: user.email,
            totalRecipes: 0,
            isCreator: false,
          })
          router.push('/welcome/newuser')
        } else {
          router.push('/profile')
        }
      }

    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const fetchTikTokToken = async (userId: string) => {
    if (!userId) return null;
  
    try {
      const userRef = db.collection('users').doc(userId);
      const doc = await userRef.get();
  
      if (doc.exists) {
        return doc.data()?.tiktokAccessToken || null;
      } else {
        console.log(`No user found with ID: ${userId}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching TikTok token for user ${userId}:`, error);
      return null;
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
            tokens: 3,
            email: user.email,
            totalRecipes: 0,
            isCreator: false,
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

      if ((currentUser as any)) {
          
        const creatorStatus = await checkIsCreatorStatus(currentUser?.uid!);
          setIsCreator(creatorStatus);

          const token = await fetchTikTokToken(currentUser?.uid!);
          setTikTokAccessToken(token)
      } else {
        setIsCreator(false);
        setTikTokAccessToken(null)
      }

      setIsLoading(false);  // Once the user state is updated, set isLoading to false
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, isLoading, auth, provider, login, logout, stripeRole, loginWithEmailPassword, signUpWithEmailPassword, sendPasswordReset, loginWithTikTok, handleTikTokCallback, isCreator, tikTokAccessToken }}>
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
