const { Spinner } = require("@material-tailwind/react")

const Loading = () => {
    return (
        
        <div className="w-screen h-[70vh]">
            
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>              
                <Spinner className='w-[50px] h-[50px]' />
            </div>
        </div>

    )
}

export default Loading