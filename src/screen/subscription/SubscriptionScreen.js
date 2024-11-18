import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Platform,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppStrings from "../../utils/AppStrings";
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import HomeContextProvider, {
  HomeContextConsumer,
} from '../../context/HomeContext';
import TopBar from '../../widgets/TopBar';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import { Card } from 'react-native-elements';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import ButtonView from '../../widgets/ButtonView';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import TextViewNormal from '../../widgets/TextViewNormal';
import AppUtils from '../../utils/AppUtils';
import { BackgroundImage } from 'react-native-elements/dist/config';
import TextViewBold from '../../widgets/TextViewBold';
import UserSession from '../../utils/UserSession';


class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionList: [],
      something_went_worng: true,
    };
  }

  SubscriptionButtonCall(subscription_id) {
    let navigation = this.props.navigation;
    navigation.navigate('SubscriptionDetailsScreen', {
      subscriptionId: subscription_id,
    });
  }

  retryButtonCalled() {
    let data = {};
    this.props.subscriptionListProps.subscriptionListApiCall(data);
  }

  componentDidMount() {
    const { navigation } = this.props;
    let data = {};

    this.props.subscriptionListProps.subscriptionListApiCall(data);
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.props.subscriptionListProps.subscriptionListApiCall(data);
      }
    );

  }

  componentWillUnmount() {
    // this.didFocusSubscription.remove()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.subscriptionListProps.loading !==
      this.props.subscriptionListProps.loading &&
      !this.props.subscriptionListProps.loading
    ) {
      let response = this.props.subscriptionListProps.response;

      if (response.statusCode == 200) {
        console.log('subscriptionListProps', response.data);
        this.setState({
          subscriptionList: response.data,
          something_went_worng: true,
        });
      } else {
        this.setState({
          something_went_worng: false,
        });
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.subscriptionListProps.response.message);
        // }, 100)
      }
    }
  }

  render() {
    const { subscriptionList, something_went_worng } = this.state;
    return (
      <FlowWrapView>
        <TopBar
          showRightIcon={false}
          visibleBack={false}
          screenTitle={'Buy Subscription'}
        />

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
              containerStyle={styles.ButtonTouch}
              onPress={() => {
                this.retryButtonCalled();
              }}
              text={AppStrings.btn_retray}
            />
          </View>
        ) : null}
        {something_went_worng == true ? (
          <View>
            <ImageBackground
              source={ResourceUtils.images.subs_bg}
              style={styles.image}
              resizeMode={'cover'}
            >
              <TextViewSemiBold
                text={'select the '}
                textStyle={{
                  marginLeft: 10,
                  fontSize: 26,
                  color: AppColors.colorWhite,
                  textAlign: 'left',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              />
              <TextViewSemiBold
                text={'longevity club'}
                textStyle={{
                  marginLeft: 10,
                  fontSize: 26,
                  color: AppColors.colorWhite,
                  textAlign: 'left',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              />
              <TextViewSemiBold
                text={'subscription'}
                textStyle={{
                  marginLeft: 10,
                  fontSize: 26,
                  color: AppColors.colorWhite,
                  textAlign: 'left',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              />
            </ImageBackground>

            <View style={{ flex: 1, width: '100%' }}>
              <Card
                containerStyle={{
                  shadowColor: '#2A64B7',
                  shadowOpacity: 0.2,
                  margin: -1,
                  marginTop: -3,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#fff',
                }}
              >
                <View
                  style={{ marginTop: 3, marginBottom: 5, marginLeft: 5 }}
                >
                  <TextViewSemiBold
                    text={'your gateway to health,'}
                    textStyle={{
                      fontSize: 18,
                      color: '#000000',
                      textAlign: 'left',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  />
                  <TextViewSemiBold
                    text={'longevity and happiness'}
                    textStyle={{
                      fontSize: 18,
                      color: '#000000',
                      textAlign: 'left',
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginTop: 5
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  {
                    this.props.subscriptionListProps.loading ?
                      <ActivityIndicatorView loading={true} /> :
                      <View style={{ marginRight: 1, }}>
                        <FlatList
                          style={{ flex: 1, width: AppUtils.getDeviceWidth() - 30 }}
                          data={subscriptionList}
                          renderItem={({ item, index }) => (
                            <ImageBackground
                              source={item.id == 1 ? ResourceUtils.images.bg_green : item.id == 2 ? ResourceUtils.images.bg_orange : ResourceUtils.images.bg_purple}
                              imageStyle={{ borderRadius: 10 }}
                              style={{
                                width: '100%',
                                marginTop: 15,
                                borderColor: '#C4F2FF',
                              }}
                            >
                              <TouchableOpacity
                                activeOpacity={0.2}
                                onPress={() => {
                                  this.SubscriptionButtonCall(item.id);
                                }}
                              >
                                <View style={{ flexDirection: 'row', margin: 15, width: '100%' }}>
                                  <View style={{ flex: .75, flexDirection: 'column', }}>
                                    <TextViewSemiBold
                                      text={item.title}
                                      textStyle={{
                                        textAlign: 'left',
                                        fontSize: 18,
                                        color: item.id == 1 ? '#42B435' : item.id == 2 ? '#FF7745' : '#895DD1',
                                      }}
                                    />
                                  
                                      {/* <TextViewMedium
                                        text={'Referral Discount ' + '(' + item.referred_by + '):'}
                                        textStyle={{
                                          textAlign: 'left',
                                          fontSize: 12,
                                          color: '#000000',
                                          marginBottom: 2,
                                          marginTop: 5,
                                        }}
                                      />  */}
                                    




                                    <TextViewSemiBold
                                      text={`${AppStrings.currency_symbol} ${Platform.OS == 'ios' ? item.ios_rate : item.discounted_amount}`}
                                      textStyle={{
                                        textAlign: 'left',
                                        fontSize: 22, marginTop: 10,
                                        color: item.id == 1 ? '#42B435' : item.id == 2 ? '#FF7745' : '#895DD1',
                                      }}
                                    />
                                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>

                                      {Platform.OS == 'ios' ?
                                        <TextViewMedium
                                          text={'(' + AppStrings.currency_symbol + ' ' + (item.android_base_rate) + " + " + AppStrings.currency_symbol + ' ' + item.ios_gst_rate + ' GST' + " + " +  AppStrings.currency_symbol + " " +   item.ios_appstore_amount + ')'}
                                          textStyle={{
                                            textAlign: 'left',
                                            fontSize: 12,
                                            color: '#D83772',
                                            marginTop: 2
                                          }}
                                        /> :
                                        <TextViewNormal
                                          text={'(' + AppStrings.currency_symbol + ' ' + (item.android_base_rate) + " + " + AppStrings.currency_symbol + ' ' + item.android_gst_rate + ' GST' + ')'}
                                          textStyle={{
                                            textAlign: 'left',
                                            fontSize: 10,
                                            color: '#D83772',
                                            marginTop: 2
                                          }}
                                        />
                                      }
                                    </View>
                                  </View>
                                  <View style={{ flexDirection: 'column', flex: .25, alignItems: 'center', marginRight: 5, justifyContent: 'center' }}>
                                    <TextViewMedium
                                      text={'Validity :'}
                                      textStyle={{
                                        textAlign: 'left',
                                        fontSize: 12,
                                        color: '#000000',
                                        marginTop: 15,
                                      }}
                                    />
                                    <TextViewMedium
                                      text={(item.validity) > 1 && (item.validity) < 99 ? item.validity + " years" : (item.validity) > 98 ? 'lifetime' : item.validity + " year"}
                                      textStyle={{
                                        textAlign: 'left',
                                        fontSize: 12,
                                        color: '#D83772',
                                        marginTop: 5,
                                        alignSelf: 'center'
                                      }}
                                    />
                                    <View style={styles.Circle_Button_style}>
                                      <Image
                                        style={styles.arrow_icon_style}
                                        source={ResourceUtils.images.arrow_left}
                                      />
                                    </View>


                                  </View>
                                </View>
                              </TouchableOpacity>
                            </ImageBackground>

                          )}
                        />
                      </View>
                  }
                </View>
              </Card>
            </View>
          </View>
        ) : null}
      </FlowWrapView>
    );
  }
}

const SubscriptionScreenElement = connectWithContext(HomeContextProvider)({
  subscriptionListProps: HomeContextConsumer,
})(SubscriptionScreen);

export default SubscriptionScreenElement;

const styles = StyleSheet.create({
  logo_icon_style: {
    width: 400,
    height: 120,
  },
  subscrption_image_style: {
    width: 100,
    height: 100,
  },
  arrow_icon_style: {
    alignSelf: 'center',
    width: 18,
    height: 18,
  },
  image: {

    width: '100%',
    height: 200,
    justifyContent: "center",

  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  Circle_Button_style: {
    width: 30,
    height: 30,
    borderRadius: 30, marginTop: 20,
    borderWidth: 2,
    borderColor: '#D83772',
    alignSelf: 'center',
    backgroundColor: '#D83772',
    justifyContent: 'center',
  },

  subscription_circle_style: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: AppColors.ramaBule,
    alignSelf: 'center',
    backgroundColor: AppColors.colorWhite,
    justifyContent: 'center',
  },
  ButtonView: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
  },

  name_text: {
    textAlign: 'left',
    color: AppColors.colorBlack,
    fontSize: 16,
  },

  offer_text: {
    textAlign: 'left',
    color: AppColors.charcolGray,
    fontSize: 12, marginTop: 5,
  },
  price_text: {
    textAlign: 'left',
    color: AppColors.primaryColor,
    fontSize: 20,
  },
  sepraterLineView: {
    width: AppUtils.getDeviceWidth() - 30,
    marginTop: 15,
    marginBottom: 10,
    marginRight: 10,
    height: 1,

    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: 'center',
  },
});
