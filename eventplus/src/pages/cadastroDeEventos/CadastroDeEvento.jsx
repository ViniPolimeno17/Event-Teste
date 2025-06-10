import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2'

import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Banner from "../../assets/img/imagemCadastro.svg"

const CadastrarEvento = () => {

    const [evento, setEvento] = useState("");
    const [dataevento, setDataEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [instituicao, setInstituicao] = useState("BA9E3BC4-46CF-487D-8839-FFCE2EDF3BAA");
    const [tipoevento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([])
    const [listaEvento, setListaEvento] = useState([])
    // const [excluirEvento, setExcluirEvento] = useState([])

    

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
            Toast.fire({
                icon: icone,
                title: mensagem
        });
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("tiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);

        }

    }


    async function listarEvento() {
        try {
            const resposta = await api.get("eventos")
            setListaEvento(resposta.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function excluirEvento(id) {
            Swal.fire({
                    title: "Você tem certeza?",
                    text: "Você não vai conseguir reverter isso!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sim, quero deletar!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await api.delete(`eventos/${id.idEvento}`)
                            alertar("success", "Gênero excluido com sucesso!");
                            listaEvento();

                        } catch (error) {
                            console.log(error);
                        }
                        // Swal.fire({
                        //     title: "Deletado!",
                        //     text: "seu arquivo foi apagado com sucesso!",
                        //     icon: "success"
                        // });
                    }
                });
                // Alerta - fim
            }

    async function cadastrarEvento(evnt) {
            // console.log(evento);
            // console.log(tipoevento);
            // console.log(dataevento);
            // console.log(descricao);
            // console.log(instituicao);
            
        evnt.preventDefault();
        if (evento.trim() !== "") {
            try {
                await api.post("eventos", { nomeEvento: evento, idTipoEvento: tipoevento, dataEvento: dataevento, descricao: descricao, idInstituicao: instituicao });
                alertar("success", "Cadastro realizado com sucesso!");
                setEvento("");
                setDataEvento();
                setDescricao("");
                setTipoEvento("");

            } catch (error) {
                alertar("error", "Entre em contato com o suporte")
            }
        } else {
            alertar("error", "Preencha o campo vazio")

        }
    }

    async function editarEvento(evento) {
            try {
                const tiposOptions = listaTipoEvento
                .map(tipo => `<option value="${tipo.idTipoEvento}" ${tipo.idTipoEvento === evento.idTipoEvento ? 'selected' : ''}>${tipo.tituloTipoEvento}</option>`)
                .join('');

                const { value } = await Swal.fire({
                title: "Editar Tipo de Evento",
                html: `
                    <input id="campo1" class="swal2-input" placeholder="Título" value="${evento.nomeEvento || ''}">
                    <input id="campo2" class="swal2-input" type="date" value="${evento.dataEvento?.substring(0, 10) || ''}">
                    <select id="campo3" class="swal2-select">${tiposOptions}</select>
                    <input id="campo4" class="swal2-input" placeholder="Categoria" value="${evento.descricao || ''}">
                `,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                cancelButtonText: "Cancelar",
                focusConfirm: false,
                preConfirm: () => {
                    const campo1 = document.getElementById("campo1").value;
                    const campo2 = document.getElementById("campo2").value;
                    const campo3 = document.getElementById("campo3").value;
                    const campo4 = document.getElementById("campo4").value;

                    if (!campo1 || !campo2 || !campo3 || !campo4) {
                    Swal.showValidationMessage("Preencha todos os campos.");
                    return false;
                    }

                    return { campo1, campo2, campo3, campo4 };
                }
                });

                if (!value) {
                console.log("Edição cancelada pelo usuário.");
                return;
                }

                console.log("Dados para atualizar:", value);

                await api.put(`eventos/${evento.idEvento}`, {
                nomeEvento: value.campo1,
                dataEvento: value.campo2,
                idTipoEvento: value.campo3,  
                descricao: value.campo4,
                });

                console.log("Evento atualizado com sucesso!");
                Swal.fire("Atualizado!", "Dados salvos com sucesso.", "success");
                listarEvento();

            } catch (error) {
                console.log("Erro ao atualizar evento:", error);
                Swal.fire("Erro!", "Não foi possível atualizar.", "error");
            }
    }

    useEffect(() => {
        listarTipoEvento();
        listarEvento();
    }, []);

   

    return (
        <>
            <Header nomeUsu="Administrador" />
            <Cadastro
                nomeDoBotao="Cadastrar"
                titulo="Cadastrar Evento"
                imagem={Banner}
                place="Nome"

                funcCadastro={cadastrarEvento}

                valorInput={evento}
                setValorInput={setEvento}

                valorSelect={tipoevento}
                setValorSelect={setTipoEvento}

                valorSelect2={instituicao}
                setValorSelect2={setInstituicao}

                valorDate={dataevento}
                setValorDate={setDataEvento}

                valorText={descricao}
                setValorText={setDescricao}

                lista={listaTipoEvento}
            />
            <Lista
                titulo="Lista de Evento"
                tdnome="Nome Evento"
                tituloEvento="Nome"
                nomeEvento1="Titulo Evento"
                nomeEvento2="Titulo Evento"

                lista={listaEvento}
                funcDeletar={excluirEvento}
                funcEditar={editarEvento}
            />
            <Footer />
        </>
    )
}

export default CadastrarEvento;