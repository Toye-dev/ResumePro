import { useState } from "react"

const StepIndicator = ({steppedForm, currentStep}) => {

   return(
        <>
            { steppedForm.map((indicator, index) => {
                return <div key={ indicator.id } className={ `indicator ${currentStep === index ? 'active' : 'null'}` } > 
            </div>
            }) // the backticks allows for the static string and the dynamic evaluation of the variable

            }
          
        </>
    )
}

export default StepIndicator

