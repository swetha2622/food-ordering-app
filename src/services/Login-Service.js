import RestService from './Rest-Service';
import Endpoints from '../constants/endpoint';

const LoginService = {

    async authenticate(data) {
        let url = Endpoints.API+ Endpoints['URLS']["authenticate"];
        
        return await RestService.postData(url,data)
        .then(response=>{
            return response
        });
    }

}
export default LoginService;