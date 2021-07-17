import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AmountButton from './AmountButton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    display: 'flex',
      flex: 1
  },
  content: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  button: {
      backgroundColor: 'darkslategray',
      color: '#ffffff',
      border: 'none',
      borderRadius: '15px',
      padding: '5px',
      cursor: 'pointer'
  }
}));

const MenuItem = ({menuItem}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardContent>
            <div className={classes.details}>
                <div className={classes.media}>
                    <img src='' alt='FoodImage' />
                </div>
                <div className={classes.content}>
                    <div className={classes.contentHead}>{menuItem.menu_name}</div>
                    <div className={classes.contentDescription}>{menuItem.description}</div>
                </div>
                <div className={classes.actions}>
                    <div>{menuItem.price}</div>
                    <div><AmountButton /></div>
                    <div><button className={`${classes.button}`}>Add to Cart</button></div>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}

export default MenuItem;