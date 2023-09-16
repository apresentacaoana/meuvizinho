'use client'

const Alert = ({situacao, author}) => {

    return (
        <div className="w-[100%] text-[13px] mt-[80px] text-center bg-[#FF151580] p-3 rounded-[15px] text-white">
            {
                situacao === 'invasao' && (
                    <p>O(a) <span className="font-bold">{author}</span> emitiu um alerta de <span className="font-bold">INVASÃO</span> ao redor, se mantenham seguros dentro de suas casas!
                    </p>
                )
            }
            {
                situacao === 'furto' && (
                    <p>O(a) <span className="font-bold">{author}</span> afirma ter ocorrido um <span className="font-bold">FURTO</span>, tomem cuidado com seus pertences!
                    </p>
                )
            }
            {
                situacao === 'assalto' && (
                    <p>O(a) <span className="font-bold">{author}</span> emitiu um alerta de <span className="font-bold">ASSALTO</span> por perto, se mantenham seguros dentro de suas casas!
                    </p>
                )
            }
        </div>
    )
}

export default Alert