import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Comentario from "../../assets/img/comentario.svg";
import LigaDesliga from "../../assets/img/LigaDesliga.svg";
import "./Listagem.css"

const Listagem = () => {
    return(
        <>
        <Header adm="Alunos"/>
        <section className="listagemEventos layout_grid">
            <div className="titulo_cima">
                <h1>Eventos</h1>
                <hr />
            </div>

                <select className="select">
                    <option value="" disabled selected>Todos os Eventos</option>
                    <option value="">ping pong</option>
                    <option value="">Games</option>
                </select>
                <div className="tabela_eventos">
                    <table>
                        <thead>
                            <tr className="table_eventos">
                                <th>Titulo</th>
                                <th>Tipo Eventos</th>
                                <th>Comentarios</th>
                                <th>Participar</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="item_listaEventos">
                                <td data-cell="Nome">Nome Evento</td>
                                <td data-cell="Tipo Evento"> Tipo Evento</td>
                                <td data-cell="comentario"><img src={Comentario} alt="balao" /></td>
                                <td data-cell="liga e desliga"><img src={LigaDesliga} alt="botao de lado" /></td>
                            </tr>
                        </tbody>

                    </table>
                </div>   
        </section>     
        <Footer/>
        </>
    )
}

export default Listagem;