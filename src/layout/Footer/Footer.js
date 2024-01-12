/* Footer.js */
import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.contents}>
                <hr />
                푸터 입니다.
            </div>
        </footer>
    );
};

export default Footer;