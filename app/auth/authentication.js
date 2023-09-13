import { GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, db } from "../firebase"
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore"
import { limitToFirst } from "firebase/database"
import { useCookies } from "react-cookie"
import { useCollection } from 'react-firebase-hooks/firestore'

const googleProvider = new GoogleAuthProvider()

const loginComEmailESenha = async (email, senha) => {
    try {
        await signInWithEmailAndPassword(auth, email, senha)
    } catch(e) {
        console.log(e)
    }
}

// const ChatRoom = async() => {
//     const messageRef = collection(db, "messages")
//     const queryRef = query(messageRef, orderBy("createdAt", "desc"), limit(20))
//     const [messages] = useCollection(queryRef, {idField: 'id'})
//     return messages
// }

const registrarComEmailESenha = async(name, email, pwd) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, pwd)
        const user = res.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email,
            photoURL: "",
            nickname: ""
        })
    } catch(e) {
        console.log(e)
    }
}

const recuperarSenha = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert("Email para recuperação de senha enviado!")
    } catch (e) {
        console.log(e)
    }
}

const logout = () => {
    signOut(auth)
}

const verificarSeOUsuarioJaExiste = async (username) => {
    try {
        const q = query(collection(db, "users"), where("username", "==", username))
        const docs = await getDocs(q)
        if(docs.docs.length !== 0) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}

const verificarSeOEmailJaExiste = async (email) => {
    try {
        const q = query(collection(db, "users"), where("email", "==", email))
        const docs = await getDocs(q)
        if(docs.docs.length > 0) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}

const getUserByUID = async (uid) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid), limit(1))
        const docs = await getDocs(q)
        let response = {}
        docs.forEach((doc) => {
            if(doc.data().uid == uid) response = doc.data()
        })
    
        return response
    } catch (error) {
        console.log(error)
    }
}

const registerNickname = async (uid, nickname) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid), limit(1))
        const docs = await getDocs(q)
        docs.forEach(async (doc1) => {
            await updateDoc(doc(db, "users", doc1.id), {
                "nickname": nickname
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const verificarNickname = async (nickname) => {
    try {
        const q = query(collection(db, "users"), where("nickname", "==", nickname), limit(1))
        const docs = await getDocs(q)
        if(docs.docs.length > 0) return true
        return false
    } catch (error) {
        console.log(error)
    }
}

const entrarComGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user
        const q = query(collection(db, 'users'), where("uid", "==", user.uid))
        const docs = await getDocs(q)

        if(docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                photoURL: user.photoURL,
                nickname: ""
            })
        }
    } catch (e) {
        console.log(e)
    }
}

const getAlertByID = async (id) => {
    try {
        const q = query(collection(db, "alerts"), where("id", "==", id), limit(1))
        const docs = await getDocs(q)
        let response = {}
        docs.forEach((doc) => {
            if(doc.data().id == id) {
                response = doc.data()
                console.log("achou")
            }
        })
    
        return response
    } catch (error) {
        console.log(error)
    }
}

const emitirAlerta = async (id, tipo, situacao, userLoggedIn, details = "") => {
    try {
        await addDoc(collection(db, "alerts"), {
            tipo,
            situacao,
            id,
            createdAt: new Date(),
            uid: userLoggedIn.uid,
            author: userLoggedIn.nickname,
            details
        })
    } catch (e) {
        console.log(e)
    }
}

export {
    loginComEmailESenha,
    registrarComEmailESenha,
    recuperarSenha,
    logout,
    entrarComGoogle,
    verificarSeOUsuarioJaExiste,
    verificarSeOEmailJaExiste,
    getUserByUID,
    registerNickname,
    verificarNickname,
    emitirAlerta,
    getAlertByID
}