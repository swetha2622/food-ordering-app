import React from 'react';
import {useHistory} from 'react-router-dom';
import classes from './Header.module.css';
import {FiShoppingCart} from 'react-icons/fi';

const Header = props => {
    const {count} = props;
    let history = useHistory();
    return <>
        <div className={classes['header']}>
            <h2 className={classes['label']}
            onClick={()=> history.push('/')}>Food Ordering App</h2>
            <div>
                <button className={classes['cart']} onClick={()=> history.push('/cart')}>
                    <FiShoppingCart color='#271507' fontSize='1rem'/>
                    <span className={classes['cart-text']}>View Cart</span>
                    <span className={classes['cart-badge']}>{count}</span>
                </button>
            </div>
        </div>
    </>
}

export default Header;