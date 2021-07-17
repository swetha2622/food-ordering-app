import React from 'react';
import classes from './Footer.module.css';
import {FaCcAmex} from 'react-icons/fa';
import {FaCcDiscover} from 'react-icons/fa';
import {FaCcMastercard} from 'react-icons/fa';
import {FaCcVisa} from 'react-icons/fa';
import {FaPhoneAlt} from 'react-icons/fa';

const Footer = props => {
    return <>
        <div className={classes['footer']}>
            <div>
                <div className={classes['footer-heading']}>Contact Us</div>
                <div> 1904 SW 34th Avenue</div>
                <div> Apartment 26</div>
                <div><FaPhoneAlt size="10px"/> (479)-276-6017</div>
            </div>
            <div>
                <div className={classes['footer-heading']}>Site Policies </div>
            </div>
            <div>
                <div className={classes['footer-heading']}>We accept</div>
                <div className={classes['cards-section']}>
                    <FaCcVisa />
                    <FaCcMastercard />
                    <FaCcDiscover />
                    <FaCcAmex />
                </div>
            </div>
        </div>
    </>
}

export default Footer;