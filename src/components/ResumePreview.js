import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = ({ resumeData }) => {
    const { personalInfo = {}, workExperience = [], education = [], customSections = [] } = resumeData;
    const previewRef = useRef();

    const handleDownload = async () => {
        const element = previewRef.current;
        // Temporarily scale down the preview for PDF if content is long
        let originalTransform = element.style.transform;
        let originalWidth = element.style.width;
        let scale = 1;
        // Estimate content height and scale if needed
        if (element.scrollHeight > 1100) {
            scale = 0.7;
        } else if (element.scrollHeight > 900) {
            scale = 0.8;
        } else if (element.scrollHeight > 700) {
            scale = 0.9;
        }
        if (scale < 1) {
            element.style.transform = `scale(${scale})`;
            element.style.transformOrigin = 'top left';
            element.style.width = `${100/scale}%`;
        }
        // Use higher scale for better clarity
        const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#fff' });
        if (scale < 1) {
            element.style.transform = originalTransform;
            element.style.width = originalWidth;
        }
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        // Calculate image height to fit A4
        const imgProps = pdf.getImageProperties(imgData);
        let imgWidth = pdfWidth;
        let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        // If still too tall, shrink to fit one page
        if (imgHeight > pdfHeight) {
            imgHeight = pdfHeight;
            imgWidth = (imgProps.width * imgHeight) / imgProps.height;
        }
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
        pdf.save('resume.pdf');
    };

    return (
        <div className="resume-preview-container">
            <div className="resume-preview-download-wrapper">
                <div className="resume-preview" ref={previewRef}>
                    <div className="personal-info">
                        <h3>{personalInfo.name || 'Your Name'}</h3>
                        <p>{personalInfo.email || 'your.email@example.com'}</p>
                        <p>{personalInfo.phone || 'Your Phone Number'}</p>
                        <p>{personalInfo.address || 'Your Address'}</p>
                    </div>
                    
                    <h4>Education</h4>
                    {education.length > 0 ? (
                        <ul className="education-list">
                            {education.map((edu, index) => (
                                <li key={index} className="education-item">
                                    <strong>{edu.degree || 'Degree'}</strong> from {edu.institution || 'Institution'} ({edu.year || 'Year'})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No education added yet.</p>
                    )}

                    {/* Custom Sections */}
                    {customSections.length > 0 && customSections.map((section, idx) => (
                        <div key={idx} className="custom-section-preview">
                            <h4>{section.title || 'Section'}</h4>
                            <p style={{whiteSpace:'pre-line'}}>{section.content}</p>
                        </div>
                    ))}
                    <h4>Work Experience</h4>
                    {workExperience.length > 0 ? (
                        <ul className="work-experience-list">
                            {workExperience.map((job, index) => (
                                <li key={index} className="work-experience-item">
                                    <strong>{job.jobTitle || 'Job Title'}</strong> at {job.company || 'Company Name'} ({job.years || 'Years'})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No work experience added yet.</p>
                    )}
                </div>
            </div>
            <button className="download-btn" onClick={handleDownload}>Download as PDF</button>
        </div>
    );
};

export default ResumePreview;