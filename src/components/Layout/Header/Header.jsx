import React from 'react';
import {useHistory} from 'react-router-dom';
import classes from './Header.module.css';
import {FiShoppingCart} from 'react-icons/fi';
import Profile from "./Profile";
import common from '../Content/Content.module.css';
const Header = props => {
    const {count} = props;
    let history = useHistory();
    return <>
        <div className={classes['header']}>
            <h2 className={classes['label']}
            onClick={()=> history.push('/')}>Food Ordering App</h2>
            <div className={[common['row-container']].join(' ')}>
                <button className={[classes['cart'],common['margin-10']].join(' ')} onClick={()=> history.push('/cart')}>
                    <FiShoppingCart color='#271507' fontSize='1rem'/>
                    <span className={classes['cart-text']}>View Cart</span>
                    <span className={classes['cart-badge']}>{count}</span>
                </button>
                <Profile  />
            </div>
        </div>
    </>
}

export default Header;