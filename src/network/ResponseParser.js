import AppUtils from "../utils/AppUtils";
import UserSession from "../utils/UserSession";

export default class ResponseParser{

    static show = (message) => {
        AppUtils.showAlert(''+message)
    }

    static isResponseOk = (response,showAlert = false,navigation = null) =>{
        console.log("status code api: " , response)
        if(AppUtils.isNull(response.statusCode)){
            return false;
        }else if(response.statusCode != 200 ){
            // if(response.statusCode == 401){
            //     // if(!AppUtils.isNull(navigation)){
            //         AppUtils.showAlertWithListener(response.message,{text:'Ok',onPress:()=>{
            //             UserSession.logoutUser()                    
            //             // navigation.navigate('Login')
            //          }})
            //     // }
                
            //     return false;
            // }
            // else if(showAlert){
            //     this.show(response.message) 
            // }
            if(showAlert)
                this.show(response.message) 
            return false
        }else{
            return true
        }
    }

    static isResponseOkUpdate = (response,showAlert = false,navigation = null) =>{
        console.log("status code api : " , response.statusCode)
        if(AppUtils.isNull(response.statusCode)){
            return false;
        }else if(response.statusCode != 200){
            // if(response.statusCode == 401){
            //     // if(!AppUtils.isNull(navigation)){
            //         AppUtils.showAlertWithListener(response.message,{text:'Ok',onPress:()=>{
            //             UserSession.logoutUser()                    
            //             // navigation.navigate('Login')
            //          }})
            //     // }
                
            //     return false;
            // }
            // if(response.statusCode === 901){
            //     if(!AppUtils.isNull(navigation)){
            //         AppUtils.showAlertWithListener(response.message,{text:'Ok',onPress:()=>{
            //             UserSession.logoutUser()                    
            //             navigation.navigate('AuthLoading')
            //          }})
            //     }
                
            //     return false;
            // }else if(showAlert){
            //     this.show(response.message) 
            // }
            // if(showAlert)
                // this.show(response.message + 'ggdgd') 
            return true
        }else{
            return true
        }
    }
}