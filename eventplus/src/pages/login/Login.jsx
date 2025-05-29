import "./Login.css"
import Imagem from "../../assets/img/imagemLogin.svg"
import Botao from "../../components/botao/Botao"
import Logo from "../../assets/img/logo1.svg"
const Login = () => {
    return(
        <main className="main_login">
            <section className="section_login">
                <img src={Imagem} alt="Imagem da tela de login" />
            </section>
            <div className="banner"></div>
            <form action="" className="form_login">
                <img src={Logo} alt="Logo da Evente+" />
                <div className="campo_login">
                    <div className="campo_input">
                        <input type="email" name="email" placeholder="Digite seu e-mail" />
                    </div>
                    <div className="campo_input">
                        <input type="password" name="senha" placeholder="Digite sua senha" />
                    </div>
                    <div className="link_esqueci_senha">
                        <a href="#">Esqueceu a senha?</a>
                    </div>
                </div>
                <Botao nomeDoBotao="Login"/>
            </form>
        </main>
      
    )
}

export default Login;