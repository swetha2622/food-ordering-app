import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import commonClass from '../Content.module.css';
import '../../../../App.css';

const useStyles = makeStyles((theme) => ({
  heading: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bolder',
    paddingBottom: '10px',
    borderBottom : '1px solid black',
    fontFamily: 'fantasy !important'
  },
  alignItems: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '12px',
    padding: '5px 0px',
    textAlign: 'left'
  },
  orderTotal: {
    fontSize: '14px',
    fontWeight: 'bolder',
    borderTop: '1px solid lightgrey'
  },
  taxAmount: {
    paddingTop: '20px',
    fontWeight: '500',
  },
  button : {
    backgroundColor: 'darkslategray',
    color:'#ffffff'
  }
}));


const OrderDetails = ({cartItems}) => { 
  const classes = useStyles();

  let orderTotal = 0;
  const itemsForReview = cartItems && cartItems.length > 0 ?
  cartItems?.map((item, index) => {
    orderTotal += item.price * item.count;
    return(
    <div key={`item-${index}`} className={classes.alignItems}>
      <div style={{flex: 4}}>{item.menu_name}</div>
      <div style={{flex: 1}}>{item.count}</div>
      <div style={{flex: 1, textAlign: 'right'}}>{item.price * item.count}</div>
    </div>)
  }) : <>No items in cart</>
  const details = <>
  <div className={classes.heading}>
    1. Review Your Order
  </div>
  <div>{itemsForReview}</div>
  <div className={`${classes.alignItems} ${classes.taxAmount}`}>
    <div>Tax</div><div>${parseFloat((orderTotal * 9.5)/100).toFixed(2)}</div>
    </div>
    <div className={`${classes.alignItems} ${classes.orderTotal}`}>
    <div>Order Total</div><div>${parseFloat(orderTotal).toFixed(2)}</div>
  </div>
  </>

  return details;
}
const UserDetailsForm = () => {
  const classes = useStyles();
  const [userData, setUser] = React.useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipcode: '',
    phone: '',
    email: ''
  })

  const handleDataChange = (key, evt) => {
    let userCopy = {...userData};
    userCopy[key] = evt.target.value
    setUser(userCopy);
  }

  return <>
  <div className={classes.heading}>
    2. Submit your details
  </div>
  <div style={{width: '100%'}}>
    <br/>
    <TextField label="First Name" variant="outlined" size="small" fullWidth 
    value={userData.firstName} onChange={(evt)=> handleDataChange('firstName', evt)}/>
    <br/><br/>
    <TextField label="Last Name" variant="outlined" size="small" fullWidth 
    value={userData.lastName} onChange={(evt)=> handleDataChange('lastName', evt)}/>
    <br/><br/>
    <TextField label="Address" variant="outlined" size="small" fullWidth
    value={userData.address} onChange={(evt)=> handleDataChange('address', evt)}/>
    <br/><br/>
    <TextField label="City" variant="outlined" size="small" fullWidth
    value={userData.city} onChange={(evt)=> handleDataChange('city', evt)}/>
    <br/><br/>
    <TextField label="Phone" variant="outlined" size="small" fullWidth
    value={userData.phone} onChange={(evt)=> handleDataChange('phone', evt)}/>
    <br/><br/>
    <TextField label="Email" variant="outlined" size="small" fullWidth
    value={userData.email} onChange={(evt)=> handleDataChange('email', evt)}/>
    <br/><br/>
    <TextField label="Zip" variant="outlined" size="small" fullWidth
    value={userData.zipcode} onChange={(evt)=> handleDataChange('zipcode', evt)}/>
  </div>
  </>
}

const PaymentDetails = () => {
  const classes = useStyles();
  const [userData, setUser] = React.useState({
    cardNumber: '',
    firstName: '',
    lastName: '',
    zipcode: ''
  })

  const handleDataChange = (key, evt) => {
    let userCopy = {...userData};
    userCopy[key] = evt.target.value
    setUser(userCopy);
  }

  return <>
  <div className={classes.heading}>
    2. Payment details
  </div>
  <div style={{width: '100%'}}>
    <br/>

    <TextField label="Card Number" variant="outlined" size="small" fullWidth
    value={userData.cardNumber} onChange={(evt)=> handleDataChange('cardNumber', evt)}/>
    <br/><br/>
    <TextField label="First Name on Card" variant="outlined" size="small" fullWidth 
    value={userData.firstName} onChange={(evt)=> handleDataChange('firstName', evt)}/>
    <br/><br/>
    <TextField label="Last Name on Card" variant="outlined" size="small" fullWidth 
    value={userData.lastName} onChange={(evt)=> handleDataChange('lastName', evt)}/>
    <br/><br/>    
    <TextField label="Zip" variant="outlined" size="small" fullWidth
    value={userData.zipcode} onChange={(evt)=> handleDataChange('zipcode', evt)}/>
    <br/><br/>

    <Button variant="contained" color="darkslategray" className={classes.button}>
      Make Payment
    </Button>
  </div>
  </>
}

const Checkout = ({cartItems}) => {
    return (<div className={`${commonClass['content']} ${commonClass['checkout-content']}`} >
        <div><OrderDetails cartItems={cartItems}/></div>
        <div><UserDetailsForm /></div>
        <div><PaymentDetails /></div>

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
  
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
  