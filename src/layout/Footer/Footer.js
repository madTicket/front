/* Footer.js */
import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.contents}>
                <p style={{opacity: 0.6}}>KAIST 2023W MadCamp</p>
                <p style={{opacity: 0.6}}>ⓒ Song Jihyo, Yang Junwon</p>

            </div>
        </footer>
    );
};

export default Footer;