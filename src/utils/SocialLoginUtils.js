// import { LoginManager, AccessToken, GraphRequestManager, GraphRequest, } from 'react-native-fbsdk';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

export default class SocialLoginUtils{
    static doGoogleLogin(onSuccess, onFailer){

    }

    static doFacebookLogin(onSuccess, onFailer){
        // LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        //     function (result) {
        //       if (result.isCancelled) {
        //         onFailer('Login Cancelled')
        //         console.log("==> Login cancelled");
        //       } else {
        
        //         const infoRequest = new GraphRequest('/me', {
        //           parameters: {
        //             fields: {
        //               string: 'first_name,last_name,email',
        //             }
        //           }
        //         }, (error, result) => {
        //           if (error) {
        //             onFailer(error.toString())
        //             console.log('Error fetching data: ' + error.toString());
        //           } else {
        //             onSuccess(result)
        //             console.log('Success fetching data: ' + JSON.stringify(result));
        //           }
        //         });
        //         new GraphRequestManager().addRequest(infoRequest).start();
        //       }
        //     },
        //     function (error) {
        //         onFailer(error.toString())
        //       console.log("==> Login fail with error: " + error);
        //     }
        //   );
    }
}