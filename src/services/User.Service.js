import RestService from "./Rest-Service";
import Endpoints from "../constants/endpoint";
const UserService = {
    async fetchOrderStatus(emailId) {
        let url = Endpoints.API+ Endpoints['URLS']["fetchOrderStatus"] + '/?emailID=' + emailId.trim();
        
        return await RestService.getData(url)
        .then(response=>{
            return response
        });
    },
}

export default UserService;