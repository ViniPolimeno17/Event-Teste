import "./Login.css"
import Imagem from "../../assets/img/imagemLogin.svg"
import Botao from "../../components/botao/Botao"
import Logo from "../../assets/img/logo1.svg"
import api from "../../Services/services"
import { useState } from "react"
import { userDecodeToken } from "../../auth/Auth"
import secureLocalStorage from "react-secure-storage"
import { Navigate, useNavigate } from 'react-router-dom'



const Login = () => {

        const [email, setEmail] = useState("");
        const [senha, setSenha] = useState("");
        const navigate = useNavigate();

        async function realizarAutenticacao(e) {
                e.preventDefault();
                // console.log("aaaaaaa");
                
                const usuario = {
                    email: email,
                    senha: senha
                }
                if (senha.trim() != "" || email.trim() != "") {
                    try {
                        const resposta = await api.post("Login", usuario);

                        const token = resposta.data.token;

                        if(token){
                            //token sera decodificado
                            const tokenDecodificado = userDecodeToken(token);

                            secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

                            if (tokenDecodificado.tipoUsuario === "aluno") {
                                //redirecionar a tela de aluno(branco)
                                navigate("/Listagem")
                            }else{
                            //ele vai me encaminhar pra tela cadastro de eventos(vermelha)
                                navigate("/CadastroDeEvento")
                            }
                            // console.log("Token decodificado:");
                            // console.log(tokenDecodificado);                           
                        }                        
                    } catch (error) {
                        console.log(error);
                        alert("Email ou senha inválidos! Para dúvidas, entre em contato com o suporte.");
                    }
                }else{
                    alert("Preencha os campos vazios para realizar o login!")
                }
            }
    return(
        <>
        <main className="main_login">
            <section className="section_login">
                <img src={Imagem} alt="Imagem da tela de login" />
            </section>
            <div className="banner"></div>
            <form action="" className="form_login" onSubmit={realizarAutenticacao}>
                <img src={Logo} alt="Logo da Evente+" />
                <div className="campo_login">
                    <div className="campo_input">
                        <input type="email" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="campo_input">
                        <input type="password" name="senha" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <div className="link_esqueci_senha">
                        <a href="#">Esqueceu a senha?</a>
                    </div>
                </div>
                <Botao nomeBotao="Login"/>
            </form>
        </main>
        </>
    )
}

export default Login;