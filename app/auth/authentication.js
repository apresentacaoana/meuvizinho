import { GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, db } from "../firebase"
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore"
import { limitToFirst } from "firebase/database"
import { useCookies } from "react-cookie"
import { useCollection } from 'react-firebase-hooks/firestore'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import calcularDistancia from "../actions/location"

const googleProvider = new GoogleAuthProvider()

const loginComEmailESenha = async (email, senha, setAlert) => {
    try {
        await signInWithEmailAndPassword(auth, email, senha)
    } catch(e) {
        console.log(e.code)
        if(e.code === 'auth/user-not-found') {
            setAlert("Usuário não encontrado")
        } else if (e.code === 'auth/wrong-password') {
            setAlert("Senha incorreta")
        }
    }
}

// const ChatRoom = async() => {
//     const messageRef = collection(db, "messages")
//     const queryRef = query(messageRef, orderBy("createdAt", "desc"), limit(20))
//     const [messages] = useCollection(queryRef, {idField: 'id'})
//     return messages
// }

const registrarComEmailESenha = async(name, email, pwd, city, bairro, state, country, address_number, street) => {
    try {
        console.log(city,bairro,state,country,address_number,street)
        const res = await createUserWithEmailAndPassword(auth, email, pwd)
        const user = res.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email,
            photoURL: "",
            nickname: "",
            verified: false,
            submissionId: "",
            gender: "",
            nacionality: "",
            birthofday: "",
            latitude: 0,
            longitude: 0,
            city: city,
            bairro: bairro,
            state: state,
            country: country,
            address_number: address_number,
            plan: "free",
            buyAt: "",
            role: "common",
            street: street
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
            if(doc.data().uid == uid) response = {
                ...doc.data(),
                docId: doc.id
            }
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
                role: "common",
                verified: false,
                submissionId: "",
                gender: "",
                nacionality: "",
                birthofday: "",
                city: "",
                bairro: "",
                plan: "free",
                buyAt: "",
                state: "",
                latitude: 0,
                longitude: 0,
                country: "",
                address_number: "",
                street: ""
                
                
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

const getAlertsByGroupId = async (id) => {
    try {
        const q = query(collection(db, "alerts"), where("groupId", "==", Number(id)), limit(1))
        const docs = await getDocs(q)
        let response = []
        docs.forEach((doc) => {
            if(doc.data().id == id) {
                response.push({
                    ...doc.data(),
                    docId: doc.id
                })
            }
        })
        return response
    } catch (e) {}
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
            doc.data().members.forEach((member) => {
                if(member.uid == id) {
                    response = {
                       ...doc.data(),
                        docId: doc.id
                    }
                }
            })
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

const createComunity = async (name, address, user, id, radius) => {
    try {
        const doc = await addDoc(collection(db, "comunities"), {
            name,
            address,
            creator: user,
            members: [],
            alerts: [],
            radius, 
            id,
            createdAt: new Date()
        })
        return {
            id: doc.id
        }
    } catch (e) {

    }
}

const emitirAlerta = async (id, tipo, situacao, userLoggedIn, groupId, details = "", messages = []) => {
    const group = await getComunityById(groupId)
    try {
        await addDoc(collection(db, "alerts"), {
            tipo,
            situacao,
            id,
            createdAt: new Date(),
            groupId,
            uid: userLoggedIn.uid,
            author: userLoggedIn,
            details,
            messages,
            group: await group
        })
    } catch (e) {
        console.log(e)
    }
}

const isComunityMember = async (uid, groupId) => {
    try {
        
            await getComunityById(groupId).then(async (comunity) => {
                
                if(comunity.creator.uid == uid) return true
                comunity.members.forEach((member) => {
                if(member.uid == userLoggedIn.uid) {
                    return true
                }
            })

        })
    } catch (e) {}
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

const getUsers = async () => {
    try {
        const users = collection(db, "users")
        const q = query(users)
        const docs = await getDocs(q)
        let response = []
        docs.forEach((doc) => {
            response.push(doc.data())
        })

        
        return response
    } catch (e) {

    }
}

const addMembersByRadius = async (id) => {
    try {
        const community = await getComunityById(id)
        const users = await getUsers()
        console.log(users)
        users.forEach(async (user) => {
            const distance = calcularDistancia(community.creator.latitude, community.creator.longitude, user.latitude, user.longitude)
            console.log(distance.km, distance.metros)
            if(user.role == 'police' && distance.km <= 10) {
                await addMember(user, community.id)
            }
            if(distance.metros <= community.radius && user.uid !== community.creator.uid && user.role !== 'police') {
                console.log(user)
                await addMember(user, community.id)
            }
        })
    } catch (e) {}
}

const updateUser = async (user, data) => {
    try {
        const docRef = doc(db, "users", user.docId);
        let object = {
            ...data
        }

        if(data.nickname) object['nickname'] = "@" + data.nickname

        await updateDoc(docRef, object);
    } catch(e) {}
}

const report = async (user, alert, details) => {
    try {
        const reportRef = collection(db, "reports")
        await addDoc(reportRef, {
            user,
            alert,
            reported: alert.author,
            createdAt: new Date(),
            details
        })
    } catch (e) {}
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
    updateUser,
    getUsers,
    addMembersByRadius,
    isComunityMember,
    report,
    getAlertsByGroupId
}