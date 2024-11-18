import React from 'react';
import { View, StatusBar, StyleSheet, Image, Linking } from 'react-native';
import AppColors from '../../utils/AppColors';
import FlowWrapView from '../../widgets/FlowWrapView';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import TopBackArrowView from '../../widgets/TopBackArrowView';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import { MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native';
import MamographyContextProvider, {
  MamographyContextConsumer,
} from '../../context/MamographyContext';
import { FlatList } from 'react-native';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import NoDataFoundView from '../../widgets/NoDataFoundView';
import AppUtils from '../../utils/AppUtils';

class ZeroProfitDiagnostics extends React.Component {
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
    this.props.ZeroProfitDiagnosticsProps.getZeroProfitDiagnosticsModuleApi(
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
                justifyContent: 'center',
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
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        shadowColor: "#FF94DA",
                        shadowOpacity: 0.5,
                        flexDirection: "column",
                        flex: 1,
                        margin: 10,

                        borderWidth: 1,
                        justifyContentL: "center",

                        width: 160,
                        borderRadius: 15,
                        borderColor: "#FF94DA",
                      }}>

                      <TouchableOpacity
                        onPress={() => {
                          item.is_coming_soon
                            ? AppUtils.showCommingSoonDialog()
                            : this.props.navigation.navigate(
                                'AiThermoMammography'
                              );
                        }}
                      >
                        <View>
                          <Image
                            style={styles.mammography_image_style}
                            source={{ uri: item.icon }}
                            resizeMode="contain"
                          />
                          <View style={[styles.sepraterLineView]} />
                          <View
                            style={{
                              justifyContentL: 'center',
                            }}
                          >
                            <TextViewSemiBold
                              text={item.title} 
                              numberOfLines={2}
                              textStyle={{
                                textAlign: 'center',
                                fontSize: 14,
                                color: '#333333',
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 15,
                                marginRight: 15,
                                width: '80%',
                                alignSelf: 'center',
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

const ZeroProfitDiagnosticsElements = connectWithContext(
  MamographyContextProvider
)({
  ZeroProfitDiagnosticsProps: MamographyContextConsumer,
})(ZeroProfitDiagnostics);

export default ZeroProfitDiagnosticsElements;

const styles = StyleSheet.create({
  mammography_image_style: {
    width: 100,
    height: 88,
    alignSelf: 'center',
    margin: 5,
    marginTop: 10,
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