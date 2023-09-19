const Notification = ({type}) => {

    const messages = {
        validation: 'Para que possa usar os nossos serviços é necessário que faça uma validação rápida de seus documentos para que possamos trazer mais segurança para a aplicação.',
        missingInfo: 'Para que tenha total aproveitamento das nossas funções é necessário preencher o perfil por completo.',
        subscribe: 'Assine um plano para que possa se manter atualizado(a) do que acontece na sua região, isso é sobre manter você e todos a sua volta seguros.',
        admin: 'Você está logado como administrador'
    }

    return (
        <div className={`rounded-[10px] ${type === 'admin' ? 'bg-black' : 'bg-[#FF8B6C]'} mb-5 p-5 text-white `}>
            {messages[type]}
        </div>
    )
}

export default Notification;    