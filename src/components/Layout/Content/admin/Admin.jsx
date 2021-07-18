import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
const Admin = (props) => {
  let history = useHistory();
  if (props.user.token.length <= 0) {
    history.push("/login");
  }
  return <div>Admin Works</div>;
};
const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
