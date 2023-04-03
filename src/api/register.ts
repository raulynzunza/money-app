import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../data/firebase'

interface User {
    name: string,
    password: string
}

let flag = false

export const onRegister = async (user: User) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, user.name, user.password)
        flag = true            
      } catch (error) {
        flag = false
      }
      return flag
}
