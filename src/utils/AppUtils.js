import AppStrings from './AppStrings';
import {
  Alert,
  Dimensions,
  Platform,
  NativeModules,
  Linking,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import moment from 'moment';
// import SpInAppUpdates, {
//     IAUUpdateKind,
// } from 'sp-react-native-in-app-updates';

import DeviceInfo from 'react-native-device-info';

export default class AppUtils {
  static isNull = (data) => {
    return (
      typeof data === 'undefined' ||
      data === null ||
      data === '' ||
      data.toString().trim() === '' ||
      data.toString().trim().length == 0
    );
  };

  static isNumeric = (data) => {
    try {
      return Number.isInteger(data);
    } catch (error) {
      console.log('error', error);
    }
    return false;
  };

  static getCurrentDateTime() {
    return moment().format('YYYY-MM-DD');
  }

  static isEmpty = (data) => {
    return !(Array.isArray(data) && data.length !== 0);
  };
  /**
   * check for provided variable is object or not
   */
  static isObject = (val) => {
    try {
      return val.constructor === {}.constructor;
    } catch (error) {
      return false;
    }
  };

  static validateToDecimalValue(value) {
    console.log(`validateToDecimalValue ${value.toString()} `);
    if (!this.isNull(value.toString())) {
      if (value.toString().lastIndexOf('00', 0) === 0) {
        return false;
      } else if (value.toString().lastIndexOf('..', 0) === 0) {
        return false;
      } else if (value.toString().indexOf('..') > -1) {
        return false;
      } else if (/\d+(\.\d{1,6})?$/.test(value.toString())) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  static isValidEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static addCurrencySymbole(amount) {
    let symbol = AppStrings.currency_symbol;
    try {
      if (this.isNull(amount)) {
        return '0';
      }
      return `${symbol}${amount}`;
    } catch (error) {
      return '0';
    }
  }

  static showAlert(msg) {
    return Alert.alert(AppStrings.AppName, msg, [{ text: 'OK' }]);
  }

  static showAlertWithListener(msg, listener) {
    return Alert.alert(AppStrings.AppName, msg, [listener]);
  }

  static showAlertForPermission() {
    return Alert.alert(
      AppStrings.AppName,
      AppStrings.AppName +
        " does not have access to your camera. To enable access, tap settings and turn on permission.",
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Settings',
          onPress: () => {
            if (this.isIOS()) {
              this.openURL('app-settings:');
            } else {
              //    UtilModule.openAndroidAppSetting()
            }
          },
        },
      ]
    );
  }

  static showAlertYesNo(title, msg, yesObject) {
    return Alert.alert(
      title,
      msg,
      [
        {
          text: AppStrings.No,
          onPress: () => {},
        },
        yesObject,
      ],
      { cancelable: false }
    );
  }

  static getDeviceWidth() {
    return width;
  }

  static getDeviceHeight() {
    return height;
  }

  static isIOS() {
    return Platform.OS == 'ios';
  }

  static getAppViewWidth() {
    return this.getDeviceWidth() - 70;
  }

  static showNotificationLocal(data) {
    if (!this.isNull(data) && data.message) {
      if (this.isIOS()) {
        // const details = { alertTitle: data.title, alertBody: data.message };
        // PushNotificationIOS.presentLocalNotification(details);
      } else {
        //    UtilModule.showLocalNotification(data.title, data.message)
      }
    }
  }

  static openURL(url = '') {
    Linking.openURL(url);
  }

  static showCommingSoonDialog() {
    this.showAlert('Coming Soon.');
  }

  static datePickerToFormatedDate(date) {
    //var ds = date.toString();
    if (this.isNull(date)) {
      return '';
    }
    var date = moment(new Date(date));
    let selectDate = date.format(AppStrings.date_format_for_sql);
    return selectDate;
  }

  static formatedDateToDatePickerDate(date) {
    //let tempDate =
    return this.isNull(date)
      ? new Date()
      : moment(date, AppStrings.date_format).toDate();
  }
  static formatedDateToDatePickerDate1(date) {
    //let tempDate =
    return this.isNull(date) ? new Date() : moment(date, 'YYYY-MM-DD').toDate();
  }

  static checkAppUpdate() {
    // const inAppUpdates = new SpInAppUpdates(false);
    // inAppUpdates.checkNeedsUpdate().then((result) => {
    //     if (result.shouldUpdate) {
    //         let updateOptions = "";
    //         if (Platform.OS === 'android') {
    //             updateOptions = {
    //                 updateType: IAUUpdateKind.IMMEDIATE,
    //             };
    //         }
    //         inAppUpdates.startUpdate(updateOptions);
    //     }
    // }).catch(err => {
    //     //alert(''+err)
    // });
  }

  static getImageURLDynamic(imageURL) {
    //return imageURL+'?random_number='+Date().toString()
    return imageURL;
  }
  static getBuildNumber() {
    return DeviceInfo.getVersion();
  }
}
