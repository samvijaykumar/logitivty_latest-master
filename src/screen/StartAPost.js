import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, BackHandler } from 'react-native';
import TopBarEcommerce from '../widgets/TopBarEcommerce';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppColors from '../utils/AppColors';
import ResourceUtils from '../utils/ResourceUtils';
import AppUtils from '../utils/AppUtils';
import { Dropdown } from 'react-native-element-dropdown';

const date_data = [
    { label: 'For Club Member', value: '1' },
    { label: 'For DSA', value: '2' },
    { label: 'For Referral by Club Member', value: '2' },
];
export default class CommunityTalks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    resetStack = () => {
        this.props.navigation.goBack()
    }

    
    
    
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

        // BackHandler.removeEventListener('backPress', () => {
        //     return true
        // });
    }
    handleBackButtonClick() {
        this.resetStack()
        return true;
    }



    render() {
        const {
            _email,
            _fullName,
            _phoneNo,
            ref_code,
            stateList,
            cityList,
            isDialogVisible,
            cityName,
            stateName,
            stateId,
            cityId,
            gender,
            dob,
            profile,
        } = this.state;
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <TopBarEcommerce
                    screenTitle={'Start A Post'}
                    visibleCart={false}
                    visibleFav={false}
                    visibleSearch={false}
                    onPressBack={() => {
                        this.resetStack();
                    }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('2.5%'), marginLeft: wp('2%') }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ backgroundColor: '#EEEEEE', padding: wp('2.9%'), marginRight: wp('2%'), alignItems: 'center' }}>

                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3%') }}>Select</Text>


                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={date_data}
                            // search
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder="Relationships"
                            // searchPlaceholder="Search..."
                            // value={this.state.date}
                            onChange={item => {
                                console.log(item)
                                this.setState({ year: item, dropDownVisible: false })
                            }}
                        />
                    </View>

                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('2.5%'), marginLeft: wp('2%') }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ backgroundColor: '#EEEEEE', padding: wp('2.9%'), marginRight: wp('2%'), alignItems: 'center' }}>

                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('3%') }}>Privacy</Text>


                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2 }}>

                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={date_data}
                            // search
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder="Use Name, & Profile Pic"
                            // searchPlaceholder="Search..."
                            // value={this.state.date}
                            onChange={item => {
                                console.log(item)
                                this.setState({ year: item, dropDownVisible: false })
                            }}

                        />
                    </View>

                </View>


                <Text style={{ textAlign: 'center', marginTop: wp('2%'), fontSize: wp('3.5%'), fontFamily: ResourceUtils.fonts.poppins_medium }}>ADD THE POST:</Text>
                <View style={{ alignItems: 'center', marginTop: wp('2%') }}>
                    <View style={{
                        width: AppUtils.getDeviceWidth() - 30,
                        height: wp('40%'),

                        backgroundColor: AppColors.inputviewBoxColor,
                        flexDirection: 'row',
                        borderRadius: 15,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: AppColors.inputviewBoxColor,
                    }}>
                        <TextInput
                            placeholder={''}
                            placeholderTextColor={AppColors.editTextPlaceHolderColor}
                            myRef={(ref) => (this.userName = ref)}
                            placeholderImg={ResourceUtils.images.img_help}
                            returnKeyType="next"
                            onChangeText={(profile) => this.setState({ _email })}
                            text={_email}
                            value={_email}
                            multiline={true}
                            style={{
                                marginLeft: 20,
                                fontSize: 15,
                                height: wp('40%'),
                                width: '85%',
                                color: AppColors.colorBlack,
                                textAlignVertical: 'top'
                            }}
                        />

                    </View>
                </View>
                <View style={{flex:1,justifyContent:'flex-end',paddingBottom:wp('2%')}}>
                <View style={{ }}>
                    <TouchableOpacity style={{ backgroundColor: '#D83772', alignItems: 'center', borderRadius: wp('5%'), padding: wp('2%'),marginLeft:wp('3%'),marginRight:wp('3%') }}>
                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: 'white', fontSize: wp('3.5%') }}>post</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: wp('6%') }}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CommunityTalks')}} style={{ backgroundColor: '#D83772', alignItems: 'center', borderRadius: wp('5%'), padding: wp('2%'),marginLeft:wp('3%'),marginRight:wp('3%') }}>
                        <Text style={{ fontFamily: ResourceUtils.fonts.poppins_medium, color: 'white', fontSize: wp('3.5%') }}>my all posts</Text>
                    </TouchableOpacity>
                </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    dropdown: {
        // margin: 16,
        // marginBottom:wp('3%'),
        // marginLeft:wp('2%'),
        marginRight: wp('2%'),
        // height: wp('3.2%'),
        backgroundColor: '#EEEEEE', flex: 2,
        padding: wp('2%')
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: wp('3.5%'),
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
        flex: 1,
        borderRadius: wp('1%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateText: {
        textAlignVertical: 'center',
        fontSize: wp('3.5%'),
        paddingTop: wp('2%'),
        paddingBottom: wp('2%'),
        fontFamily: ResourceUtils.fonts.poppins_medium,
        color: 'grey',
        marginLeft: wp('2%')
    },
    calendarIcon: {
        width: wp('3.5%'),
        height: wp('3.5%'),
        marginRight: wp('3%')
    }
});
