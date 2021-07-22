import React from 'react';
import { connect } from 'react-redux';
import {useHistory} from  'react-router-dom';
import Button from '@material-ui/core/Button';
import commonClass from '../Content.module.css';
import '../../../../App.css';
import CartItem from './CartItem';

const Cart = ({cartItems}) => {
  const history = useHistory();
    return (
    <div className={`${commonClass['content']} ${commonClass['menu-content']}`} >
        {cartItems.length > 0 ?
        <>Your Cart
        
        <div className="cart-content">
        {cartItems.map((cartItem, index) => {
            return <CartItem cartItem={cartItem} key={`cart-${index}`}/>
        })}
        </div>
        <br/>
        <Button variant="contained" 
            onClick={()=> history.push('./checkout') }
            color="darkslategray" 
            > Checkout </Button>
            </> : 
            <div>No items in cart</div>}
        </div>
        )
    }

const mapStateToProps = (state) => {
    return {
      cartItems: state.reducer.cartItems
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
  