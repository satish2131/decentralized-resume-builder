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
        address: ''
    });
    const [workExperience, setWorkExperience] = useState([{ jobTitle: '', company: '', years: '' }]);
    const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
    const [customSections, setCustomSections] = useState([]);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const handleCreate = () => {
        // TODO: Integrate with blockchain here
        alert('Resume created and ready for blockchain storage!');
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="App">
            <Header />
            <div style={{textAlign: 'right', margin: '10px 30px 0 0'}}>
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
                    customSections={customSections}
                    setCustomSections={setCustomSections}
                    onCreate={handleCreate}
                />
                <ResumePreview resumeData={{ personalInfo, workExperience, education, customSections }} />
            </div>
            <Footer />
        </div>
    );
};

export default App;