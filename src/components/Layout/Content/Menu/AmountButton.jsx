import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    button: {
        border: '1px solid lightslategray',
        alignAitems: 'center',
        display: 'flex',
        cursor: 'pointer'
    },
    minusbutton: {
        'border-radius': '10px 0px 0px 10px;'
    },
    plusbutton: {
        'border-radius': '0px 10px 10px 0px'
    },
    input :{
        maxWidth: '25px'
    }
  }));

const AmountButton = ({
    count,
    updateItemCount
}) => {
    const classes = useStyles();
    return (<div className={classes.root}>
            <button className={`${classes.minusbutton} ${classes.button}`} 
            onClick={() => updateItemCount('decrement')}>
                <AiOutlineMinus/>
            </button>
            <input type='text' value={count}
            className={classes.input} 
            onChange={(event)=> updateItemCount('', event)}/>
            <button className={`${classes.plusbutton} ${classes.button}`} 
            onClick={() => updateItemCount('increment')}>
                <AiOutlinePlus />
            </button>
    </div>)
}

export default AmountButton;