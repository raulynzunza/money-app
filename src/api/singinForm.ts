import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../data/firebase'


let obj = {
    flag: false,
    message: '',
    token: ''
}
export const onLogin = async (email: string, password: string) => {
    try {

        const userCredentials: any = await signInWithEmailAndPassword(auth, email, password);            
        

        obj = {
            flag: false,
            message: '',
            token: userCredentials.user.email
        }
           
      } catch (error: any) {
        obj = {
            flag: true,
            message: error.code,
            token: ''
        }        
      }          
       
      return obj
}