import "./Header.css";
import Saida from "../../assets/img/Sair.svg"
import Logo from "../../assets/img/logo1.svg"
import { Link } from "react-router-dom";

const Header = (props) => {
    return(
        <header>
            <div className="layout_grid cabecalho">
                <nav className="nav_header">
                    <Link to="/">
                    <img src={Logo} alt="Logo do event+" />
                    </Link>
                    <nav className="links_header">
                        <Link className="link_header" to="/Home" >Home</Link>
                        <Link className="link_header" to="/cadastroTipoEvento" >Eventos</Link>
                        <Link className="link_header" to="/cadastroTipoUsuario" >Usuários</Link>
                        <Link className="link_header" to="/Contatos" >Contatos</Link>
                        <Link className="link_header" to="/Administrador" >{props.adm}</Link>
                    </nav>
                        <Link className="link_saida" to="/" >{props.nomeUsu}</Link>
                        <Link className="saida" to="/" ><img src={Saida} alt="saída"/></Link>
                </nav>
            </div>
        </header>
    ) 
} 
export default Header; 