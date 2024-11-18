import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Text,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppStrings from "../../utils/AppStrings";
import AppUtils from '../../utils/AppUtils';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import MamographyContextProvider, {
  MamographyContextConsumer,
} from "../../context/MamographyContext";
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import { Card } from 'react-native-elements';
import TextViewSemiBold from '../../widgets/TextViewSemiBold';
import ButtonView from '../../widgets/ButtonView';
import AIThermoMammographyBottom from "../../widgets/AIThermoMammographyBottom";
import TopImageView from '../../widgets/TopImageView';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';

class SelectTimeSlotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlotSList: [],
      something_went_worng: true,
      selectedItem: 0,
      selectedTimeslotName: '',
      selected: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  componentDidMount() {
    

    let centerId = this.props.route.params?.centerId
    let bookingDate = this.props.route.params?.bookingDate

    console.log("Center"+centerId)
    console.log("bookingDate"+bookingDate)
    let data = {
      franchisee_id: centerId,
      appointment_date: bookingDate,
    };
    this.props.timeSlotProps.timeSlotsApiCall(data);
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.timeSlotProps.loading !== this.props.timeSlotProps.loading &&
      !this.props.timeSlotProps.loading
    ) {
      let response = this.props.timeSlotProps.response;
      if (response.statusCode == 200) {
        console.log("timeSlotProps", response.data);
        this.setState({
          timeSlotSList: response.data,
          something_went_worng: true,
        });
      } else {
        // this.setState({
        //   something_went_worng: false,
        // });
        this.props.navigation.goBack()
      }
    }
  }
  selectedTimeslot = (item) => {
    this.setState({ selectedItem: item.slot_id, selectedTimeslotName: item.slote_time, selected: true });
  };
  cancelSelection = async () => {
    await this.setState({ selectedItem: 0, selectedTimeslotName: '', selected: false });
    this.props.navigation.pop()
  }
  goToNextScreen = () => {
    if (this.state.selectedItem != 0 && this.state.selected) {
      // this.props.navigation.navigate('BookApointment',{selectedCenter: this.state.selectedCenterName})
      let data = {
        selectedTimeslotName: this.state.selectedTimeslotName,
        selectedItem: this.state.selectedItem
      }
      this.props.navigation.state.params.onGoBack(data);
      this.props.navigation.goBack();

    } else {
      AppUtils.showAlert(AppStrings.alertSelectTimeSlot)
    }
  }

  render() {
    const { timeSlotSList, selected, selectedItem, } = this.state;
    console.log('selectedItem', selectedItem, " ", selected)
    return (
      <FlowWrapView>
        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />
        <View>
          <TopImageView
            image={ResourceUtils.images.select_time_slot_banner}
            onPress={() => {
              this.props.navigation.pop()
            }}
            text1={'select '}
            text2={'time slot'}
            textStyle={{ color: AppColors.colorBlack }}
            onPressHome={() => { this.props.navigation.navigate('Dashboard') }}
          />
          {
            this.props.timeSlotProps.loading ?
              <ActivityIndicatorView containerStyle={{ flex: 1 }} loading={true} /> :
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                  backgroundColor: "#E5E5E5",
                }}
              >
                <Card
                  containerStyle={{
                    shadowColor: "#2A64B7",
                    shadowOpacity: 0.2,
                    margin: -1,
                    marginTop: -5,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "#fff",
                    width: "99%",
                  }}
                >
                  <TextViewSemiBold
                    text={timeSlotSList.length > 0 ? 'choose your slot' : ''}
                    textStyle={{
                      fontSize: 16,
                      color: AppColors.colorBlack,
                      textAlign: 'left',
                      marginStart: 10,
                      paddingRight: 10,
                    }}
                  />

                  <View style={{
                    flex: 1,
                    height: AppUtils.getDeviceHeight() / 2.1
                  }}
                  >
                    {timeSlotSList.length == 0 ?
                      <TextViewSemiBold
                        numberOfLines={2}
                        text={'slot no available for this date please select another date'}
                        textStyle={{
                          fontSize: 16,
                          color: AppColors.colorBlack,
                          textAlign: 'left', marginTop: 50,
                          marginStart: 10, alignSelf: 'center',
                          paddingRight: 10,
                        }}
                      /> : null}

                    <FlatList
                      style={{ flex: 1 }}
                      data={timeSlotSList}
                      nestedScrollEnabled
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => this.selectedTimeslot(item)}
                        >
                          <View
                            style={{
                              alignSelf: 'center',
                              flexDirection: 'row',
                              width: AppUtils.getDeviceWidth() - 40,
                              height: 45,
                              flex: 1,
                              marginTop: 15,
                              borderRadius: 20,
                              borderWidth: 1,
                              alignItems: 'center',
                              backgroundColor: this.state.selectedItem == item.slot_id && selected
                                ? '#FFF3E4'
                                : '#F8F8F8',
                              borderColor: '#DDDDDD',
                            }}
                          >
                            <Image
                              style={styles.icon_style}
                              source={
                                this.state.selectedItem == item.slot_id && selected
                                  ? ResourceUtils.images.orenge_clock
                                  : ResourceUtils.images.gray_clock
                              }
                            />
                            <TextViewMedium
                              text={item.slote_time}
                              textStyle={{
                                marginLeft: 10,
                                marginRight: 10,
                                fontSize: 16,
                                flex: 1,
                                color: AppColors.colorBlack,
                                textAlign: 'left',
                                paddingLeft: 10,
                                paddingRight: 10,
                              }}
                            />
                            <View
                              style={{
                                justifyContent: 'center',
                                marginRight: 10
                              }}
                            >
                              {this.state.selectedItem == item.slot_id && selected
                                ?
                                <Image
                                  style={styles.icon_style1}
                                  source={
                                    ResourceUtils.images.green_checked

                                  }
                                /> : null
                              }
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => { this.cancelSelection() }}
                    >
                      {/* <Text
                     style={{
                       fontSize: 16,
                       marginRight: 30,
                       textAlign: 'center',
                       alignSelf: 'center',
                       fontFamily: ResourceUtils.fonts.poppins_semibold,
                     }}
                   >
                     {'Cancel'}
                   </Text> */}
                      <TextViewSemiBold
                        text={'Cancel'}
                        textStyle={{

                          fontSize: 16,
                          marginRight: 30,
                          textAlign: "center",
                          alignSelf: "center",
                        }}
                        numberOfLines={1}
                      />
                    </TouchableOpacity>
                    <ButtonView
                      containerStyle={styles.ButtonTouch1}
                      onPress={() => {
                        this.goToNextScreen();
                      }}
                      loading={this.props.timeSlotProps.loading}
                      text={'Continue'}
                    />
                  </View>
                </Card>
                <AIThermoMammographyBottom />
              </View>
          }

        </View>
      </FlowWrapView>
    );
  }
}

const SelectTimeSlotElement = connectWithContext(MamographyContextProvider)({
  timeSlotProps: MamographyContextConsumer,
})(SelectTimeSlotScreen);

export default SelectTimeSlotElement;

const styles = StyleSheet.create({

  subscrption_image_style: {
    width: 100,
    height: 100,
  },

  image: {
    flex: 1,
    width: '100%',
    height: 220,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  ButtonView: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
  },
  ButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: 'center',
  },
  ButtonTouch1: {
    width: 160,
    height: 45,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D83772",
    backgroundColor: '#D83772',
    marginLeft: 30,
    shadowColor: "#D83772",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  icon_style: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
  icon_style1: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
  },
});
