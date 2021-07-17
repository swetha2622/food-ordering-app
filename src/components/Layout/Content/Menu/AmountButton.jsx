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

const AmountButton = (props) => {
    const classes = useStyles();
    const [count, setCount] = React.useState('1');
    const updateCount = (event) => {
        setCount(event.target.value);
    }
    return (<div className={classes.root}>
            <button className={`${classes.minusbutton} ${classes.button}`}>
                <AiOutlineMinus/>
            </button>
            <input type='text' value={count}
            className={classes.input} 
            onChange={updateCount}/>
            <button className={`${classes.plusbutton} ${classes.button}`}>
                <AiOutlinePlus />
            </button>
    </div>)
}

export default AmountButton;