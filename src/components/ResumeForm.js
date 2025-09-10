import React, { useState } from 'react';


const ResumeForm = ({
    personalInfo,
    setPersonalInfo,
    workExperience,
    setWorkExperience,
    education,
    setEducation,
    customSections,
    setCustomSections,
    onCreate
}) => {
    // Custom Sections Handlers
    const addCustomSection = () => {
        setCustomSections([
            ...customSections,
            { title: 'New Section', content: '' }
        ]);
    };

    const handleCustomSectionTitle = (idx, value) => {
        const updated = [...customSections];
        updated[idx].title = value;
        setCustomSections(updated);
    };

    const handleCustomSectionContent = (idx, value) => {
        const updated = [...customSections];
        updated[idx].content = value;
        setCustomSections(updated);
    };

    const removeCustomSection = (idx) => {
        const updated = [...customSections];
        updated.splice(idx, 1);
        setCustomSections(updated);
    };
    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo({ ...personalInfo, [name]: value });
    };

    const handleWorkExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedWorkExperience = [...workExperience];
        updatedWorkExperience[index][name] = value;
        setWorkExperience(updatedWorkExperience);
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducation = [...education];
        updatedEducation[index][name] = value;
        setEducation(updatedEducation);
    };

    const addWorkExperience = () => {
        setWorkExperience([...workExperience, { jobTitle: '', company: '', years: '' }]);
    };

    const addEducation = () => {
        setEducation([...education, { degree: '', institution: '', year: '' }]);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (onCreate) onCreate();
    };

    return (
        <form className="resume-form">
            <h2>Personal Information</h2>
            <input type="text" name="name" placeholder="Name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
            <input type="email" name="email" placeholder="Email" value={personalInfo.email} onChange={handlePersonalInfoChange} />
            <input type="tel" name="phone" placeholder="Phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
            <input type="text" name="address" placeholder="Address" value={personalInfo.address} onChange={handlePersonalInfoChange} />

            
            <button type="button" className="add-button" onClick={addWorkExperience}>Add Work Experience</button>

            <h2>Education</h2>
            {education.map((edu, index) => (
                <div key={index} className="education-entry">
                    <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                    <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} />
                    <input type="text" name="year" placeholder="Year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} />
                </div>
            ))}
            <button type="button" className="add-button" onClick={addEducation}>Add Education</button>

            <h2>Custom Sections</h2>
            {customSections.map((section, idx) => (
                <div key={idx} className="custom-section-entry">
                    <input
                        type="text"
                        className="custom-section-title"
                        value={section.title}
                        onChange={e => handleCustomSectionTitle(idx, e.target.value)}
                        placeholder="Section Title"
                    />
                    <textarea
                        className="custom-section-content"
                        value={section.content}
                        onChange={e => handleCustomSectionContent(idx, e.target.value)}
                        placeholder="Section Content"
                        rows={2}
                    />
                    <button type="button" className="add-button" style={{background:'#f87171',color:'#fff'}} onClick={() => removeCustomSection(idx)}>Remove</button>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addCustomSection}>Add Custom Section</button>
<h2>Work Experience</h2>
            {workExperience.map((work, index) => (
                <div key={index} className="work-experience-entry">
                    <input type="text" name="jobTitle" placeholder="Job Title" value={work.jobTitle} onChange={(e) => handleWorkExperienceChange(index, e)} />
                    <input type="text" name="company" placeholder="Company" value={work.company} onChange={(e) => handleWorkExperienceChange(index, e)} />
                    <input type="text" name="years" placeholder="Years" value={work.years} onChange={(e) => handleWorkExperienceChange(index, e)} />
                </div>
            ))}
           
        </form>
    );
};

export default ResumeForm;