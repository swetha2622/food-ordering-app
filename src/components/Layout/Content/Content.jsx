import React from 'react';
import {useHistory} from 'react-router-dom';
import classes from './Content.module.css';

const Content = props => {
    let history = useHistory();
    return <>
        <div className={classes['content']}>
            <button className={classes['order-button']} onClick={() =>history.push('/menu')}> Order now </button>
        </div>
    </>
}

export default Content;