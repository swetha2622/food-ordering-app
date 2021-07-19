import React from 'react';
import { connect } from 'react-redux';
import {useHistory} from  'react-router-dom';
import commonClass from '../Content.module.css';
import '../../../../App.css';
import CartItem from './CartItem';

const Cart = ({cartItems}) => {
  const history = useHistory();
    return (<div className={`${commonClass['content']} ${commonClass['menu-content']}`} >
        Your Cart
        <div className="cart-content">
        {cartItems.map((cartItem, index) => {
            return <CartItem cartItem={cartItem} key={`cart-${index}`}/>
        })}
        </div>
        <button onClick={()=>history.push('/checkout')}> Checkout </button>
        </div>)
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
  