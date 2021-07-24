import RestService from './Rest-Service';
import Endpoints from '../constants/endpoint';
import { push } from 'connected-react-router';

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
    },
    async submitOrder(payload) {
        let url = Endpoints.API+ Endpoints['URLS']["submitOrder"];
        
        return await RestService.postData(url, payload)
        .then(response=>{
            return response;
        }).catch(err=> 
            {
                err.status = 'error';
                return err;
            });
    }
} 
export default MenuService;