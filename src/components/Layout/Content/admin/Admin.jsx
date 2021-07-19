import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { asyncGetAllOrders } from "../../../../redux/actions/index";
const Admin = (props) => {
  let history = useHistory();
  if (props.user.token.length <= 0) {
    history.push("/login");
  }
  useEffect(() => {
    props.asyncGetAllOrders();
  });
  return <div>Admin Works</div>;
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
