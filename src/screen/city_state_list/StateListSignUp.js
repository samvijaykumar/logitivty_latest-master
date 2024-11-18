import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import AppStrings from '../../utils/AppStrings';
import ButtonView from '../../widgets/ButtonView';
import {connectWithContext} from '../../container';
import UserProfileContextProvider, {
  UserProfileContextConsumer,
} from '../../context/UserProfileContext';
import AppUtils from '../../utils/AppUtils';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import TopImageBanner from '../../widgets/TopImageBanner';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
class StateListSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something_went_worng: true,
      stateList: [],
      setVisibility: false,
      _stateName: '',
      _searchState: '',
    };
  }

  static navigationOptions = ({navigation}) => ({
    headerShown: false,
  });

  retryButtonCalled() {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    let data = {};
    this.props.stateProps.stateListApiCall(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.stateProps.loadingState !==
        this.props.stateProps.loadingState &&
      !this.props.stateProps.loadingState
    ) {
      let response = this.props.stateProps.responseState;

      if (response.statusCode == 200) {
        if (!response.data.length <= 0) {
          console.log('stateProps', response.data);
          this.setState({
            stateList: response.data,
            something_went_worng: true,
            setVisibility: false,
          });
        } else {
          this.setState({
            something_went_worng: true,
            setVisibility: true,
            stateList: [],
          });
        }
      } else {
        this.setState({
          something_went_worng: false,
          setVisibility: false,
        });
      }
    }
  }

  doCitySearch = _searchState => {
    if (!AppUtils.isNull(this.state._searchState)) {
      this.setState({
        stateList: this.props.stateProps.responseState.data
          .filter(item => !AppUtils.isNull(item.state_name))
          .filter(item =>
            item.state_name
              .toLowerCase()
              .includes(this.state._searchState.toLowerCase()),
          ),
      });
    } else {
      this.setState({
        stateList: this.props.stateProps.responseState.data || [],
      });
    }
  };

  render() {
    const {
      something_went_worng,
      stateList,
      setVisibility,
      _stateName,
      _searchState,
    } = this.state;
    return (
      <GestureHandlerRootView style ={{flex:1}}>

      <FlowWrapView>
        <StatusBar
          backgroundColor={AppColors.statusBarColor}
          barStyle="light-content"
        />
        {/* <TopBackArrowView
          onPressBack={() => {
            this.props.navigation.pop();
          }}
        /> */}

        {something_went_worng == false ? (
          this.props.stateProps.loadingState ? (
            <ActivityIndicatorView containerStyle={{flex: 1}} loading={true} />
          ) : (
            <View
              style={{
                flexDirection: 'column',
                marginTop: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
                onPress={() => {
                  this.retryButtonCalled();
                }}
                text={AppStrings.btn_retray}
              />
            </View>
          )
        ) : null}
        {something_went_worng == true ? (
          this.props.stateProps.loadingState ? (
            <ActivityIndicatorView containerStyle={{flex: 1}} loading={true} />
          ) : (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 5,
                width: AppUtils.getDeviceWidth() - 5,
              }}>
              {/* <View
                style={{
                  flexDirection: 'column',
                  margin: 15,
                  marginTop: 5,
                  marginLeft: 20,
                }}
              >
                <TextViewSemiBold
                  text={'State List'}
                  textStyle={{
                    textAlign: 'left',
                    fontSize: 20,
                    color: '#333333',
                    marginBottom:15,
                  }}
                />
              </View> */}
              <TopImageBanner
                image={ResourceUtils.images.select_center_city_banner}
                onPress={() => {
                  this.props.navigation.pop();
                }}
                text1={'select '}
                text2={'state'}
                textStyle={{color: AppColors.colorBlack}}
              />

              <View style={styles.inputView}>
                <TextInput
                  placeholder={'search state...'}
                  placeholderTextColor={'#5D5D5D'}
                  returnKeyType="done"
                  // onChangeText={(_cityName) => this.setState({ _cityName })}
                  text={_stateName}
                  style={styles.inputStype}
                  onChangeText={async _searchState => {
                    await this.setState({_searchState});
                    this.doCitySearch(_searchState);
                  }}
                />

                <Image
                  style={styles.IconInTextInput}
                  source={ResourceUtils.images.ic_check_right}
                />
              </View>
              <FlatList
                style={{flex: 1, width: '100%'}}
                data={stateList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      borderColor: '#FFE6D6',
                      margin: 10,
                      borderWidth: 1,
                      borderRadius: 20,
                    }}>
                    <TouchableOpacity
                      // onPress={() => {
                      //   {
                      //     stateName: item.state_name;
                      //   }
                      //   this.props.navigation.state.chooseState({
                      //     stateName: item.state_name,
                      //     stateId: item.id,
                      //   });
                      //   console.log('ffffff', this.props.chooseState);
                      //   this.props.navigation.goBack();
                      // }}>
                      onPress={() => {
                        const { chooseState } = this.props.route.params;
                        chooseState({
                          stateName: item.state_name,
                          stateId: item.id,
                        });
                        this.props.navigation.goBack();
                      }}>

                      <TextViewMedium
                        text={item.state_name}
                        textStyle={{
                          textAlign: 'center',
                          fontSize: 14,
                          color: '#333333',
                          margin: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {setVisibility ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 500,
                  }}>
                  <TextViewMedium
                    text={'Oops!'}
                    textStyle={{
                      textAlign: 'center',
                      fontSize: 25,
                      marginTop: 15,
                      color: '#D93337',
                    }}
                  />

                  <TextViewMedium
                    text={'Sorry, but no booking was found'}
                    textStyle={{
                      textAlign: 'center',
                      marginTop: 5,
                      fontSize: 20,
                      color: '#333333',
                    }}
                  />
                  <ButtonView
                    containerStyle={styles.noDataFoundButton}
                    onPress={() => {
                      this.props.navigation.navigate('BookApointment');
                    }}
                    text={'Book your appointment now'}
                  />
                </View>
              ) : null}
            </View>
          )
        ) : null}
      </FlowWrapView>

      </GestureHandlerRootView>
    );
  }
}

