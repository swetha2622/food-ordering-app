import React, { useState } from "react";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { asyncFetchOrderStatus, asyncSumbitOrder } from "../../../../redux/actions/index";
import commonClass from '../Content.module.css';
import '../../../../App.css';


const Track = (props) => {
  const [username, setUserName] = useState('');
  const deleteOrder = (order) => {
    const request = {
      ...order,
      Status: 'cancel'  
    }
    props.sumbitOrder(request);
  }
  const handleSubmit = () => {
    if(username !== '') {
      props.fetchOrderStatus(username);
    } else {
      alert('Enter the customer email.');
    }
  }
    return (
    <div className={`${commonClass['content']} ${commonClass['track-content']}`} >
        <form>
          <label for="name"> Enter your email address used while ordering </label>
            <input 
            name="name"
            type="text" 
            style={{width: "100%"}}
            onChange={(e) => setUserName(e.target.value)} 
            value={username}/>
          <br/>
          <br/>
          <Button 
            color='primary' 
            variant='contained'
            onClick={handleSubmit}>
            Submit
            </Button>
          <div>
          </div>
        </form>
        <br/>
        {
          Object.keys(props.orderStatus).length !== 0 &&
          <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}> 
            <div>Order Number: {props.orderStatus.id}</div>  
            <div>Order Status: {props.orderStatus.Status}</div>
            <div>
            <Button aria-label="delete" onClick={()=>deleteOrder(props.orderStatus)} variant="contained" size="small">
              Cancel Order 
              <DeleteIcon fontSize="small"  color="secondary"></DeleteIcon>
            </Button>
            </div>
          </div>
        }
        </div>
        )
    }

const mapStateToProps = (state) => {
    return {
      orderStatus: state.reducer.orderStatus
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchOrderStatus: (request) => dispatch(asyncFetchOrderStatus(request)),
      sumbitOrder: payload => dispatch(asyncSumbitOrder(payload))
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Track);
  