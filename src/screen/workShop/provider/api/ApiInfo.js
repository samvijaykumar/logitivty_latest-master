/* eslint-disable prettier/prettier */
import NetInfo from "@react-native-community/netinfo";
// import { async_keys, getData } from "./UserPreference";
import axios from "axios";
import { Alert } from "react-native";

class ApiContainer {
  BASE_URL = "https://demo.sgvproject.in/longetivity/api/V6/";
  // BASE_URL = 'https://testing.13198102.com/lxryshared/api/';

  createFormData = (params) => {
    const formData = new FormData();
    for (const key in params) {
      formData.append(key, params[key]);
    }
    return formData;
  };

  createRawData = (params) => {
    const raw = JSON.stringify(params);
    return raw;
  };

  getApi = async (url, status) => {
    // const token = await getData(async_keys.auth_token);
    return new Promise(async (resolve, reject) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          // if (status != 1) {z
          //   global.props.showLoader();
          // }
          const requestOption = {
            method: "GET",
            headers: {
              // 'Cache-Control': 'no-cache, no-store, must-revalidate',
              // Pragma: 'no-cache',
              // Expires: 0,
              // Accept: 'application/json',
              // 'Content-Type': 'multipart/form-data',
              // 'X-API-KEY': 1234567890,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
          // if (token) {
          //   requestOption.headers["Authorization"] = `Bearer ${token || ""}`;
          // }
          fetch(this.BASE_URL + url)
            .then(async (response) => {
              console.log("get-api-before-jsonss", response);
              const { status } = response;
              if (status !== 200) {
                return reject(await response.json());
              } else {
                const res = await response.json();
                return resolve(res);
                // return response.json();
              }
            })
            .then((obj) => {
              // global.props.hideLoader();
              return resolve(obj);
            })
            .catch((error) => {
              // global.props.hideLoader();
              return reject(error);
            });
        } else {
          // global.props.hideLoader();
          return reject("noNetwork");
        }
      });
    });
  };
  postApi = async (url, data, header, obj) => {
    // const token = await getData(async_keys.auth_token);
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          // if (status != 1) {
          //   // global.props.showLoader();
          // }
          var headers = header || {
            "Content-Type": "application/json", // Change the content type if needed
          };
          // if (token) {
          //   headers.Authorization = `Bearer ${token}`;
          // }
          // global.props.showLoader();
          // fetch(this.BASE_URL + url, {
          //   method: 'POST',
          //   headers: myHeaders,
          //   body: data,
          // })
          //   .then(response => {
          //     console.log('response', response);
          //     response.json();
          //   })
          //   .then(obj => {
          //     global.props.hideLoader();
          //     resolve(obj);
          //   })
          //   .catch(error => {
          //     global.props.hideLoader();
          //     reject(error);
          //   });
          axios({
            method: "POST", // Change the method according to your API endpoint
            url: this.BASE_URL + url,
            data,
            headers,
          })
            .then((obj) => {
              console.log("API_INFO PPPPPPPPPP", { url, obj, data, headers });
              // global.props.hideLoader();
              resolve(obj);
            })
            .catch((error) => {
              // console.log('API_INFO-catch', {url});
              console.log("API_INFO-catch ll", { url, error, data, headers });
              // global.props.hideLoader();
              reject(error?.response || error);
            });
        } else {
          // global.props.hideLoader();
          reject("noNetwork");
          Alert.alert("", "No Internate");
        }
      });
    });
  };
  putApi = async (url, data, status) => {
    const token = await getData(async_keys.auth_token);
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          // if (status != 1) {
          //   global.props.showLoader();
          // }
          var headers = {
            "Content-Type": "application/json", // Change the content type if needed
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
          axios({
            method: "PUT", // Change the method according to your API endpoint
            url: this.BASE_URL + url,
            data,
            headers,
          })
            .then((obj) => {
              console.log("API-INFO", {
                url,
                obj,
              });
              // global.props.hideLoader();
              resolve(obj);
            })
            .catch((error) => {
              console.log("API-INFO--catch", {
                url,
                error,
              });
              // global.props.hideLoader();
              reject(error?.response || error);
            });
        } else {
          // global.props.hideLoader();
          reject("Network Error");
        }
      });
    });
  };
  deleteApi = async (url, status) => {
    const token = await getData(async_keys.auth_token);
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          // if (status != 1) {
          //   global.props.showLoader();
          // }
          var headers = {
            "Content-Type": "application/json",
            Accept: "application/json", // Change the content type if needed
          };
          if (token) {
            headers["Authorization"] = `Bearer ${token || ""}`;
          }
          axios({
            method: "DELETE", // Change the method according to your API endpoint
            url: this.BASE_URL + url,
            headers,
          })
            .then((obj) => {
              console.log("API-INFO", {
                url,
                obj,
              });
              // global.props.hideLoader();
              resolve(obj);
            })
            .catch((error) => {
              console.log("API-INFO--catch", {
                url,
                error,
              });
              // global.props.hideLoader();
              reject(error?.response || error);
            });
        } else {
          // global.props.hideLoader();
          reject("Network Error");
        }
      });
    });
  };
}
//--------------------------- Config Provider End -----------------------
export const apifuntion = new ApiContainer();
