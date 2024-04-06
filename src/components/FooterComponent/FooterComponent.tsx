import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export const FooterComponent: React.FC = () => {
  return (
    <>
      <div className='footer-container'>
        <div className='footer-left'>
          <p>@2024 - All Rights Reserved</p>
        </div>
        <div className='footer-center'>
          <p>Developed By Francesco Gastone</p>
          <div className='social-links'>
            <a href="https://www.instagram.com/_francescogastone_/">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://www.linkedin.com/in/francesco-gastone-50663a20b/">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="https://github.com/GastoneFrancesco/">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
            <a href="https://francescogastone.dev/">
              <FontAwesomeIcon icon={faGlobe} size="lg" />
            </a>
            <a href="mailto:francesco.gastone.dev@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>
          </div>
        </div>
        <div className='footer-right'>
          <p>Version</p>
          <p>{process.env.REACT_APP_GIT_DATE}-{process.env.REACT_APP_GIT_SHA}</p>
        </div>
      </div>
    </>
  );
};
