import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Comentario from "../../assets/img/comentario.svg";
import Informacoes from "../../assets/img/informacoes.svg";
import "./Listagem.css"
import api from "../../Services/services";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import Swal from 'sweetalert2';
import { useAuth } from "../../contexts/AuthContexts";

const Listagem = () => {

    const [listaEventos, setListaEventos] = useState([]);
    const [tipoModal, setTipoModal] = useState(""); //"descricaoEvento" ou "comentario"
    const [dadosModal, setDadosModal] = useState({}); // descrição, idEvento, etc.
    const [modalAberto, setModalAberto] = useState(false);
    // const [usuarioId, setUsuarioId] = useState("ff4a8025-8b24-4ed5-a7d5-e93004281868");
    const [filtroData, setFiltroData] = useState(["todos"])

    const {usuario} = useAuth();


        async function listarEventos() {
            try {
                //pego os eventos em geral
               const resposta = await api.get("Eventos");
               const todosOsEventos = resposta.data;

                const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuario.idUsuario)
                const minhasPresencas = respostaPresenca.data;

                const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                    const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);
                    return{
                        //AS INFORMAÇÕES TANTO DE EVENTOS QUANTO DE EVENTOS QUE POSSUEM PRESENÇA
                        ...atualEvento,// Mantém os dados originais do evento atual
                        possuiPresença: presenca?.situacao === true,
                        idpresenca: presenca?.idPresencaEvento || null
                    }
                })


               setListaEventos(eventosComPresencas);
            } catch (error) {
                console.log(error);   
            }
        }

        useEffect(() => {
            listarEventos();
            // console.log(usuario);         
        },[])

        function abrirModal(tipo, dados){
            //tipo de modal
            //dados do meu modal
            setModalAberto(true)
            setTipoModal(tipo)
            setDadosModal(dados)
        }

        function fecharModal(){

            setModalAberto(false);
            setDadosModal({});
            setTipoModal("");
        }

        async function manipularPresenca(idEvento, presenca, idPresenca) {
            try {
                if (presenca && idPresenca != "") {
                    //atualização: situação para false
                    await api.put(`PresencasEventos/${idPresenca}`,
                    {situacao: false});
                    Swal.fire(`Removido!`, 'Sua presença foi removida.','success');
                }else if(idPresenca != ""){
                    //atualização: situção para true
                    await api.put(`PresencasEventos/${idPresenca}`,
                    {situacao: true});
                    Swal.fire('Confirmado', 'Sua presença foi confirmada.', 'success');
                }else{
                    //cadastrar uma nova presença
                    await api.post("PresencasEventos", { situacao: true, idUsuario: usuario.idUsuario, idEvento: idEvento });
                    Swal.fire('Confirmado!', 'Sua presença foi confirmada.' , 'success');
                }
            } catch (error) {
                console.log(error);
            }
        }

        function filtrarEventos(){
            const hoje = new Date();

            return listaEventos.filter(evento => {
                const dataEvento = new Date(evento.dataEvento);

                if(filtroData.includes("todos")) return true;
                if(filtroData.includes("futuros") && dataEvento > hoje)return true;
                if(filtroData.includes("passados") && dataEvento < hoje)return true;

                return false;
            });
        }


    return(

        <>
            <Header/>      
            <main className="main_lista_eventos layout-grid">
                <div className="titulo">
                    <h1>Eventos</h1>
                    <hr/>
                </div>
            <select  onChange={(e) => setFiltroData([e.target.value])}>
                <option value="todos" selected> todos os eventos</option>
                <option value="futuros">Somente futuros</option>
                <option value="passados">Somente passados</option>
            </select>
            <table className="tabela_listagem_eventos">
                <thead>
                    <tr className="th_lista_eventos">
                        <th>Título</th>
                        <th>Data do Evento</th>
                        <th>Tipo Evento</th>
                        <th>Descrição</th>
                        <th>Comentários</th>
                        <th>Participar</th>
                    </tr>
                </thead>
                <tbody>
                    {listaEventos.length > 0 ? (
                        filtrarEventos() && filtrarEventos().map((item) => (

                            <tr className="td_lista_eventos">
                                <td>{item.nomeEvento}</td>
                                <td data-cell="Data">{item.dataEvento ? format(new Date(item.dataEvento), "dd/MM/yyyy") : ""} </td>
                                <td>{item.tiposEvento.tituloTipoEvento}</td>
                                <td><img className="icon" src={Informacoes} alt="" onClick={() => abrirModal("descricaoEvento", {descricao: item.descricao})}/></td>
                                <td><img className="icon" src={Comentario} alt="" onClick={() => abrirModal("comentarios", {idEvento: item.idEvento})}/></td>
                                <td><label className="switch">
                                    <input type="checkbox" 
                                        checked={item.possuiPresenca} 
                                        onChange={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)
                                        }/>
                                    <span className="slider"></span>
                                    </label>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>Não existe nenhum evento!</p>
                    )}
                </tbody>
                </table>
            </main>
            <Footer/>
            {modalAberto && (
                <Modal
                    titulo = {tipoModal == "descricaoEvento" ? "Descrição do evento" : "Comentário"}
                    //estou verificando qual é o tipo de modal!
                    tipoModel = {tipoModal}
                    idEvento ={dadosModal.idEvento}
                    descricao = {dadosModal.descricao}
                    fecharModal = {fecharModal}
                />
            )}
        </>
    )
}

export default Listagem;