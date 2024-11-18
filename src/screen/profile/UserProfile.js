import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Linking,Text } from 'react-native';
import AppColors from '../../utils/AppColors';
import FlowWrapView from '../../widgets/FlowWrapView';
import { connectWithConsumer, connectWithContext } from '../../container';
import { Card, Image } from 'react-native-elements';
import ResourceUtils from '../../utils/ResourceUtils';
import TextViewMedium from '../../widgets/TextViewMedium';
import AppUtils from '../../utils/AppUtils';
import TextViewNormal from '../../widgets/TextViewNormal';
import UserSession from '../../utils/UserSession';
import AppStrings from "../../utils/AppStrings";
import TopImageView from '../../widgets/TopImageView';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import UserProfileContextProvider, {
  UserProfileContextConsumer,
} from '../../context/UserProfileContext';
import { GlobalContextConsumer } from '../../context/GlobalContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownView from '../../widgets/DropDownView';
import { MenuProvider } from 'react-native-popup-menu';
import ImagePickerDailoge from "../../widgets/ImagePickerDailoge";
import DateTimePickerView from '../../widgets/DateTimePickerView';
import DOBPickerDialoge from "../../widgets/DOBPickerDialoge";
import moment from "moment";
import { Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS, request, openSettings } from 'react-native-permissions';
import TopBackArrowView from '../../widgets/TopBackArrowView';
import { height, width } from '../../NewModule/Stacks/utils/Dimensions';

