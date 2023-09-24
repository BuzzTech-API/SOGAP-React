import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom"
import { Authenticated, verifyToken } from "../services/token"
import { useEffect, useState } from "react"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { ShowProcess } from "../pages/ShowProcess"
import DefaultLayout from "../layout/DefaultLayout"
import { Cadastro } from "../components/Cadastro"
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    const checkAuthentication = async () => {
      setIsLoading(true);
      let authenticated = await validateAccessToken();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };
  
    useEffect(() => {
      checkAuthentication();
    }, []);
  
    if (isLoading) {
      return <div>LOADING</div>  //Loading page
    }
  
    return isAuthenticated === true ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace />
    );
  }

   
export function Router(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<RequireAuth/>}>
                  <Route element={<DefaultLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/process/:id" element={<ShowProcess/>}/>
                  </Route>
                </Route>
                {/* <Route path="*" element={<ErrorPage/>}/> */}
            </Routes>
      </BrowserRouter>
    )
}

