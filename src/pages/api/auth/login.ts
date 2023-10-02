import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";


export async function SignIn({auth, provider}: any) {
    const result = await signInWithPopup(auth, provider)
    console.log(result.user)
}