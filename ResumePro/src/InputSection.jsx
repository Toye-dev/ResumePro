import { useState } from "react";
import { format } from "date-fns";
import DirectionButtons from "./DirectionButtons";
import VerticalLine from './VerticalLine';
import ResumeSheet from "./ResumeSheet";
import StepIndicator from "./StepIndicator";
import SingleEntryForm from "./SingleEntryForm";


const OutputSection = ({ inputValues }) => {

    return (
        <>
            <section>
                <ResumeSheet inputValues={ inputValues }/>   
            </section>
        </>
    );
}

const InputSection = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputValues, setInputValues] = useState({
        personalDetails: [ 
            {    // key-value pair here. The key is personalDetails and the value is an object containing all changing inputs for that step
                'id' : Date.now(),
                'isDefault': 'true',
                'firstName': '',
                'lastName': '', 
                'jobTitle': '', 
                'email': '', 
                'linkedInUrl': '', 
                'address': '',
                'phoneNumber': ''
            }
        ], 
        experience: [
            {           // same as above. Also note that these keys must be in the static form structure steppedForm[currentStep] to be able to access them dynamically, tracking its changes
                'id' : Date.now(),
                'isDefault': 'true',
                'role': '',
                'companyName': '',
                'location': '',
                'from': '',
                'to': ''    
            }
        ],
        projects: [
            {    
                'id' : Date.now(),
                'isDefault': 'true',    
                'projectName': '',
                'from': '',
                'to': '', 
                'achievements': ''  
            }
        ],
        education: [
            {    
                'id' : Date.now(),
                'isDefault': 'true',     
                'institutionName': '',
                'from': '',
                'to': '', 
                'course': ''  
            }
        ]
       
    });


    const steppedForm = [
        {
            id: 1,
            key: 'personalDetails',     // this key connects the corresponding state key in inputValues for tracking changes
            title: 'Let\'s start with your personal details',
            subtitle: 'How should your employer contact and address you?',
            inputBoxes: [
                {
                    id: 1,
                    name: 'firstName',
                    label: 'First Name:',
                    type: 'text',
                    placeholder: 'John'
                }, // firstName object
                {
                    id: 2,
                    name: 'lastName',
                    label: 'Last Name:',
                    type: 'text',
                    placeholder: 'Doe'
                }, // secondName object
                {
                    id: 3,
                    name: 'jobTitle',
                    label: 'Job Title:',
                    type: 'text',
                    placeholder: 'Product Manager'
                }, //jobTitle object
                {
                    id: 4,
                    name: 'email',
                    label: 'Email:',
                    type: 'email',
                    placeholder: 'johnDoe@gmail.com'
                },
                {
                    id: 5,
                    name: 'linkedInUrl',
                    label: 'LinkedIn url:',
                    type: 'text',
                    placeholder: 'https://www.linkedin.com/in/yourprofile'
                },
                {
                    id: 6,
                    name: 'address',
                    label: 'Address:',
                    type: 'text',
                    placeholder: '123, Main Street, Lagos'
                },
                {   id: 7,
                    name: 'phoneNumber',
                    label: 'Phone Number:',
                    type: 'tel',
                    placeholder: '08012345678'
                }
                
            ]
        },
        {
            id: 2,
            key: 'experience', 
            title: 'Experience',
            subtitle: 'Share your professional work history like internships and employments',
            inputBoxes: [
                {
                    id: 1,
                    name: 'role',
                    label: 'Job Role:',
                    type: 'text',
                    placeholder: ''
                },
                {
                    id: 2,
                    name: 'companyName',
                    label: 'Company Name:',
                    type: 'text',
                    placeholder: ''
                    
                },
                {
                    id: 3,
                    name: 'location',
                    label: 'Location:',
                    type: 'text',
                    placeholder: ''
                    
                },
                {
                    id: 4,
                    name: 'from',
                    label: 'From:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 5,
                    name: 'to',
                    label: 'To:',
                    type: 'date',
                    placeholder: ''
                }
            ]
        },
        {
            id: 3,
            key: 'projects', 
            title: 'Projects',
            subtitle: 'Think about the projects you want to share',
            inputBoxes: [
                {
                    id: 1,
                    name: 'projectName',
                    label: 'Project Name:',
                    type: 'text',
                    placeholder: ''
                },
                {
                    id: 2,
                    name: 'from',
                    label: 'From:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 3,
                    name: 'to',
                    label: 'To:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 4,
                    name: 'achievements',
                    label: 'Achievements:',
                    type: 'textarea',
                    placeholder: ''
                }
            ]
        },
        {
            id: 4,
            key: 'education', // with these keys in place, the app after static rendering can go education.schoolname, education.from
            title: 'Education',
            subtitle: 'List your academic accomplishments, courses, and certifications',
            inputBoxes: [
                {
                    id: 1,
                    name: 'institutionName',
                    label: 'Institution Name:',
                    type: 'text',
                    placeholder: ''
                },
                {
                    id: 2,
                    name: 'from',
                    label: 'From:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 3,
                    name: 'to',
                    label: 'To:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 4,
                    name: 'courseName',
                    label: 'Course Name:',
                    type: 'text',
                    placeholder: ''
                }
                
            ]
        }
        
        
    ];

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleClickAdd = () => {
        const currentStepKey = steppedForm[currentStep].key; //finds the key of the step the user is on
        
       const newEntry = { id: Date.now() }; // Example: id = 1673015287693
      
       steppedForm[currentStep].inputBoxes.forEach((inputBox) => {
          newEntry[inputBox.name] = ''; // Add each key dynamically
        });
      
        setInputValues((prevValues) => {
          return {
            ...prevValues,
            [currentStepKey]: [...prevValues[currentStepKey], newEntry], // Add the new entry to the current step's array
          };
        });
        setHoveredIndex(null); // Without this, it still has the hovered state active from the previous mouseEnter 
    };
      
    const handleClickDelete = (index) => {
        const currentStepKey = steppedForm[currentStep].key;
      
        setInputValues((prevValues) => {
          const updatedValues = prevValues[currentStepKey].filter((data, step) => step !== index || data.isDefault);
          return {
            ...prevValues,
            [currentStepKey]: updatedValues,
          };
        });
    };
    

    

    const handleChange = (e, index) => {
        e.preventDefault();
        const {name, value} = e.target;         // destructuring the event object to get the name and value of the form input field interacted with and storing them in variables that match the form attributes
        const currentStepKey = steppedForm[currentStep].key;        // dynamically gets 'personalDetails' or 'education' - the keys of inputValues state

        setInputValues((prevValues) => {                 // the set function is on an object, and because we are updating multiple values, we need to use the spread operator as an argument to the setState's callback function
           const updatedValues = [...prevValues[currentStepKey]];
           updatedValues[index] = {
            ...updatedValues[index], [name]:value,
           };
            return {...prevValues,
                [currentStepKey] : updatedValues
            }                                                                        // where it figures out the name (also the key) of the input field coming from the form and updates the value of that input field in the state            
        });                                                                             // We also return two spreads here. The first is to copy the base structure of the useState, the second is the nested object
    }
       
    return(
        <>
        <main>
            <section className="input-section">

                <div className="step-indicator">
                    <StepIndicator steppedForm={steppedForm} currentStep={currentStep} />
                </div>
                
                <div>
                    <h1>{steppedForm[currentStep].title}</h1>
                    <p>{steppedForm[currentStep].subtitle}</p>
                </div>

                {/* Looping through each entry in the input values */}
                {inputValues[steppedForm[currentStep].key].map((entry, index) => (  
                    <div key={index}
                        className= {`form-card ${ hoveredIndex === index ? "hovered" : "" }`} 
                    >
               
                    { currentStep !== 0 ? 
                        <button className="delete-button" onClick={ () => {handleClickDelete(index)} } onMouseEnter={() => {setHoveredIndex(index)}} onMouseLeave={() => {setHoveredIndex(null)}}>
                            <span className="delIcon">x</span>
                            <span className="delText">Del</span>
                        </button>  
                        : null 
                    }
                    <form>    
                         
                        <SingleEntryForm
                            key={index}
                            entry={entry}
                            index={index}          // The index is used to identify the entry you're changing, and we update the specific entry in the updatedValues array.
                            inputBoxes={steppedForm[currentStep].inputBoxes}
                            handleChange={handleChange}
                        />
                    

                    </form>

                
                    { currentStep !== 0 ? 
                        <button className="add-button" onClick={ handleClickAdd }>
                            <span className="addIcon">+</span>
                            <span className="addText">Add</span>
                        </button> 
                        : null 
                    }
                </div>
            ))}
                <DirectionButtons 
                    inputValues={inputValues} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep} 
                    steppedForm={steppedForm}
                />
            </section>

            <VerticalLine />
            <OutputSection inputValues={inputValues} />

        </main>
        </>
    );
}

