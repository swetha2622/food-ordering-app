import RestService from './Rest-Service';
import Endpoints from '../constants/endpoint';

const LoginService = {

    async authenticate(data) {
        let url = Endpoints.API+ Endpoints['URLS']["authenticate"];
        
        return await RestService.postData(url,data)
        .then(response=>{
            return response
        }).catch(err=> 
        {
            err.status = 'error';
            return err;
        });
    },

    async signup(data) {
        let url = Endpoints.API+ Endpoints['URLS']["signup"];
        
        return await RestService.postData(url,data)
        .then(response=>{
            alert('SignUp had succesfully.');
            return response
        }).catch(err=> 
        {
            alert('SignUp is unsuccesfully.');
            err.status = 'error';
            return err;
        });
    }

}
export default LoginService;