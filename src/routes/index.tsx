import { BrowserRouter, redirect, Route, Routes, Navigate, Outlet } from "react-router-dom"
import { Authenticated, verifyToken } from "../services/token"
import { PropsWithChildren, useEffect, useState } from "react"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { ModalSolicitaEvidencia } from "../components/Modal/BtnPedirEvidencia"
import { ShowProcess } from "../pages/ShowProcess"

// Valida o token
const validateAccessToken = async () => {
    let authenticated = new Authenticated()
    return verifyToken(authenticated).then(() => {
        return authenticated.isAuthenticated
    }).catch(() => {
        return false
    })
}

// Verifica se o usuário está autenticado. Se o usuário não estiver autenticado ele é jogado para a tela de login, caso contrário é jogado para a página que quiser
export function RequireAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const checkAuthentication = async () => {
        setIsLoading(true)
        let authenticated = await validateAccessToken()
        setIsAuthenticated(authenticated)
        setIsLoading(false)
    }

    useEffect(() => {
        checkAuthentication()
    },[])

    return isAuthenticated === true ? <Outlet/> : <Navigate to="/login" replace />
    //return <Outlet/> use esse return para testar (caso o backend não rodar)
}

   

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/modal2" element={<ModalSolicitaEvidencia />}/>
                    <Route path="/process/:id" element={<ShowProcess/>}/>
                </Route>
                {/* <Route path="*" element={<ErrorPage/>}/> */}
            </Routes>
      </BrowserRouter>
    )
}