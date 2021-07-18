import React ,{ useState }from 'react';

import classes from './Login.module.css';

import loginService from '../../../../services/Login-Service';
import {useHistory} from 'react-router-dom';
const Login = (props)=>{
    const [username, setUserName] = useState();
    let history = useHistory();
  const [password, setPassword] = useState();
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const resp = await loginService.authenticate({userName:username,password:password});
        if(resp && resp.status=="Successful"){
            history.push('/admin');
        }
      };
    return (
        <div className={classes['container']}>
            <div className={classes['content']}>

            
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div className={classes['margin-10']}>
          <button  className ={classes['btn-blue']} type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
    )
}
export default Login;