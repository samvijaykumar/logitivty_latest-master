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

class ZeroProfitDiagnosticsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wellnessDataList: [],
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    componentDidMount() {
        let data = {};
        this.props.ZeroProfitDiagnosticsProps.getCheckupPackagesApi(
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

    async openMeetingUrl(meetingUrl) {
        Linking.openURL(meetingUrl);
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

                        <TextViewSemiBold
                            text={'zero-profit diagnostics'}
                            textStyle={{
                                textAlign: 'left',
                                fontSize: 20,
                                color: '#333333',
                                marginTop: 20,
                                marginBottom: 10,
                                marginLeft: 20,
                            }}
                        />
                        <View
                            style={{
                                alignSelf: "center",
                                marginTop: 10,
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#ffffff',
                            }}
                        >
                            {this.props.ZeroProfitDiagnosticsProps.loading ? (
                                <ActivityIndicatorView loading={true} />
                            ) : AppUtils.isEmpty(wellnessDataList) ? (
                                <NoDataFoundView />
                            ) : (

                                <FlatList
                                    style={{ flex: 1, width: '100%' }}
                                    data={wellnessDataList}
                                    horizontal={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
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

                                            <TouchableOpacity onPress={() => {
                                                item.id === 0
                                                    ? this.props.navigation.navigate(
                                                        'AiThermoMammography'
                                                    )
                                                    : this.props.navigation.navigate("ZeroProfitDiagnosticsDetailsScreen", { package_id: item.id });
                                            }}>
                                                <View style={{ alignItems: 'center', height: 140, flex: 4, flexDirection: 'row' }}>
                                                    <View style={{ flex: 1.5 }}>
                                                        <Image
                                                            style={styles.mammography_image_style}
                                                            source={{ uri: item.package_icon }}
                                                            resizeMode="contain"
                                                        />
                                                    </View>

                                                    <View
                                                        style={{
                                                            flex: 3,
                                                        }}
                                                    >
                                                        <TextViewSemiBold
                                                            text={item.package_title}
                                                            numberOfLines={2}
                                                            textStyle={{
                                                                fontSize: 14,
                                                                color: '#333333',
                                                                marginRight: 15
                                                            }}
                                                        />
                                                        {/* <View style={[styles.sepraterLineView]} /> */}

                                                        <TextViewNormal
                                                            text={'MRP: ' + AppStrings.currency_symbol + " " + (item.package_amount)}
                                                            numberOfLines={1}
                                                            textStyle={{
                                                                fontSize: 14,
                                                                color: '#333333',
                                                                marginRight: 15

                                                            }}
                                                        />

                                                        <TextViewNormal
                                                            text={'TLC Member Price: ' + AppStrings.currency_symbol + " " +  (item.tlc_amount)}
                                                            numberOfLines={2}
                                                            adjustsFontSizeToFit
                                                            textStyle={{
                                                                fontSize: 14,
                                                                color: '#333333',
                                                                marginRight: 15
                                                            }}
                                                        />
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    
                                    )}
                                />
                            )}
                        </View>
                    </View>
                </FlowWrapView>
            </MenuProvider>
        );
    }
}

const ZeroProfitDiagnosticsScreenElements = connectWithContext(
    MamographyContextProvider
)({
    ZeroProfitDiagnosticsProps: MamographyContextConsumer,
})(ZeroProfitDiagnosticsScreen);

export default ZeroProfitDiagnosticsScreenElements;

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
