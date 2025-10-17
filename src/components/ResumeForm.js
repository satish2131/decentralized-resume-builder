import React from 'react';

const ResumeForm = ({
  personalInfo,
  setPersonalInfo,
  workExperience,
  setWorkExperience,
  education,
  setEducation,
  skills,
  setSkills,
  customSections,
  setCustomSections,
  onCreate
}) => {
  // ✅ Personal Info
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  // ✅ Education
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...education];
    updated[index][name] = value;
    setEducation(updated);
  };

  const addEducation = () => setEducation([...education, { degree: '', institution: '', year: '' }]);

  // ✅ Work Experience
  const handleWorkExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...workExperience];
    updated[index][name] = value;
    setWorkExperience(updated);
  };

  const addWorkExperience = () => setWorkExperience([...workExperience, { jobTitle: '', company: '', years: '' }]);
  const removeWorkExperience = (index) => setWorkExperience(workExperience.filter((_, i) => i !== index));

  // ✅ Skills
  const handleSkillChange = (index, e) => {
    const updated = [...skills];
    updated[index] = e.target.value;
    setSkills(updated);
  };

  const addSkill = () => setSkills([...skills, '']);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  // ✅ Custom Sections
  const addCustomSection = () => setCustomSections([...customSections, { title: 'New Section', content: '' }]);
  const handleCustomSectionTitle = (idx, val) => {
    const updated = [...customSections];
    updated[idx].title = val;
    setCustomSections(updated);
  };
  const handleCustomSectionContent = (idx, val) => {
    const updated = [...customSections];
    updated[idx].content = val;
    setCustomSections(updated);
  };
  const removeCustomSection = (idx) => setCustomSections(customSections.filter((_, i) => i !== idx));

  const handleCreate = (e) => {
    e.preventDefault();
    if (onCreate) onCreate();
  };

  return (
    <form className="resume-form" onSubmit={handleCreate}>
      {/* Personal Info */}
      <h2>Personal Information</h2>
      <input type="text" name="name" placeholder="Name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
      <input type="email" name="email" placeholder="Email" value={personalInfo.email} onChange={handlePersonalInfoChange} />
      <input type="tel" name="phone" placeholder="Phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
      <input type="text" name="address" placeholder="Address" value={personalInfo.address} onChange={handlePersonalInfoChange} />

      {/* Objective */}
      <h2>Objective</h2>
      <textarea
        name="objective"
        placeholder="Write your career objective here..."
        value={personalInfo.objective || ''}
        onChange={handlePersonalInfoChange}
        rows={3}
      />

      {/* Education */}
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="education-entry">
          <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
          <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} />
          <input type="text" name="year" placeholder="Year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} />
        </div>
      ))}
      <button type="button" className="add-button" onClick={addEducation}>Add Education</button>

      {/* Skills */}
      <h2>Skills</h2>
      {skills.map((skill, index) => (
        <div key={index} className="skill-entry">
          <input type="text" placeholder="Enter a skill" value={skill} onChange={(e) => handleSkillChange(index, e)} />
          {index > 0 && (
            <button type="button" className="add-button" style={{ background: '#f87171', color: '#fff' }} onClick={() => removeSkill(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" className="add-button" onClick={addSkill}>Add Skill</button>

      {/* Custom Sections */}
      <h2>Custom Sections</h2>
      {customSections.map((section, idx) => (
        <div key={idx} className="custom-section-entry">
          <input type="text" className="custom-section-title" value={section.title} onChange={(e) => handleCustomSectionTitle(idx, e.target.value)} placeholder="Section Title" />
          <textarea className="custom-section-content" value={section.content} onChange={(e) => handleCustomSectionContent(idx, e.target.value)} placeholder="Section Content" rows={2} />
          <button type="button" className="add-button" style={{ background: '#f87171', color: '#fff' }} onClick={() => removeCustomSection(idx)}>Remove</button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={addCustomSection}>Add Custom Section</button>

      {/* Work Experience */}
      <h2>Work Experience</h2>
      {workExperience.map((work, index) => (
        <div key={index} className="work-experience-entry">
          <input type="text" name="jobTitle" placeholder="Job Title" value={work.jobTitle} onChange={(e) => handleWorkExperienceChange(index, e)} />
          <input type="text" name="company" placeholder="Company" value={work.company} onChange={(e) => handleWorkExperienceChange(index, e)} />
          <input type="text" name="years" placeholder="Years" value={work.years} onChange={(e) => handleWorkExperienceChange(index, e)} />
          {index > 0 && (
            <button type="button" className="add-button" style={{ background: '#f87171', color: '#fff' }} onClick={() => removeWorkExperience(index)}>Remove</button>
          )}
        </div>
      ))}
      <button type="button" className="add-button" onClick={addWorkExperience}>Add Work Experience</button>
    </form>
  );
};

export default ResumeForm;
