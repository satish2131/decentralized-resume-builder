import React from 'react';


const Header = () => {
    return (
        <header className="main-header">
            <div className="container header-container">
                <h1 className="header-title">
                    <span className="gradient-text">Decentralized Resume Builder</span>
                </h1>
                <p className="header-subtitle">Create, preview, and download your resume instantly. <span className="sparkle">✨</span></p>
                <a href="#form" className="header-cta">Get Started</a>
            </div>
        </header>
    );
};

export default Header;