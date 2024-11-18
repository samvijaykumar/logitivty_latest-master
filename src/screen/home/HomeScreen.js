import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppColors from "../../utils/AppColors";
import VideoPlayer from "react-native-video-controls";
import FlowWrapView from "../../widgets/FlowWrapView";
import TopBar from "../../widgets/TopBar";

import { Card, Image } from "react-native-elements";
import ResourceUtils from "../../utils/ResourceUtils";
import TextViewMedium from "../../widgets/TextViewMedium";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import TextViewNormal from "../../widgets/TextViewNormal";
import UserSession from "../../utils/UserSession";
import HomeContextProvider, {
  HomeContextConsumer,
} from "../../context/HomeContext";

import { connectWithContext } from "../../container";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import SomethingWentWrongView from "../../widgets/SomethingWentWrongView";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: "",
      appLoader: true,
      currentTime: 0,
      duration: 0,
      videoPlayer: null,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      screenType: "content",
      userName: "",
      videoData: {},
      benefitsListData: [],
      something_went_worng: false,
    };
  }

  async componentDidMount() {
    this.props.homeProps.getHomeDataApi();
    let data = await UserSession.getUserSessionData();
    this.setState({ userName: data.full_name });
    await this.props.navigation.setParams({
      userName: data.full_name,
    });
    console.log("UserData", data);
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.props.homeProps.getHomeDataApi();
      }
    );
  }

  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }
  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.homeProps.loading !== this.props.homeProps.loading &&
      !this.props.homeProps.loading
    ) {
      let response = this.props.homeProps.response;
      console.log(`HomeRes: ${JSON.stringify(response)}`);

      if (response.statusCode == 200) {
        this.setState({
          videoData: response.data.video_data,
          benefitsListData: response.data.benefits_data,
        });
      } else {
        this.setState({
          something_went_worng: true,
        });
      }
    }
  }

  onSeek = (seek) => {
    //Handler for change in seekbar
    if (!Utils.isNull(this.state.videoPlayer))
      this.state.videoPlayer.seek(seek);
  };

  renderListItem = ({ item, index }) => {
    return (
      <View>
        <TextViewSemiBold
          textStyle={{ marginTop: 15, fontSize: 16 }}
          text={`${index + 1}. ${item.title}`}
        ></TextViewSemiBold>
        <Image
          source={{ uri: item.image }}
          style={{
            width: Dimensions.get("window").width - 50,
            height: 210,
            marginTop: 10,
          }}
        />
        <TextViewNormal
          textStyle={{ marginBottom: 10, marginTop: 10 }}
          numberOfLines={7}
          text={item.description}
        ></TextViewNormal>
        <TextViewMedium
          textStyle={{ marginTop: 15, fontSize: 16 }}
          text={"Club Member Benefit:"}
        ></TextViewMedium>
        <TextViewNormal
          textStyle={{ marginBottom: 10, marginTop: 10, fontSize: 14 }}
          numberOfLines={7}
          text={item.benefit_description}
        ></TextViewNormal>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            height: 1,
            backgroundColor: AppColors.sepraterLineColor,
          }}
        />
      </View>
    );
  };
  retryButtonCalled() {
    this.props.homeProps.getHomeDataApi();
  }
  render() {
    const {
      videoUrl,
      userName,
      videoData,
      benefitsListData,
      something_went_worng,
    } = this.state;
    console.log(`Video Data: ${JSON.stringify(videoData)}`);

    return (
      <FlowWrapView viewStyle={{ backgroundColor: "#0000001A" }}>
        <TopBar
          showRightIcon={false}
          visibleBack={false}
          screenTitle={"John"}
        />

        {something_went_worng == true ? (
          <SomethingWentWrongView
            visible={something_went_worng}
            onPressRetry={() => {
              this.retryButtonCalled();
            }}
          />
        ) : (
          <View>
            <Card
              containerStyle={{
                shadowColor: "#470000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                elevation: 1,
                margin: 3,
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontFamily: ResourceUtils.fonts.poppins_semibold,
                }}
              >
                Welcome{" "}
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    color: "#D93337",
                    fontFamily: ResourceUtils.fonts.poppins_semibold,
                  }}
                >
                  {" "}
                  {userName}
                </Text>
              </Text>
              <TextViewNormal
                textStyle={{ marginBottom: 15, marginTop: 10, fontSize: 14 }}
                numberOfLines={4}
                text={`Thanks for registering yourself with The Longevity Club app. `}
              ></TextViewNormal>

              <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => {
                  //this.googleSigninButtonCall();
                }}
              >
                <Image
                  style={styles.social_Icon}
                  source={ResourceUtils.images.google_withBG}
                />
              </TouchableOpacity>
            </Card>

            {this.props.homeProps.loading ? (
              <ActivityIndicatorView
                loading={true}
                containerStyle={{ marginTop: 100 }}
              />
            ) : (
              <View>
                <Card
                  containerStyle={{
                    shadowColor: "#470000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    elevation: 1,
                    marginLeft: 3,
                    marginTop: 10,
                    marginRight: 3,
                  }}
                >
                  <TextViewSemiBold
                    textStyle={{
                      marginTop: 10,
                      fontSize: 20,
                      marginBottom: 15,
                    }}
                    text={videoData.title}
                    // text={'The Story Of The Longevity Club'}
                  ></TextViewSemiBold>
                  <View
                    textStyle={{
                      marginTop: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 20,
                    }}
                  >
                    <VideoPlayer
                      source={{ uri: videoData.video_link }}
                      navigator={null}
                      controls={false}
                      // onBack={()=>this.props.navigation.pop()}
                      disableBack={true}
                      style={{
                        height: 270,
                        marginLeft: 2,
                        marginEnd: 2,
                        right: 2,
                        marginBottom: 10,
                        width: Dimensions.get("window").width - 50,
                        zIndex: 0,
                        backgroundColor: "black",
                      }}
                    />
                  </View>
                  <TextViewNormal
                    style={{ marginBottom: 10, marginTop: 15, fontSize: 14 }}
                    text={videoData.description}
                    //  text={`14 minutes of essential insight concerning Guided Nutrition, Wellness Masterclass, and Breast Cancer.`}
                    numberOfLines={5}
                  ></TextViewNormal>
                </Card>
                <Card
                  containerStyle={{
                    shadowColor: "#470000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    elevation: 1,
                    marginLeft: 3,
                    marginTop: 10,
                    marginRight: 3,
                  }}
                >
                  <TextViewSemiBold
                    textStyle={{ marginTop: 10, fontSize: 20 }}
                    text={"The Longevity Club Benefits"}
                  />

                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={benefitsListData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderListItem}
                  />
                </Card>
              </View>
            )}
          </View>
        )}
      </FlowWrapView>
    );
  }
}
const HomeScreenElement = connectWithContext(HomeContextProvider)({
  homeProps: HomeContextConsumer,
})(HomeScreen);

export default HomeScreenElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.colorWhite,
  },
});
