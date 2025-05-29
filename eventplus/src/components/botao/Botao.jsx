import "./Botao.css"
const Botao = (props) => {
    return(
        <button className="botao">{props.nomeBotao}</button>
    )
}

export default Botao;