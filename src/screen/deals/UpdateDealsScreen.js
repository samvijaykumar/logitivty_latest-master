//////////////////////////////
/////////////////////////////////////
////////////////////
import React from 'react';

import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TextInput,
  ToastAndroid,
  Modal,
  Image,
  Linking,
} from 'react-native';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import moment from 'moment';
import DropDownView from '../../widgets/DropDownView';
import AppStrings from "../../utils/AppStrings";


import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import TopImageView from '../../widgets/TopImageView';
import { Card } from 'react-native-elements/dist/card/Card';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import TextViewNormal from '../../widgets/TextViewNormal';
import { MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MamographyContextProvider, {
  MamographyContextConsumer,
} from '../../context/MamographyContext';
import { FlatList } from 'react-native';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import NoDataFoundView from '../../widgets/NoDataFoundView';
import AppUtils from '../../utils/AppUtils';
import DateTimePickerView from "../../widgets/DateTimePickerView";
import ImagePicker from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import Orientation from 'react-native-orientation';


var reponsedata;
var termsArray;
class UpdateDealsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseDataList: [],
      responseupdateDataList: {},
      description: '',
      start_date: '',
      end_date: '',
      terms1: '',
      terms2: '', showterms2: false,
      terms3: '', showterms3: false,
      terms4: '', showterms4: false,
      terms5: '', showterms5: false,
      loader: false,
      isDialogVisible: false,
      isDialogVisibleEndDate: false,
      currentterms: 1,
      imageuploaded: false,
      imagename: '',
      visible: false,

      value: 'healthy',
      calories: 0,
      visibleTo: 0,
      imageSelect: false,
      _imageUrl: '',
      uri: '',
      type: '',
      name: '',
      variant: 'veg',
      deal_id: this.props.navigation.state.params.deal_id,
      api_selected: 0,

      datasetTime: true,

      cityId: '',
      cityName: '',
      cityList: [],
      api_selected: 0,
      newCityList: [],
      _searchCity: ''

    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  async componentDidMount() {
    // Orientation.lockToPortrait();

    // Orientation.addOrientationListener(this._orientationDidChange);

    console.log("deal_id ", this.state.deal_id)
    this.setState({ api_selected: 1 })
    let data = { "deal_id": this.state.deal_id };
    this.props.updateDealProps.getDealApi(data);

    await this.setState({ cityList: [], cityName: '', cityId: '' });

  }




  dialogOpen = () => {
    this.setState({ isDialogVisible: true });
  };

  dialogOpenEndDate = () => {
    this.setState({ isDialogVisibleEndDate: true });
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.state.api_selected === 2) {
      if (
        prevProps.eventsProps.loading !== this.props.eventsProps.loading &&
        !this.props.eventsProps.loading
      ) {

        console.log("responseDataList: " + JSON.stringify(this.props.eventsProps.response))

        let response = this.props.eventsProps.response;
        this.setState({
          api_selected: 0
        });
        if (response.statusCode === 200) {
          this.setState({
            responseDataList: response.data
          });
          AppUtils.showAlert(response.message)
          this.props.navigation.navigate("PromoteYourBusinessScreen");
        }

        this.setState({
          loader: false
        })
      }
    }

    if (this.state.api_selected === 1) {
      if (
        prevProps.updateDealProps.loading !== this.props.updateDealProps.loading &&
        !this.props.updateDealProps.loading
      ) {

        console.log("response: " + JSON.stringify(this.props.updateDealProps.response))

        let response = this.props.updateDealProps.response;

        if (response.statusCode === 200) {

          this.setState({
            responseupdateDataList: response.data
          });

          // if (response.data.length > 0) {
          // response.data.forEach(async (element) => {
          //   let d = { name: element.state_name, id: element.id };
          //   this.state.tempStateList.push(d);
          //   this.state.newStateList.push(d);
          // });
          await this.setState({
            description: response.data.deal_details,
            start_date: moment(response.data.start_date).format('YYYY-MM-DD'),
            end_date: moment(response.data.end_date).format('YYYY-MM-DD'),
            currentterms: response.data.terms_of_use.length
          });


          if (response.data.deal_visibility == 'local') {
            await this.setState({
              visibleTo: 1,
              cityId: response.data.city_id,

            });
          } else {
            await this.setState({
              visibleTo: 0,
            });
          }

          // await this.setState({
          //   terms1: response.data.terms_of_use[0].term,
          // });
          if (this.state.currentterms === 1) {

            await this.setState({
              terms1: response.data.terms_of_use[0].term,
            });
          } else if (this.state.currentterms === 2) {
            await this.setState({
              terms1: response.data.terms_of_use[0].term,
              terms2: response.data.terms_of_use[1].term,
              showterms2: true,
            });
          } else if (this.state.currentterms === 3) {
            await this.setState({
              terms1: response.data.terms_of_use[0].term,
              terms2: response.data.terms_of_use[1].term,
              terms3: response.data.terms_of_use[2].term,
              showterms2: true,
              showterms3: true,
            });
          } else if (this.state.currentterms === 4) {
            await this.setState({
              terms1: response.data.terms_of_use[0].term,
              terms2: response.data.terms_of_use[1].term,
              terms3: response.data.terms_of_use[2].term,
              terms4: response.data.terms_of_use[3].term,
              showterms2: true,
              showterms3: true,
              showterms4: true,
            });
          } else if (this.state.currentterms === 5) {
            // console.log("terms1dddf" ,  response.data.terms_of_use[0].term)

            await this.setState({
              terms1: response.data.terms_of_use[0].term,
              terms2: response.data.terms_of_use[1].term,
              terms3: response.data.terms_of_use[2].term,
              terms4: response.data.terms_of_use[3].term,
              terms5: response.data.terms_of_use[4].term,
              showterms2: true,
              showterms3: true,
              showterms4: true,
              showterms5: true

            });

          }
          this.props.eventsProps.cityListApi({
            state_id: 29,
          });


          console.log("terms1dddfs", this.state.terms1)




          // }

          // console.log("responseupdateDataListsfd: " + this.state.responseupdateDataList)



          // this.setState({
          //     description: this.state.reponsedata.description
          //   });



          // AppUtils.showAlert(response.message)
          // this.props.navigation.navigate("PromoteYourBusinessScreen");
        }



        this.setState({
          api_selected: 0
        })
      }
    }



    if (
      prevProps.eventsProps.loadingCity !==
      this.props.eventsProps.loadingCity &&
      !this.props.eventsProps.loadingCity
    ) {
      console.log('cityPropddds', "ok");

      let response = this.props.eventsProps.responseCity;
      console.log('cityProps', response);

      if (response.statusCode === 200) {
        if (response.data.length > 0) {
          let tempCityList = [];
          this.setState({ newCityList: [] })
          console.log('cityPropsdgdg', response.data);
          response.data.forEach(async (element) => {

            let d = { name: element.city_name, id: element.id };
            tempCityList.push(d);
            this.state.newCityList.push(d);
            if (!AppUtils.isNull(this.state.cityId)) {
              console.log("cityIddata: ", tempCityList.id)
              if (this.state.cityId === element.id) {
                console.log("cityIddata2 : ", element.id)

                this.setState({
                  cityName: element.city_name
                });
              }
            }
          });
          this.setState({
            cityList: tempCityList, newCityList: this.state.newCityList
          });
        }
      }
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

  showHideStartDatePicker = async (show) => {
    await this.setState({ isDialogVisible: show });
  }

  handleStartDatePicker = async (selectedDate) => {
    if (!AppUtils.isNull(selectedDate))
      await this.setState({ start_date: AppUtils.datePickerToFormatedDate(selectedDate) });
    this.showHideStartDatePicker(false);
  }

  showHideStartDatePickerEndDate = async (show) => {
    await this.setState({ isDialogVisibleEndDate: show });
  }

  handleStartDatePickerEndDate = async (selectedDate) => {
    if (!AppUtils.isNull(selectedDate))
      await this.setState({ end_date: AppUtils.datePickerToFormatedDate(selectedDate) });
    this.showHideStartDatePickerEndDate(false);
  }


  // async openMeetingUrl(meetingUrl) {
  //     // Linking.openURL(meetingUrl);
  // }

  resetStack = () => {
    this.props.navigation.goBack()
  }

  showmenu = () => {
    this.setState({ visible: true })
  }


  removeterms = () => {
    if (this.state.currentterms === 2) {
      this.setState({ showterms2: false })
      this.setState({ terms2: '' })
    } else if (this.state.currentterms === 3) {
      this.setState({ showterms3: false })
      this.setState({ terms3: '' })
    } else if (this.state.currentterms === 4) {
      this.setState({ showterms4: false })
      this.setState({ terms4: '' })
    } else if (this.state.currentterms === 5) {
      this.setState({ showterms5: false })
      this.setState({ terms5: '' })
    } else {
    }
    this.setState({ currentterms: --this.state.currentterms })
  }


  showhideterms = () => {
    if (this.state.currentterms === 1 && !AppUtils.isNull(this.state.terms1)) {
      this.setState({ showterms2: true })
      this.setState({ currentterms: 2 })
    } else if (this.state.currentterms === 2 && !AppUtils.isNull(this.state.terms2)) {
      this.setState({ showterms3: true })
      this.setState({ currentterms: 3 })

    } else if (this.state.currentterms === 3 && !AppUtils.isNull(this.state.terms3)) {
      this.setState({ showterms4: true })
      this.setState({ currentterms: 4 })

    } else if (this.state.currentterms === 4 && !AppUtils.isNull(this.state.terms4)) {
      this.setState({ showterms5: true })
      this.setState({ currentterms: 5 })
    } else if (this.state.currentterms === 5 && !AppUtils.isNull(this.state.terms5)) {
      ToastAndroid.showWithGravity(
        "Can not add more than 5 Terms",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      ToastAndroid.showWithGravity(
        "Terms can not be empty",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  AddTermArray = () => {
    console.log("checkdata: ", this.state.terms1)
    // if (this.state.currentterms === 1) {
    //   termsArray = [{ "term": this.state.terms1 }]
    // } else if (this.state.currentterms === 2) {
    //   termsArray = [{ "term": this.state.terms1 }, { "term": this.state.terms2 }]
    // } else if (this.state.currentterms === 3) {
    //   termsArray = [{ "term": this.state.terms1 }, { "term": this.state.terms2 }, { "term": this.state.terms3 }]
    // } else if (this.state.currentterms === 4) {
    //   termsArray = [{ "term": this.state.terms1 }, { "term": this.state.terms2 }, { "term": this.state.terms3 }, { "term": this.state.terms4 }]
    // } else if (this.state.currentterms === 5) {
    //   termsArray = [{ "term": this.state.terms1 }, { "term": this.state.terms2 }, { "term": this.state.terms3 }, { "term": this.state.terms4 }, { "term": this.state.terms5 }]
    // }

    if (!AppUtils.isNull(this.state.terms5) && !AppUtils.isNull(this.state.terms4) && !AppUtils.isNull(this.state.terms3) && !AppUtils.isNull(this.state.terms2) && !AppUtils.isNull(this.state.terms1)) {
      termsArray = [{ "term": this.state.terms1 }, { "term": this.state.terms2 }, { "term": this.state.terms3 }, { "term": this.state.terms4 }, { "term": this.state.terms5 }]
    } else if (!AppUtils.isNull(this.state.terms4) && !AppUtils.isNull(this.state.terms3) && !AppUtils.isNull(this.state.terms2) && !AppUtils.isNull(this.state.terms1)) {
      termsArray = [{ "term": this.state.terms1 }, { "term": this.state.terms2 }, { "term": this.state.terms3 }, { "term": this.state.terms4 }]
    } else if (!AppUtils.isNull(this.state.terms3) && !AppUtils.isNull(this.state.terms2) && !AppUtils.isNull(this.state.terms1)) {
      termsArray = [{ "term": this.state.terms1 }, { "term": this.state.terms2 }, { "term": this.state.terms3 }]
    } else if (!AppUtils.isNull(this.state.terms2) && !AppUtils.isNull(this.state.terms1)) {
      termsArray = [{ "term": this.state.terms1 }, { "term": this.state.terms2 }]
    } else if (!AppUtils.isNull(this.state.terms1)) {
      termsArray = [{ "term": this.state.terms1 }]
    }
  }


  imgGallerySelect() {
    const options = {
      rotation: 90,
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1000,
      // ScreenOrientation : 
      // width: 300,
      // height: 400,
      height: 300,
      width: AppUtils.getDeviceWidth() - 50,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    setTimeout(() => {
      launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else {
          console.log('Image uri ', response);
          this.setState({
            _imageUrl: response.assets[0].uri,
            imageSelect: true,
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          });
          var photo = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          this.setState({ imagename: response.assets[0].fileName })
          this.setState({ imageuploaded: true })

          /////crop image


          ImagePicker.openCropper({
            path: photo.uri,
            height: 300,
            width: 300,

            // height: 150,
            // compressImageQuality : 1,
            // compressImageMaxHeight : 150,
            // compressImageMaxWidth : AppUtils.getDeviceWidth() - 50,
          }).then(image => {
            console.log("cropped image : " + JSON.stringify(image));

            this.setState({
              _imageUrl: image.path,
              imageSelect: true,
              uri: image.path,
              type: response.assets[0].type,
              name: response.assets[0].fileName,
            });
            photo = {
              uri: image.path,
              type: response.assets[0].type,
              name: response.assets[0].fileName,
            };

          }).catch(e => {
            console.log("openCamera catch" + e.toString())
          });

          var form = new FormData();
          form.append('image', photo);
          console.log(`Profile Image ${JSON.stringify(form)}`);
          // this.props.userProfileProps.uploadImageApi(form);
        }
      });
      this.setState({
        visible: false
      })
    }, 100);
  }
  cameraSelect() {
    const options = {
      rotation: 90,
      maxWidth: 1000,
      maxHeight: 1000,
      // width: 300,
      height: 300,
      // height: 150,
      width: AppUtils.getDeviceWidth() - 50,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('ImagePicker Error: ', response);
      }
      else if (response.errorCode == 'permission') {
        console.log('ImagePicker Error: ', response);
        if (Platform.OS == 'ios') {
          setTimeout(() => {
            AppUtils.showAlertForPermission();
          }, 1000);
        }
      }
      else {
        console.log('Image uri ', response);
        this.setState({
          _imageUrl: response.assets[0].uri,
          imageSelect: true,
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
        var photo = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        this.setState({ imagename: response.assets[0].fileName })
        this.setState({ imageuploaded: true })
        /////crop image //////


        ImagePicker.openCropper({
          path: photo.uri,
          height: 300,
          width: 300,
          // height: 150,
          // compressImageQuality : 1,
          // compressImageMaxHeight : 150,
          // compressImageMaxWidth : AppUtils.getDeviceWidth() - 50,
          // width: AppUtils.getDeviceWidth() - 50,
        }).then(image => {
          console.log("cropped image : " + JSON.stringify(image));

          this.setState({
            _imageUrl: image.path,
            imageSelect: true,
            uri: image.path,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          });
          photo = {
            uri: image.path,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };

        }).catch(e => {
          console.log("openCamera catch" + e.toString())
        });

        var form = new FormData();
        form.append('image', photo);
        console.log(`Profile Image ${JSON.stringify(form)}`);
        // this.props.userProfileProps.uploadImageApi(form);
      }
      this.setState({
        visible: false
      })
    });
  }

  async callApi() {
    if (AppUtils.isNull(this.state.description)) {
      AppUtils.showAlert('Please enter Description')
    } else if (AppUtils.isNull(this.state.start_date)) {
      AppUtils.showAlert('Please enter Start Date')

      // "Please enter Start Date",
      // ToastAndroid.SHORT,
      // ToastAndroid.CENTER
    } else if (AppUtils.isNull(this.state.end_date)) {
      AppUtils.showAlert('Please enter End Date')

      // "Please enter End Date",
      // ToastAndroid.SHORT,
      // ToastAndroid.CENTER

    } else if (AppUtils.isNull(this.state.terms1)) {
      AppUtils.showAlert('Please enter Terms')

    } else if (this.state.visibleTo === 1 && AppUtils.isNull(this.state.cityId)) {
      AppUtils.showAlert('Please select city')
    } else {


      this.setState({
        loader: true
      })

      console.log("this.state.uri: ", this.state.uri)
      console.log("this.state.start_date: ", this.state.start_date)
      console.log("this.state.end_date: ", this.state.end_date)
      console.log("this.state.description: ", this.state.description)

      // if (this.state.uri != '') {
      // const userData = await UserSession.getUserSessionData()
      // var myHeaders = new Headers();
      // myHeaders.append("Authorization", `Bearer ${userData.token}`);
      var photo = {
        uri: this.state.uri,
        type: this.state.type,
        name: this.state.name,
      };
      console.log("photos: ", JSON.stringify(photo))

      this.AddTermArray()

      var visible_type = '';
      if (this.state.visibleTo === 0) {
        visible_type = 'universal'
      } else { visible_type = 'local' }



      // var terms_of_use:[{"term":"test term 1"},{"term":"test term 2"},{"term":"test term 3"},{"term":"test term 4"}]
      console.log("termsArray: ", JSON.stringify(termsArray))
      var data = new FormData();

      this.setState({
        api_selected: 2
      });

      if (this.state.visibleTo === 0) {
        if (this.state.uri != '') {
          data.append('banner', photo);
        }
        data.append('deal_id', this.state.deal_id);

        data.append('start_date', this.state.start_date);
        data.append('end_date', this.state.end_date);
        data.append('deal_details', this.state.description);
        data.append('terms_of_use', JSON.stringify(termsArray));
        data.append('deal_visibility', visible_type);
        data.append('state_id', '');
        data.append('city_id', '');
      } else {
        if (this.state.uri != '') {
          data.append('banner', photo);
        }
        data.append('start_date', this.state.start_date);
        data.append('deal_id', this.state.deal_id);
        data.append('end_date', this.state.end_date);
        data.append('deal_details', this.state.description);
        data.append('terms_of_use', JSON.stringify(termsArray));
        data.append('deal_visibility', visible_type);
        data.append('state_id', '29');
        data.append('city_id', this.state.cityId);
      }





      console.log("data: ", data)

      this.props.eventsProps.updateLiveDealApi(data);


    }


  }




  render() {
    const { isDialogVisible, isDialogVisibleEndDate, currentterms, responseupdateDataList, cityId, cityList, cityName,
      helplineDataList, description, start_date, imagename,
      end_date, showterms2, showterms3, showterms4, showterms5, imageuploaded,
      terms1, terms3, terms2, terms4, terms5 } = this.state;
    console.log("responseupdateDataListsfd: " + responseupdateDataList)
    return (
      <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
        <TopBarEcommerce
          screenTitle={'update deal'}
          visibleCart={false}
          visibleFav={false}
          visibleSearch={false}
          onPressBack={() => {
            this.resetStack();
          }}
        />

        {this.props.eventsProps.loadingCity === false && this.props.eventsProps.loading === false ?

          <MenuProvider>
            <ScrollView style={{ backgroundColor: AppColors.colorWhite }}>

              {/* {this.state.datasetTime ? <ActivityIndicatorView loading={true} /> : */}


              <View style={{ margin: 15 }}>
                <TouchableOpacity onPress={() => {
                  this.showmenu();
                }}>
                  <View style={{
                    height: 50,
                    borderRadius: 1,
                    marginTop: 10,
                    width: '100%',
                    borderStyle: 'dashed',
                    alignItems: 'center',
                    borderWidth: 1.4,
                    borderRadius: 12,
                    borderColor: AppColors.signupButtonColor
                  }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                      <Image
                        style={{
                          width: 22,
                          height: 18,
                          marginTop: 16,
                          marginRight: 12,
                          marginBottom: 16
                          // margin:16
                        }}
                        resizeMode={"stretch"}
                        //source={{ uri: AppUtils.isObject(dashboardDetails) ? dashboardDetails.memography.image : '' }}
                        source={imageuploaded ? ResourceUtils.images.ic_checked_round_green : ResourceUtils.images.uploadcloud}
                      />
                      <TextViewMedium
                        text={imageuploaded ? 'deal banner selected' : 'upload deal banner'}
                        numberOfLines={2}
                        textStyle={{
                          fontSize: 14,
                          color: AppColors.signupButtonColor,
                          marginRight: 15,
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                {/* /////////////////////////////////////////////////////// */}
                <View >
                  {/* {imageuploaded ?
                    <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_regular, marginBottom: wp('2%'), marginTop: wp('4%') }}>{imagename}</Text>
                    : null} */}
                  {/* ////// description ////////// */}
                  <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>enter description </Text>
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.inputView}>
                      <TextInput
                        placeholder={''}
                        placeholderTextColor={AppColors.editTextPlaceHolderColor}
                        // myRef={(ref) => (this.userName = ref)}
                        // placeholderImg={ResourceUtils.images.img_help}
                        // returnKeyType="next"
                        onChangeText={(descriptiondata) => this.setState({ description: descriptiondata })}
                        text={description}
                        value={description}
                        style={styles.inputStype}
                      />
                      <Image
                        style={styles.IconInTextInput}
                        source={ResourceUtils.images.description}
                      />
                    </View>
                  </View>


                  {/* //////////////// start date /////////// */}

                  <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>start date</Text>

                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.dialogOpen()} style={styles.inputView}>
                      <TextInput
                        placeholder={''}
                        placeholderTextColor={AppColors.editTextPlaceHolderColor}
                        // myRef={(ref) => (this.userName = ref)}
                        // placeholderImg={ResourceUtils.images.img_help}
                        // returnKeyType="next"
                        onChangeText={() => this.setState({ start_date })}
                        text={start_date}
                        value={start_date}
                        editable={false}
                        style={styles.inputStype}
                      />
                      <Image
                        style={styles.IconInTextInput}
                        source={ResourceUtils.images.date_start_end}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* </View> */}

                  {/* //////////////////////////////////// */}

                  {/* //////////////// end date /////////// */}

                  <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>end date</Text>

                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.dialogOpenEndDate()} style={styles.inputView}>
                      <TextInput
                        placeholder={''}
                        placeholderTextColor={AppColors.editTextPlaceHolderColor}
                        // myRef={(ref) => (this.userName = ref)}
                        // placeholderImg={ResourceUtils.images.img_help}
                        // returnKeyType="next"
                        onChangeText={() => this.setState({ end_date })}
                        text={end_date}
                        value={end_date}
                        style={styles.inputStype}
                        editable={false}

                      />
                      <Image
                        style={styles.IconInTextInput}
                        source={ResourceUtils.images.date_start_end}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* //////////////////////////////////// */}

                  {/* //////////////// terms  1 /////////// */}
                  <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>terms</Text>

                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.inputView}>
                      <TextInput
                        placeholder={''}
                        placeholderTextColor={AppColors.editTextPlaceHolderColor}
                        // myRef={(ref) => (this.userName = ref)}
                        // placeholderImg={ResourceUtils.images.img_help}
                        // returnKeyType="next"
                        text={terms1}
                        value={terms1}
                        style={styles.inputStype}
                        onChangeText={(terms1) => this.setState({ terms1: terms1 })}
                      />
                      {/* <Image
                    style={styles.IconInTextInput}
                    source={ResourceUtils.images.terms}
                  /> */}
                    </View>
                  </View>

                  {/* //////////////////////////////////// */}

                  {/* //////////////// terms  2 /////////// */}

                  {/* <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>terms</Text> */}
                  {showterms2 ?
                    <View style={{ alignItems: 'center', marginTop: 15 }}>
                      <View style={styles.inputView}>
                        <TextInput
                          placeholder={''}
                          placeholderTextColor={AppColors.editTextPlaceHolderColor}
                          // myRef={(ref) => (this.userName = ref)}
                          // placeholderImg={ResourceUtils.images.img_help}
                          // returnKeyType="next"
                          onChangeText={(terms2) => this.setState({ terms2: terms2 })}
                          text={terms2}
                          value={terms2}
                          style={styles.inputStype}
                        />

                        {currentterms === 2 ?
                          <TouchableOpacity onPress={() => this.removeterms()} >
                            <Image
                              style={styles.IconInTextInput}
                              source={ResourceUtils.images.baseline_delete}
                            />
                          </TouchableOpacity>
                          : null
                        }


                      </View>
                    </View>

                    : null}

                  {/* //////////////////////////////////// */}


                  {/* //////////////// terms  3 /////////// */}
                  {/* <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>terms</Text> */}
                  {showterms3 ?
                    <View style={{ alignItems: 'center', marginTop: 15 }}>
                      <View style={styles.inputView}>
                        <TextInput
                          placeholder={''}
                          placeholderTextColor={AppColors.editTextPlaceHolderColor}
                          // myRef={(ref) => (this.userName = ref)}
                          // placeholderImg={ResourceUtils.images.img_help}
                          // returnKeyType="next"
                          onChangeText={(terms3) => this.setState({ terms3: terms3 })}
                          text={terms3}
                          value={terms3}
                          style={styles.inputStype}
                        />
                        {currentterms === 3 ?
                          <TouchableOpacity onPress={() => this.removeterms()}>
                            <Image
                              style={styles.IconInTextInput}
                              source={ResourceUtils.images.baseline_delete}
                            />
                          </TouchableOpacity>
                          : null
                        }
                      </View>
                    </View>
                    : null}

                  {/* //////////////////////////////////// */}


                  {/* //////////////// terms  4 /////////// */}
                  {/* <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>terms</Text> */}
                  {showterms4 ?
                    <View style={{ alignItems: 'center', marginTop: 15 }}>
                      <View style={styles.inputView}>
                        <TextInput
                          placeholder={''}
                          placeholderTextColor={AppColors.editTextPlaceHolderColor}
                          // myRef={(ref) => (this.userName = ref)}
                          // placeholderImg={ResourceUtils.images.img_help}
                          // returnKeyType="next"
                          onChangeText={(terms4) => this.setState({ terms4: terms4 })}
                          text={terms4}
                          value={terms4}
                          style={styles.inputStype}
                        />
                        {currentterms === 4 ?
                          <TouchableOpacity onPress={() => this.removeterms()}>
                            <Image
                              style={styles.IconInTextInput}
                              source={ResourceUtils.images.baseline_delete}
                            />
                          </TouchableOpacity>
                          : null
                        }
                      </View>
                    </View>
                    : null}


                  {/* //////////////////////////////////// */}

                  {/* //////////////// terms  5 /////////// */}
                  {/* <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>terms</Text> */}
                  {showterms5 ?
                    <View style={{ alignItems: 'center', marginTop: 15 }}>
                      <View style={styles.inputView}>
                        <TextInput
                          placeholder={''}
                          placeholderTextColor={AppColors.editTextPlaceHolderColor}
                          // myRef={(ref) => (this.userName = ref)}
                          // placeholderImg={ResourceUtils.images.img_help}
                          // returnKeyType="next"
                          onChangeText={(terms5) => this.setState({ terms5: terms5 })}
                          text={terms5}
                          value={terms5}
                          style={styles.inputStype}
                        />
                        {currentterms === 5 ?
                          <TouchableOpacity onPress={() => this.removeterms()}>
                            <Image
                              style={styles.IconInTextInput}
                              source={ResourceUtils.images.baseline_delete}
                            />
                          </TouchableOpacity>
                          : null
                        }
                      </View>
                    </View>
                    : null}

                  {/* //////////////////////////////////// */}

                  {/* ////////////////////// add new ////////////// */}
                  {currentterms === 5 ? null :
                    <TouchableOpacity onPress={() => this.showhideterms()}
                      style={{ alignSelf: 'flex-end', marginTop: 5 }}>
                      <TextViewMedium
                        text={'add new'}
                        numberOfLines={2}
                        textStyle={{
                          fontSize: 14,
                          color: AppColors.statusBarColor,
                          textDecorationLine: 'underline',
                        }}
                      />
                    </TouchableOpacity>}

                  {/* ///////////////////// */}

                  {/* //////////////// visible to/////////// */}

                  <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('1%'), marginTop: wp('4%') }}>visible to</Text>

                  <View style={{ flexDirection: 'row', flex: 2 }}>
                    <View style={{ flex: 1 }}>
                      <CheckBox
                        checkedColor={AppColors.primaryColor}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.visibleTo == 0}
                        title={'all users'}
                        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                        onPress={() => this.setState({ visibleTo: 0 })}
                      />

                    </View>

                    <View style={{ flex: 1 }}>
                      <CheckBox
                        checkedColor={AppColors.primaryColor}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.visibleTo == 1}
                        title={'choose city'}
                        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                        onPress={() => this.setState({ visibleTo: 1 })}
                      />
                    </View>

                  </View>

                  {/* //////////////////////////////////// */}

                  {/* ///////// state   //////////// */}
                  {this.state.visibleTo === 0 ? null :
                    <View>
                      <View style={{ marginTop: 20 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            marginLeft: 5,
                            marginBottom: 10,
                          }}
                        >
                          <TextViewMedium
                            text={"State"}
                            textStyle={{ fontSize: 12, textAlign: "left" }}
                          />
                          <TextViewMedium
                            text={"*"}
                            textStyle={{
                              color: "#D93337",
                              marginLeft: 1,
                              marginTop: -2,
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          activeOpacity={1}
                        // onPress={() =>
                        //   this.props.navigation.navigate('StateListSignUp', {
                        //     chooseState: this.chooseState,
                        //   })
                        // }
                        >
                          <View style={styles.dropDownView}>

                            <TextViewMedium
                              text={'Rajasthan'}
                              textStyle={{
                                color: AppColors.colorBlack,
                                marginLeft: 20,
                                fontSize: 15,
                              }}
                            />

                          </View>
                        </TouchableOpacity>
                      </View>


                      {/* /////////////// city /////////////// */}


                      <View style={{ marginTop: 20 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            marginLeft: 5,
                            marginBottom: 10,
                          }}
                        >
                          <TextViewMedium
                            text={"City"}
                            textStyle={{ fontSize: 12, textAlign: "left" }}
                          />
                          <TextViewMedium
                            text={"*"}
                            textStyle={{
                              color: "#D93337",
                              marginLeft: 1,
                              marginTop: -2,
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          activeOpacity={1}
                        // onPress={() =>
                        //   this.props.navigation.navigate('CityListSignUp', {
                        //     stateId: stateId,
                        //     chooseCity: this.chooseCity,
                        //   })
                        // }
                        >
                          {/* <View style={styles.dropDownView}>

                        <TextViewMedium
                          text={'Jaipur'}
                          textStyle={{
                            color: AppColors.colorBlack
                            ,
                            marginLeft: 20,
                            fontSize: 15,

                          }}
                        />

                      </View> */}

                          <View>
                            <View
                              style={{
                                marginBottom: 5,
                                marginTop: 5,
                                marginLeft: 15,
                              }}
                            >
                              {/* <TextViewNormal
                          textStyle={{ fontSize: 12, textAlign: 'left' }}
                          text={AppStrings.city}
                        /> */}
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
                                // searchType={'city'}
                                // doCitySearch={async (value) => {
                                //   await this.setState({ _searchCity: value })
                                //   this.doCitySearch(value);
                                // }}
                                showArrow={true}
                                triggerTextColor={AppColors.colorBlack}
                                items={cityList}
                                title={
                                  AppUtils.isNull(cityName) ? 'select city' : cityName
                                }
                              />

                            </View>
                          </View>
                        </TouchableOpacity>

                      </View>
                    </View>}

                  {/* ////////////////////////////////////// */}


                  {this.props.eventsProps.loading === false ? <TouchableOpacity
                    onPress={() => this.callApi()}
                    style={{
                      backgroundColor: AppColors.statusBarColor,
                      marginTop: 20,
                      shadowColor: AppColors.statusBarColor,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.6,
                      alignItems: 'center',
                      shadowRadius: 3,
                      elevation: 4,
                      borderRadius: 20,
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10,
                      borderWidth: 1,
                      borderColor: AppColors.statusBarColor,
                    }}>
                    <Text style={{ marginTop: 10, marginBottom: 10, fontFamily: ResourceUtils.fonts.poppins_semibold, marginLeft: 10, marginRight: 10, color: 'white', fontSize: 15 }}>update deal</Text>
                  </TouchableOpacity>
                    : <ActivityIndicator size={'large'} color={"#D83772"} style={{}}></ActivityIndicator>}


                  {/* ///////////////date picker ////////////// */}
                  <DateTimePickerView
                    isVisible={isDialogVisible}
                    onConfirm={(date) => {
                      this.showHideStartDatePicker(false)
                      this.handleStartDatePicker(date);
                    }}
                    onCancel={() => {
                      this.showHideStartDatePicker(false);
                    }}
                    minimumDate={new Date()}
                    date={AppUtils.formatedDateToDatePickerDate1(start_date)}
                  // mode={'date'}
                  />


                  {/* ///////////////date picker 2 ////////////// */}
                  <DateTimePickerView
                    isVisible={isDialogVisibleEndDate}
                    onConfirm={(date) => {
                      this.showHideStartDatePickerEndDate(false)
                      this.handleStartDatePickerEndDate(date);
                    }}
                    onCancel={() => {
                      this.showHideStartDatePickerEndDate(false);
                    }}
                    minimumDate={new Date()}
                    date={AppUtils.formatedDateToDatePickerDate1(end_date)}
                    mode={'date'}
                  />



                  {/* //////////image capture ////////// */}
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.visible}
                  >
                    <View style={[styles.container]}>
                      <View style={[styles.wrapper,]}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'white', borderRadius: wp('10%'), marginTop: wp('-7%'), marginRight: wp('-8%'), zIndex: 100, borderWidth: 0.5, borderColor: 'black', alignSelf: 'flex-end', padding: wp('3%') }} onPress={() => { this.setState({ visible: false }) }}>
                          <Image source={require('../../utils/images/close_red.png')} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <TouchableOpacity onPress={() => this.imgGallerySelect()}>
                            <View style={{ borderWidth: wp('.3%'), padding: wp('5%'), marginRight: wp('5%'), borderRadius: wp('3%') }}>
                              <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium }}>Gallery</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => this.cameraSelect()}>
                            <View style={{ borderWidth: wp('.3%'), padding: wp('5%'), borderRadius: wp('3%') }}>
                              <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium }}>Camera</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>

                </View>
              </View>
              {/* } */}
            </ScrollView>
          </MenuProvider>
          : <ActivityIndicator size={'large'} color={"#D83772"} style={{}}></ActivityIndicator>}

      </View>


    );
  }
}



