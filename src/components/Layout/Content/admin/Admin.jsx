import React, { useEffect } from "react";
import { connect } from "react-redux";
import { asyncGetAllOrders, asyncSumbitOrder } from "../../../../redux/actions/index";
import AdminAccordion from './Accordion';

const Admin = (props) => {
  useEffect(() => {
    props.asyncGetAllOrders();
  }, []);

  return <div style={{minHeight: '85vh'}}>
    <AdminAccordion orders={props.orders} asyncSumbitOrder={props.asyncSumbitOrder}/>
  </div>;
};
const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    orders: state.adminReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    asyncGetAllOrders: (payload) => dispatch(asyncGetAllOrders(payload)),
    asyncSumbitOrder: payload => dispatch(asyncSumbitOrder(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
