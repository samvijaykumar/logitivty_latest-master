import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import AppColors from '../../utils/AppColors';
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
import MamographyContextProvider, {
  MamographyContextConsumer,
} from '../../context/MamographyContext';
import { FlatList } from 'react-native';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import NoDataFoundView from '../../widgets/NoDataFoundView';
import AppUtils from '../../utils/AppUtils';
class WellnessClassSreen extends React.Component {
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
    this.props.wellnessProps.getWellnessClassDataApi(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.wellnessProps.loading !== this.props.wellnessProps.loading &&
      !this.props.wellnessProps.loading
    ) {
      let response = this.props.wellnessProps.response;

      if (response.statusCode == 200) {
        this.setState({
          wellnessDataList: response.data
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
            <TopImageView
              image={ResourceUtils.images.bg_wellness}
              onPress={() => {
                this.props.navigation.pop();
              }}
              text1={'tlc masterclasses'}
              text2={'live'}
              textStyle={{ color: AppColors.colorBlack }}
              onPressHome={() => {
                this.props.navigation.navigate('Dashboard');
              }}
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
                  marginTop: -10,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  backgroundColor: '#ffffff',
                  borderColor: '#ffffff',
                  width: '99%',
                }}
              >

                {
                  this.props.wellnessProps.loading ? <ActivityIndicatorView loading={true} />
                    : AppUtils.isEmpty(wellnessDataList) ? <NoDataFoundView />
                      : <FlatList
                        style={{ flex: 1, width: '100%', marginTop: 8 }}
                        data={wellnessDataList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              flexDirection: 'column',
                              marginTop: 10,
                              marginBottom: 5,
                              borderWidth: 1,
                              width: '99%',
                              borderRadius: 10,
                              borderColor: '#0C7793',
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                height: 60,
                                backgroundColor: '#F8F8F8',
                                justifyContent: 'space-between',
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                              }}
                            >
                              <View
                                style={{
                                  justifyContent: 'center',
                                  flex:1
                                }}
                              >
                                <TextViewSemiBold
                                  text={item.title}
                                  textStyle={{
                                    textAlign: 'left',
                                    fontSize: 14,
                                    margin: 10,
                                    
                                  }}
                                
                                />
                              </View>
                              <View
                                style={{
                                  backgroundColor: '#0C7793',
                                  justifyContent: 'center',
                                  borderTopRightRadius: 5,
                                }}
                              >
                                <TextViewMedium
                                  text={item.meeting_date}
                                  textStyle={{
                                    textAlign: 'left',
                                    fontSize: 14,
                                    margin: 10,
                                    color: AppColors.colorWhite,
                                  }}
                                  numberOfLines={1}
                                />
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                margin: 10,
                              }}
                            >
                              <Image
                                style={{
                                  width: '100%',
                                  height: 180,
                                  backgroundColor:AppColors.colorGrayLight,
                                  // aspectRatio: 1,
                                  // flexShrink:1
                                }}
                                resizeMode={'cover'}
      
                                source={{ uri: item.banner_url }}
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                height: 50,
                                marginLeft: 2,
                                marginRight: 5,
                                justifyContent: 'space-between',
                              }}
                            >
                              <TextViewNormal
                                text={'Start time'}
                                textStyle={{
                                  textAlign: 'left',
                                  fontSize: 14,
                                  margin: 10,
                                }}
                              />
                              <TextViewNormal
                                text={item.start_time}
                                textStyle={{
                                  textAlign: 'left',
                                  fontSize: 14,
                                  margin: 10,
                                }}
                              />
                            </View>
                            <View style={[styles.sepraterLineView]} />
                            <View
                              style={{
                                flexDirection: 'row',
                                height: 50,
                                marginLeft: 2,
                                marginRight: 5,
                                justifyContent: 'space-between',
                              }}
                            >
                              <TextViewNormal
                                text={'End time'}
                                textStyle={{
                                  textAlign: 'left',
                                  fontSize: 14,
                                  margin: 10,
                                }}
                              />
                              <TextViewNormal
                                text={item.end_time}
                                textStyle={{
                                  textAlign: 'left',
                                  fontSize: 14,
                                  margin: 10,
                                }}
                              />
                            </View>
                            <View style={[styles.sepraterLineView]} />
                            <View
                              style={{
                                flexDirection: 'row',
                                height: 50,
                                marginLeft: 2,
                                marginRight: 5,
                                justifyContent: 'space-between',
                              }}
                            >
                              <TextViewNormal
                                text={'Trainer name'}
                                textStyle={{
                                  textAlign: 'left',
                                  fontSize: 14,
                                  margin: 10,
                                }}
                              />
                              <TextViewNormal
                                text={item.trainer_name}
                                textStyle={{
                                  textAlign: 'left',
                                  fontSize: 14,
                                  margin: 10,
                                }}
                              />
                            </View>
                            <View style={[styles.sepraterLineView]} />
                            <TextViewMedium
                              text={'Description'}
                              textStyle={{
                                textAlign: 'left',
                                fontSize: 14,
                                margin: 10,
                                textDecorationLine: 'underline',
                              }}
                            />
                            <TextViewNormal
                              text={item.description}
                              textStyle={{
                                textAlign: 'left',
                                fontSize: 12,
                                marginLeft: 10,
                                marginRight: 10,
                                marginBottom: 10,
                              }}
                              numberOfLines={20}
                            />
                            <View
                              style={{
                                marginTop: 15,
                                marginBottom: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <TouchableOpacity
                                activeOpacity={0.2}
                                style={[
                                  styles.buttonTouch,
                                  {
                                    borderColor: AppColors.primaryColor,
                                    backgroundColor: AppColors.primaryColor,
                                    marginBottom: 10,
                                    marginTop: 10,
                                    alignSelf: 'center',
                                    width: '40%',
                                  },
                                ]}
                                onPress={() =>
                                  this.openMeetingUrl(item.meeting_url)
                                }
                              >
                                <View style={styles.buttonView}>
                                  <TextViewMedium
                                    text={'Join Link'}
                                    textStyle={[
                                      styles.buttonText,
                                      { color: AppColors.colorWhite },
                                    ]}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      />
                }
              </Card>
            </View>
          </View>
        </FlowWrapView>
      </MenuProvider>
    );
  }
}

const WellnessClassSreenElements = connectWithContext(
  MamographyContextProvider
)({
  wellnessProps: MamographyContextConsumer,
})(WellnessClassSreen);

export default WellnessClassSreenElements;

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
    width: '95%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },

  buttonTouch: {
    width: "50%",
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1C8802",
    backgroundColor: AppColors.colorWhite,
    shadowColor: '#D93337',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonView: {
    height: 35,
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    marginBottom: 2,
    color: "#1C8802",
    fontSize: 12,
    fontFamily: ResourceUtils.fonts.poppins_medium,
  },
  bottomSepraterLineView: {
    width: '22%',
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
});
