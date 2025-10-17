import React from 'react';
import jsPDF from 'jspdf';

const ResumePreview = ({ resumeData }) => {
  const {
    personalInfo = {},
    workExperience = [],
    education = [],
    skills = [],
    customSections = []
  } = resumeData || {};

  const handleDownload = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let y = 20;
    const lineHeight = 8;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text((personalInfo.name || 'Your Name').toUpperCase(), 105, y, { align: 'center' });

    y += 10;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const contactLine = `${personalInfo.email || 'your.email@example.com'} | ${personalInfo.phone || 'Your Phone'} | ${personalInfo.address || 'Your Address'}`;
    pdf.text(contactLine, 105, y, { align: 'center' });

    y += 5;
    pdf.setLineWidth(0.3);
    pdf.line(20, y, 190, y);
    y += 10;

    if (personalInfo.objective) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.text('OBJECTIVE', 20, y);
      y += 5;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      const objLines = pdf.splitTextToSize(personalInfo.objective, 170);
      pdf.text(objLines, 20, y);
      y += objLines.length * lineHeight + 6;
    }

    if (education.length > 0) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.text('EDUCATION', 20, y);
      y += 8;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      education.forEach((edu) => {
        pdf.text(`${edu.degree || 'Degree'} — ${edu.institution || 'Institution'} (${edu.year || 'Year'})`, 20, y);
        y += lineHeight;
      });
      y += 6;
    }

    if (skills.length > 0) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.text('SKILLS', 20, y);
      y += 8;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      skills.filter(skill => skill.trim() !== '').forEach((skill) => {
        pdf.text(`• ${skill}`, 25, y);
        y += lineHeight;
      });
      y += 6;
    }

    if (customSections.length > 0) {
      customSections.forEach((section) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(13);
        pdf.text(section.title || 'Custom Section', 20, y);
        y += 5;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        const lines = pdf.splitTextToSize(section.content || '', 170);
        pdf.text(lines, 20, y);
        y += lines.length * lineHeight + 6;
      });
    }

    if (workExperience.length > 0) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.text('WORK EXPERIENCE', 20, y);
      y += 8;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      workExperience.forEach((job) => {
        pdf.text(`${job.jobTitle || 'Job Title'} — ${job.company || 'Company'} (${job.years || 'Years'})`, 20, y);
        y += lineHeight;
      });
      y += 6;
    }

    pdf.save('resume.pdf');
  };

  return (
    <div className="resume-preview-container">
      <div className="resume-preview">
        <h1>{personalInfo.name || 'Your Name'}</h1>
        <center>
          <p>{personalInfo.email || 'your.email@example.com'} | {personalInfo.phone || 'Your Phone'} | {personalInfo.address || 'Your Address'}</p>
        </center>
        <hr />

        {personalInfo.objective && (
          <>
            <h3>Objective</h3>
            <p>{personalInfo.objective}</p>
          </>
        )}

        {education.length > 0 && (
          <>
            <h3>Education</h3>
            <ul>
              {education.map((edu, i) => (
                <li key={i}>
                  <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          </>
        )}

        {skills.some(skill => skill.trim() !== '') && (
          <>
            <h3>Skills</h3>
            <ul>
              {skills.filter(skill => skill.trim() !== '').map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </>
        )}

        {customSections.map((sec, i) => (
          <div key={i} className="custom-section-preview">
            <h4>{sec.title}</h4>
            <p>{sec.content}</p>
          </div>
        ))}

        {workExperience.length > 0 && (
          <>
            <h3>Work Experience</h3>
            <ul>
              {workExperience.map((job, i) => (
                <li key={i}>
                  <strong>{job.jobTitle}</strong> — {job.company} ({job.years})
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button className="download-btn" onClick={handleDownload}>
        Download as PDF
      </button>
    </div>
  );
};

export default ResumePreview;
