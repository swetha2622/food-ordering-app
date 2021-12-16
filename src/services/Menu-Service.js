import RestService from './Rest-Service';
import Endpoints from '../constants/endpoint';

 const  MenuService ={
    async getMenuList() {
        let url = Endpoints.API+ Endpoints['URLS']["menugroupid"]+'/1';
        
        return await RestService.getData(url)
        .then(response=>{
            return response
        }).catch(err=> 
            {
                err.status = 'error';
                return err;
            });
    },
    async fetchAllItems() {
        let url = Endpoints.API+ Endpoints['URLS']["fetch"];
        
        return await RestService.getData(url)
        .then(response=>{
            return response
        }).catch(err=> 
            {
                err.status = 'error';
                return err;
            });
    },
    async fetchAvailableQuantity() {
        const request = [1,2,3,4,5,6,7,8,9,10]
        let url = Endpoints.API+ Endpoints['URLS']["quantity"];
        console.log("url::"+ url);
        return await RestService.postData(url,request)
        .then(response=>{
            console.log("response::"+ response);
            return response
            
        }).catch(err=> 
            {
                err.status = 'error';
                return err;
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
    },

async submitAvailableQuantity(payload) {
    let url = Endpoints.API+ Endpoints['URLS']["quantityUodate"];
    
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