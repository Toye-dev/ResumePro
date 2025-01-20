import { useState } from 'react';
import InputSection from './InputSection';



function App() {
 
  return (
    <>
      <header>

        <h1 className='app-logo'><span className='logo-first-half'>resumé</span><span className='logo-second-half'>pro</span></h1>
        
        <div className="print-button">
          <div className='print-icon'>
            <div className="print-top"></div>
            <div className="print-middle"></div>
            <div className="print-bottom"></div>
          </div>
          <div><p><b>Print</b></p> </div>
        </div>

      </header>

      <InputSection />
   
        
    </>
  )
}

export default App