let currentDate = '';
//let changeCurrentDate = '';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      email: '',
      mobile_no: '',
      subscriptionPlan: '',
      userId: '',
      _imageUrl: '',
      cityList: [],
      selectedCity: {},
      stateList: [],
      selectedState: {},
      cityName: '',
      stateName: '',
      stateId: '',
      cityId: '',
      staticStateId: '',
      staticCityId: '',
      gender: '',
      dob: '',
      tempStateList: [],
      isDialogVisible: false,

      isDateTimeVisibleDate: false,
      newStateList: [],
      newCityList: [],
      _searchCity: '',
      _searchState: '',
      changeCurrentDate: ''
    };
  }
  async componentDidMount() {
    try {
      let data = await UserSession.getUserSessionData();
      console.log('use data', data);  
      this.setState({
        full_name: data.full_name,
        email: data.email,
        mobile_no: data.mobile_no,
        _imageUrl: data.avatar,
        stateId: data.profile.state_id,
        cityId: data.profile.state_city_id,
        gender: data.profile.gender,
      });
  
      console.log('UserP', data);
      this.props.userProfileProps.getUserProfileApiCall({});
      this.props.userProfileProps.stateListApiCall({});
    } catch (error) {
      console.error('Error in componentDidMount:', error);
    }
  }
  

  showHideStartDatePicker = async (show) => {
    this.setState({ isDateTimeVisibleDate: show });
  };

  handleStartDatePicker = async (selectedDate) => {
    if (!AppUtils.isNull(selectedDate)) {
      this.setState({
        dob: AppUtils.datePickerToFormatedDate(selectedDate),
      });
    }
    this.showHideStartDatePicker(false);
  };

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.userProfileProps.loading !== this.props.userProfileProps.loading &&
      !this.props.userProfileProps.loading
    ) {
      let response = this.props.userProfileProps.userProfileResponse;
      console.log(`userProfile: ${JSON.stringify(response)}`);
      this.props.userProfileProps.set({ loading: false });
      this.setState({
        full_name: response.full_name,
        email: response.email,
        mobile_no: response.mobile_no,
        _imageUrl: response.avatar,
        stateName: response.profile.state.state_name,
        cityName: response.profile.city.city_name,
        stateId: response.profile.state.id,
        cityId: response.profile.city.id,
        staticStateId: response.profile.state.id,
        staticCityId: response.profile.city.id,
        gender: response.profile.gender,
        dob: response.profile.dob,
        subscriptionPlan: {
          date: response.profile.subscription_end_date,
          title: response.profile.subscription_details.title,
          color: response.profile.subscription_details.color_code,
          plan_amount: response.profile.subscription_details.plan_amount,
        },
      });
      currentDate = AppUtils.formatedDateToDatePickerDate1(response.profile.dob);
      console.log('currentDate', currentDate);
      let data = {
        state_id: response.profile.state.id,
      };

      await this.props.userProfileProps.cityListApiCall(data);
    }

    if (
      prevs.userProfileProps.loadingUpdate !==
      this.props.userProfileProps.loadingUpdate &&
      !this.props.userProfileProps.loadingUpdate
    ) {
      let response = this.props.userProfileProps.userEditResponse;
      this.props.userProfileProps.set({ loadingUpdate: false });

      if (!AppUtils.isNull(response) && !AppUtils.isNull(response.message)) {
        let data = await UserSession.getUserSessionData();
        data.full_name = this.state.full_name;
        data.email = this.state.email;

        await UserSession.saveLoginResponse(data);

        AppUtils.showAlertWithListener(response.message, {
          text: 'Ok',
          onPress: () => {
            this.props.navigation.goBack();
            this.props.globalProps?.dataChanged();
          },
        });
      } else {
        AppUtils.showAlert('Something went wrong.' + JSON.stringify(response));
      }
    }
    if (
      prevs.userProfileProps.loadingUploadImage !==
      this.props.userProfileProps.loadingUploadImage &&
      !this.props.userProfileProps.loadingUploadImage
    ) {
      let response = this.props.userProfileProps.userProfileImageResponse;
      console.log(`userProfileImage: ${JSON.stringify(response)}`);

      if (response.statusCode == 200) {
        this.props.userProfileProps.set({ loadingUploadImage: false });

        let data = await UserSession.getUserSessionData();
        data.full_name = this.state.full_name;
        data.email = this.state.email;
        data.avatar = this.state._imageUrl;

        await UserSession.saveLoginResponse(data);

        AppUtils.showAlertWithListener(response.message, {
          text: 'Ok',
          onPress: () => {
            this.props.globalProps?.dataChanged();
          },
        });
      }
    }

    if (
      prevs.userProfileProps.loadingState !==
      this.props.userProfileProps.loadingState &&
      !this.props.userProfileProps.loadingState
    ) {
      this.props.userProfileProps.set({ loadingState: false });

      let response = this.props.userProfileProps.responseState;
      console.log(`state list res: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        console.log('state list data', response.data);
        this.setState({ tempStateList: [], newStateList: [] });
        if (response.data.length > 0) {
          response.data.forEach(async (element) => {
            let d = { name: element.state_name, id: element.id };
            this.state.tempStateList.push(d);
            this.state.newStateList.push(d);
          });
          await this.setState({
            stateList: this.state.tempStateList,
            newStateList: this.state.newStateList,
            cityList: [],
          });
        }
      }
    }
    if (
      prevs.userProfileProps.loadingCity !==
      this.props.userProfileProps.loadingCity &&
      !this.props.userProfileProps.loadingCity
    ) {
      let response = this.props.userProfileProps.responseCity;
      if (response.statusCode == 200) {
        if (response.data.length > 0) {
          let tempCityList = [];
          this.setState({ newCityList: [] })
          console.log('cityProps', response.data);
          response.data.forEach(async (element) => {
            let d = { name: element.city_name, id: element.id };
            tempCityList.push(d);
            this.state.newCityList.push(d);
          });
          this.setState({
            cityList: tempCityList, newCityList: this.state.newCityList
          });
        }
      }
    }
  }


  // checkPermission = () => {
  //   if (AppUtils.isIOS()) {

  //     check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
  //       .then(result => {
          
  //         // alert(JSON.stringify(result))
  //         switch (result) {
  //           case RESULTS.UNAVAILABLE:
  //             console.log('UNAVAILABLE');
  //             this.requestPermission()
  //             //this.cameraSelect()

  //             break;
  //           case RESULTS.DENIED:
  //             console.log('Denied');
  //             this.requestPermission()
  //             break;
  //           case RESULTS.GRANTED:
  //             console.log('Granted');
  //             this.cameraSelect()
  //             break;
  //           case RESULTS.LIMITED:
  //             console.log('limited');
  //             this.cameraSelect()
  //             break;
  //           case RESULTS.BLOCKED:
  //             console.log('Blocked');
  //             //this.requestPermission()
  //             setTimeout(() => {

  //               AppUtils.showAlertYesNo('Longevityclub', "App needs your permission to access your camera to upload profile.", {
  //                 text: 'Ok',
  //                 onPress: () => {
  //                   openSettings();
  //                 },
  //               })

  //             }, 100);
  //             break;

  //         }
  //       })
  //       .catch(error => {
  //         alert(error)
  //         this.requestPermission()
  //       });
  //   } else {
  //     this.cameraSelect();

  //   }

  // }

  // requestPermission = () => {
  //   request(AppUtils.isIOS() ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
  //     this.cameraSelect();
  //   });
  // }
  checkPermission = () => {
    check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        if (result === RESULTS.GRANTED) {
          // Permission granted, open the camera
          this.cameraSelect();
        } else {
          // Request permission if not already granted
          this.requestPermission();
        }
      })
      .catch(error => console.error('Error checking permission:', error));
  };
  
  requestPermission = () => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        if (result === RESULTS.GRANTED) {
          this.cameraSelect();
        } else {
          console.log('Camera permission denied');
        }
      })
      .catch(error => console.error('Error requesting permission:', error));
  };
  
  // cameraSelect() {
  //   const options = {
  //     rotation: 90,
  //     maxWidth: 300,
  //     maxHeight: 300,
  //     quality: 0.5,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   launchCamera(options, (response) => {
  //     console.log('Response = ', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.errorCode == 'camera_unavailable') {
  //       console.log('ImagePicker Error: ', response);
  //     }
  //     else if (response.errorCode == 'permission') {
  //       console.log('ImagePicker Error: ', response);
  //       if (Platform.OS == 'ios') {
  //         setTimeout(() => {
  //           AppUtils.showAlertForPermission();
  //         }, 1000);
  //       }
  //     }
  //     else {
  //       console.log('Image uri ', response.assets[0].uri);
  //       this.setState({
  //         _imageUrl: response.assets[0].uri,
  //       });

  //       var photo = {
  //         uri: response.assets[0].uri,
  //         type: response.assets[0].type,
  //         name: response.assets[0].fileName,
  //       };

  //       var form = new FormData();
  //       form.append('image', photo);
  //       console.log(`Profile Image ${JSON.stringify(form)}`);
  //       this.props.userProfileProps.uploadImageApi(form);
  //     }
  //   });
  // }

  cameraSelect = () => {
    const options = {
      mediaType: 'photo',
      rotation: 90,
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.5,
      saveToPhotos: true,
    };
  
    console.log('Attempting to launch camera...');
    launchCamera(options, (response) => {
      console.log('Camera response:', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorCode, response.errorMessage);
        if (response.errorCode === 'camera_unavailable') {
          console.log('Camera not available on this device');
        } else if (response.errorCode === 'permission') {
          console.log('Camera permission issue');
          if (Platform.OS === 'ios') {
            setTimeout(() => {
              AppUtils.showAlertForPermission();
            }, 1000);
          }
        }
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        console.log('Image URI:', imageUri);
        this.setState({ _imageUrl: imageUri });
  
        const photo = {
          uri: imageUri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
  
        const form = new FormData();
        form.append('image', photo);
        console.log(`Profile Image Form Data: ${JSON.stringify(form)}`);
        this.props.userProfileProps.uploadImageApi(form);
      } else {
        console.log('Unexpected response structure:', response);
      }
    });
  };
  

  imgGallerySelect() {
    const options = {
      rotation: 90,
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    this.setState({ isDialogVisible: false });
    setTimeout(() => {
      launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else {
          console.log('Image uri ', response.assets[0].uri);
          this.setState({
            _imageUrl: response.assets[0].uri,
          });
          var photo = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };

          var form = new FormData();
          form.append('image', photo);
          console.log(`Profile Image ${JSON.stringify(form)}`);
          this.props.userProfileProps.uploadImageApi(form);
        }
      });
    }, 100);
  }

  closeDateDialog = () => {
    this.setState({ isDateTimeVisibleDate: false });
  };

  dialogOpen = () => {
    this.setState({ isDateTimeVisibleDate: true });
  };

  closeDialog = () => {
    this.setState({ isDialogVisible: false });
  };
  imgSelect() {
    this.setState({ isDialogVisible: true });
    //     const options = {
    //         title: 'Upload Profile Photo',
    //         rotation: 360,
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };

    //     /**
    //      * The first arg is the options object for customization (it can also be null or omitted for default options),
    //      * The second arg is the callback which sends object: response (more info in the API Reference)
    //      */
    //     // ImagePicker.showImagePicker(options, (response) => {
    //     //     console.log('Response = ', response);
    //     //     // const { originalRotation } = response
    //     //     // console.log('originalRotation = ', originalRotation);
    //     //     // if (originalRotation === 90) {
    //     //     //     setOriginalRotation(90)
    //     //     // } else if (originalRotation === 270) {
    //     //     //     setOriginalRotation(-90)

    //     //     // }
    //     //     //   setSelectedImageFile(response);

    //     //     //   if (response && response.height === 3000) {
    //     //     //     setLandscape(true)
    //     //     //   }
    //     //     if (response.didCancel) {
    //     //         console.log('User cancelled image picker');
    //     //     } else if (response.error) {
    //     //         console.log('ImagePicker Error: ', response.error);
    //     //     } else if (response.customButton) {
    //     //         console.log('User tapped custom button: ', response.customButton);
    //     //     } else {
    //     //         //const source = { uri: response.uri };
    //     //         // You can also display the image using data:
    //     //         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //     //         console.log('Image uri ', response.uri);
    //     //         this.setState({
    //     //             _imageUrl: response.uri,
    //     //         });
    //     //         var photo = {
    //     //             // uri:Platform.OS=='ios'?_imageUrl.replace("file://", "/private"):_imageUrl ,
    //     //             uri: response.uri,
    //     //             type: 'image/jpeg',
    //     //             name: 'photo.jpg',
    //     //         };

    //     //         var form = new FormData();
    //     //         form.append('image', photo);
    //     //         console.log(`Profile Image ${JSON.stringify(form)}`);
    //     //         this.props.userProfileProps.uploadImageApi(form);
    //     //     }
    //     // });
  }

  async getCites(StateId) {
    var data = {
      state_id: StateId,
    };
    await this.setState({ cityList: [], cityName: '', cityId: '', stateList: this.state.newStateList });
    this.props.userProfileProps.cityListApiCall(data);
  }

  doStateSearch = (_searchState) => {
    if (!AppUtils.isNull(this.state._searchState)) {
      console.log('Statename', this.state.newStateList)

      this.setState({ stateList: this.state.newStateList.filter(item => !AppUtils.isNull(item.name)).filter(item => item.name.toLowerCase().includes(this.state._searchState.toLowerCase())) });

    } else {

      this.setState({ stateList: this.state.newStateList });
    }
  }
  doCitySearch = (_searchCity) => {
    if (!AppUtils.isNull(this.state._searchCity)) {
      console.log('cityname', this.state.newCityList)

      this.setState({ cityList: this.state.newCityList.filter(item => !AppUtils.isNull(item.name)).filter(item => item.name.toLowerCase().includes(this.state._searchCity.toLowerCase())) });

    } else {

      this.setState({ cityList: this.state.newCityList });
    }
  }


  render() {
    const {
      full_name,
      email,
      mobile_no,
      subscriptionPlan,
      _imageUrl,
      cityList,
      selectedCity,
      stateList,
      selectedState,
      cityName,
      stateName,
      stateId,
      cityId,
      isDialogVisible,
      isDateTimeVisibleDate,
      gender,
      dob,
    } = this.state;
    console.log('stateList', stateList);
    return (
      <MenuProvider>
        <View 
           
           >
                   <TopBackArrowView
                    // style={{backgroundColor:"green",width:'100%',height:160}}
                       onPressBack={() => this.props.navigation.goBack()}
                       onPressHome={() => {
                           this.props.navigation.navigate("Dashboard");
                       }}
                   />
               </View>
        <ImagePickerDailoge
          visible={isDialogVisible}
          onButtonCameraClick={async () => {
            await this.setState({ isDialogVisible: false });
            await setTimeout(() => {
              this.checkPermission();
            }, 100)

          }}
          onButtonGalleryClick={() => {
            this.imgGallerySelect();
          }}
          onButtonCancelClick={() => {
            this.closeDialog();
          }}
        />
        <FlowWrapView
          showLoader={
            this.props.userProfileProps.loading ||
            this.props.userProfileProps.loadingUpdate ||
            this.props.userProfileProps.loadingUploadImage
          }
        >
          <View>
          
            <View >
          
              <TopImageView
                image={ResourceUtils.images.profile_banner}
                onPress={() => {
                  this.props.navigation.pop();
                }}
                text1={AppStrings.my}
                text2={AppStrings.profile}
                textStyle={{ color: AppColors.colorBlack }}
                onPressHome={() => {
                  this.props.navigation.navigate('Dashboard');
                }}
              />

              <Card
                containerStyle={{
                  elevation: 1,
                  margin: 1,
                  marginTop: -12,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  marginBottom: 10,
                  backgroundColor: AppColors.colorWhite,
                }}
              >
                <View style={{ marginTop: 5 }}>
           
                  <TextViewSemiBold
                    text={AppStrings.membershipDetails}
                    textStyle={{
                      marginLeft: 0,
                      fontSize: 16,
                      marginBottom: 10,
                      color: AppColors.colorBlack,
                      textAlign: 'left',
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={[
                        styles.subscription_circle_style,
                        {
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: AppUtils.isNull(subscriptionPlan.color)
                            ? AppColors.colorWhite
                            : subscriptionPlan.color,
                        },
                      ]}
                    >
                      <TextViewMedium
                        text={
                          AppUtils.isNull(subscriptionPlan.title)
                            ? ''
                            : subscriptionPlan.title
                        }
                        textStyle={{
                          textAlign: 'center',
                          fontSize: 8,
                          color: AppUtils.isNull(subscriptionPlan.color)
                            ? AppColors.colorWhite
                            : subscriptionPlan.color,
                        }}
                      />
                      <TextViewNormal
                        text={'Subscription'}
                        textStyle={{
                          textAlign: 'center',
                          fontSize: 7,
                          color: AppUtils.isNull(subscriptionPlan.color)
                            ? AppColors.colorWhite
                            : subscriptionPlan.color,
                        }}
                      />
                      <TextViewNormal
                        text={
                          '(' +
                          (AppUtils.isNull(subscriptionPlan.plan_amount)
                            ? ''
                            : subscriptionPlan.plan_amount) +
                          ')'
                        }
                        textStyle={{
                          textAlign: 'center',
                          fontSize: 7,
                          color: AppUtils.isNull(subscriptionPlan.color)
                            ? AppColors.colorWhite
                            : subscriptionPlan.color,
                        }}
                      />
                    </View>

                    <TextViewMedium
                      text={
                        AppUtils.isNull(subscriptionPlan.title)
                          ? ''
                          : subscriptionPlan.title
                      }
                      textStyle={{
                        flex: 1,
                        marginLeft: 0,
                        fontSize: 16,
                        color: AppColors.colorBlack,
                        textAlign: 'left',
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    />
                    <TextViewNormal
                      numberOfLines={2}
                      text={
                        'expires on\n' +
                        (AppUtils.isNull(subscriptionPlan.date)
                          ? ''
                          : subscriptionPlan.date)
                      }
                      textStyle={{
                        marginLeft: 0,
                        fontSize: 11,
                        color: AppColors.colorGray,
                        textAlign: 'left',
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    />
                  </View>
                  <View style={styles.sepraterLineView} />

                  <View style={{ marginTop: 5 }}>
                    <TextViewSemiBold
                      text={AppStrings.personalDetails}
                      textStyle={{
                        marginLeft: 0,
                        fontSize: 16,
                        color: AppColors.colorBlack,
                        textAlign: 'left',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View style={styles.topView}>
                      <View style={styles.imgView}>
                        <Image
                          source={{ uri: _imageUrl }}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'cover',
                            borderRadius: 52.5,
                            borderWidth: 1,
                            borderColor: AppColors.colorRed,
                          }}
                        />
                        <TouchableOpacity
                          activeOpacity={0.2}
                          onPress={() => this.imgSelect()}
                          style={styles.viewCamera}
                        >
                          <View>
                            <Image
                              source={ResourceUtils.images.ic_camera}
                              style={{ width: 30, height: 30 }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'column', width: '70%' }}>
                      <View style={{ marginTop: 15 }}>
                        <TextViewNormal
                          text="Name"
                          textStyle={{
                            fontSize: 12,
                            textAlign: 'left',
                            paddingStart: 10,
                          }}
                        />
                        <View style={styles.inputView}>
                          <TextInput
                            placeholder="Enter name"
                            value={full_name}
                            placeholderTextColor={
                              AppColors.editTextPlaceHolderColor
                            }
                            returnKeyType="next"
                            keyboardType={'default'}
                            onChangeText={(full_name) =>
                              this.setState({ full_name })
                            }
                            style={styles.inputStype}
                          />
                          <Image
                            style={styles.IconInTextInput}
                            source={ResourceUtils.images.user}
                          />
                        </View>
                      </View>

                      <View style={{ marginTop: 15 }}>
                        <TextViewNormal
                          text="Mobile"
                          textStyle={{
                            fontSize: 12,
                            textAlign: 'left',
                            paddingStart: 10,
                          }}
                        />

                        <View style={styles.inputView}>
                          <TextInput
                            textContentType="none"
                            placeholder="Enter mobile number"
                            value={mobile_no}
                            editable={false}
                            placeholderTextColor={
                              AppColors.editTextPlaceHolderColor
                            }
                            returnKeyType="next"
                            keyboardType={'numeric'}
                            onChangeText={(mobile_no) => {
                              console.log("-------------------------------->.>>>>", mobile_no)
                              this.setState({ mobile_no })
                            }
                            }
                            style={[styles.inputStype, { color: AppColors.colorGray }]}
                          />
                          <Image
                            style={styles.IconInTextInput}
                            source={ResourceUtils.images.phone}
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <TextViewNormal
                      text="Email (optional)"
                      textStyle={{
                        fontSize: 12,
                        textAlign: 'left',
                        paddingStart: 10,
                      }}
                    />
                    <View style={styles.inputView}>
                      <TextInput

                        placeholder="Enter email id"
                        value={email}
                        placeholderTextColor={
                          AppColors.editTextPlaceHolderColor
                        }
                        returnKeyType="done"
                        keyboardType={'email-address'}
                        onChangeText={(email) => this.setState({ email })}
                        style={styles.inputStype}
                      />
                      <Image
                        style={styles.IconInTextInput}
                        source={ResourceUtils.images.mail}
                      />
                    </View>
                  </View>
                  <View
                    style={{ marginBottom: 5, marginTop: 15, marginLeft: 15 }}
                  >
                    <TextViewNormal
                      textStyle={{ fontSize: 12, textAlign: 'left' }}
                      text={'Gender'}
                    />
                  </View>
                  <View style={styles.inputView1}>
                    <DropDownView
                      onPress={(value) => {
                        this.setState({
                          gender: value.name,
                        });
                      }}
                      showArrow={true}
                      triggerTextColor={AppColors.colorBlack}
                      items={[
                        { name: 'Male', id: 1 },
                        { name: 'Female', id: 2 },
                        { name: 'Other', id: 3 },
                      ]}
                      title={AppUtils.isNull(gender) ? 'select Gender' : gender}
                    />
               
                  </View>

                 

                  <View
                    style={{ marginBottom: 5, marginTop: 15, marginLeft: 15 }}
                  >
                    <TextViewNormal
                      textStyle={{ fontSize: 12, textAlign: 'left' }}
                      text={AppStrings.state}
                    />
                  </View>

                  <View style={styles.inputView1}>
                    <DropDownView
                      onPress={(value) => {
                        this.setState({
                          stateName: value.name,
                          stateId: value.id,
                        });
                        this.getCites(value.id);
                      }}
                      searchType={'state'}
                      doStateSearch={async (value) => {
                        await this.setState({ _searchState: value })
                        this.doStateSearch(value);
                      }}
                      showArrow={true}
                      triggerTextColor={AppColors.colorBlack}
                      items={stateList}
                      title={
                        AppUtils.isNull(stateName) ? 'select state' : stateName
                      }
                    />

                  </View>
                  {stateName ? (
                    <View>
                      <View
                        style={{
                          marginBottom: 5,
                          marginTop: 15,
                          marginLeft: 15,
                        }}
                      >
                        <TextViewNormal
                          textStyle={{ fontSize: 12, textAlign: 'left' }}
                          text={AppStrings.city}
                        />
                      </View>

                      <View style={styles.inputView1}>
                        <DropDownView
                          onPress={(value) => {
                            this.setState({
                              cityName: value.name,
                              cityId: value.id,
                              cityList: this.state.newCityList
                            });

                          }}
                          searchType={'city'}
                          doCitySearch={async (value) => {
                            await this.setState({ _searchCity: value })
                            this.doCitySearch(value);
                          }}
                          showArrow={true}
                          triggerTextColor={AppColors.colorBlack}
                          items={cityList}
                          title={
                            AppUtils.isNull(cityName) ? 'select city' : cityName
                          }
                        />

                      </View>
                    </View>
                  ) : null}
                </View>

                <View
                  style={{
                    width: '80%',
                    marginTop: 40,
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      alignItems: 'center',
                    }}
                  >
                    <TextViewMedium
                      text={'Cancel'}
                      textStyle={{ fontSize: 16 }}
                    />
                  </TouchableOpacity>
                  <ButtonView
                    containerStyle={styles.ButtonTouch1}
                    onPress={() => {
                      if (AppUtils.isNull(full_name)) {
                        AppUtils.showAlert('Please enter your name');
                      }
                      //  else if (AppUtils.isNull(email)) {
                      //   AppUtils.showAlert('Please enter email address');
                      // } else if (!AppUtils.isValidEmail(email)) {
                      //   AppUtils.showAlert('Please enter valid email address');
                      // }
                      else if (AppUtils.isNull(gender)) {
                        AppUtils.showAlert('Please select gender');
                      }
                      // else if (AppUtils.isNull(dob)) {
                      //   AppUtils.showAlert('Please enter date of birth.');
                      // } 
                      else if (AppUtils.isNull(stateId)) {
                        AppUtils.showAlert('Please select state.');
                      } else if (AppUtils.isNull(cityId)) {
                        AppUtils.showAlert('Please select city.');
                      } else {
                        let data = {
                          full_name: full_name,
                          email: email,
                          mobile_no: mobile_no,
                          country_code: '+91',
                          state_id: this.state.stateId,
                          city_id: this.state.cityId,
                          gender: gender.toLowerCase(),
                          dob: dob,
                        };
                        console.log("DoEditProfileRequestModel", data)

                        this.props.userProfileProps.doEditProfile(data);
                      }
                    }}
                    text={'Save'}
                  />
                </View>
              </Card>
            </View>
          </View>
          {/* <DateTimePickerView
            isVisible={this.state.isDateTimeVisibleDate}
            onConfirm={(date) => {
              this.showHideStartDatePicker(false);
              this.handleStartDatePicker(date);
            }}
            onCancel={() => {
              this.showHideStartDatePicker(false);
            }}
            maximumDate={new Date()}
            date={AppUtils.formatedDateToDatePickerDate(dob)}
          /> */}
          <DOBPickerDialoge
            visible={isDateTimeVisibleDate}
            onButtonCancelClick={() => {
              this.closeDateDialog();
            }}
            //    onOptionOk={() => {
            //   this.okButton();
            // }}

            setDate={(dob) => {
              changeCurrentDate = dob,
                this.setState({
                  dob: AppUtils.datePickerToFormatedDate(dob), changeCurrentDate: dob
                });
            }}
            setOldDate={AppUtils.isNull(this.state.changeCurrentDate) ? currentDate : this.state.changeCurrentDate}
          />
        </FlowWrapView>
      </MenuProvider>
    );
  }
}

const UserProfileScreenElement = connectWithContext(UserProfileContextProvider)(
  {
    globalProps: GlobalContextConsumer,
    userProfileProps: UserProfileContextConsumer,
  }
)(UserProfile);
export default UserProfileScreenElement;

const styles = StyleSheet.create({
  inputStype: {
    height: 45,
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    color: AppColors.colorBlack,
  },
  sepraterLineView: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    height: 1,
    backgroundColor: AppColors.sepraterLineColor,
  },
  IconInTextInput: {
    marginLeft: 0,
    width: 23,
    height: 23,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 12,
  },
  subscription_circle_style: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderWidth: 2,
    padding: 5,
    borderColor: AppColors.ramaBule,
    alignSelf: 'center',
    backgroundColor: AppColors.colorWhite,
    justifyContent: 'center',
  },
  inputView: {
    height: 45,
    flex: 1,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: AppColors.inputviewBoxColor,
  },
  inputView1: {
    height: 50,
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: AppColors.inputviewBoxColor,
  },
  topView: {
    height: 135,
    alignItems: 'center',
  },
  imgView: {
    width: 105,
    height: 105,
    backgroundColor: AppColors.colorWhite,
    marginTop: 15,
    borderRadius: 52.5,
  },
  viewCamera: {
    width: 45,
    height: 45,
    position: 'absolute',
    marginTop: 110 - 45,
    marginLeft: 110 - 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
  },
  ButtonTouch1: {
    width: 120,
    height: 45,
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D83772",
    backgroundColor: '#D83772',

    shadowColor: "#D83772",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  }, dropDownView: {
    width: AppUtils.getDeviceWidth() - 30,
    height: 45,
    paddingLeft: 5,
    marginTop: 5,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: AppColors.inputviewBoxColor,
  },
});
