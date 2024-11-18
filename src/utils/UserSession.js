import { getCount } from 'react-native-contacts';
import AppUtils from './AppUtils';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserSession {
  static async setApiVersion(data) {
    if (Platform.OS == 'ios') {
      AsyncStorage.setItem('AppVersion', data.ios_version);
    } else if (Platform.OS == 'android') {
      AsyncStorage.setItem('AppVersion', data.android_version);
      //  console.log("ijedij" , await AsyncStorage.getItem('AppVersion'))
    }
  }

  static async setAppName(data) {
    AsyncStorage.setItem('AppName', data.app_name);
  }

  static async getAppVersion() {
    return await AsyncStorage.getItem('AppVersion');
  }

  static async getAppName() {
    return await AsyncStorage.getItem('AppName');
  }

  static async getFranchiseUrl() {
    return await AsyncStorage.getItem('getFranchiseUrl');
  }

  static setFranchiseUrl(franchiseUrl) {
    AsyncStorage.setItem('getFranchiseUrl', franchiseUrl);
  }

  static setLoggedIn(loggedInStatus) {
    AsyncStorage.setItem('UserLoggedIn', loggedInStatus);
  }

  static setSubscriptionIn(subscriptionStatus) {
    AsyncStorage.setItem('setSubscriptionIn', subscriptionStatus);
  }
  static async isSubscriptionDone() {
    let subscriptionStatus = await AsyncStorage.getItem('setSubscriptionIn');
    let value =
      !AppUtils.isNull(subscriptionStatus) && subscriptionStatus == 'true';
    console.log(`Subscription Status: ${value}`);
    return value;
  }

  static async isLoggedIn() {
    let loggedInStatus = await AsyncStorage.getItem('UserLoggedIn');
    let value = !AppUtils.isNull(loggedInStatus) && loggedInStatus == 'true';
    console.log(`LoggedIn Status: ${value}`);
    return value;
  }

  // static saveLoginResponse(data) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       console.log(`saving user data: ${JSON.stringify(data)}`);
  //       AsyncStorage.setItem('UserData', JSON.stringify(data))
  //         .then((res) => {
  //           console.log('====================================');
  //           console.log('user data saved success', res);
  //           console.log('====================================');
  //         })
  //         .catch((err) => {
  //           console.log('save userdata err ', err);
  //         });
  //       resolve('');
  //     } catch (error) {
  //       console.log(`saveLoginResponse: ${error}`);
  //       reject(error);
  //     }
  //   });
  // }
  static saveLoginResponse(data) {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.setItem('UserData', JSON.stringify(data))
          .then(() => {
            console.log('User data saved successfully');
            resolve(data); // Resolve with the saved data
          })
          .catch((err) => {
            console.log('Save userdata error:', err);
            reject(err);
          });
      } catch (error) {
        console.log(`saveLoginResponse error: ${error}`);
        reject(error);
      }
    });
  }
  static getUserSessionData() {
    // console.log('get user data from async at API calling',res)
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('UserData')
        .then(async (res) => {
          if (res) {
            var myUserData = await JSON.parse(res);
            if (myUserData) {
              resolve(myUserData);
            } else {
              resolve('');
            }
          } else {
            resolve('');
          }
        })
        .catch((error) => {
          console.log('====================================');
          console.log('error async storage', err);
          console.log('====================================');
          reject(error);
        });
    });
  }

  static saveProfileResponse(data) {
    return new Promise((resolve, reject) => {
      try {
        console.log(`UserProfileData: ${JSON.stringify(data)}`);
        AsyncStorage.setItem('UserProfileData', JSON.stringify(data));
        resolve('');
      } catch (error) {
        console.log(`UserProfileDataErr: ${error}`);
        reject(error);
      }
    });
  }

  static getProfileResponse() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('UserProfileData')
        .then((res) => {
          if (res) {
            var myUserData = JSON.parse(res);
            if (myUserData) {
              resolve(myUserData);
            }
          } else {
            resolve('');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static logoutUser() {
    this.setLoggedIn('');
    AsyncStorage.setItem('UserData', '');
    this.setSubscriptionIn('');
    this.saveReferEarnCode('');
  }

  static saveCartCount(data) {
    return new Promise((resolve, reject) => {
    
      try {
        console.log(`SaveCartCount: ${JSON.stringify(data)}`);
        if (AppUtils.isNull(data)) {
          reject('save cart count data is null');
          return;
        } else {
          AsyncStorage.setItem('SaveCartCount', JSON.stringify(data));
          resolve('');
        }
      } catch (error) {
        console.log(`SaveCartCount: ${error}`);
        reject(error);
      }
    });
  }

  static getCartCount() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('SaveCartCount')
        .then((res) => {
          console.log('getCartCountPrefs', '' + res);
          if (res) {
            var cartcountData = JSON.parse(res);
            if (cartcountData) {
              resolve(cartcountData);
            } else {
              resolve('0');
            }
          } else {
            resolve('');
          }
        })
        .catch((error) => {
          console.log('getCartCountPrefs ', '' + error);
          reject(error);
        });
    });
  }

  static saveReferEarnCode(data) {
    return new Promise((resolve, reject) => {
      try {
        console.log(`saveReferEarnCode: ${JSON.stringify(data)}`);
        if (AppUtils.isNull(data)) {
          reject('');
          return;
        } else {
          AsyncStorage.setItem('saveReferEarnCode', JSON.stringify(data));
          resolve('');
        }
      } catch (error) {
        console.log(`saveReferEarnCode: ${error}`);
        reject(error);
      }
    });
  }

  static getReferEarnCode() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('saveReferEarnCode')
        .then((res) => {
          console.log('getsaveReferEarnCode', '' + res);
          if (res) {
            var cartcountData = JSON.parse(res);
            if (cartcountData) {
              resolve(cartcountData);
            } else {
              resolve('');
            }
          } else {
            resolve('');
          }
        })
        .catch((error) => {
          console.log('getsaveReferEarnCode ', '' + error);
          reject(error);
        });
    });
  }
}
