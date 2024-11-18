//////////////////////////////
/////////////////////////////////////
////////////////////
import React from 'react';

import {
  View,
  StatusBar,
  StyleSheet,
  ActivityIndicator,

  ScrollView,
  Text,
  Image,
  Linking,
} from 'react-native';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import AppColors from '../../utils/AppColors';
import HomeContextProvider, {
  HomeContextConsumer,
} from "../../context/HomeContext";
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import TopImageView from '../../widgets/TopImageView';
import { Card } from 'react-native-elements/dist/card/Card';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import TextViewNormal from '../../widgets/TextViewNormal';
import { MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MamographyContextProvider, {
  MamographyContextConsumer,
} from '../../context/MamographyContext';
import { FlatList } from 'react-native';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import NoDataFoundView from '../../widgets/NoDataFoundView';
import AppUtils from '../../utils/AppUtils';
import ButtonView from '../../widgets/ButtonView';

// import PanicHelpline from './PanicHelpline';
class PromoteYourBusinessScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardDetails: "",
      helplineDataList: [],
      // profile_data_business_data : this.props.navigation.state.params.profile_data_business,
      // profile_data_deals_data : this.props.navigation.state.params.profile_data_deals,
      // user_live_deal_id_data : this.props.navigation.state.params.user_live_deal_id,

      profile_data_business: 0,
      profile_data_deals: 0,
      user_live_deal_id: '',
      loader: true
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  componentDidMount() {
    let data = {};
    console.log("profile_data_business", this.state.profile_data_business)
    console.log("profile_data_deals", this.state.profile_data_business)
    // this.props.dashboardProps.dashboardApiCall({});


    this.didFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.props.dashboardProps.dashboardApiCall({});
      }
    );

  }

  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.dashboardProps.loading !== this.props.dashboardProps.loading &&
      !this.props.dashboardProps.loading
    ) {
      let response = this.props.dashboardProps.dashboardResponse;
      console.log(`das: ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          dashboardDetails: this.props.dashboardProps.dashboardResponse.data,

          profile_data_business: this.props.dashboardProps.dashboardResponse.data.is_bussiness_added,
          profile_data_deals: this.props.dashboardProps.dashboardResponse.data.user_has_live_deal,
          user_live_deal_id: this.props.dashboardProps.dashboardResponse.data.user_live_deal_id,
        });

      } else {
        this.setState({
          something_went_worng: true,
        });
      }
      this.setState({
        loader: false,
      });
    }
  }

  // async openMeetingUrl(meetingUrl) {
  //     // Linking.openURL(meetingUrl);
  // }

  resetStack = () => {
    this.props.navigation.goBack()
  }



  render() {
    const { helplineDataList } = this.state;
    return (
      // <ScrollView style={{ backgroundColor: AppColors.colorWhite }}>
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

        {this.props.dashboardProps.loading === false ?
          <View style={{ margin: 14 }}>



            {/* <ButtonView
                                    containerStyle={styles.ButtonTouch}
                                    onPress={() => {
            // this.props.navigation.navigate("CommunityEvents");
                                    }}
                                    // loading={this.props.userProps.loading}
                                    text={'add business profile'}
                                /> */}
            {this.state.loader ? null :
              <TouchableOpacity

                onPress={() => {
                  this.state.profile_data_business === 1 ? this.props.navigation.navigate("UpdateBusinessProfile")
                  :
                  this.props.navigation.navigate("AddBusinessProfile")
                }}
                style={{
                  backgroundColor: '#D83772',
                  marginTop: 15,
                  shadowColor: '#D83772',
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
                  borderColor: "#D83772",

                }} >
                <Text style={{ marginTop: 10, marginBottom: 10, fontFamily: ResourceUtils.fonts.poppins_semibold, marginLeft: 10, marginRight: 10, color: 'white', fontSize: 15 }}>
                  {this.state.profile_data_business === 1 ? 'update business profile' : 'add business profile'}
                </Text>
              </TouchableOpacity>}


            {this.state.profile_data_business === 1 ?
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.state.profile_data_deals === 1 ?
                    this.props.navigation.navigate("UpdateDealsScreen", { deal_id: this.state.user_live_deal_id })
                    // this.props.navigation.navigate("AddDealsScreen")

                    :
                    this.props.navigation.navigate("AddDealsScreen")
                  }}
                  //  onPress={() => {
                  // }}
                  style={{
                    backgroundColor: '#0C7793',
                    marginTop: 15,
                    shadowColor: '#0C7793',
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
                    borderColor: "#0C7793",
                  }}>
                  <Text style={{ marginTop: 10, marginBottom: 10, fontFamily: ResourceUtils.fonts.poppins_semibold, marginLeft: 10, marginRight: 10, color: 'white', fontSize: 15 }}>
                    {this.state.profile_data_deals === 1 ? 'update deal' : 'add deal'}
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("PastDealsScreen");
                  }}
                  style={{
                    backgroundColor: '#23b19e',
                    marginTop: 15,
                    shadowColor: '#23b19e',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    alignItems: 'center',
                    shadowRadius: 3,
                    elevation: 4,
                    borderRadius: 25,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: "#23b19e",
                  }} >
                  <Text style={{ marginTop: 10, marginBottom: 10, fontFamily: ResourceUtils.fonts.poppins_semibold, marginLeft: 10, marginRight: 10, color: 'white', fontSize: 15 }}>past deals</Text>
                </TouchableOpacity>
              </View>
              : null}



          </View>

          : <ActivityIndicator size={'large'} color={"#D83772"} style={{}}></ActivityIndicator>}
      </View>


    );
  }
}



const PromoteYourBusinessScreenElements = connectWithContext(
  HomeContextProvider
)({
  dashboardProps: HomeContextConsumer,
})(PromoteYourBusinessScreen);


// const DashboardScreenElement = connectWithContext(HomeContextProvider)({
//   globalProps: GlobalContextConsumer,
//   dashboardProps: HomeContextConsumer,
// })(DashboardScreen);


export default PromoteYourBusinessScreenElements;


const styles = StyleSheet.create({
  ButtonTouch: {
    width: AppUtils.getDeviceWidth() - 28,
    height: 45,
    backgroundColor: "#D83772",
    shadowColor: "#0000001A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D83772",
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 15
  }
});

