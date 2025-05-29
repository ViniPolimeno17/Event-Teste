import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento";
import CadastroDeEvento from "../pages/cadastroDeEventos/CadastroDeEvento";
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario";
import Listagem from "../pages/listagem/Listagem";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                {/* https://localhost:3000/ => Login */}
                <Route path="/" element={<Login/>} exact/>

                <Route path="/CadastroTipoEvento" element={<CadastroTipoEvento/>}/>

                <Route path="/CadastroDeEvento" element={<CadastroDeEvento/>}/>
                
                <Route path="/CadastroTipoUsuario" element={<CadastroTipoUsuario/>}/>
                
                <Route path="/Listagem" element={<Listagem/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;