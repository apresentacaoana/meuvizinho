import { GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, db } from "../firebase"
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore"
import { limitToFirst } from "firebase/database"
import { useCookies } from "react-cookie"
import { useCollection } from 'react-firebase-hooks/firestore'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

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
            nickname: "",
            role: "common"
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

const addMessageToAlert = async (id, message) => {
    try {
        const alertRef = doc(db, "alerts", id);
        await updateDoc(alertRef, {
          messages: arrayUnion(message)
        });
      } catch (error) {
        console.log(error);
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
                nickname: "",
                role: "common"
            })
        }
    } catch (e) {
        console.log(e)
    }
}


const getAlertByID = async (id) => {
    try {
        const q = query(collection(db, "alerts"), where("id", "==", Number(id)), limit(1))
        const docs = await getDocs(q)
        let response = {}
        docs.forEach((doc) => {
            if(doc.data().id == id) {
                response = {
                    ...doc.data(),
                    docId: doc.id
                }
                console.log(response)
            }
        })
    
        return response
    } catch (error) {
        console.log(error)
    }
}

const getComunities = async () => {
    try {
        const comunityRef = collection(db, "comunities")
        const q = query(comunityRef, orderBy("createdAt", "desc"))
        const docs = await getDocs(q)
        let response = []
        docs.forEach((doc) => {
            response.push(doc.data())
        })

        
        return response
    } catch (e) {}
}

const removeMember = async (user, id) => {
    try {
        
        const q = query(collection(db, "comunities"), where("id", "==", id), limit(1))
        const docs = await getDocs(q)
        docs.forEach(async (doc1) => {
            await updateDoc(doc(db, "comunities", doc1.id), {
                "members": arrayRemove(user.uid)
            })
        })

    } catch (e) {

    }
}

const getComunityById = async (id) => {
    try {
        const comunityRef = collection(db, "comunities")
        const q = query(comunityRef, where("id", "==", Number(id)))
        const docs = await getDocs(q)
        let response = {}
        docs.forEach((doc) => {
            if(doc.data().id == Number(id)) {
                response = {
                    ...doc.data(),
                    docId: doc.id
                }
            }
        })
        return response
    } catch (e) {

    }
}

const getComunityBySearch = async (text) => {
    try {
        const comunityRef = collection(db, "comunities")
        const q = query(comunityRef, orderBy("createdAt", "desc"))
        const docs = await getDocs(q)
        let response = []
        docs.forEach((doc) => {
            const comunityData = doc.data()
            if (comunityData.name.toLowerCase().includes(text.toLowerCase())) {
                response.push({
                    ...comunityData,
                    docId: doc.id
                });
            }
        })
        return response
    } catch (e) {}
}

const getComunityByUser = async (id) => {
    try {
        const comunityRef = collection(db, "comunities")
        const q = query(comunityRef, where("creator.uid", "==", id))
        const docs = await getDocs(q)
        let response = {}
        docs.forEach((doc) => {
            if(doc.data().creator.uid == id) {
                response = {
                    ...doc.data(),
                    docId: doc.id
                }
            }
        })
        return response
    } catch(e) {

    }
}

const addMember = async (user, id) => {
    try {

        let object = {
            ...user
        }
        
        const q = query(collection(db, "comunities"), where("id", "==", id), limit(1))
        const docs = await getDocs(q)
        docs.forEach(async (doc1) => {
            console.log(object)
            await updateDoc(doc(db, "comunities", doc1.id), {
                "members": arrayUnion(object)
            })
        })

    } catch (e) {

    }
}

const createComunity = async (name, address, user, id) => {
    try {
        await addDoc(collection(db, "comunities"), {
            name,
            address,
            creator: user,
            members: [],
            alerts: [],
            id,
            createdAt: new Date()
        })
    } catch (e) {

    }
}

const emitirAlerta = async (id, tipo, situacao, userLoggedIn, groupId, details = "", messages = []) => {
    try {
        await addDoc(collection(db, "alerts"), {
            tipo,
            situacao,
            id,
            createdAt: new Date(),
            groupId,
            uid: userLoggedIn.uid,
            author: userLoggedIn.nickname,
            details,
            messages
        })
    } catch (e) {
        console.log(e)
    }
}

const criarSolicitacao = async (comunity, user, id) => {
    try {
        await addDoc(collection(db, "requests"), {
            comunity,
            user,
            status: "pendente",
            createdAt: new Date(),
            id
        })
    } catch(e) {}
}

const excluirSolicitacao = async (id) => {
    try {
        const requestRef = collection(db, "requests")
        const q = query(requestRef, orderBy("createdAt", "desc"))
        const docs = await getDocs(q)
        docs.forEach(async (doc) => {
            if(doc.data().id == Number(id)) {
                await deleteDoc(doc.ref)
            }
        })
    } catch (e) {}
}

const aceitarSolicitacao = async (id) => {
    try {
        const solicitacao = await getSolicitacaoId(id)
        await getComunityById(solicitacao.comunity.id).then(async (res) => {
            await addMember(solicitacao.user, res.id)
            await excluirSolicitacao(id)
        })
    } catch (e) {}
}

const recusarSolicitacao = async (id) => {
    try {
        await excluirSolicitacao(id)
    } catch (e) {}
}

const getSolicitacaoId = async (id) => {
    try {
        const requestRef = collection(db, "requests")
        const q = query(requestRef, orderBy("createdAt", "desc"))
        const docs = await getDocs(q)
        let response = {}
        docs.forEach((doc) => {
            if(doc.data().id == Number(id)) {
                response = {
                    ...doc.data(),
                    docId: doc.id
                }
            }
        })
        return response
    } catch(e) {}
}

const getSolicitacoesByUser = async (id) => {
    try {
        const requestRef = collection(db, "requests")
        const q = query(requestRef, orderBy("createdAt", "desc"))
        const docs = await getDocs(q)
        let response = []
        docs.forEach((doc) => {
            if(doc.data().user.uid == id) {
                let object = {
                    ...doc.data(),
                    docId: doc.id
                }
                response.push(object)
            }
        })
        return response
    } catch (e) {}
}

const getSolicitacoesByComunityId = async (id) => {
    try {
        const requestRef = collection(db, "requests")
        const q = query(requestRef, orderBy("createdAt", "desc"))
        const docs = await getDocs(q)
        let response = []
        docs.forEach((doc) => {
            if(doc.data().comunity.id == Number(id)) {
                let object = {
                    ...doc.data(),
                    docId: doc.id
                }
                response.push(object)
            }
        })
        return response
    } catch(e) {}
}

const uploadImage = async (file, user) => {
    try {
        
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `/public/profiles/${user.id}/photo.jpg`

        const storage = getStorage(); // Obtenha a referência do armazenamento
        const storageRef = ref(storage, filename);
        await uploadBytes(storageRef, buffer);

        // Obtenha o URL da imagem após o upload bem-sucedido
        const photoURL = await getDownloadURL(storageRef);

        // Atualize o campo 'photoURL' no Firestore com o URL da imagem
        const docRef = doc(db, "users", user.docId);
        await updateDoc(docRef, {
            "photoURL": photoURL
        });
    } catch(e) {}
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
    getAlertByID,
    addMessageToAlert,
    createComunity,
    getComunityById,
    getComunities,
    removeMember,
    addMember,
    getComunityByUser,
    getComunityBySearch,
    aceitarSolicitacao,
    criarSolicitacao,
    getSolicitacoesByComunityId,
    getSolicitacaoId,
    excluirSolicitacao,
    recusarSolicitacao,
    getSolicitacoesByUser,
    uploadImage
}