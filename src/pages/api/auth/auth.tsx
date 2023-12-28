import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { db } from '../firebase/firebase';
import { useRouter } from 'next/router';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Default to loading
  const [stripeRole, setStripeRole] = useState<string | null>(null);
  const [tikTokToken, setTikTokToken] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const auth = getAuth();
  const router = useRouter();
  const provider = new GoogleAuthProvider();


// Function to initiate TikTok login
  const loginWithTikTok = async () => {

    const tikTokUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY}&scope=user.info.basic&response_type=code&redirect_uri=https://www.zesti.ai/profile&state=true`;

    // Redirect the user
    window.location.href = tikTokUrl;
  };

  // Function to handle TikTok callback
  const handleTikTokCallback = async (code: string) => {
    // Exchange the code for a token

    const formData = new URLSearchParams();
    formData.append('client_key', process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY!);
    formData.append('client_secret', process.env.NEXT_PUBLIC_TIKTOK_CLIENT_SECRET!);
    formData.append('code', code);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', 'https://www.zesti.ai/profile');

    console.log("Form Data:", formData.toString())
    
    try {
      // Make the POST request
      const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });

      const tokenData = await tokenResponse.json();

      if (tokenResponse.ok) {
        // Set the token in state and store it in Firestore
        setTikTokToken(tokenData.access_token);
        if (user) {
          db.collection('users').doc(user.uid).update({
            tikTokToken: tokenData.access_token,
            tikTokRefreshToken: tokenData.refresh_token, // Storing refresh token as well
            tikTokOpenId: tokenData.open_id, // Store open_id if necessary
            isCreator: true,
          });
        }
      } else {
        // Handle errors
        console.error("Error fetching TikTok token:", tokenData.error_description);
        throw new Error(tokenData.error_description);
      }
    } catch (error) {
      console.error("Error in handleTikTokCallback:", error);
      throw error;
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
          router.push('/dashboard')
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if ((currentUser as any)?.reloadUserInfo?.customAttributes) {
        setStripeRole(JSON.parse((currentUser as any)?.reloadUserInfo.customAttributes).stripeRole);
        const creatorStatus = await checkIsCreatorStatus(currentUser?.uid!);
        setIsCreator(creatorStatus);
    } else {
        setStripeRole(null);
    }
      setIsLoading(false);  // Once the user state is updated, set isLoading to false
    });

    return () => unsubscribe();
  }, [auth]);


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

  return (
    <AuthContext.Provider value={{ user, isLoading, auth, provider, login, logout, stripeRole, loginWithEmailPassword, signUpWithEmailPassword, sendPasswordReset, loginWithTikTok, handleTikTokCallback, isCreator }}>
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
