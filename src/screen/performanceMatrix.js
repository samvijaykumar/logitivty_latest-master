import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,BackHandler } from 'react-native';
import ResourceUtils from '../utils/ResourceUtils';
import TopBarEcommerce from '../widgets/TopBarEcommerce';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';
import AppUtils from '../utils/AppUtils';

export default class performanceMatrix extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

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
    resetStack = () => {
        this.props.navigation.goBack()
    }
    componentDidMount(){
        AppUtils.showAlert('Coming Soon...')
    }
    render() {
        return (
            <ScrollView>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <TopBarEcommerce
                        screenTitle={'performance matrix'}
                        visibleCart={false}
                        visibleFav={false}
                        visibleSearch={false}
                        onPressBack={() => {
                            this.resetStack();
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('3%'), marginLeft: wp('4%'), marginRight: wp('4%') }}>
                        <View style={{ backgroundColor: '#0000001A', flex: 2, borderRadius: wp('3%'), marginRight: wp('3%') }}>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), padding: wp('3%'), color: 'grey' }}>Personal Leads</Text>
                        </View>
                        <View style={{ backgroundColor: '#ED3C3F33', flex: .5, borderRadius: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: '#ED3C3F' }}>43</Text>
                        </View>
                        <View style={{ backgroundColor: '#0000001A', flex: .5, borderRadius: wp('3%'), marginLeft: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: 'grey' }}>86</Text>
                        </View>
                    </View>

                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={this.state.city}
                        maxHeight={300}
                        labelField="city"
                        value="value"
                        placeholder="Overall/Month"
                        onChange={item => {
                            console.log(item)
                            this.setState({ selectedCity: item })
                        }}
                    />
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('1%'), marginLeft: wp('4%'), marginRight: wp('4%') }}>
                            <View style={{ justifyContent: 'center', flex: 2, borderRadius: wp('3%'), marginRight: wp('3%') }}>
                                <Text style={{ backgroundColor: '#0000001A', borderRadius: wp('3%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), padding: wp('3%'), color: 'grey' }}>Direct Closure 54</Text>
                            </View>
                            <View style={{ flex: .5, borderRadius: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), }}>actual</Text>
                                <Text style={{ backgroundColor: '#ED3C3F33', padding: wp('3%'), borderRadius: wp('3%'), paddingLeft: wp('5%'), paddingRight: wp('5%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: '#ED3C3F' }}>43</Text>

                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%') }}>42%</Text>
                            </View>
                            <View style={{ flex: .5, borderRadius: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), }}>ideal</Text>
                                <Text style={{ backgroundColor: '#0000001A', padding: wp('3%'), borderRadius: wp('3%'), paddingLeft: wp('5%'), paddingRight: wp('5%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: 'grey' }}>54</Text>

                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), color: 'white' }}>42%</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('1%'), marginLeft: wp('4%'), marginRight: wp('4%') }}>
                            <View style={{ justifyContent: 'center', flex: 2, borderRadius: wp('3%'), marginRight: wp('3%') }}>
                                <Text style={{ backgroundColor: '#0000001A', borderRadius: wp('3%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), padding: wp('3%'), color: 'grey' }}>Referral Provider</Text>
                            </View>
                            <View style={{ flex: .5, borderRadius: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), color: 'white' }}>actual</Text>
                                <Text style={{ backgroundColor: '#ED3C3F33', padding: wp('3%'), borderRadius: wp('3%'), paddingLeft: wp('3%'), paddingRight: wp('3%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: '#ED3C3F' }}>45%</Text>

                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%') }}>74%</Text>
                            </View>
                            <View style={{ flex: .5, borderRadius: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), color: 'white' }}>ideal</Text>
                                <Text style={{ backgroundColor: '#0000001A', padding: wp('3%'), borderRadius: wp('3%'), paddingLeft: wp('3%'), paddingRight: wp('3%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: 'grey' }}>50%</Text>

                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), color: 'white' }}>42%</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('1%'), marginLeft: wp('4%'), marginRight: wp('4%') }}>
                            <View style={{ justifyContent: 'center', flex: 2, borderRadius: wp('3%'), marginRight: wp('3%') }}>
                                <Text style={{ backgroundColor: '#0000001A', borderRadius: wp('3%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), padding: wp('3%'), color: 'grey' }}>Average Referral</Text>
                            </View>
                            <View style={{ flex: .5, borderRadius: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), color: 'white' }}>actual</Text>
                                <Text style={{ backgroundColor: '#ED3C3F33', padding: wp('3%'), borderRadius: wp('3%'), paddingLeft: wp('5%'), paddingRight: wp('5%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: '#ED3C3F', minWidth: wp('13%') }}>4</Text>

                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%') }}>40%</Text>
                            </View>
                            <View style={{ flex: .5, borderRadius: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), color: 'white' }}>ideal</Text>
                                <Text style={{ backgroundColor: '#0000001A', padding: wp('3%'), borderRadius: wp('3%'), paddingLeft: wp('5%'), paddingRight: wp('5%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: 'grey' }}>10</Text>

                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), color: 'white' }}>42%</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('1%'), marginLeft: wp('4%'), marginRight: wp('4%') }}>
                            <View style={{ justifyContent: 'center', flex: 2, borderRadius: wp('3%'), marginRight: wp('3%') }}>
                                <Text style={{ backgroundColor: '#0000001A', borderRadius: wp('3%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), padding: wp('3%'), color: 'grey' }}>Referral Closure</Text>
                            </View>
                            <View style={{ flex: .5, borderRadius: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), color: 'white' }}>actual</Text>
                                <Text style={{ backgroundColor: '#ED3C3F33', padding: wp('3%'), borderRadius: wp('3%'), paddingLeft: wp('3%'), paddingRight: wp('3%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: '#ED3C3F' }}>32%</Text>

                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%') }}>124%</Text>
                            </View>
                            <View style={{ flex: .5, borderRadius: wp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), }}>ideal</Text>
                                <Text style={{ backgroundColor: '#0000001A', padding: wp('3%'), borderRadius: wp('3%'), paddingLeft: wp('5%'), paddingRight: wp('5%'), fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: wp('3.5%'), color: 'grey' }}>54</Text>

                                <Text style={{ fontFamily: ResourceUtils.fonts.poppins_semibold, fontSize: wp('3%'), color: 'white' }}>42%</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{ textAlign: 'center', fontFamily: ResourceUtils.fonts.poppins_medium, fontSize: wp('4.5%'), backgroundColor: '#dfffc2', padding: wp('3%'), marginLeft: wp('3%'), marginRight: wp('3%') }}>keep your Score in Green To Retire Rich</Text>
                </View>
            </ScrollView>
        );
    } X
}
const styles = StyleSheet.create({


    dropdown: {
        margin: 16,
        //   height: wp('3%'),
        width: wp('90%'),
        backgroundColor: '#F5F6F9',
        borderRadius: wp('2%'),
        padding: wp('1%')
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
        marginRight: wp('4%'),
        borderRadius: wp('3%'),
        marginLeft: wp('4%'),
        marginTop: wp('3%')
    }
})

