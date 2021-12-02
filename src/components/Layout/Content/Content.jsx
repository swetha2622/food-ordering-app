import React from 'react';
import {useHistory} from 'react-router-dom';
import classes from './Content.module.css';

const Content = props => {
    let history = useHistory();
    return <>
        <div className={classes['content-col']}>
            <button className={classes['order-button']} onClick={() =>history.push('/menu')}> Order now </button>
<br/>
            <button className={classes['order-button']} onClick={() =>history.push('/login')}> Login </button>
            <br/>
            <button className={classes['order-button']} onClick={() =>history.push('/track')}> Track Order </button>
       
        </div>
    </>
}

export default Content;