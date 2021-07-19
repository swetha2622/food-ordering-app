import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AmountButton from '../Menu/AmountButton';
import {updateCart, deleteCartItem} from '../../../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75vw',
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

const CartItem = ({cartItem, addToCart, deleteCartItem}) => {
  const classes = useStyles();

  const updateItemCount = (action, event) => {
    let {count} = cartItem;
        if(action === 'increment') {
          count = count + 1;
        } else if(action === 'decrement') {
            count = count > 1 ? count - 1 : count;
        } else {
          count = Number(event.target.value);
        }
      addToCart(cartItem, count);
    }
    const deleteItemFromCart = () => {
      deleteCartItem(cartItem);
    }
      return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.details}>
                    <div className={classes.media}>
                        <img src='' alt='FoodImage' />
                    </div>
                    <div className={classes.content}>
                        <div className={classes.contentHead}>{cartItem.menu_name}</div>
                    </div>
                    <div>{cartItem.count * cartItem.price}</div>
                    <div className={classes.actions}>
                        <div>
                          <AmountButton 
                          count={cartItem.count}
                          updateItemCount={updateItemCount}/>
                        </div>
                    </div>
                    <div>
                      <button onClick={deleteItemFromCart}>Delete</button>
                    </div>
                </div>
            </CardContent>
        </Card>
  );
}


const mapStateToProps = (state) => {
  return {
    cartItems: state.reducer.cartItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, count) => dispatch(updateCart({
      ...item, count
    })),
    deleteCartItem: item => dispatch(deleteCartItem({
      item
    }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
