import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../data/firebase'


let obj = {
    flag: false,
    message: ''
}
export const onLogin = async (email: string, password: string) => {
    try {

        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        obj = {
            flag: false,
            message: ''
        }

        console.log(userCredentials);
           
      } catch (error: any) {
        obj = {
            flag: true,
            message: error.code
        }
        console.log(error.code)
      }      
      
      return obj
}