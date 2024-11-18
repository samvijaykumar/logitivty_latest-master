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
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import TopImageView from '../../widgets/TopImageView';
import { Card } from 'react-native-elements/dist/card/Card';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import TextViewNormal from '../../widgets/TextViewNormal';
import { MenuProvider } from 'react-native-popup-menu';
import { CheckBox, } from 'react-native-elements';

import { TouchableOpacity } from 'react-native';
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

var checkedFamilyMemb;

var termsArray;
class AddBusinessProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseDataList: [],
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
            imageSelect: false,
            _imageUrl: '',
            uri: '',
            type: '',
            name: '',
            variant: 'veg',

            selectbusinesstype: 0,
            selectbusinessmode: 0,
            brand_name: '',
            business_category: '',
            google_location: '',
            business_address: '',
            store_timing: '',
            customer_support_physical: '',
            customer_support_online: '',
            online_business_url: '',
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    componentDidMount() {
        let data = {};
    }

    dialogOpen = () => {
        this.setState({ isDialogVisible: true });
    };

    dialogOpenEndDate = () => {
        this.setState({ isDialogVisibleEndDate: true });
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.eventsProps.loading !== this.props.eventsProps.loading &&
            !this.props.eventsProps.loading
        ) {
            console.log("responseDataList: " + JSON.stringify(this.props.eventsProps.response))
            this.setState({
                loader: false
            })

            let response = this.props.eventsProps.response;
            // this.setState({
            //     responseDataList: response.data
            // });



            this.setState({
                responseDataList: response.data
            });

            if (response.statusCode === 200) {
                AppUtils.showAlert(response.message)
                this.props.navigation.navigate("PromoteYourBusinessScreen");
            }
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


    imgGallerySelect() {
        const options = {
            rotation: 90,
            quality: 1,
            maxWidth: 1000,
            maxHeight: 1000,
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
                        width: 300,
                        height: 300,
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
                /////crop image


                ImagePicker.openCropper({
                    path: photo.uri,
                    width: 300,
                    height: 300
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
        if (AppUtils.isNull(this.state.brand_name)) {
            AppUtils.showAlert('Please enter brand name')
        } else if (AppUtils.isNull(this.state.business_category)) {
            AppUtils.showAlert('Please enter Business category')
        }
        // else if (this.state.selectbusinessmode === 0 && AppUtils.isNull(this.state.google_location)) {
        //     AppUtils.showAlert('Please enter Google Location URL')
        // } 
        else if (this.state.selectbusinessmode === 0 && AppUtils.isNull(this.state.business_address)) {
            AppUtils.showAlert('Please enter business address')
        } else if (this.state.selectbusinessmode === 0 && AppUtils.isNull(this.state.store_timing)) {
            AppUtils.showAlert('Please enter store timing')
        } else if (this.state.selectbusinessmode === 1 && AppUtils.isNull(this.state.online_business_url)) {
            AppUtils.showAlert('Please enter online business url')
        } else if (this.state.selectbusinessmode === 1 && AppUtils.isNull(this.state.customer_support_online)) {
            AppUtils.showAlert('Please enter Customer support')
        } else {
            this.setState({
                loader: true
            })
            // console.log("this.state.uri: ", this.state.uri)
            // console.log("this.state.start_date: ", this.state.start_date)
            // console.log("this.state.end_date: ", this.state.end_date)
            // console.log("this.state.description: ", this.state.description)

            if (this.state.uri != '') {

                var photo = {
                    uri: this.state.uri,
                    type: this.state.type,
                    name: this.state.name,
                };
                console.log("photos: ", JSON.stringify(photo))

                // var terms_of_use:[{"term":"test term 1"},{"term":"test term 2"},{"term":"test term 3"},{"term":"test term 4"}]
                // console.log("termsArray: ", JSON.stringify(termsArray))



                var data = new FormData();

                var business_type = ''


                if (this.state.selectbusinesstype === 0) {
                    business_type = 'product'
                } else { business_type = 'service' }

                if (this.state.selectbusinessmode === 0) {
                    data.append('logo', photo);
                    data.append('brand_name', this.state.brand_name);
                    data.append('bussiness_category', this.state.business_category);
                    data.append('bussiness_type', business_type);
                    data.append('bussiness_mode', 'physical');
                    data.append('google_location', this.state.google_location);
                    data.append('bussiness_address', this.state.business_address);
                    data.append('store_timing', this.state.store_timing);
                    data.append('customer_support_number', this.state.customer_support_physical);
                    data.append('online_bussiness_url', '');
                }
                if (this.state.selectbusinessmode === 1) {
                    data.append('logo', photo);
                    data.append('brand_name', this.state.brand_name);
                    data.append('bussiness_category', this.state.business_category);
                    data.append('online_bussiness_url', this.state.online_business_url);
                    data.append('bussiness_type', business_type);
                    data.append('bussiness_mode', 'online');
                    data.append('customer_support_number', this.state.customer_support_online);
                }

                console.log("data: ", data)

                this.props.eventsProps.getAddBussinessApi(data);
            }
            else {
                this.setState({
                    loader: false
                })
                AppUtils.showAlert('Image is required')
            }
        }

        // if (this.state.uri != '') {
        //   const userData = await UserSession.getUserSessionData()
        //   var myHeaders = new Headers();
        //   myHeaders.append("Authorization", `Bearer ${userData.token}`);
        //   var photo = {
        //     uri: this.state.uri,
        //     type: this.state.type,
        //     name: this.state.name,
        //   };
        //   var formdata = new FormData();
        //   formdata.append("food_type", this.state.variant);
        //   formdata.append("diet_type", this.props.navigation.state.params.dietType);
        //   formdata.append("calories", this.state.calories);
        //   formdata.append("rate_food_cat", this.state.value);
        //   formdata.append("food_image", photo);

        //   var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: formdata,
        //     redirect: 'follow'
        //   };

        //   fetch(NetworkConstants.BASE_URL + "add_food", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //       this.setState({
        //         loader: false
        //       })
        //       console.log(result)
        //       if (result.statusCode == 200) {
        //         AppUtils.showAlert(`kudos! don't forget to log your food next time`)
        //         this.resetStack()
        //       }
        //       else {
        //         AppUtils.showAlert(`kudos! don't forget to log your food next time`)
        //       }
        //     })
        //     .catch(error => console.log('error', error));
        // }
        // else {
        //   this.setState({
        //     loader: false
        //   })
        //   AppUtils.showAlert('Image is required')
        // }
    }

    render() {
        const { brand_name, business_category,
            google_location,
            business_address,
            store_timing,
            customer_support_physical,
            customer_support_online,
            online_business_url,
            isDialogVisible, isDialogVisibleEndDate, currentterms,
            helplineDataList, description, start_date, imagename,
            end_date, showterms2, showterms3, showterms4, showterms5, imageuploaded,
            terms1, terms3, terms2, terms4, terms5 } = this.state;
        return (
            <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
                <TopBarEcommerce
                    screenTitle={'promote your business'}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                />
                <ScrollView style={{ backgroundColor: AppColors.colorWhite }}>

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
                                        text={imageuploaded ? 'logo selected' : 'upload logo'}
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


                            {/* ////// enter brand name ////////// */}


                            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>enter brand name</Text>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.inputView}>
                                    <TextInput
                                        placeholder={''}
                                        placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                        // myRef={(ref) => (this.userName = ref)}
                                        // placeholderImg={ResourceUtils.images.img_help}
                                        // returnKeyType="next"
                                        onChangeText={(brandnamedata) => this.setState({ brand_name: brandnamedata })}
                                        text={brand_name}
                                        value={brand_name}
                                        style={styles.inputStype}
                                    />
                                    {/* <Image
                                        style={styles.IconInTextInput}
                                        source={ResourceUtils.images.user}
                                    /> */}
                                </View>
                            </View>


                            {/* ////////////////enter business category/////////// */}

                            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>enter business category</Text>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.inputView}>
                                    <TextInput
                                        placeholder={''}
                                        // placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                        // myRef={(ref) => (this.userName = ref)}
                                        // placeholderImg={ResourceUtils.images.img_help}
                                        // returnKeyType="next"
                                        onChangeText={(businesscategorydata) => this.setState({ business_category: businesscategorydata })}
                                        text={business_category}
                                        value={business_category}
                                        style={styles.inputStype}
                                    />
                                    <Image
                                        style={styles.IconInTextInput}
                                        source={ResourceUtils.images.business_category}
                                    />
                                </View>
                            </View>
                            {/* </View> */}

                            {/* //////////////////////////////////// */}

                            {/* //////////////// business type/////////// */}

                            {/* <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('1%'), marginTop: wp('4%') }}>business type</Text>
 <View style={{ flexDirection: 'row', flex: 2 }}>
                                <View style={{ flex: 1 }}>
                                    <CheckBox
                                        checkedColor={AppColors.primaryColor}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.selectbusinesstype == 0}
                                        title={'product'}
                                        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                        onPress={() => this.setState({ selectbusinesstype: 0 })}
                                    />

                                </View>

                                <View style={{ flex: 1 }}>
                                    <CheckBox
                                        checkedColor={AppColors.primaryColor}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.selectbusinesstype == 1}
                                        title={'service'}
                                        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                        onPress={() => this.setState({ selectbusinesstype: 1 })}
                                    />
                                </View> */}

                            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('1%'), marginTop: wp('6%') }}>business Type</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:15,marginHorizontal:10 }}>
                                        {/* Product */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => this.setState({ selectbusinesstype: 0 })}>
                                                <Image
                                                    source={this.state.selectbusinesstype === 0 ? ResourceUtils.images.checkedRadio : ResourceUtils.images.uncheckedRadio}
                                                    style={{ width: 20, height: 20, borderRadius: 10 }}
                                                />
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 5 }}>product</Text>
                                        </View>
                                        {/* Space */}
                                        <View style={{marginRight :wp(22)}}/>
                                        {/* Service */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => this.setState({ selectbusinesstype: 1 })}>
                                                <Image
                                                    source={this.state.selectbusinesstype === 1 ? ResourceUtils.images.checkedRadio : ResourceUtils.images.uncheckedRadio}
                                                    style={{ width: 20, height: 20, borderRadius: 10 }}
                                                />
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 5 }}>service</Text>
                                        </View>
                                   

                            </View>

                            {/* //////////////////////////////////// */}

                            {/* //////////////// business mode/////////// */}

                            <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('1%'), marginTop: wp('6%') }}>business mode</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:15,marginHorizontal:10}}>
                                        {/* physical */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => this.setState({ selectbusinessmode: 0 })}>
                                                <Image
                                                    source={this.state.selectbusinessmode === 0 ? ResourceUtils.images.checkedRadio : ResourceUtils.images.uncheckedRadio}
                                                    style={{ width: 20, height: 20, borderRadius: 10 }}
                                                />
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 5 }}>physical</Text>
                                        </View>

                                        <View style={{marginRight :wp(22)}}/>
                                        
                                            {/* online */}
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => this.setState({ selectbusinessmode: 1 })}>
                                                    <Image
                                                        source={this.state.selectbusinessmode === 1 ? ResourceUtils.images.checkedRadio : ResourceUtils.images.uncheckedRadio}
                                                        style={{ width: 20, height: 20, borderRadius: 10 }}
                                                    />
                                                </TouchableOpacity>
                                                <Text style={{ marginLeft: 5 }}>online</Text>
                                            </View>
                                            </View>
                                           
                          
                            {/* <View style={{ flexDirection: 'row', flex: 2 }}> */}
                                {/* <View style={{ flex: 1 }}>
                                    <CheckBox
                                        checkedColor={AppColors.primaryColor}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.selectbusinessmode == 0}
                                        title={'physical'}
                                        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                        onPress={() => this.setState({ selectbusinessmode: 0 })}
                                    />

                                </View> */}

                                {/* <View style={{ flex: 1 }}>
                                    <CheckBox
                                        checkedColor={AppColors.primaryColor}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.selectbusinessmode == 1}
                                        title={'online'}
                                        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                        onPress={() => this.setState({ selectbusinessmode: 1 })}
                                    />
                                </View>

                            </View> */}






                            {/* //////////////////////////////////// */}

                            {
                                this.state.selectbusinessmode === 0 ?
                                    <View>

                                        {/* ////// enter google location.////////// */}


                                        <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>enter google location url</Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={styles.inputView}>
                                                <TextInput
                                                    placeholder={''}
                                                    placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                                    // myRef={(ref) => (this.userName = ref)}
                                                    // placeholderImg={ResourceUtils.images.img_help}
                                                    // returnKeyType="next"
                                                    onChangeText={(googlelocationdata) => this.setState({ google_location: googlelocationdata })}
                                                    text={google_location}
                                                    value={google_location}
                                                    style={styles.inputStype}
                                                />
                                                <Image
                                                    style={styles.IconInTextInput}
                                                    source={ResourceUtils.images.location_new}
                                                />
                                            </View>
                                        </View>


                                        {/* ////// business address ////////// */}


                                        <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>business address</Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={styles.inputView}>
                                                <TextInput
                                                    placeholder={''}
                                                    placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                                    // myRef={(ref) => (this.userName = ref)}
                                                    // placeholderImg={ResourceUtils.images.img_help}
                                                    // returnKeyType="next"
                                                    onChangeText={(businessaddressdata) => this.setState({ business_address: businessaddressdata })}
                                                    text={business_address}
                                                    value={business_address}
                                                    style={styles.inputStype}
                                                />
                                                <Image
                                                    style={styles.IconInTextInput}
                                                    source={ResourceUtils.images.onlineshop}
                                                />
                                            </View>
                                        </View>

                                        {/* ////// store timing.////////// */}
                                        <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>store timing</Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={styles.inputView}>
                                                <TextInput
                                                    placeholder={'ex. 10am-5pm'}
                                                    placeholderTextColor='#3c423e'
                                                    // myRef={(ref) => (this.userName = ref)}
                                                    // placeholderImg={ResourceUtils.images.img_help}
                                                    // returnKeyType="next"
                                                    onChangeText={(storetimingdata) => this.setState({ store_timing: storetimingdata })}
                                                    text={store_timing}
                                                    value={store_timing}
                                                    style={styles.inputStype}
                                                />
                                                <Image
                                                    style={styles.IconInTextInput}
                                                    source={ResourceUtils.images.time}
                                                />
                                            </View>
                                        </View>


                                        {/* //////enter customer support no.////////// */}


                                        <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>enter customer support no.</Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={styles.inputView}>
                                                <TextInput
                                                    placeholder={''}
                                                    placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                                    // myRef={(ref) => (this.userName = ref)}
                                                    // placeholderImg={ResourceUtils.images.img_help}
                                                    // returnKeyType="next"
                                                    onChangeText={(customer_support_physicaldata) => this.setState({ customer_support_physical: customer_support_physicaldata })}
                                                    text={customer_support_physical}
                                                    keyboardType={'phone-pad'}
                                                    value={customer_support_physical}
                                                    style={styles.inputStype}
                                                />
                                                <Image
                                                    style={styles.IconInTextInput}
                                                    source={ResourceUtils.images.phone}
                                                />
                                            </View>
                                        </View>


                                    </View>
                                    :
                                    <View>

                                        {/* ////// enter customer support no.////////// */}


                                        <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>enter customer support no.</Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={styles.inputView}>
                                                <TextInput
                                                    placeholder={''}
                                                    placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                                    // myRef={(ref) => (this.userName = ref)}
                                                    // placeholderImg={ResourceUtils.images.img_help}
                                                    // returnKeyType="next"
                                                    onChangeText={(customer_support_online_data) => this.setState({ customer_support_online: customer_support_online_data })}
                                                    text={customer_support_online}
                                                    value={customer_support_online}
                                                    keyboardType={'phone-pad'}
                                                    style={styles.inputStype}
                                                />
                                                <Image
                                                    style={styles.IconInTextInput}
                                                    source={ResourceUtils.images.phone}
                                                />
                                            </View>
                                        </View>


                                        {/* ////// online business url ////////// */}


                                        <Text style={{ marginLeft: wp('2%'), fontFamily: ResourceUtils.fonts.poppins_medium, marginBottom: wp('2%'), marginTop: wp('4%') }}>online business url</Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={styles.inputView}>
                                                <TextInput
                                                    placeholder={''}
                                                    placeholderTextColor={AppColors.editTextPlaceHolderColor}
                                                    // myRef={(ref) => (this.userName = ref)}
                                                    // placeholderImg={ResourceUtils.images.img_help}
                                                    // returnKeyType="next"
                                                    onChangeText={(online_business_urldata) => this.setState({ online_business_url: online_business_urldata })}
                                                    text={online_business_url}
                                                    value={online_business_url}
                                                    style={styles.inputStype}
                                                />
                                                <Image
                                                    style={styles.IconInTextInput}
                                                    source={ResourceUtils.images.pin}
                                                />
                                            </View>
                                        </View>



                                    </View>

                            }






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
                                <Text style={{ marginTop: 10, marginBottom: 10, fontFamily: ResourceUtils.fonts.poppins_semibold, marginLeft: 10, marginRight: 10, color: 'white', fontSize: 15 }}>save</Text>
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
                                date={AppUtils.formatedDateToDatePickerDate(start_date)}
                                mode={'date'}
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
                                date={AppUtils.formatedDateToDatePickerDate(end_date)}
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
                </ScrollView>

            </View>


        );
    }
}



const AddBusinessProfileElements = connectWithContext(
    MamographyContextProvider
)({
    eventsProps: MamographyContextConsumer,
})(AddBusinessProfile);

export default AddBusinessProfileElements;

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
})