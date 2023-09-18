const Notification = ({type}) => {

    const messages = {
        validation: 'Para que possa usar os nossos serviços é necessário que faça uma validação rápida de seus documentos para que possamos trazer mais segurança para a aplicação.',
        missingInfo: 'Para que tenha total aproveitamento das nossas funções é necessário preencher o perfil por completo'
    }

    return (
        <div className="rounded-[10px] mb-5 p-5 text-white bg-[#FF8B6C]">
            {messages[type]}
        </div>
    )
}

export default Notification;