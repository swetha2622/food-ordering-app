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
    props.sumbitOrder(request, username);
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
        
          <div style={{width: "80%", 
          display: "flex", 
          flexDirection: "column", 
          // justifyContent: "space-evenly", 
          // alignItems: "center",
          backgroundColor: "white", 
          color: "black"}}>
            {
              props.orderStatus.length > 0 && 
              <div style={{
                display: "flex", 
                flexDirection: "row",
                justifyContent: "center", 
                alignItems: "center",
                fontWeight: "bold "
                }}> 
                {
                ['Order Id', 'Status', 'Items', 'Action']
                .map(heading => 
                  <div style={{ 
                    display: "flex",
                    flex: "1"}}>
                      {heading}
                  </div> 
                  )
                  }
              </div>
            }
            
            {
          props.orderStatus.length !== 0 &&
          props.orderStatus.map(orderStatus => {
          return (
          <div style={{
            // width: "100%", 
          display: "flex", 
          flexDirection: "row",
          justifyContent: "center", 
          alignItems: "center",
          }}> 
            <div style={{ 
          display: "flex",
          textAlign: "center",
          flex: "1"}}>
            {orderStatus.id}</div>  
            <div style={{ 
          display: "flex",
          flex: "1"}}>
            {orderStatus.Status}</div>
          <div style={{ 
          display: "flex",
          flex: "1"}}>
              <ul>{orderStatus.orders.map(order => <li>{order.orderName}</li>)}</ul>
          </div>
            <div style={{ 
          display: "flex",
          flex: "1"}}>
              {orderStatus.Status === 'initial' &&
            <Button aria-label="delete" onClick={()=>deleteOrder(orderStatus)} variant="contained" size="small">
              Cancel Order 
              <DeleteIcon fontSize="small"  color="secondary"></DeleteIcon>
            </Button>
          }
          </div>
            </div>)
      })  
        }
        </div>
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
      sumbitOrder: (payload, email) => dispatch(asyncSumbitOrder(payload, email))
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Track);
  