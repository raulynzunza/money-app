import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../data/firebase'

interface User {
    name: string,
    password: string
}

let object = {
  flag: false,
  message: ''
}

export const onRegister = async (user: User) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, user.name, user.password)
        object = {
          flag: true,
          message: 'User registered successfully'
        }           
      } catch (error: any) {
        object = {
          flag: false,
          message: error?.code
        }    
        console.log(error?.message)
        console.log(error?.code)        
      }
      return object
}
