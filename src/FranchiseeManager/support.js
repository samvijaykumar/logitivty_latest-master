import React from 'react';
import { View, StatusBar, StyleSheet, Image, TextInput, Linking, BackHandler } from 'react-native';
import AppColors from '../utils/AppColors';
import TextViewMedium from '../widgets/TextViewMedium';
import FlowWrapView from '../widgets/FlowWrapView';
import ResourceUtils from '../utils/ResourceUtils';
import AppStrings from '../utils/AppStrings';
import ButtonView from '../widgets/ButtonView';
import { connectWithContext } from '../container';
import HelpContextProvider, {
    HelpContextConsumer,
} from '../context/HelpContext';
import TopImageView from '../widgets/TopImageView';
import { Card } from 'react-native-elements/dist/card/Card';
import TextViewSemiBold from '../widgets/TextViewSemiBold';
import TextViewNormal from '../widgets/TextViewNormal';
import { MenuProvider } from 'react-native-popup-menu';
import DropDownView from '../widgets/DropDownView';
import AppUtils from '../utils/AppUtils';
import UserProfileContextProvider, { UserProfileContextConsumer } from '../context/UserProfileContext';
class Support extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            something_went_worng: true,
            selectedRelation: {},
            SupportCategoriesList: [],
            category_id: '',
            subject: '',
            description: '',
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this.resetStack()
        return true;
    }
    resetStack = () => {
        this.props.navigation.goBack()
    }

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    componentDidMount() {
        let data = {};
        this.props.getSupportCategoriesProps.getSupportCategoriesApiCall(data);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.getSupportCategoriesProps.listLoading !==
            this.props.getSupportCategoriesProps.listLoading &&
            !this.props.getSupportCategoriesProps.listLoading
        ) {
            let response = this.props.getSupportCategoriesProps.listResponse;

            if (response.statusCode == 200) {
                console.log('getSupportCategoriesProps', response.data);
                this.setState({
                    SupportCategoriesList: response.data,
                    something_went_worng: true,
                });
            } else {
                this.setState({
                    something_went_worng: false,
                });
                // setTimeout(() => {
                //     AppUtils.showAlert(this.props.cityListProps.response.message);
                // }, 100)
            }
        }
        if (
            prevProps.submitSupportTicketProps.loading !==
            this.props.submitSupportTicketProps.loading &&
            !this.props.submitSupportTicketProps.loading
        ) {
            let response = this.props.submitSupportTicketProps.helpResponse;

            if (response.statusCode == 200) {
                console.log('submitSupportTicketProps', response.data);
                this.setState({
                    something_went_worng: true,
                });
                setTimeout(() => {
                    AppUtils.showAlert(
                        this.props.submitSupportTicketProps.helpResponse.message
                    );
                    this.setState({
                        category_id: '',
                        subject: '',
                        description: '',
                    });
                }, 100);
            } else {
                this.setState({
                    something_went_worng: false,
                });
            }
        }

        if (
            prevProps.userProps.checkListLoading !== this.props.userProps.checkListLoading &&
            !this.props.userProps.checkListLoading
        ) {
            let response = this.props.userProps.checkListResponse;

            let data = response.data
            if (data != null && data.length > 0) {
                Linking.openURL(`tel:${data[0].option_value}`)
            }
        }
    }

    submitAPICall() {
        const { category_id, subject, description } = this.state;
        var des = description.trim();

        /**
         * From Validations
         * */

        if (AppUtils.isNull(des)) {
            AppUtils.showAlert('Please add some description.');
        } else if (AppUtils.isNull(subject)) {
            AppUtils.showAlert('Please select at least one category.');
        } else {
            var data = {
                category_id: category_id,
                subject: subject,
                description: des,
            };
            this.props.submitSupportTicketProps.submitSupportTicket(data);
        }
    }

    render() {
        const {
            something_went_worng,
            description,
            category_id,
            subject,
            SupportCategoriesList,
        } = this.state;
        return (
            <MenuProvider>
                <FlowWrapView showLoader={this.props.getSupportCategoriesProps.listLoading}>
                    <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />

                    {something_went_worng == false ? (
                        <View
                            style={{
                                flexDirection: 'column',
                                marginTop: 150,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                style={styles.subscrption_image_style}
                                source={ResourceUtils.images.logo}
                            />
                            <TextViewMedium
                                text={'Oops!'}
                                textStyle={{
                                    textAlign: 'center',
                                    fontSize: 25,
                                    marginTop: 15,
                                    color: AppColors.primaryColor,
                                }}
                            />

                            <TextViewMedium
                                text={'Something Went Wrong. '}
                                textStyle={{
                                    textAlign: 'center',
                                    marginTop: 5,
                                    fontSize: 20,
                                    color: '#333333',
                                }}
                            />
                            <ButtonView
                                containerStyle={styles.RetryButtonTouch}
                                //   onPress={() => {
                                //     this.retryButtonCalled();
                                //   }}
                                text={AppStrings.btn_retray}
                            />
                        </View>
                    ) : null}
                    {something_went_worng == true ? (
                        <View>
                            <TopImageView
                                image={ResourceUtils.images.Help_banner}
                                onPress={() => {
                                    this.props.navigation.pop();
                                }}
                                text1={'how can'}
                                text2={'we help you?'}
                                textStyle={{ color: AppColors.colorBlack }}
                                onPressHome={() => { this.props.navigation.navigate('Dashboard') }}
                            />

                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <Card
                                    containerStyle={{
                                        shadowColor: '#ffffff',
                                        shadowOpacity: 0.2,
                                        margin: -1,
                                        marginTop: -5,
                                        borderRadius: 15,
                                        backgroundColor: '#ffffff',
                                        borderColor: '#ffffff',
                                        width: '99%',
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            marginTop: 10,
                                            marginBottom: 5,
                                        }}
                                    >
                                        <TextViewSemiBold
                                            text={'write us'}
                                            textStyle={{
                                                textAlign: 'left',
                                                fontSize: 16,
                                                color: '#000000',
                                            }}
                                        />

                                        <TextViewMedium
                                            text={
                                                'It looks like you are experiencing problems. We are here to help so please get in touch with us.'
                                            }
                                            textStyle={{
                                                textAlign: 'left',
                                                fontSize: 14,
                                                marginTop: 5,
                                                color: '#333333',
                                            }}
                                        />

                                        <TextViewSemiBold
                                            text={'select category'}
                                            textStyle={{
                                                textAlign: 'left',
                                                marginTop: 10,
                                                fontSize: 16,
                                                color: '#000000',
                                            }}
                                        />

                                        <View style={styles.inputView}>
                                            <DropDownView
                                                onPress={(value) => {
                                                    this.setState({
                                                        subject: value.name,
                                                        category_id: value.id,
                                                    });
                                                }}
                                                showArrow={true}
                                                triggerTextColor={AppColors.colorBlack}
                                                items={SupportCategoriesList}
                                                title={
                                                    AppUtils.isNull(subject)
                                                        ? 'please choose one'
                                                        : subject
                                                }
                                            />
                                        </View>
                                        <TextViewSemiBold
                                            text={'description'}
                                            textStyle={{
                                                textAlign: 'left',
                                                marginTop: 10,
                                                fontSize: 16,
                                                color: '#000000',
                                            }}
                                        />
                                        <View style={styles.inputbox}>
                                            <TextInput
                                                style={styles.input}
                                                value={description}
                                                onChangeText={(description) =>
                                                    this.setState({ description })
                                                }
                                                multiline={true}
                                                numberOfLines={4}
                                            />
                                        </View>
                                        <ButtonView
                                            containerStyle={styles.ButtonTouch}
                                            onPress={() => {
                                                this.submitAPICall();
                                            }}
                                            loading={this.props.submitSupportTicketProps.loading}
                                            text={'Submit'}
                                        />

                                        {/* </View> */}
                                        <View
                                            style={{
                                                marginTop: 15,
                                                marginBottom: 15,
                                                alignSelf: 'center',
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={styles.sepraterLineView} />
                                                <TextViewNormal
                                                    text={'Or call us directly'}
                                                    textStyle={styles.bottomText}
                                                />

                                                <View style={styles.sepraterLineView} />
                                            </View>
                                        </View>

                                        <View
                                            style={{
                                                marginTop: 15,
                                                alignSelf: 'center',
                                                marginBottom: 25,
                                            }}
                                        >
                                            <ButtonView
                                                containerStyle={styles.SignUpButtonTouch}
                                                onPress={() => {
                                                    this.props.userProps.getCheckList({ option_name: 'contact_phone' })
                                                }}
                                                loading={this.props.userProps.checkListLoading}
                                                text={'Call us'}
                                            />
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        </View>
                    ) : null}
                </FlowWrapView>
            </MenuProvider>
        );
    }
}

const HelpScreenElements = connectWithContext(HelpContextProvider, UserProfileContextProvider)({
    getSupportCategoriesProps: HelpContextConsumer,
    submitSupportTicketProps: HelpContextConsumer,
    userProps: UserProfileContextConsumer
})(Support);

export default HelpScreenElements;

const styles = StyleSheet.create({
    subscrption_image_style: {
        width: 100,
        height: 100,
    },
    image: {
        flex: 1,
        width: '100%',
        height: 220,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.colorWhite,
    },
    ButtonTouchRetry: {
        width: 147,
        height: 30,
        marginTop: 5,
        alignSelf: 'center',
    },
    RetryButtonTouch: {
        width: 180,
        marginTop: 25,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: '98%',
        height: 45,
        paddingLeft: 5,
        marginTop: 5,
        backgroundColor: AppColors.inputviewBoxColor,
        flexDirection: 'row',
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: AppColors.inputviewBoxColor,
    },
    inputbox: {
        width: '98%',
        height: 115,
        padding: 5,
        marginTop: 5,
        backgroundColor: AppColors.inputviewBoxColor,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: AppColors.inputviewBoxColor,
    },
    input: {
        width: '95%',
        color: AppColors.colorBlack,
    },
    sepraterLineView: {
        width: '32%',
        height: 1,
        alignSelf: 'center',
        backgroundColor: AppColors.sepraterLineColor,
        borderRadius: 25,
    },
    ButtonTouch: {
        marginTop: 35,
        width: AppUtils.getDeviceWidth() - 30,
        alignSelf: 'center',
        shadowColor: '#D93337',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,
    },

    SignUpButtonTouch: {
        width: AppUtils.getDeviceWidth() - 30,
        height: 45,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: AppColors.signupButtonColor,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: AppColors.signupButtonColor,
        shadowColor: '#0C7793',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: AppColors.colorWhite,
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomText: {
        textAlign: 'center',
        color: AppColors.colorBlack,
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10,
    },
    bottomSepraterLineView: {
        width: '22%',
        height: 1,
        shadowColor: AppColors.sepraterLineColor,
        alignSelf: 'center',
        backgroundColor: AppColors.sepraterLineColor,
    },
});
