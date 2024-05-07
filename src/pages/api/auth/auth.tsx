import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { SendErrorToFirestore } from '../firebase/functions';

interface UserData {
  account_status?: string;
  date_created?: string;
  email?: string;
  stripeId?: string;
  stripeLink?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  auth: any;
  provider: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  stripeRole: string | null;
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
    <AuthContext.Provider value={{ user, isLoading, auth, provider, login, logout, stripeRole, userData }}>
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
