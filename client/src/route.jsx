import { useContext } from "react"

import { UserContext } from "./context/userContext"
import RegisterAndLogin from "./register-and-login";

export default function Routes (){

    const {user , id} = useContext(UserContext)
    if(user){
        return "logged in" + user;
    }
  
    return (
        <RegisterAndLogin />
    )
}