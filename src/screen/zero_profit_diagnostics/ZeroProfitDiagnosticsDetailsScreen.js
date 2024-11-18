import React from 'react';
import { View, StatusBar, StyleSheet, Image, Linking, Text } from 'react-native';
import AppColors from '../../utils/AppColors';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import TopBackArrowView from '../../widgets/TopBackArrowView';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import TextViewNormal from '../../widgets/TextViewNormal';

import { MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native';
import MamographyContextProvider, {
    MamographyContextConsumer,
} from '../../context/MamographyContext';
import { FlatList } from 'react-native';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import NoDataFoundView from '../../widgets/NoDataFoundView';
import AppUtils from '../../utils/AppUtils';
import AppStrings from '../../utils/AppStrings';

class ZeroProfitDiagnosticsDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wellnessDataList: [],
            package_id: this.props.navigation.state.params.package_id
        };
        console.log("package_id ", this.state.package_id)
    }

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    componentDidMount() {
        let data = { "package_id": this.state.package_id };
        this.props.ZeroProfitDiagnosticsProps.getCheckupPackagesDetailsApi(
            data
        );
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.ZeroProfitDiagnosticsProps.loading !==
            this.props.ZeroProfitDiagnosticsProps.loading &&
            !this.props.ZeroProfitDiagnosticsProps.loading
        ) {
            let response = this.props.ZeroProfitDiagnosticsProps.response;
            if (response.statusCode == 200) {
                this.setState({
                    wellnessDataList: response.data,
                });
            }
        }
    }

    // async openMeetingUrl(meetingUrl) {
    //     Linking.openURL(meetingUrl);
    // }

    call(helplinenumber) {
        let phoneNumber = '';
        console.log("phoneNumber : ", phoneNumber)

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${helplinenumber}`;
        } else {
            phoneNumber = `telprompt:${helplinenumber}`;
        }

        Linking.openURL(phoneNumber);
    }

    render() {
        const { wellnessDataList } = this.state;
        return (
            <MenuProvider>
                <FlowWrapView>
                    <StatusBar
                        backgroundColor={AppColors.statusBarColor}
                        barStyle="light-content"
                    />

                    <View>
                        <TopBackArrowView
                            onPressBack={() => {
                                this.props.navigation.pop();
                            }}
                            onPressHome={() => {
                                this.props.navigation.navigate('Dashboard');
                            }}
                        />

{ this.props.ZeroProfitDiagnosticsProps.loading  ? <ActivityIndicatorView loading={true} /> :  

                        <View style={{ marginLeft: 15, marginRight: 15 }}>
                            <View
                                style={{
                                    shadowColor: "#FF94DA",
                                    shadowOpacity: 0.5,
                                    // flexDirection: "column",
                                    // flex: 1,
                                    margin: 10,
                                    borderWidth: 1,
                                    // justifyContentL: "center",
                                    borderRadius: 15,
                                    borderColor: "#FF94DA",
                                }}>

                                <View >
                                    <View style={{ alignItems: 'center', height: 140, flex: 4, flexDirection: 'row' }}>
                                        <View style={{ flex: 1.5 }}>
                                            <Image
                                                style={styles.mammography_image_style}
                                                source={{ uri: wellnessDataList.package_icon }}
                                                resizeMode="contain"
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flex: 3,
                                            }}
                                        >
                                            <TextViewSemiBold
                                                text={wellnessDataList.package_title}
                                                numberOfLines={2}
                                                textStyle={{
                                                    fontSize: 14,
                                                    color: '#333333',
                                                    marginRight: 15
                                                }}
                                            />
                                            {/* <View style={[styles.sepraterLineView]} /> */}

                                            <TextViewNormal
                                                text={'MRP: ' + AppStrings.currency_symbol + " " + wellnessDataList.package_amount}
                                                numberOfLines={1}
                                                textStyle={{
                                                    fontSize: 14,
                                                    color: '#333333',
                                                }}
                                            />

                                            <TextViewNormal
                                                text={'TLC Member Price: ' + AppStrings.currency_symbol + " " + wellnessDataList.tlc_amount}
                                                numberOfLines={2}
                                                adjustsFontSizeToFit
                                                textStyle={{
                                                    fontSize: 14,
                                                    color: '#333333',
                                                }}
                                            />
                                        </View>

                                    </View>
                                </View>
                            </View>
                            {/* <View style={{ flex: 4, alignItems: 'center', flexDirection: 'row', marginTop: 30, marginBottom: 10 }}>

                                <View style={{ flex: 1.7, borderColor: '#E1E1E1', borderWidth: 1, }} >

                                    <Image source={{ uri: wellnessDataList.package_icon }} style={{ alignSelf: 'center', margin: 15, width: 100, height: 80 }}></Image>


                                </View>
                                <View style={{ flex: 2.3 }} >
                                    <TextViewSemiBold
                                        text={wellnessDataList.package_title}
                                        numberOfLines={3}
                                        textStyle={{
                                            fontSize: 21,
                                            color: '#333333',
                                            marginLeft: 20,
                                            marginRight: 10
                                        }}
                                    />
                                </View>
                            </View> */}
                            <View style={{ backgroundColor: '#DDDDDD', height: 1, marginTop: 20 }}></View>

                            <TextViewSemiBold
                                text={'included in this package'}
                                numberOfLines={2}
                                textStyle={{
                                    fontSize: 18,
                                    color: '#333333',
                                    marginTop: 20
                                }}
                            />

                            {AppUtils.isObject(wellnessDataList) && wellnessDataList.checkup_package_lists.length > 0 ?

                                <FlatList
                                    style={{ flex: 1, width: '100%' }}
                                    data={wellnessDataList.checkup_package_lists}
                                    horizontal={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (

                                        <View style={{ flexDirection: 'row', marginTop: 15 }} >
                                            <Image source={ResourceUtils.images.ic_checked_round_green} style={{ width: 20, height: 20 }}></Image>
                                            <TextViewNormal
                                                numberOfLines={22222}
                                                text={item.title} 
                                                textStyle={{
                                                    fontSize: 15,
                                                    color: '#333333',
                                                    marginLeft: 10,
                                                    marginRight: 10
                                                }}
                                            /></View>
                                    )}
                                /> : null}


                            <TouchableOpacity style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }} onPress={() => this.call(9828791111)}>
                                <Image source={ResourceUtils.images.group3} style={{ width: '100%', height: 80 }}
                                    resizeMode={'contain'}
                                ></Image>
                            </TouchableOpacity>


                        </View>}

                        {/* <TextViewSemiBold
                            text={'zero-profit diagnostics'}
                            textStyle={{
                                textAlign: 'left',
                                fontSize: 20,
                                color: '#333333',
                                marginTop: 20,
                                marginBottom: 10,
                                marginLeft: 20,
                            }}
                        /> */}

                    </View>
                </FlowWrapView>
            </MenuProvider>
        );
    }
}

const ZeroProfitDiagnosticsDetailsScreenElements = connectWithContext(
    MamographyContextProvider
)({
    ZeroProfitDiagnosticsProps: MamographyContextConsumer,
})(ZeroProfitDiagnosticsDetailsScreen);

export default ZeroProfitDiagnosticsDetailsScreenElements;

const styles = StyleSheet.create({
    mammography_image_style: {
        width: 80,
        height: 80,
        alignSelf: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite,
    },

    sepraterLineView: {
        marginTop: 10,
        marginBottom: 10,
        width: '80%',
        height: 1,
        alignSelf: 'center',
        backgroundColor: "#FF94DA",
    },
});
