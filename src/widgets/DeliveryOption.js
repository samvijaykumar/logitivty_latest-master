import React from "react";
import {
    View,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    Text
} from "react-native";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import AppStrings from "../utils/AppStrings";
import TextViewMedium from "./TextViewMedium";
import TouchableImageView from "./TouchableImageView";
import TextViewNormal from "./TextViewNormal";
import { StyleSheet } from "react-native";
import AppUtils from "../utils/AppUtils";
import { MenuProvider } from "react-native-popup-menu";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import DropDownView from "./DropDownView";
import DropDownViewFranchise from "./DropDownViewFranchise";
import { GestureHandlerRootView } from "react-native-gesture-handler";
class DeliveryOption extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemSelected: 0,
            isNotificationOn: 1,
            cityName: '',
            cityId: '',
            cityList: [],
            centerList: [],
            tempCenterList: [],
            tempCityList: [],
            centerName: '',
            centerId: ''
        }
    }

    async componentDidMount() {
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible != this.props.visible && this.props.visible) {
            console.log('cityList Update', this.props.cityList)
           await this.setState({ cityList: this.props.cityList, tempCityList: this.props.cityList });
        }
    }
    handleTabClick = (id) => {
        this.setState({ itemSelected: id })
        this.props.selectedDeliveryOption && this.props.selectedDeliveryOption(id)
    }
    showShippingAddress = (status) => {
        this.props.showAddressList && this.props.showAddressList(status)
    }
    async getCenter(item) {
        console.log('getCenter', item)
        
        if (item.mammography_center.length > 0) {
            //     item.mammography_center.forEach(async (element) => {
            //     let d = { name: element.name, id: element.id };
            //     this.state.tempCenterList.push(d);
            //   });

            await this.setState({
                centerList: item.mammography_center, tempCenterList: item.mammography_center
            });

        }
        // await this.setState({ cityList: [], cityName: '', cityId: '', });

    }
    doCitySearch = (_searchCity) => {
        if (!AppUtils.isNull(_searchCity)) {
            console.log('cityname', _searchCity)

            this.setState({ cityList: this.state.tempCityList.filter(item => !AppUtils.isNull(item.name)).filter(item => item.name.toLowerCase().includes(_searchCity.toLowerCase())) });

        } else {

            this.setState({ cityList: this.state.tempCityList });
        }
    }
    doCenterSearch = (_searchCenter) => {
        if (!AppUtils.isNull(_searchCenter)) {
            console.log('_searchCenter', _searchCenter)

            this.setState({ centerList: this.state.tempCenterList.filter(item => !AppUtils.isNull(item.name)).filter(item => item.name.toLowerCase().includes(_searchCenter.toLowerCase())) });

        } else {

            this.setState({ centerList: this.state.tempCenterList });
        }
    }
    saveFranchiseDetails = async (details) => {
        var data = {
            "centerName": details.name, "centerId": details.id,
            "cityName": this.state.cityName, "cityId": this.state.cityId,
        }
        console.log('saveFranchiseDetails', data)
        await this.props.saveFranchiseDet && this.props.saveFranchiseDet(data)
    }
    saveFranchiseCityDetails = async (details) => {
        var data = {
            "centerName": this.state.centerName, "centerId": this.state.centerId,
            "cityName": details.name, "cityId": details.id,
        }
        console.log('saveFranchiseCityDetails', data)
        await this.props.saveFranchiseDet && this.props.saveFranchiseDet(data)
    }
    render() {
        const { visible,
            updatedAt = 0
        } = this.props;
        const {
            cityName, cityId, centerList, centerName, centerId, cityList, tempCenterList
        } = this.state;

        console.log('cityList', cityList)

        if (!this.props.visible) {
            return null
        }

        return (
           
                <View style={{
                    width: '100%',
                    backgroundColor: '#ffffff', justifyContent: 'center',
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                        <TextViewMedium text='please select delivery option' textStyle={{ fontSize: 15 }}></TextViewMedium>

                    </View>
                    {/* <TouchableOpacity
                        onPress={() => this.handleTabClick(1)}
                    >
                        <View
                            style={{
                                alignSelf: 'center',
                                flexDirection: 'row',
                                width: AppUtils.getDeviceWidth() - 40,
                                height: 45,
                                flex: 1,
                                marginTop: 15,
                                borderRadius: 20,
                                borderWidth: 1,
                                alignItems: 'center',
                                backgroundColor: this.state.itemSelected == 1
                                    ? '#FFF3E4'
                                    : '#F8F8F8',
                                borderColor: this.state.itemSelected == 1 ? '#FCAF3D' : '#DDDDDD'
                            }}
                        >

                            <TextViewMedium
                                text={'self pickup'}
                                textStyle={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    fontSize: 16,
                                    flex: 1,
                                    color: AppColors.colorBlack,
                                    textAlign: 'left',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                            />
                            <View
                                style={{
                                    justifyContent: 'center',
                                    marginRight: 10
                                }}
                            >
                                {this.state.itemSelected == 1
                                    ?
                                    <Image
                                        style={styles.icon_style}
                                        source={
                                            ResourceUtils.images.green_checked

                                        }
                                    /> : null
                                }
                            </View>
                        </View>
                    </TouchableOpacity> */}
                    {this.state.itemSelected == 1 ?
                        <View>
                            <View
                                style={{
                                    marginTop: 20,
                                    marginLeft: 20,
                                }}
                            >
                                <TextViewMedium
                                    textStyle={{ fontSize: 14, textAlign: 'left' }}
                                    text={'choose DSA city'}
                                />
                            </View>
                            <View style={styles.inputView1}>
                                <DropDownViewFranchise
                                    onPress={(value) => {
                                        this.setState({
                                            cityName: value.name,
                                            cityId: value.id,
                                        });
                                        this.getCenter(value);
                                        this.saveFranchiseCityDetails(value)
                                    }}
                                    doCitySearch={async (value) => {
                                        this.doCitySearch(value);
                                    }}
                                    searchType={'city'}
                                    showArrow={true}
                                    triggerTextColor={AppColors.colorBlack}
                                    items={cityList}
                                    title={
                                        AppUtils.isNull(cityName) ? 'choose city' : cityName

                                    }
                                />

                            </View>
                            {!AppUtils.isNull(cityName) ? (
                                <View>
                                    <View
                                        style={{
                                            marginTop: 15,
                                            marginLeft: 20,
                                        }}
                                    >
                                        <TextViewMedium
                                            textStyle={{ fontSize: 14, textAlign: 'left' }}
                                            text={'choose DSA'}
                                        />
                                    </View>

                                    <View style={styles.inputView1}>
                                        <DropDownViewFranchise
                                            onPress={(value) => {
                                                this.setState({
                                                    centerName: value.name,
                                                    centerId: value.id,
                                                    centerList: tempCenterList
                                                });
                                                this.saveFranchiseDetails(value)
                                            }}
                                            searchType={'choose DSA'}
                                            doCenterSearch={async (value) => {
                                                this.doCenterSearch(value);
                                            }}
                                            showArrow={true}
                                            triggerTextColor={AppColors.colorBlack}
                                            items={centerList}
                                            title={
                                                AppUtils.isNull(centerName) ? 'choose DSA' : centerName
                                            }
                                        />

                                    </View>
                                </View>) : null}
                        </View>
                        : null}
                    <TouchableOpacity
                        onPress={() => this.handleTabClick(2)}
                    >
                        <View
                            style={{
                                alignSelf: 'center',
                                flexDirection: 'row',
                                width: AppUtils.getDeviceWidth() - 40,
                                height: 45,
                                flex: 1,
                                marginTop: 20,
                                borderRadius: 20,
                                borderWidth: 1,
                                alignItems: 'center',
                                backgroundColor: this.state.itemSelected == 2
                                    ? '#FFF3E4'
                                    : '#F8F8F8',
                                borderColor: '#DDDDDD',
                            }}
                        >

                            <TextViewMedium
                                text={'shipping option'}
                                textStyle={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    fontSize: 16,
                                    flex: 1,
                                    color: AppColors.colorBlack,
                                    textAlign: 'left',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                            />
                            <View
                                style={{
                                    justifyContent: 'center',
                                    marginRight: 10
                                }}
                            >
                                {this.state.itemSelected == 2
                                    ?
                                    <Image
                                        style={styles.icon_style}
                                        source={
                                            ResourceUtils.images.green_checked

                                        }
                                    /> : null
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    {this.state.itemSelected == 2 ?
                        <View style={{ marginLeft: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, width: AppUtils.getDeviceWidth() - 20, }}>
                            <View style={{ marginLeft: 0 }}>
                                <TextViewNormal
                                    textStyle={{
                                        color: '#212121',
                                        fontSize: 14,
                                        marginLeft: 10,
                                    }}
                                    text={'same as billing address'}
                                />
                            </View>
                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity onPress={async () => {

                                    await this.setState({
                                        isNotificationOn: this.state.isNotificationOn == 0 ? 1 : 0,
                                    })
                                    this.showShippingAddress(this.state.isNotificationOn);


                                }}>
                                    <Image style={styles.social_Icon} source={this.state.isNotificationOn ? ResourceUtils.images.ic_notification_blue : ResourceUtils.images.ic_notification_gray} />
                                </TouchableOpacity>
                            </View>

                        </View> : null}
                </View>
               
           

        );
    }

}
export default DeliveryOption;
const styles = StyleSheet.create({
    icon_style: {
        width: 25,
        height: 25,
        marginLeft: 15,
    },
    inputView1: {
        width: AppUtils.getDeviceWidth() - 40,
        alignSelf: 'center',
        height: 50,
        marginLeft: 1, marginTop: 8,
        marginRight: 1,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: AppColors.inputviewBoxColor,
    },
    social_Icon: {
        marginRight: 3,
        width: 50,
        height: 40,
        resizeMode: 'contain',
    }
})
