
import { format } from "date-fns";

const ResumeSheet = ({ inputValues }) => {
    const formatDate = (dateString) => {
        return dateString ? format(new Date(dateString), "MMM yyyy") : "";
    };

    // Render Personal Details
    const renderPersonalDetails = () => {
        return inputValues.personalDetails.map((details, index) => (
            <div key={details.id} className="sheet-header-div">
                <h2 className="resume-fullname">
                    {details.firstName} {details.lastName}
                </h2>
                <p className="resume-jobtitle">{details.jobTitle}</p>
                <div className="emailAndLinkedin">
                    <p className="resume-email">{details.email}</p>
                    {details.linkedInUrl && (
                        <p className="resume-linkedInUrl">
                            <span className="dividing-Line">|</span> {details.linkedInUrl}
                        </p>
                    )}
                </div>
                <div className="phoneAndAddress">
                    <p className="resume-address">{details.address}</p>
                    {details.phoneNumber && (
                        <p className="resume-phonenumber">
                            <span className="dividing-Line">|</span> {details.phoneNumber}
                        </p>
                    )}
                </div>
            </div>
        ));
    };

    // Render Experience
    const renderExperience = () => {
        if (!inputValues.experience.some((exp) => exp.role)) return null;
        return (
            <div className="sheet-exp-div">
                <p className="subHeader">Experience</p>
                <div className="horizontal-line"></div>
                {inputValues.experience.map((exp, index) => (
                    <div key={exp.id} className="somethingAndPeriod">

                        <div className="roleAndComp">
                            <p className="role">{exp.role}</p>
                            <div className="complocat">
                                <p className="company">{exp.companyName}</p>
                                {exp.location && (
                                    <p className="location">
                                        <span className="dividing-Line">|</span> {exp.location}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="period">
                            <p className="from">{formatDate(exp.from)}</p>
                            {exp.to && (
                                <p className="to">
                                    <span>-</span> {formatDate(exp.to)}
                                </p>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        );
    };

    // Render Projects
    const renderProjects = () => {
        if (!inputValues.projects.some((project) => project.projectName)) return null;
        return (
            <div className="sheet-projects-div">
                <p className="subHeader">Projects</p>
                <div className="horizontal-line"></div>
                {inputValues.projects.map((project, index) => (
                    <div key={project.id} className="somethingAndPeriod">
                        <div className="projectAndAchiv">
                            <p className="projectName">{project.projectName}</p>
                            <p className="achievements">{project.achievements}</p>
                        </div>
                        <div className="period">
                            <p className="from">{formatDate(project.from)}</p>
                            {project.to && (
                                <p className="to">
                                    <span>-</span> {formatDate(project.to)}
                                </p>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        );
    };

    // Render Education
    const renderEducation = () => {
        if (!inputValues.education.some((edu) => edu.institutionName)) return null;
        return (
            <div className="sheet-education-div">
                <p className="subHeader">Education</p>
                <div className="horizontal-line"></div>
                {inputValues.education.map((edu, index) => (
                    <div key={edu.id} className="somethingAndPeriod">
                        <div className="institAndCourse">
                            <p className="institutionName">{edu.institutionName}</p>
                            <p className="courseName">{edu.courseName}</p>
                        </div>
                        <div className="period">
                            <p className="from">{formatDate(edu.from)}</p>
                            {edu.to && (
                                <p className="to">
                                    <span>-</span> {formatDate(edu.to)}
                                </p>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="a4-sheet">
            {renderPersonalDetails()}
            <div className="sheet-content-div">
                {renderExperience()}
                {renderProjects()}
                {renderEducation()}
            </div>
        </div>
    );
};

export default ResumeSheet;

// Loops through the inputValues.experience array using .map(), rendering each experience entry.
// Does the same for projects, does the same for experience.
// The jsx return is returning functions as opposed to writing out the code functions



/*import { format } from "date-fns";

const ResumeSheet = ({ inputValues }) => {

    console.log(inputValues);
    const formatDate = (dateString) => {
        return dateString ? format(new Date(dateString), 'MMM yyyy') : "";
    }

    const fullName = inputValues.personalDetails.firstName + ' ' + inputValues.personalDetails.lastName;

    return (
        <>
           <div className="a4-sheet">
           
                <div className="sheet-header-div">
                    <h2 className="resume-fullname">{ fullName }</h2>
                    <p className="resume-jobtitle">{ inputValues.personalDetails.jobTitle }</p>
                    <div className="emailAndLinkedin">
                        <p className="resume-email">{ inputValues.personalDetails.email }</p>
                        <p className="resume-linkedInUrl">{ inputValues.personalDetails.linkedInUrl && <span className="dividing-Line">|</span> }{ inputValues.personalDetails.linkedInUrl }</p>
                    </div>
                    <div className="phoneAndAddress">
                        <p className="resume-address">{ inputValues.personalDetails.address } </p>
                        <p className="resume-phonenumber">{ inputValues.personalDetails.phoneNumber && <span className="dividing-Line">|</span> } {inputValues.personalDetails.phoneNumber } </p>  
                    </div>
                </div>

                <div className="sheet-content-div">
                    <div className="sheet-exp-div">
                        { inputValues.experience.role ? ( 
                            <> 
                                <p className="subHeader"> Experience </p> 
                                <div className="horizontal-line"></div>
                            </>
                            ): null
                        }
                        <div className="somethingAndPeriod">
                            <p className="role">{ inputValues.experience.role }</p>
                            <div className="period"> 
                                <p className="from">{ formatDate(inputValues.experience.from) }</p>
                                <p className="to">{ inputValues.experience.to && <span>-</span> }{ formatDate(inputValues.experience.to) }</p>
                            </div>
                        </div>
                        <div className="complocat">
                            <p className="company">{ inputValues.experience.companyName }</p>
                            <p className="location">{ inputValues.experience.location && <span className="dividing-Line">|</span> }{ inputValues.experience.location }</p>
                        </div>
                       
                    </div>

                    <div className="sheet-project-div">
                        { inputValues.projects.projectName ? ( 
                            <> 
                                <p className="subHeader"> Projects </p> 
                                <div className="horizontal-line"></div>
                            </>
                            ): null
                        }
                        <div className="somethingAndPeriod">
                            <p className="projectName">{ inputValues.projects.projectName }</p>
                            <div className="period"> 
                                <p className="from">{ formatDate(inputValues.projects.from) } { inputValues.projects.from && <span>-</span>}</p>
                                <p className="to">{formatDate(inputValues.projects.to) }</p>
                            </div>     
                        </div>
                        <p className="achievements">{ inputValues.projects.achievements }</p>

                        
                    </div>

                    <div className="sheet-edu-div">
                        { inputValues.education.institutionName ? ( 
                            <> 
                                <p className="subHeader"> Education </p> 
                                <div className="horizontal-line"></div>
                            </>
                            ): null
                        }
                        <div className="somethingAndPeriod">
                            <p className="schoolName">{ inputValues.education.institutionName }</p>
                            <div className="period"> 
                                <p className="from">{ formatDate(inputValues.education.from) } { inputValues.education.from && <span>-</span>}</p>
                                <p className="to">{ formatDate(inputValues.education.to) }</p>
                            </div>     
                        </div>
                        <p className="courseName">{ inputValues.education.courseName }</p>
                        
                    </div>

                    
                </div>

            </div>
        </>
    );
}

export default ResumeSheet;
*/