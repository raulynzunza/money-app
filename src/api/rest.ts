import { db } from '../data/firebase';
import { collection, addDoc, getDocs, query, updateDoc, doc } from 'firebase/firestore';

export const postMoney = async (money: any, token: any) => {
    await addDoc(collection(db, token), { money })
}

export const getMoney = async (token: any) => {
    const result = await getDocs(query(collection(db, token)))
    return result
}

export const updateMoney = async (id: any, money: any, actualMoney: any, token: any, operation: any) => {
    await updateDoc(doc(db, token, id), {
        money: operation === 'add' ?  parseInt(actualMoney) + parseInt(money) : parseInt(actualMoney) - parseInt(money)      
    })    
}