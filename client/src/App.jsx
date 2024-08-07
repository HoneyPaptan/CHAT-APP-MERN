

import {  UserContextProvider } from "./context/userContext"

import axios from "axios"
import Routes from "./route"


function App() {
  axios.defaults.baseURL = "http://localhost:3000"
  axios.defaults.withCredentials = true

 
  return (
    <>
   

     <UserContextProvider>
      <Routes />
      </UserContextProvider>

  
    </>
  )
}

export default App
