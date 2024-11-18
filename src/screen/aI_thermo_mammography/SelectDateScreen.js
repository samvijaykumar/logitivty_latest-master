import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppStrings from "../../utils/AppStrings";
import AppUtils from '../../utils/AppUtils';
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import MamographyContextProvider, {
  MamographyContextConsumer,
} from '../../context/MamographyContext';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import { Card } from 'react-native-elements';
import ButtonView from '../../widgets/ButtonView';
import { Calendar } from 'react-native-calendars';
import AIThermoMammographyBottom from '../../widgets/AIThermoMammographyBottom';
import TopImageView from '../../widgets/TopImageView';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import moment from 'moment';
import UserProfileContextProvider, { UserProfileContextConsumer } from '../../context/UserProfileContext';

class SelectDateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidayList: [],
      something_went_worng: true,
      selectedDate: '',
      currentDate: '',
      selectedMonth: '',
      selectedYear: '',
      markedDate: {},
      isFirstTime: true
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  async componentDidMount() {

    var check = moment(new Date(), AppStrings.date_format);
    var month = check.format('M');
    var year = check.format('YYYY');
    await this.setState({
      currentDate: AppUtils.getCurrentDateTime(),
      selectedMonth: month,
      selectedYear: year,
    });
    // this.callHolidayAPI()

    this.props.userProps.getCheckList({ option_name: '' })
  }


  callHolidayAPI = () => {
    let data = {
      "franchisee_id": this.props.navigation.getParam('selectedCenterId'),
      "month": this.state.selectedMonth,
      "year": this.state.selectedYear,
    };

    console.log(`call api ` + JSON.stringify(data))
    this.props.selectDateProps.calendarholidayApiCall(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.selectDateProps.loading !==
      this.props.selectDateProps.loading &&
      !this.props.selectDateProps.loading
    ) {
      let response = this.props.selectDateProps.response;
      await this.setState({ isFirstTime: false })
      if (response.statusCode == 200) {
        console.log('timeSlotProps', response.data);
        await this.setState({
          holidayList: response.data.holidays,
          something_went_worng: true,
        });
        let data = {}
        this.state.holidayList.forEach(item => {
          data[item] = {
            disabled: true,
            disableTouchEvent: true
          }
        });


        if (AppUtils.isNull(this.state.selectedDate)) {
          data[this.state.selectedDate] = {
            selected: true,
            disableTouchEvent: true,
            selectedColor: AppColors.primaryColor,
            selectedTextColor: AppColors.colorWhite,
          }
        }
        await this.setState({ markedDate: data })
      } else {
        this.setState({
          something_went_worng: false,
        });
        this.props.navigation.goBack()
      }
    }

    if (
      prevProps.userProps.checkListLoading !== this.props.userProps.checkListLoading &&
      !this.props.userProps.checkListLoading
    ) {
      let response = this.props.userProps.checkListResponse;
      let check = moment(response.current_date_time, AppStrings.date_format_for_sql_with_time)
      var month = check.format('M');
      var year = check.format('YYYY');
      //let currentDate = check.format(AppStrings.date_format)
      await this.setState({
        currentDate: check.format(AppStrings.date_format_for_sql_with_time),
        selectedMonth: month,
        selectedYear: year,
      });
      this.callHolidayAPI()
    }
  }

  selectDate = async (date) => {
    await this.setState({
      selectedDate: date.dateString,
    });

    let data = {}
    this.state.holidayList.forEach(item => {
      data[item] = {
        disabled: true,
        disableTouchEvent: true
      }
    });

    data[this.state.selectedDate] = {
      selected: true,
      disableTouchEvent: true,
      selectedColor: AppColors.primaryColor,
      selectedTextColor: AppColors.colorWhite,
    }

    await this.setState({
      markedDate: data,
    });
  }
  goToNextScreen = (item) => {

    if (!AppUtils.isNull(this.state.selectedDate)) {
      this.props.navigation.state.params.onGoBackFromDate(this.state.selectedDate);
      this.props.navigation.goBack();
    } else {
      AppUtils.showAlert(AppStrings.alertSelectDate)
    }
  }
  setMonthYear = async (newDate) => {
    await this.setState({
      selectedMonth: newDate.month,
      selectedYear: newDate.year
    });
  }

  cancelSelection = async () => {
    await this.setState({ selectedDate: '', });
    this.props.navigation.pop()
  }

  render() {
    const { holidayList, something_went_worng } = this.state;
    return (
      <FlowWrapView showLoaderDialog={this.props.selectDateProps.loading && !this.state.isFirstTime}>
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
              // onPress={() => {
              //   this.retryButtonCalled();
              // }}
              text={AppStrings.btn_retray}
            />
          </View>
        ) : null}
        {something_went_worng == true ? (
          <View>
            <TopImageView
              image={ResourceUtils.images.select_date_banner}
              onPress={() => {
                this.props.navigation.pop()
              }}
              text1={'select '}
              text2={'date'}
              textStyle={{ color: AppColors.colorBlack }}
              onPressHome={() => { this.props.navigation.navigate('Dashboard') }}
            />

            {
              this.props.userProps.checkListLoading || (this.props.selectDateProps.loading && this.state.isFirstTime) ? <ActivityIndicatorView loading={true} containerStyle={{ marginTop: AppUtils.getDeviceHeight() / 3.2 }} />
                : <View
                  style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: '#E5E5E5',
                  }}
                >
                  <Card
                    containerStyle={{
                      shadowColor: '#2A64B7',
                      shadowOpacity: 0.2,
                      margin: -1,
                      marginTop: -5,
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: '#fff',
                      width: '99%',
                    }}
                  >
                    <Calendar
                      onMonthChange={(date) => {
                        this.setMonthYear(date)
                        setTimeout(() => {
                          this.callHolidayAPI()
                        }, 100)

                      }}
                      current={this.state.currentDate}
                      ref={(ref) => (this.calendar = ref)}
                      style={{
                        marginBottom: 20,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                      minDate={moment(this.state.currentDate).toDate()}
                      onDayPress={(day) => { this.selectDate(day) }}
                      markedDates={this.state.markedDate}
                      theme={{
                        selectedDayTextColor: AppColors.colorBlack,
                        monthTextColor: AppColors.colorBlack,
                        indicatorColor: AppColors.colorBlack,
                        arrowColor: AppColors.colorBlack,
                        textDayFontFamily: ResourceUtils.fonts.poppins_bold,
                        textMonthFontFamily: ResourceUtils.fonts.poppins_bold,
                        textDayHeaderFontFamily: ResourceUtils.fonts.poppins_semibold,
                        textMonthFontSize: 20,
                      }}
                      renderArrow={(direction) => {
                        return direction == 'left' ? <Image source={ResourceUtils.images.cal_left_arrow} style={{ height: 30, width: 30 }} /> :
                          <Image source={ResourceUtils.images.cal_right_arrow} style={{ height: 30, width: 30 }} />
                      }}
                    />

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => { this.cancelSelection() }}
                      >
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
                        // loading={this.props.paymentProps.loadingPay || this.props.paymentProps.loadingOrder}
                        text={'Continue'}
                      />
                    </View>
                  </Card>
                  <AIThermoMammographyBottom />

                </View>
            }
          </View>
        ) : null}
      </FlowWrapView>
    );
  }
}

const SelectDateElement = connectWithContext(MamographyContextProvider, UserProfileContextProvider)({
  selectDateProps: MamographyContextConsumer,
  userProps: UserProfileContextConsumer
})(SelectDateScreen);

export default SelectDateElement;

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
    flex: 1,
    width: '100%',
    height: 220,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  Circle_Button_style: {
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: AppColors.ramaBule,
    alignSelf: 'center',
    backgroundColor: AppColors.ramaBule,
    justifyContent: 'center',
  },

  subscription_circle_style: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
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
    fontSize: 12,
  },
  price_text: {
    textAlign: 'left',
    color: AppColors.loginButtonColor,
    fontSize: 20,
  },
  sepraterLineView: {
    width: 350,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
    height: 1,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: 'center',
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: 'center',
    borderColor: "#D83772",
    backgroundColor: '#D83772',
  },
  ButtonTouch1: {
    width: 160,
    height: 45,
    alignItems: 'center',
    shadowColor: '#D83772',
    shadowOpacity: 1.0,
    shadowRadius: 100,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#D83772",
    backgroundColor: '#D83772',
    marginLeft: 30,
    elevation: 8,
  },
});
