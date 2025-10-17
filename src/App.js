import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

const App = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    objective: ''
  });

  const [workExperience, setWorkExperience] = useState([{ jobTitle: '', company: '', years: '' }]);
  const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
  const [customSections, setCustomSections] = useState([]);
  const [skills, setSkills] = useState(['']);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleCreate = () => {
    alert('Resume created and ready for blockchain storage!');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <Header />
      <div style={{ textAlign: 'right', margin: '10px 30px 0 0' }}>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <div className="container">
        <ResumeForm
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          workExperience={workExperience}
          setWorkExperience={setWorkExperience}
          education={education}
          setEducation={setEducation}
          skills={skills}
          setSkills={setSkills}
          customSections={customSections}
          setCustomSections={setCustomSections}
          onCreate={handleCreate}
        />

        {/* ✅ Live-updating preview (no extra state needed) */}
        <ResumePreview
          resumeData={{ personalInfo, workExperience, education, skills, customSections }}
        />
      </div>

      <Footer />
    </div>
  );
};

export default App;