const StateListSignUpElements = connectWithContext(UserProfileContextProvider)({
  stateProps: UserProfileContextConsumer,
})(StateListSignUp);

export default StateListSignUpElements;

const styles = StyleSheet.create({
  logo_icon_style: {
    width: 400,
    height: 120,
  },
  subscrption_image_style: {
    width: 100,
    height: 100,
  },
  mammography_image_style: {
    width: 127,
    height: 88,
  },
  inside_image_style: {
    width: 60,
    height: 60,
  },
  red_arrow_style: {
    width: 47,
    height: 47,
    marginTop: 10,
  },
  arrow_icon_style: {
    alignSelf: 'center',
    width: 18,
    height: 18,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  rectangle_shape: {
    width: 180,
    height: 102,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFE6D6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE6D6',
  },
  sepraterLineView: {
    width: '92%',
    marginTop: 1,
    marginBottom: 1,
    // marginRight: 15,
    // marginLeft: 15,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
  sepraterLineViewVertical: {
    width: 2,
    height: 140,
    marginTop: 10,
    marginBottom: 1,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
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
  noDataFoundButton: {
    width: 320,
    marginTop: 15,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 11,
    justifyContent: 'center',
  },
  image_reactangle_style: {
    width: 100,
    height: 131,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonTouch: {
    width: '100%',
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1C8802',
    backgroundColor: AppColors.colorWhite,
  },
  buttonView: {
    height: 35,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    marginBottom: 2,
    color: '#1C8802',
    fontSize: 10,
    fontWeight: 'bold',
  },
  inputView: {
    marginBottom: 20,
    marginTop: 20,
    width: AppUtils.getDeviceWidth() - 50,
    height: 40,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 52,
    width: '85%',
    color: AppColors.colorBlack,
  },
  IconInTextInput: {
    marginRight: 30,
    width: 50,
    marginTop: 5,
    height: 50,
    resizeMode: 'contain',
  },
});
