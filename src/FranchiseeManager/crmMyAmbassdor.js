import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import TopBarEcommerce from '../widgets/TopBarEcommerce';
import ResourceUtils from '../utils/ResourceUtils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetworkConstants from '../network/NetworkConstant';
import UserSession from '../utils/UserSession';

export default class crmMyAmbassdor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      month: '',
      date: '',
      data: [],
      loader: true,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  resetStack = () => {
    this.props.navigation.navigate('ambassadorManager');
  };
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }
  handleBackButtonClick() {
    this.resetStack();
    return true;
  }

  async componentDidMount() {
    const userData = await UserSession.getUserSessionData();
    fetch(NetworkConstants.BASE_URL + 'crm_my_ifranchise', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Sachin' + JSON.stringify(responseJson));
        this.setState({
          data: responseJson.data,
          loader: false,
        });
      });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffff',
        }}
      >
        <TopBarEcommerce
          screenTitle={'crm-DSA'}
          cartCount={this.state.cartCount}
          visibleCart={false}
          visibleFav={false}
          visibleSearch={false}
          onPressBack={() => {
            this.resetStack();
          }}
        />
        {this.state.loader == true ? (
          <ActivityIndicator
            size={'large'}
            color={'#D83772'}
            style={{ flex: 1 }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              margin: wp('3%'),
            }}
          >
            <View
              style={[
                styles.flexJustifyStyle,
                {
                  marginTop: hp('2%'),
                },
              ]}
            >
              <View style={styles.tableHeading}>
                <Text style={styles.tableHeadingTextStyle}>name</Text>
              </View>
              <View style={styles.tableHeading}>
                <Text style={styles.tableHeadingTextStyle}>
                  date of activation
                </Text>
              </View>
              <View style={styles.tableHeading}>
                <Text style={styles.tableHeadingTextStyle}>
                  total subscription payout
                </Text>
              </View>
              <View style={styles.tableHeading}>
                <Text style={styles.tableHeadingTextStyle}>
                  total products payout
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: wp('.1%'),
                borderBottomColor: '#D83772',
              }}
            >
              {/* {console.log(this.state.data)} */}
              {/* {console.log(this.state.data.user)} */}
              <FlatList
                data={this.state.data}
                renderItem={({ item, index }) => {
                  return (
                    <View style={[styles.flexJustifyStyle, {}]}>
                      <View style={styles.tableContentView}>
                        <Text style={styles.tableTextStyle}>
                          {item.user.full_name}
                        </Text>
                      </View>
                      <View style={styles.tableContentView}>
                        <Text style={styles.tableTextStyle}>
                          {item.user.ifranchise_act_date}
                        </Text>
                      </View>
                      <View style={styles.tableContentView}>
                        <Text
                          style={[
                            styles.tableTextStyle,
                            {
                              color: '#0C7793',
                            },
                          ]}
                        >
                          {item.total_wallet_payout + item.total_bank_payout}
                        </Text>
                      </View>
                      <View style={styles.tableContentView}>
                        <Text
                          style={[
                            styles.tableTextStyle,
                            {
                              color: '#0C7793',
                            },
                          ]}
                        >
                          {item.product_commission}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: wp('3.2%'),
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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
  tableHeading: {
    backgroundColor: '#D83772',
    flex: 1,
    alignItems: 'center',
    padding: wp('1%'),
  },
  tableHeadingTextStyle: {
    fontFamily: ResourceUtils.fonts.poppins_medium,
    color: '#FFFFFF',
  },
  flexJustifyStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    borderColor: '#D83772',
    borderLeftWidth: wp('.1%'),
    borderRightWidth: wp('.1%'),
  },
  tableTextStyle: {
    fontFamily: ResourceUtils.fonts.poppins_regular,
    textAlign: 'center',
    padding: wp('1%'),
  },
  dropDownView: {
    backgroundColor: '#F5F6F9',
    flex: 1,
    marginRight: wp('4%'),
    borderRadius: wp('1%'),
  },
});
