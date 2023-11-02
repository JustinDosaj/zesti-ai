import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { db } from '../firebase/firebase';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Default to loading
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [stripeRole, setStripeRole] = useState<string | null>(null);

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
          })
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if ((currentUser as any)?.reloadUserInfo?.customAttributes) {
        setStripeRole(JSON.parse((currentUser as any)?.reloadUserInfo.customAttributes).stripeRole);
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
            tokens: 1,
            email: user.email,
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
    <AuthContext.Provider value={{ user, isLoading, auth, provider, login, logout, stripeRole, loginWithEmailPassword, signUpWithEmailPassword, sendPasswordReset }}>
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
