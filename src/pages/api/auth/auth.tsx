import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { db } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { SendErrorToFirestore } from '../firebase/functions';

interface UserData {
  account_status?: string;
  affiliate_code?: string;
  date_created?: string;
  email?: string;
  stripeId?: string;
  stripeLink?: string;
  social?: {
    tiktok_link?: string;
  }
  settings?: {
    tiktok?: {
      is_verified?: boolean;
      profile_link?: string;
      display_name?: string;
      username?: string;
      most_recent_video_id?: string;
    },
    notifications?: {
      active?: boolean;
    };
  }
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
  userData: UserData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Default to loading
  const [stripeRole, setStripeRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const auth = getAuth();
  const router = useRouter();
  const provider = new GoogleAuthProvider();


// Function to initiate TikTok login


  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user

      if(user) {
        const userRef = db.collection('users').doc(user.uid);
        const doc = await userRef.get();

        if(!doc.exists) {
          await userRef.set({
            email: user.email,
            account_status: 'user',
            date_created: new Date().toISOString()
          })
          router.reload()
        } else {
          router.reload()
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
            email: user.email,
            account_status: 'user',
            date_created: new Date().toISOString()
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
      } 
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);


  return (
    <AuthContext.Provider value={{ user, isLoading, auth, provider, login, logout, stripeRole, loginWithEmailPassword, signUpWithEmailPassword, sendPasswordReset, userData }}>
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
