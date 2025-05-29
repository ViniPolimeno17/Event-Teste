import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2'



import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Banner from "../../assets/img/pessoasQuadro.svg"

const CadastrarTipoEvento = () => {
    const [tipoevento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([])
    // const [deletaTipoEvento, setDeletaTipoEvento] = useState();


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



    async function cadastrarTipoEvento(e) {
        e.preventDefault();
        if (tipoevento.trim() != "") {

            // try => tentar
            // catch => lança a exceção
            try {
                // cadastrar um genero: post
                await api.post("tiposEventos", { tituloTipoEvento: tipoevento });
                alertar("success", "Cadastro realizado com sucesso!")
                setTipoEvento("")
            } catch (error) {
                alertar("error", "Erro! entre em contato com o suporte")
            }
        } else {
            alertar("error", "Preencha o campo vazio")
        }

    }

    async function listarTipoEvento() {
        try {
            //await => Aguarda uma resp da solicitação
            const resposta = await api.get("tiposEventos");

            // console.log(resposta);

            setListaTipoEvento(resposta.data);
            console.log(resposta.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function excluirTipoEvento(id) {
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
                        await api.delete(`tiposEventos/${id.idTipoEvento}`)
                        alertar("success", "Gênero excluido com sucesso!");
                        listaTipoEvento();

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

    async function editarTipoEvento(tipoevento) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Modifique seu Tipo de Evento",
            input: "text",
            inputLabel: "Novo Tipo Evento",
            inputValue: tipoevento.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });

        if (novoTipoEvento) {
            try {
                api.put(`tiposEventos/${tipoevento.idTipoEvento}`, { tituloTipoEvento: novoTipoEvento })
                Swal.fire(`O Tipo novo é ${novoTipoEvento}`);
                listaTipoEvento();
            } catch (error) {

            }
        }
    }


    useEffect(() => {
        listarTipoEvento();
    }, [listaTipoEvento])



    return (
        <>
            <Header nomeUsu="Administrador" />
            <Cadastro
                titulo="Cadastrar Tipo de Evento"
                visibilidade="none"
                imagem={Banner}
                place="Titulo"

                funcCadastro={cadastrarTipoEvento}

                valorInput={tipoevento}
                setValorInput={setTipoEvento}

                data="none"
                desc="none"
                Inst="none"
            />
            <Lista
                titulo="Lista Tipo de evento"
                tdnome="Nome Evento"
                tituloEvento="Titulo"
                tipoLista="tiposEventos"
                lista={listaTipoEvento}

                deletar={excluirTipoEvento}
                funcEditar={editarTipoEvento}
            />
            <Footer />
        </>
    )
}


export default CadastrarTipoEvento;