const UpdateDealsScreenElements = connectWithContext(
  MamographyContextProvider
)({
  eventsProps: MamographyContextConsumer,
  updateDealProps: MamographyContextConsumer,
})(UpdateDealsScreen);

export default UpdateDealsScreenElements;

const styles = StyleSheet.create({
  inputView: {
    width: AppUtils.getDeviceWidth() - 30,
    height: 45,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 45,
    width: '85%',
    color: AppColors.colorBlack,
  },
  IconInTextInput: {
    marginRight: 30,
    marginTop: 2,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  dropdown: {
    margin: 16,
    height: wp('3%'),
    width: wp('85%'),

  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropDownView: {
    backgroundColor: '#F5F6F9',
    marginRight: wp('1%'),
    borderRadius: wp('3%')
  },
  container: {
    ...Platform.select({
      ios: {
        alignSelf: "center",
        justifyContent: "center",
      },
      android: {
        alignSelf: "center",
        justifyContent: "center",
      },
    }),
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    ...Platform.select({
      ios: {
        borderTopWidth: 10,
        width: "75%",
      },
      android: {
        borderRadius: 10,
        width: "75%",
      },
    }),
    backgroundColor: AppColors.colorWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppColors.colorGray,
    borderWidth: 2,
    padding: 16,
  },
  dropDownView: {
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
})