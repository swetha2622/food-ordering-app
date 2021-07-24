import RestService from "./Rest-Service";
import Endpoints from "../constants/endpoint";
const AdminService = {
    async fetchAllOrders() {
        let url = Endpoints.API+ Endpoints['URLS']["fetchallorders"];
        
        return await RestService.getData(url)
        .then(response=>{
            return response
        });
    },
}

export default AdminService;