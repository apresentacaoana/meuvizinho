import NextAUth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '@/app/firebase'

export const authOptions = {
    pages: {
        signIn: '/entrar'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                return await signInWithEmailAndPassword(auth, (credentials).email || '', (credentials).password || '')
                    .then((userCredential) => {
                        if(userCredential.user) {
                            return userCredential.user;
                        }
                        return null
                    })
                    .catch((error) => console.log(error))
            }
        })  
    ]
}