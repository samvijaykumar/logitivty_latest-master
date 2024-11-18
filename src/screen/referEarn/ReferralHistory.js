import React from "react";
import { View, StatusBar, StyleSheet, Image, Linking } from "react-native";
import AppColors from "../../utils/AppColors";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import { connectWithContext } from "../../container";
import TopBackArrowView from "../../widgets/TopBackArrowView";
import TextViewSemiBold from "../../widgets/TextViewBold";
import TextViewBold from "../../widgets/TextViewSemiBold";
import TextViewNormal from "../../widgets/TextViewNormal";
import ButtonView from "../../widgets/ButtonView";
import { MenuProvider } from "react-native-popup-menu";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import NoDataFoundView from "../../widgets/NoDataFoundView";
import AppUtils from "../../utils/AppUtils";
import ReferEarnContextProvider, {
  ReferEarnContextConsumer,
} from "../../context/ReferEarnContext";

class ReferralHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paidusersData: true,
      unPaidusersData: false,
      paidusersDataList: [],
      unPaidusersDataList: [],
      showUserList: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  componentDidMount() {
    let data = {};
    this.props.ReferralHistoryProps.getReferalStatsApiData(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.ReferralHistoryProps.loadingRefer !==
      this.props.ReferralHistoryProps.loadingRefer &&
      !this.props.ReferralHistoryProps.loadingRefer
    ) {
      let response = this.props.ReferralHistoryProps.referResponse;
      console.log("response.data.paidusers", response);
      if (response.statusCode == 200) {
        this.setState({
          paidusersDataList: response.data.paidusers,
          unPaidusersDataList: response.data.unpaiduser,
          showUserList: response.data.paidusers,
        });
      }
    }
  }

  getPaidUserData() {
    this.setState({
      paidusersData: true,
      unPaidusersData: false,
      showUserList: this.state.paidusersDataList,
    });
  }
  getUnPaidUserData() {
    this.setState({
      paidusersData: false,
      unPaidusersData: true,
      showUserList: this.state.unPaidusersDataList,
    });
  }

  render() {
    const {
      showUserList,
      paidusersDataList,
      unPaidusersDataList,
      paidusersData,
      unPaidusersData,
    } = this.state;
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
                this.props.navigation.navigate("Dashboard");
              }}
            />

            <TextViewSemiBold
              // text={"refer & earn history"}
              text={"refer & win history"}
              textStyle={{
                textAlign: "left",
                fontSize: 20,
                color: "#333333",
                marginTop: 20,
                marginBottom: 10,
                marginLeft: 20,
              }}
            />


            <View style={{ borderRadius: 10, borderColor: AppColors.colorAccent, borderWidth: 1, marginTop: 10, marginLeft: 20, marginRight: 20 }}>

              <TextViewMedium
                textStyle={{
                  color: AppColors.colorAccent,
                  fontSize: 14,
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 15,
                  marginBottom: 15,
                  fontFamily: ResourceUtils.fonts.poppins_medium
                }}
                numberOfLines={5}
                text={"You are " + (paidusersDataList.length < 5 ? 5 - paidusersDataList.length : paidusersDataList.length % 5 === 0
                  ? 5 : 5 - paidusersDataList.length % 5) + " referrals away from earning a surprise gift"}
              />



            </View>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              <View
                style={{
                  shadowColor: paidusersData ? "#D83772" : "#BBBBBB",
                  flexDirection: "column",
                  flex: 1,
                  margin: 10,
                  borderWidth: 1,
                  justifyContentL: "center",
                  width: 160,
                  borderRadius: 3,
                  borderColor: paidusersData ? '#D83772' : '#BBBBBB',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.getPaidUserData();
                  }}
                >
                  <View>
                    <View
                      style={{
                        justifyContentL: "center",
                      }}
                    >
                      <TextViewBold
                        text={"paid refer rewards"}
                        numberOfLines={1}
                        textStyle={{
                          textAlign: "center",
                          fontSize: 12,
                          color: paidusersData ? "#333333" : "#BBBBBB",
                          marginTop: 15,
                          marginLeft: 15,
                          marginRight: 15,
                          width: "80%",
                          alignSelf: "center",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        justifyContentL: "center",
                      }}
                    >
                      <TextViewBold
                        text={paidusersDataList.length}
                        numberOfLines={1}
                        textStyle={{
                          textAlign: "center",
                          fontSize: 34,
                          color: paidusersData ? '#D83772' : '#BBBBBB',
                          marginTop: 5,
                          marginBottom: 10,
                          marginLeft: 15,
                          marginRight: 15,
                          width: "80%",
                          alignSelf: "center",
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  shadowColor: unPaidusersData ? '#D83772' : '#BBBBBB',
                  flexDirection: "column",
                  flex: 1,
                  margin: 10,
                  borderWidth: 1,
                  justifyContentL: "center",
                  width: 160,
                  borderRadius: 3,
                  borderColor: unPaidusersData ? '#D83772' : '#BBBBBB',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.getUnPaidUserData();
                  }}
                >
                  <View>
                    <View
                      style={{
                        justifyContentL: "center",
                      }}
                    >
                      <TextViewSemiBold
                        text={"unpaid refer rewards"}
                        numberOfLines={1}
                        textStyle={{
                          textAlign: "center",
                          fontSize: 12,
                          color: unPaidusersData ? '#333333' : '#BBBBBB',
                          marginTop: 15,
                          marginLeft: 10,
                          marginRight: 10,
                          width: "80%",
                          alignSelf: "center",
                        }}
                      />
                    </View>
                    <View
                      style={{
                        justifyContentL: "center",
                      }}
                    >
                      <TextViewSemiBold
                        text={unPaidusersDataList.length}
                        numberOfLines={1}
                        textStyle={{
                          textAlign: "center",
                          fontSize: 34,
                          color: unPaidusersData ? '#D83772' : '#BBBBBB',
                          marginTop: 5,
                          marginBottom: 10,
                          marginLeft: 15,
                          marginRight: 15,
                          width: "80%",
                          alignSelf: "center",
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                width: "100%",

                justifyContent: "center",
                backgroundColor: "#ffffff",
              }}
            >
              {this.props.ReferralHistoryProps.loading ? (
                <ActivityIndicatorView loading={true} />
              ) : AppUtils.isEmpty(showUserList) ? (
                <NoDataFoundView />
              ) : (
                <FlatList
                  // inverted
                  style={{ flex: 1, width: "100%" }}
                  data={showUserList}

                  keyExtractor={(item, index) => index.toString()}
                  // inverted={true}
                  renderItem={({ item, index }) => (
                    <View>

                      {paidusersData && (paidusersDataList.length - index) % 5 === 0 ?
                        <View style={{ borderRadius: 10, backgroundColor: AppColors.colorGreen, borderColor: AppColors.colorGreen, borderWidth: 1, marginTop: 10, marginLeft: 20, marginRight: 20 }}>

                          <TextViewMedium
                            textStyle={{
                              color: AppColors.colorWhite,
                              fontSize: 14,
                              marginLeft: 15,
                              marginRight: 15,
                              marginTop: 15,
                              marginBottom: 15,
                              fontFamily: ResourceUtils.fonts.poppins_semibold
                            }}
                            numberOfLines={5}
                            text={"Congratulation You have earned a surprise gift"}
                          />



                        </View>
                        : null}


                      <View
                        style={{
                          shadowColor: "#D83772",
                          flexDirection: "row",
                          flex: 1,
                          height: 80,
                          margin: 10,
                          marginLeft: 20,
                          marginRight: 20,
                          borderWidth: 1,
                          borderRadius: 4,
                          borderColor: "#D83772",
                        }}
                      >
                        <Image
                          style={styles.mammography_image_style}
                          source={{ uri: item.avatar }}
                          resizeMode="contain"
                        />
                        <View style={[styles.sepraterLineView]} />
                        <View
                          style={{
                            justifyContentL: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: 10,
                          }}
                        >
                          <TextViewSemiBold
                            text={item.full_name}
                            numberOfLines={1}
                            textStyle={{
                              textAlign: 'left',
                              fontSize: 14,
                              color: '#000000',
                              width: '100%',
                            }}
                          />
                          {/* <TextViewNormal
                          text={item.title}
                          numberOfLines={1}
                          textStyle={{
                            textAlign: "left",
                            fontSize: 10,
                            color: "#333333",
                            width: "100%",
                          }}
                        /> */}
                          <TextViewNormal
                            text={item.created_at}
                            numberOfLines={1}
                            textStyle={{
                              textAlign: 'left',
                              fontSize: 12,
                              color: '#333333',
                              width: '100%',
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
            <View style={[styles.HorizontalSepraterLineView]} />
            <View
              style={{
                marginBottom: 20,
                marginTop: 5,
                marginLeft: 35,
                marginRight: 35,
              }}
            >
              <ButtonView
                containerStyle={styles.ButtonTouch}
                onPress={() => {
                  this.props.navigation.navigate("ReferEarn");
                }}
                text="refer a friend"
              />
            </View>
          </View>
        </FlowWrapView>
      </MenuProvider>
    );
  }
}

const ReferralHistoryElements = connectWithContext(ReferEarnContextProvider)({
  ReferralHistoryProps: ReferEarnContextConsumer,
})(ReferralHistory);

export default ReferralHistoryElements;

const styles = StyleSheet.create({
  mammography_image_style: {
    width: 40,
    height: 40,
    alignSelf: "center",
    margin: 15,
  },

  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },

  sepraterLineView: {
    marginTop: 10,
    marginBottom: 10,
    width: 1,
    height: "99%",
    alignSelf: "center",
    backgroundColor: '#D83772',
  },
  HorizontalSepraterLineView: {
    marginTop: 30,
    marginBottom: 20,
    width: "90%",
    height: 1,
    alignSelf: "center",
    backgroundColor: '#BBBBBB',
  },
});
