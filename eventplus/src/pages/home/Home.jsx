import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Tela from "../../assets/img/home1.svg";
import "./Home.css"



const Home = () => {
    return(
        <>
            <Header/>
            <main>
                <section>
                    <img className ="tela_vermelha" src={Tela} alt="fundo vermelho com a logo no meio" />
                </section>
                <section className="segunda_parte">
                    <div className="titulo_eventos">
                        <h1>Próximos Eventos</h1>
                        <hr />
                    </div>
                    <div className="box_eventos">
                        <article>
                            <h3>Titulo de Evento</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vitae molestiae, esse voluptatem voluptatum ad ratione asperiores ab maxime illum aperiam eveniet quis tempora corrupti nihil culpa est, autem dicta!</p>
                            <button>Cadastrar</button>
                        </article>
                        <article>
                            <h3>Titulo de Evento</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vitae molestiae, esse voluptatem voluptatum ad ratione asperiores ab maxime illum aperiam eveniet quis tempora corrupti nihil culpa est, autem dicta!</p>
                            <button>Cadastrar</button>
                        </article>
                        <article>
                            <h3>Titulo de Evento</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vitae molestiae, esse voluptatem voluptatum ad ratione asperiores ab maxime illum aperiam eveniet quis tempora corrupti nihil culpa est, autem dicta!</p>
                            <button>Cadastrar</button>
                        </article>
                        <article>
                            <h3>Titulo de Evento</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vitae molestiae, esse voluptatem voluptatum ad ratione asperiores ab maxime illum aperiam eveniet quis tempora corrupti nihil culpa est, autem dicta!</p>
                            <button>Cadastrar</button>
                        </article>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}
export default Home;