import React from 'react';
import {
  View,
  StyleSheet, StatusBar, TouchableOpacity
} from 'react-native';
import AppColors from '../../utils/AppColors';
import FlowWrapView from '../../widgets/FlowWrapView'
import { Card, Image } from 'react-native-elements'
import ResourceUtils from '../../utils/ResourceUtils';
import TextViewMedium from '../../widgets/TextViewMedium';
import TopImageView from '../../widgets/TopImageView';
import ButtonView from '../../widgets/ButtonView';
import AppUtils from '../../utils/AppUtils';
import AIThermoMammographyBottom from '../../widgets/AIThermoMammographyBottom';
import { connectWithConsumer } from '../../container';
import { MamographyContextConsumer } from '../../context/MamographyContext';
import moment from 'moment';
import AppStrings from '../../utils/AppStrings';

class BookApointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      selectedCenterName: '',
      selectedTimeSlot: '',
      selectedCenterId: '',
      selectedDate: '',
      selectedTimeSlotId: '',
      memberName: '',
      memberEmail: '',
      bookForSomeOne: '',
    };
  }


  async componentDidMount() {
    const { navigation } = this.props;
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {

        console.log('selected Center', this.props.navigation.getParam('selectedCenter'))
        if (!AppUtils.isNull(this.props.bookAppointmentProps.selectedCenterName)) {
          if (!AppUtils.isNull(this.props.navigation.getParam('selectedCenter')))
            // this.setState({ selectedCenterName: this.props.navigation.getParam('selectedCenter'), selectedCenterId: this.props.navigation.getParam('selectedCenterId') })
            this.props.bookAppointmentProps.set({ selectedCenterName: this.props.navigation.getParam('selectedCenter'), selectedCenterId: this.props.navigation.getParam('selectedCenterId') })
        } else {
          if (!AppUtils.isNull(this.props.navigation.getParam('selectedCenter')))
            // this.setState({ selectedCenterName: this.props.navigation.getParam('selectedCenter'), selectedCenterId: this.props.navigation.getParam('selectedCenterId') })
            this.props.bookAppointmentProps.set({ selectedCenterName: this.props.navigation.getParam('selectedCenter'), selectedCenterId: this.props.navigation.getParam('selectedCenterId') })
        }
        if (!AppUtils.isNull(this.props.navigation.getParam('bookForSomeOne')))
          this.setState({ memberName: this.props.navigation.getParam('member_name'), memberEmail: this.props.navigation.getParam('member_email'), bookForSomeOne: this.props.navigation.getParam('bookForSomeOne') })
      }
    );


  }

  getTimeSlotData = (data) => {
    //console.log('Time slot data', data)
    // this.setState({ selectedTimeSlot: data.selectedTimeslotName, selectedTimeSlotId: data.selectedItem })
    this.props.bookAppointmentProps.set({ selectedTimeSlot: data.selectedTimeslotName, selectedTimeSlotId: data.selectedItem })
  }
  getCenterData = async (data) => {
    // console.log('selectedCenterName data', data)
    // await this.setState({ selectedCenterName: data.name, selectedCenterId:data.id })
    await this.props.bookAppointmentProps.set({ selectedCenterName: data.name, selectedCenterId: data.id })

  }
  onDateSelect = async (data) => {
    // await this.setState({selectedDate:data, selectedTimeSlot:'', selectedTimeSlotId:''})
    await this.props.bookAppointmentProps.set({ selectedDate: data, selectedTimeSlot: '', selectedTimeSlotId: '' })

  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  cancelSelection = async () => {
    // await this.setState({ selectedTimeSlot: '', selectedCenterName: '', });
    await this.props.bookAppointmentProps.set({ selectedDate: '', selectedTimeSlot: '', selectedCenterName: '', selectedTimeSlotId: '', selectedCenterId: '' })

    this.props.navigation.pop()
  }
  goToSummaryScreen = () => {
    const {
      //selectedCenterName, selectedTimeSlot, selectedCenterId, selectedDate, selectedTimeSlotId,
      bookForSomeOne, memberName, memberEmail } = this.state;
    const { selectedCenterId, selectedCenterName, selectedDate, selectedTimeSlot, selectedTimeSlotId } = this.props.bookAppointmentProps;
    if (AppUtils.isNull(bookForSomeOne)) {
      if (AppUtils.isNull(selectedCenterName))
        AppUtils.showAlert('please select center')
      else if (AppUtils.isNull(selectedDate))
        AppUtils.showAlert('please select date')
      else if (AppUtils.isNull(selectedTimeSlot))
        AppUtils.showAlert('please select time slot')
      else {
        let data = {
          selectedCenterName: selectedCenterName,
          selectedTimeSlot: selectedTimeSlot,
          selectedCenterId: selectedCenterId,
          selectedDate: selectedDate,
          selectedTimeSlotId: selectedTimeSlotId,
          familyMemberId: ''
        }
        this.props.navigation.navigate('BookAppointmentSummary', { bookingData: data });
      }
    } else {
      if (AppUtils.isNull(selectedCenterName))
        AppUtils.showAlert('please select center')
      else if (AppUtils.isNull(selectedDate))
        AppUtils.showAlert('please select date')
      else if (AppUtils.isNull(selectedTimeSlot))
        AppUtils.showAlert('please select time slot')
      else {
        let data = {
          selectedCenterName: selectedCenterName,
          selectedTimeSlot: selectedTimeSlot,
          selectedCenterId: selectedCenterId,
          selectedDate: selectedDate,
          selectedTimeSlotId: selectedTimeSlotId,
          memberName: memberName,
          memberEmail: memberEmail,
          familyMemberId: this.props.navigation.getParam('familyMemberId')
        }
        this.props.navigation.navigate('BookAppointmentSummary', { bookingData: data });
      }
    }
  }
  goToTimeSlot = () => {
    // const { selectedCenterName, selectedTimeSlot, selectedDate, selectedCenterId } = this.state;
    const { selectedCenterId, selectedCenterName, selectedDate, selectedTimeSlot, selectedTimeSlotId } = this.props.bookAppointmentProps;


    if (!AppUtils.isNull(selectedCenterName) && !AppUtils.isNull(selectedDate))
      this.props.navigation.navigate('MammographySelectTimeSlot', { onGoBack: this.getTimeSlotData, centerId: selectedCenterId, bookingDate: selectedDate })
    else {
      AppUtils.showAlert('Please select center and date first');
    }
  }
  goToDateScreen = () => {
    // const { selectedCenterName, selectedTimeSlot, selectedDate } = this.state;
    const { selectedCenterId, selectedCenterName, selectedDate, selectedTimeSlot, selectedTimeSlotId } = this.props.bookAppointmentProps;


    if (!AppUtils.isNull(selectedCenterName))
      this.props.navigation.navigate('MammographySelectDate', { onGoBackFromDate: this.onDateSelect, selectedCenterId: selectedCenterId })
    else {
      AppUtils.showAlert('Please select center first');
    }
  }
  goToCityScreen = () => {

    if (AppUtils.isNull(this.props.bookAppointmentProps.bookingId))
      this.props.navigation.navigate('CityListScreen', { onGoBackFromCity: this.getCenterData, })
    else {
      AppUtils.showAlert('City update is not allowed in reschedule.')
    }
  }

  render() {
    //const { selectedCenterName, selectedTimeSlot, selectedDate } = this.state;
    const { selectedTimeSlot, selectedDate, selectedCenterName } = this.props.bookAppointmentProps;
    return (

      <FlowWrapView viewStyle={{ backgroundColor: '#E5E5E5' }}>

        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />

        {/* <StatusBar backgroundColor={'#D93337'} barStyle="light-content" /> */}


        <View style={{ backgroundColor: '#E5E5E5' }}>

          <View>
            <TopImageView
              image={ResourceUtils.images.book_appointment_banner}
              onPress={() => {
                this.props.navigation.pop()
              }}
              text1={'book  '}
              text2={'appointment'}
              textStyle={{ color: AppColors.colorBlack }}
              onPressHome={() => { this.props.navigation.navigate('Dashboard') }}
            />
            <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: '#E5E5E5' }}>
              <Card containerStyle={{
                shadowColor: '#2A64B7',
                shadowOpacity: 0.2,
                margin: -1,
                marginTop: -5,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#fff',
                width: '99%'
              }}>

                <View style={{ flexDirection: 'row', marginTop: 15, width: '80%' }}>
                  <View style={{ flexDirection: 'column', }}>
                    <View style={[styles.roundCircle, { backgroundColor: '#F3FEFD' }]}>

                      <View>
                        <TextViewMedium
                          text={'1'}
                          textStyle={{
                            fontSize: 16,
                            color: AppColors.colorBlack,
                          }}
                        />
                      </View>

                    </View>
                    <View style={[styles.roundCircle, { backgroundColor: '#FBF3FE' }]}>

                      <View>
                        <TextViewMedium
                          text={'2'}
                          textStyle={{
                            fontSize: 16,
                            color: AppColors.colorBlack,
                          }}
                        />
                      </View>
                    </View>
                    <View style={[styles.roundCircle, { backgroundColor: '#FFF3E4' }]}>
                      <View>
                        <TextViewMedium
                          text={'3'}
                          textStyle={{
                            fontSize: 16,
                            color: AppColors.colorBlack,
                          }}

                        />
                      </View>

                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', marginLeft: 5, }}>

                    <View style={{ marginLeft: 10, width: 1, height: 100, backgroundColor: AppColors.sepraterLineColor, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }} >
                      <View style={{ marginTop: 20, width: 5, height: 5, borderRadius: 5, backgroundColor: '#4FE3C1', justifyContent: 'center', alignSelf: 'center', }}></View>
                    </View>

                    <View style={{ marginLeft: 10, width: 1, height: 90, backgroundColor: AppColors.sepraterLineColor, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }} >
                      <View style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: '#C65FF6', justifyContent: 'center', alignSelf: 'center', }}></View>
                    </View>

                    <View style={{ marginLeft: 10, width: 1, height: 90, backgroundColor: AppColors.sepraterLineColor, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }} >
                      <View style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: '#FCAF3D', justifyContent: 'center', alignSelf: 'center', }}></View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', marginRight: 10 }}>
                    <TouchableOpacity style={{ width: '90%' }} onPress={() => this.goToCityScreen()}>
                      <View style={{ marginTop: 30, flex: 1, flexDirection: 'row', backgroundColor: '#F3FEFD', alignItems: 'center', height: 57, marginLeft: 10, marginRight: 4, borderRadius: 12 }}>
                        <View style={{ alignContent: 'center' }}>
                          <Image style={styles.IconInTextInput} source={ResourceUtils.images.location} />
                        </View>
                        <TextViewMedium
                          text={!AppUtils.isNull(selectedCenterName) ? selectedCenterName : 'select center'}
                          textStyle={styles.bookingInfoTextStyle}
                          numberOfLines={2}
                        />
                        <View style={{ alignContent: 'center', alignItems: 'flex-end', backgroundColor: AppColors.colorWhite, marginRight: 5, height: 60, width: 55, borderRadius: 50, }}>
                          <Image style={styles.IconInTextInputRight} source={AppUtils.isNull(selectedCenterName) ? ResourceUtils.images.greenArrow : ResourceUtils.images.ic_edit} />
                        </View>

                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '90%' }} onPress={() => this.goToDateScreen()}>
                      <View style={{ marginTop: 30, flexDirection: 'row', backgroundColor: '#FBF3FE', alignItems: 'center', height: 57, marginLeft: 10, marginRight: 4, borderRadius: 12 }}>
                        <View style={{ alignContent: 'center' }}>
                          <Image style={styles.IconInTextInput} source={ResourceUtils.images.date} />
                        </View>
                        <TextViewMedium
                          text={!AppUtils.isNull(selectedDate) ? moment(selectedDate, AppStrings.date_format_for_sql).format(AppStrings.date_format_new) : 'select date'}
                          textStyle={styles.bookingInfoTextStyle}
                          numberOfLines={2}
                        />
                        <View style={{ alignContent: 'center', alignItems: 'flex-end', backgroundColor: AppColors.colorWhite, marginRight: 5, height: 60, width: 55, borderRadius: 50, }}>
                          <Image style={styles.IconInTextInputRight} source={AppUtils.isNull(selectedDate) ? ResourceUtils.images.greenArrow : ResourceUtils.images.ic_edit} />
                        </View>

                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '90%' }} onPress={() => this.goToTimeSlot()}>
                      <View style={{ marginTop: 30, flexDirection: 'row', backgroundColor: '#FFF3E4', alignItems: 'center', height: 57, marginLeft: 10, marginRight: 4, borderRadius: 12 }}>
                        <View style={{ alignContent: 'center' }}>
                          <Image style={styles.IconInTextInput} source={ResourceUtils.images.clock} />
                        </View>
                        <TextViewMedium
                          text={!AppUtils.isNull(selectedTimeSlot) ? selectedTimeSlot : 'select time slot'}
                          textStyle={styles.bookingInfoTextStyle}
                          numberOfLines={2}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: 5, backgroundColor: AppColors.colorWhite, marginRight: 5, height: 60, width: 55, borderRadius: 50, }}>
                          <Image style={styles.IconInTextInputRight} source={AppUtils.isNull(selectedTimeSlot) ? ResourceUtils.images.greenArrow : ResourceUtils.images.ic_edit} />
                        </View>

                      </View>
                    </TouchableOpacity>
                  </View>

                </View>



                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => { this.cancelSelection() }}
                  >
                    {/* <Text
                      style={{
                        fontSize: 16,
                        marginRight: 30,
                        textAlign: "center",
                        alignSelf: "center",
                        fontFamily: ResourceUtils.fonts.poppins_semibold,
                      }}
                    >

                      {"Cancel"}
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
                      this.goToSummaryScreen();

                    }}
                    // loading={this.props.paymentProps.loadingPay || this.props.paymentProps.loadingOrder}
                    text={"Continue"}
                    textStyle={{ fontSize: 15 }}
                  />
                </View>

              </Card>
              <AIThermoMammographyBottom />
            </View>
          </View>
        </View>
      </FlowWrapView>

    );
  }
}
const BookAppointmentElements = connectWithConsumer(
  {
    bookAppointmentProps: MamographyContextConsumer,
  })(BookApointment);


export default BookAppointmentElements;

const styles = StyleSheet.create({
  IconInTextInput: {
    marginLeft: 14,
    width: 26,
    height: 26,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  IconInTextInputRight: {
    marginTop: 5,
    width: 50,
    height: 50,
    resizeMode: 'contain',
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
  ButtonView: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
  },
  ButtonTouch1: {
    width: 160,
    height: 46,
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#D83772",
    backgroundColor: '#D83772',
    marginLeft: 30,
    shadowColor: '#D83772',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  roundCircle: {
    marginTop: 37,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50
  },
  bookingInfoTextStyle: {
    fontSize: 14,
    color: AppColors.colorBlack,
    textAlign: 'left',
    marginRight: 10,
    width: AppUtils.getDeviceWidth()/2.7
  }
});