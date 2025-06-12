import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento";
import CadastroDeEvento from "../pages/cadastroDeEventos/CadastroDeEvento";
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario";
import Listagem from "../pages/listagem/Listagem";
import { useAuth } from "../contexts/AuthContexts";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/home/Home";


const Privado = (props) => {
    const { usuario } = useAuth();
    //toke, idUsuario, tipoUsuario

    // Se nao estiver autenticado, manda pra login
    if(!usuario) {
        // return <Navigate to="/NotFound" />;
    }
    //Se  o tipo do usúario não for o permitido, bloqueia
    if (usuario.tipoUsuario !== props.tipoPermitido) {
        // return <Navigate to="/NotFound" />;
    }

    //Se não, renderiza o componente passado
    return <props.item />;
};


const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                {/* https://localhost:3000/ => Login */}
                <Route element = {<Login/>} path="/" exact />
                <Route element = {<NotFound/>}  path="/NotFound" />
                <Route element = {<Privado tipoPermitido="admin" item={CadastroTipoEvento}/>} path="CadastroTipoEvento"/>
                <Route element = {<Privado tipoPermitido="admin" item={CadastroDeEvento}/>} path="CadastroDeEvento"/>
                <Route element = {<Privado tipoPermitido="admin" item={CadastroTipoUsuario}/>} path="CadastroTipoUsuario"/>
                <Route element = {<Privado tipoPermitido="aluno" item={Listagem}/>} path="Listagem"/>
                <Route element = {<Privado tipoPermitido="aluno" item={Home}/>} path="Home"/>
                {/* <Route path="/Home" element={<Home/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;