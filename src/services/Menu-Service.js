import RestService from './Rest-Service';
import Endpoints from '../constants/endpoint';
 const  MenuService ={
    async getMenuList() {
        let url = Endpoints.API+ Endpoints['URLS']["menugroupid"]+'/1';
        
        return await RestService.getData(url)
        .then(response=>{
            return response
        });
    },
    async fetchAllItems() {
        let url = Endpoints.API+ Endpoints['URLS']["fetch"];
        
        return await RestService.getData(url)
        .then(response=>{
            return response
        });
    }
} 
export default MenuService;