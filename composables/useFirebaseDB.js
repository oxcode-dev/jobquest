import 
  { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, getCountFromServer, query, where, Timestamp, limit, orderBy, serverTimestamp } 
from 'firebase/firestore'
import { errorResponse } from '../helpers/FirebaseErrorResponse';

export const useFirebaseDB = () => {
    const { $db } = useNuxtApp()

    const getDataWithId = async (table, id) => {
      try {
        const dataDoc = doc($db, table, id);
        const result = await getDoc(dataDoc);
        return {...result.data(), id: result.id}
      }
      catch (error) {
        return errorResponse(error)
      }
    }

    const getTotalData = async(table) => {
      const collectionRef = collection($db, table);
      const snapshot = await getCountFromServer(collectionRef);
      return snapshot.data().count;
    }

    const getAllData = async (table) =>  {
      const collectionRef = collection($db, table)
      try{
        const result = await getDocs(collectionRef)
        // console.log(result.docs)
        return result.docs.map(doc => ({...doc.data(), id: doc.id}))
      }
      catch(error) {
        return errorResponse(error)
      }
    }

    const getDataOrderLimit = async (table, orderByColumn='updated_at', orderDirection = 'desc', limitNm=30) =>  {
      const collectionRef = collection($db, table)
      try{
        const query = query(collectionRef, orderBy(orderByColumn, orderDirection), limit(limitNm))
        const result = await getDocs(query)
        console.log(result.docs)
        return result.docs.map(doc => ({...doc.data(), id: doc.id}))
      }
      catch(error) {
        return errorResponse(error)
      }
    }

    const getUserDetail = async(id, type) => {
      const collectionRef = query(collection($db, 'users'), where("id", "==", id), where("user_type", "==", type));
      try {
          const result = await getDocs(collectionRef)
          return result.docs.map(doc => ({...doc.data(), id: doc.id}))
      }
      catch(error){
        return errorResponse(error)
      }
    }

    const getDataWhereKeyValue = async(table, key, value, operator='==') => {
      const collectionRef = query(collection($db, table), where(key, operator, value));
      // const collectionRef = query(collection(db, table), where("capital", "==", true));
      try {
          const result = await getDocs(collectionRef)
          return result.docs.map(doc => ({...doc.data(), id: doc.id}))
      }
      catch(error){
        return errorResponse(error)
      }
    }

    const getDataWhereKeyInValues = async(table, key, value) => {
      const collectionRef = query(collection($db, table), where(key, 'in', value));
      // const collectionRef = query(collection(db, table), where("capital", "==", true));
      try {
          const result = await getDocs(collectionRef)
          return result.docs.map(doc => ({...doc.data(), id: doc.id}))
      }
      catch(error){
        return errorResponse(error)
      }
    }

    const addData = async (table, data) => {
      try{
        const collectionRef = collection($db, table)
        await addDoc(collectionRef, data)
      }
      catch(error) {
        return errorResponse(error)
      }
    }

    const updateData = async (table, data, id) => {
      try{
        const dataDoc = doc($db, table, id)
        await updateDoc(dataDoc, data)
      }
      catch(error) {
        return errorResponse(error)
      }
    }

    const deleteData = async (table, id) => {
      try{
        const dataDoc = doc($db, table, id)
        await deleteDoc(dataDoc)
      }
      catch(error) {
        return errorResponse(error)
      }
    }

    function convertTimestamp(timestamp) {
      let date = new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();
      return date.toLocaleString()
    }

    return { 
      getTotalData, getAllData, addData, updateData, getUserDetail, getDataWhereKeyInValues,
      deleteData, getDataWithId, getDataWhereKeyValue, convertTimestamp, serverTimestamp
    }
}