export default InputSection;

//inputBox.name → Comes from steppedForm.
//Square brackets ([inputBox.name]) → Dynamically matches this name to the correct key in your useState nested object. It is needed in the onChange function to update the correct key in the state.
/*The index Alone Is Not Enough to Access the Data:  The entry is the data object for each individual step (like the work experience entry, education entry, etc.). 
The index is only a reference to the position of that object in the array. Without the entry itself, you don't have the actual data values to show or modify in the form. This is what goes into the EntryForm
When rendering jsx as an array item, maybe iterating of some sort, like mapping, just know you must give it a key which identifies each item. That’s why the rendered form tag starts with a key prop.*/







// Version with static inputValues, while the used one above has a state that starts as an array, mappable for multiple form sets  
/*
const InputSection = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputValues, setInputValues] = useState({
        personalDetails: {    // key-value pair here. The key is personalDetails and the value is an object containing all changing inputs for that step
            'firstName': '',
            'lastName': '', 
            'jobTitle': '', 
            'email': '', 
            'linkedInUrl': '', 
            'address': '',
            'phoneNumber': ''
        }, 
        experience: {           // same as above. Also note that these keys must be in the static form structure steppedForm[currentStep] to be able to access them dynamically, tracking its changes
            'role': '',
            'companyName': '',
            'location': '',
            'from': '',
            'to': ''    
        },
        projects: {         
            'projectName': '',
            'from': '',
            'to': '', 
            'achievements': ''  
        },
        education: {         
            'institutionName': '',
            'from': '',
            'to': '', 
            'course': ''  
        }
       
    });


    const steppedForm = [
        {
            id: 1,
            key: 'personalDetails',     // this key connects the corresponding state key in inputValues for tracking changes
            title: 'Let\'s start with your personal details',
            subtitle: 'How should your employer contact and address you?',
            inputBoxes: [
                {
                    id: 1,
                    name: 'firstName',
                    label: 'First Name:',
                    type: 'text',
                    placeholder: 'John'
                }, // firstName object
                {
                    id: 2,
                    name: 'lastName',
                    label: 'Last Name:',
                    type: 'text',
                    placeholder: 'Doe'
                }, // secondName object
                {
                    id: 3,
                    name: 'jobTitle',
                    label: 'Job Title:',
                    type: 'text',
                    placeholder: 'Product Manager'
                }, //jobTitle object
                {
                    id: 4,
                    name: 'email',
                    label: 'Email:',
                    type: 'email',
                    placeholder: 'johnDoe@gmail.com'
                },
                {
                    id: 5,
                    name: 'linkedInUrl',
                    label: 'LinkedIn url:',
                    type: 'text',
                    placeholder: 'https://www.linkedin.com/in/yourprofile'
                },
                {
                    id: 6,
                    name: 'address',
                    label: 'Address:',
                    type: 'text',
                    placeholder: '123, Main Street, Lagos'
                },
                {   id: 7,
                    name: 'phoneNumber',
                    label: 'Phone Number:',
                    type: 'tel',
                    placeholder: '08012345678'
                }
                
            ]
        },
        {
            id: 2,
            key: 'experience', 
            title: 'Experience',
            subtitle: 'Share your professional work history like internships and employments',
            inputBoxes: [
                {
                    id: 1,
                    name: 'role',
                    label: 'Job Role:',
                    type: 'text',
                    placeholder: ''
                },
                {
                    id: 2,
                    name: 'companyName',
                    label: 'Company Name:',
                    type: 'text',
                    placeholder: ''
                    
                },
                {
                    id: 3,
                    name: 'location',
                    label: 'Location:',
                    type: 'text',
                    placeholder: ''
                    
                },
                {
                    id: 4,
                    name: 'from',
                    label: 'From:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 5,
                    name: 'to',
                    label: 'To:',
                    type: 'date',
                    placeholder: ''
                }
            ]
        },
        {
            id: 3,
            key: 'projects', 
            title: 'Projects',
            subtitle: 'Think about the projects you want to share',
            inputBoxes: [
                {
                    id: 1,
                    name: 'projectName',
                    label: 'Project Name:',
                    type: 'text',
                    placeholder: ''
                },
                {
                    id: 2,
                    name: 'from',
                    label: 'From:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 3,
                    name: 'to',
                    label: 'To:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 4,
                    name: 'achievements',
                    label: 'Achievements:',
                    type: 'textarea',
                    placeholder: ''
                }
            ]
        },
        {
            id: 4,
            key: 'education', // with these keys in place, the app after static rendering can go education.schoolname, education.from
            title: 'Education',
            subtitle: 'List your academic accomplishments, courses, and certifications',
            inputBoxes: [
                {
                    id: 1,
                    name: 'institutionName',
                    label: 'Institution Name:',
                    type: 'text',
                    placeholder: ''
                },
                {
                    id: 2,
                    name: 'from',
                    label: 'From:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 3,
                    name: 'to',
                    label: 'To:',
                    type: 'date',
                    placeholder: ''
                },
                {
                    id: 4,
                    name: 'courseName',
                    label: 'Course Name:',
                    type: 'text',
                    placeholder: ''
                }
                
            ]
        }
        
        
    ];

    const [isHover, setIsHover] = useState(false);

    const handleClickAdd = () => {

    }

    const handleClickDelete = () => {
        
    }

    

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value, type} = e.target;         // destructuring the event object to get the name and value of the form input field interacted with and storing them in variables that match the form attributes
        const currentStepKey = steppedForm[currentStep].key;        // dynamically gets 'personalDetails' or 'education' - the keys of inputValues state

        setInputValues((prevValues) => {                 // the set function is on an object, and because we are updating multiple values, we need to use the spread operator as an argument to the setState's callback function
           
            return {...prevValues,
                [currentStepKey] : { ...prevValues[currentStepKey], [name] : value}
            }                                                                        // where it figures out the name (also the key) of the input field coming from the form and updates the value of that input field in the state            
        });                                                                             // We also return two spreads here. The first is to copy the base structure of the useState, the second is the nested object
    }
       
    return(
        <>
        <main>
            <section className="input-section">

                <div className="step-indicator">
                    <StepIndicator steppedForm={steppedForm} currentStep={currentStep} />
                </div>
                
                <div>
                    <h1>{steppedForm[currentStep].title}</h1>
                    <p>{steppedForm[currentStep].subtitle}</p>
                </div>

                <div className={`form-card ${ isHover ? "hovered" : "" }`}>
                    { currentStep !== 0 ? 
                        <button className="delete-button" onClick={ handleClickDelete } onMouseEnter={() => {setIsHover(true)}} onMouseLeave={() => {setIsHover(false)}}>
                            <span className="delIcon">x</span>
                            <span className="delText">Del</span>
                        </button> 
                        : null 
                    }
                    <form>
                        {
                            steppedForm[currentStep].inputBoxes.map((inputBox)=>(
                                <div className="label-layout">
                                    <label htmlFor="">{inputBox.label}</label>
                                    { inputBox.type === 'textarea' ? (
                                            <textarea
                                            className="text-input"
                                            name={inputBox.name}
                                            value={inputValues[steppedForm[currentStep].key][inputBox.name]}
                                            onChange={handleChange} 
                                            />
                                    ) : (
                                            <input 
                                            className="text-input"
                                            type={inputBox.type} 
                                            placeholder={inputBox.placeholder} 
                                            name={inputBox.name} 
                                            // value={inputValues.personalDetails[inputBox.name]} // HARDCODED .dynamically accessing the value of a specific key in personalDetails, determined by inputBox.name
                                            value={inputValues[steppedForm[currentStep].key][inputBox.name]} // dynamic. e.g  inputValues.personalDetails.firstName
                                            onChange={handleChange} 

                                            />
                                        )
                                    }           
                                </div>
                            ))
                        }
                    </form>
                    { currentStep !== 0 ? 
                        <button className="add-button" onClick={ handleClickAdd }>
                            <span className="addIcon">+</span>
                            <span className="addText">Add</span>
                        </button> 
                        : null 
                    }
                </div>
                <DirectionButtons 
                    inputValues={inputValues} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep} 
                    steppedForm={steppedForm}
                />
            </section>

            <VerticalLine />
            <OutputSection inputValues={inputValues} />

        </main>
        </>
    );
}

export default InputSection;

//inputBox.name → Comes from steppedForm.
//Square brackets ([inputBox.name]) → Dynamically matches this name to the correct key in your useState nested object. It is needed in the onChange function to update the correct key in the state.
*/