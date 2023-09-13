import { db } from "../firebase"

const { query, collection, where, getDocs, getDoc } = require("firebase/firestore")

const getUserByUID = async (uid) => {
    try {
        const q = query(collection(db, "/users"), where("uid", "==", uid))
        const docs = await getDoc(q)
        return false
    } catch (error) {
        console.log(error)
    }
}

// export {getUserByUID}