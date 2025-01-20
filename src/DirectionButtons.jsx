const DirectionButtons = ({ inputValues, currentStep, setCurrentStep, steppedForm }) => {

    const handleBackward = () => {
        if ( currentStep > 0 ) {
            setCurrentStep((prevStep) => {
                return prevStep - 1;   
           });     
    }   }

    const handleForward = () => {
        if ( currentStep < steppedForm.length - 1 ) {
            setCurrentStep((prevStep) => {
                return prevStep + 1;   //prevStep is the currentStep; the accumulation of all the previous steps
            });
        }
    }

    return (
       <>
            <div className="direction-buttons"> 
                <button className="back-button" onClick={ handleBackward }>
                    <span className="button-icon">&lt;</span>
                    <span className="button-text">Back</span>
                </button>

                <span className="dividing-line">|</span>

                <button className="next-button" onClick={ handleForward }>
                    <span className="button-icon">&gt;</span>
                    <span className="button-text">Next</span>
                </button>
            </div>
       </>
    );
}

export default DirectionButtons;