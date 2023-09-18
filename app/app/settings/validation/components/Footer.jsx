import { Button, Step, Stepper } from "@material-tailwind/react"
import { useState } from "react"
import { AiOutlineMail } from "react-icons/ai"

const Footer = ({ setPage, page }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [isLastStep, setIsLastStep] = useState(false)
    const [isFirstStep, setIsFirstStep] = useState(false)

    const handleNext = () => {
        if(!isLastStep) {
            setActiveStep((cur) => cur + 1)
            setPage((cur) => cur + 1)
        }
    }
    const handlePrev = () => {
        if(!isFirstStep) {
            setActiveStep((cur) => cur - 1)
            setPage((cur) => cur - 1)
        }
    }

    return (
        <div className="p-5 fixed sm:mt-[10rem] sm:static bottom-0 w-full">
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
            >
                <Step onClick={() => setActiveStep(0)}>
                    <AiOutlineMail size={24} />
                </Step>
                <Step onClick={() => setActiveStep(1)}>
                    <AiOutlineMail size={24} />
                </Step>
                <Step onClick={() => setActiveStep(2)}>
                    <AiOutlineMail size={24} />
                </Step>
            </Stepper>
            <div className="mt-10 flex justify-between">
                <Button onClick={handlePrev} disabled={isFirstStep}>
                    Anterior
                </Button>
                <Button onClick={handleNext} disabled={isLastStep}>
                    Próximo
                </Button>
            </div>
        </div>
    )
}

export default Footer