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
import { DoctorContextConsumer } from '../../context/DoctorContext';

class BookConsultant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      selectedConultantName: '',
      selectedTimeSlot: '',
      selectedConultantId: '',
      selectedDate: '',
      selectedTimeSlotId: '',
      memberName: '',
      memberEmail: '',
      bookForSomeOne: '',
      specialityData:''
    };
  }


  async componentDidMount() {
    const { navigation } = this.props;
    
    let specialityData = this.props.route.params?.specialityData
    await this.setState({ specialityData: specialityData });
    
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {

        //   console.log('selected Consultant', this.props.navigation.getParam('selectedConsultant'))
        //   if (!AppUtils.isNull(this.props.bookAppointmentProps.selectedConultantName)) {
        //     if (!AppUtils.isNull(this.props.navigation.getParam('selectedConsultant')))
        //       // this.setState({ selectedConultantName: this.props.navigation.getParam('selectedConsultant'), selectedConultantId: this.props.navigation.getParam('selectedConultantId') })
        //       this.props.bookAppointmentProps.set({ selectedConultantName: this.props.navigation.getParam('selectedConsultant'), selectedConultantId: this.props.navigation.getParam('selectedConultantId') })
        //   } else {
        //     if (!AppUtils.isNull(this.props.navigation.getParam('selectedConsultant')))
        //       // this.setState({ selectedConultantName: this.props.navigation.getParam('selectedConsultant'), selectedConultantId: this.props.navigation.getParam('selectedConultantId') })
        //       this.props.bookAppointmentProps.set({ selectedConultantName: this.props.navigation.getParam('selectedConsultant'), selectedConultantId: this.props.navigation.getParam('selectedConultantId') })
        //   }
        //   if (!AppUtils.isNull(this.props.navigation.getParam('bookForSomeOne')))
        //     this.setState({ memberName: this.props.navigation.getParam('member_name'), memberEmail: this.props.navigation.getParam('member_email'), bookForSomeOne: this.props.navigation.getParam('bookForSomeOne') })
        // 
      }
    );


  }

  getTimeSlotData = (data) => {
    //console.log('Time slot data', data)
    // this.setState({ selectedTimeSlot: data.selectedTimeslotName, selectedTimeSlotId: data.selectedItem })
    this.props.bookAppointmentProps.set({ selectedTimeSlot: data.selectedTimeslotName, selectedTimeSlotId: data.selectedItem })
  }
  getConsultantData = async (data) => {
     console.log('selectedConultantName data', data)
    // await this.setState({ selectedConultantName: data.name, selectedConultantId:data.id })
    await this.props.bookAppointmentProps.set({ selectedConultantName: data.doctor_name, selectedConultantId: data.id })

  }
  onDateSelect = async (data) => {
    // await this.setState({selectedDate:data, selectedTimeSlot:'', selectedTimeSlotId:''})
    await this.props.bookAppointmentProps.set({ selectedDate: data, selectedTimeSlot: '', selectedTimeSlotId: '' })

  }
  // componentWillUnmount() {
  //   this.willFocusSubscription.remove();
  // }
  cancelSelection = async () => {
    // await this.setState({ selectedTimeSlot: '', selectedConultantName: '', });
    await this.props.bookAppointmentProps.set({ selectedDate: '', selectedTimeSlot: '', selectedConultantName: '', selectedTimeSlotId: '', selectedConultantId: '' })

    this.props.navigation.pop()
  }
  goToSummaryScreen = () => {
    const {
      //selectedConultantName, selectedTimeSlot, selectedConultantId, selectedDate, selectedTimeSlotId,
      bookForSomeOne, memberName, memberEmail } = this.state;
    const { selectedConultantId, selectedConultantName, selectedDate, selectedTimeSlot, selectedTimeSlotId } = this.props.bookAppointmentProps;
    if (AppUtils.isNull(bookForSomeOne)) {
      if (AppUtils.isNull(selectedConultantName))
        AppUtils.showAlert('please select doctor')
      else if (AppUtils.isNull(selectedDate))
        AppUtils.showAlert('please select date')
      else if (AppUtils.isNull(selectedTimeSlot))
        AppUtils.showAlert('please select time slot')
      else {
        let data = {
          selectedConultantName: selectedConultantName,
          selectedTimeSlot: selectedTimeSlot,
          selectedConultantId: selectedConultantId,
          selectedDate: selectedDate,
          selectedTimeSlotId: selectedTimeSlotId,
          familyMemberId: ''
        }
        this.props.navigation.navigate('BookAppointmentSummary', { bookingData: data });
      }
    } else {
      if (AppUtils.isNull(selectedConultantName))
        AppUtils.showAlert('please select doctor')
      else if (AppUtils.isNull(selectedDate))
        AppUtils.showAlert('please select date')
      else if (AppUtils.isNull(selectedTimeSlot))
        AppUtils.showAlert('please select time slot')
      else {
        let data = {
          selectedConultantName: selectedConultantName,
          selectedTimeSlot: selectedTimeSlot,
          selectedConultantId: selectedConultantId,
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
    // const { selectedConultantName, selectedTimeSlot, selectedDate, selectedConultantId } = this.state;
    const { selectedConultantId, selectedConultantName, selectedDate, selectedTimeSlot, selectedTimeSlotId,  } = this.props.bookAppointmentProps;


    if (!AppUtils.isNull(selectedConultantName) && !AppUtils.isNull(selectedDate))
      this.props.navigation.navigate('MammographySelectTimeSlot', { onGoBack: this.getTimeSlotData, centerId: selectedConultantId, bookingDate: selectedDate })
    else {
      AppUtils.showAlert('Please select doctor and date first');
    }
  }
  goToDateScreen = () => {
    const { selectedConultantId, selectedConultantName, selectedDate, selectedTimeSlot, selectedTimeSlotId } = this.props.bookAppointmentProps;


    if (!AppUtils.isNull(selectedConultantName))
      this.props.navigation.navigate('MammographySelectDate', { onGoBackFromDate: this.onDateSelect, selectedConultantId: selectedConultantId })
    else {
      AppUtils.showAlert('Please select doctor first');
    }
  }
  goToConsultantScreen = () => {

    this.props.navigation.navigate('DoctorListScreen', { onGoBackFromConsultant: this.getConsultantData, })

  }

  render() {
    const { specialityData } = this.state;
    const { selectedTimeSlot, selectedDate, selectedConultantName,selectedSpecialityName, } = this.props.bookAppointmentProps;
    return (

      <FlowWrapView viewStyle={{ backgroundColor: '#FFFFFF' }}>

        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />

        {/* <StatusBar backgroundColor={'#D93337'} barStyle="light-content" /> */}


        <View style={{ backgroundColor: '#FFFFFF' }}>

          <View>
            <TopImageView
              image={ResourceUtils.images.banner_book_consultant}
              onPress={() => {
                this.props.navigation.pop()
              }}
              text1={'  '}
              text2={''}
              textStyle={{ color: AppColors.colorBlack }}
              onPressHome={() => { this.props.navigation.navigate('Dashboard') }}
            />
            <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
              <Card containerStyle={{
                shadowColor: '#2A64B7',
                shadowOpacity: 0.2,
                margin: 0,
                borderRadius: 0,
                borderWidth: 1,
                borderColor: '#fff',
                width: '99%',
                height:'100%'
              }}>

                <View style={{ flexDirection: 'row', marginTop: 15, width: '100%' }}>

                  <View style={{ flexDirection: 'column', marginRight: 10 }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => this.goToSpecialityScreen()}>
                      <View style={{ marginTop: 30, flex: 1, flexDirection: 'row', backgroundColor: '#F3FBFE', alignItems: 'center', height: 57, marginLeft: 10, marginRight: 4, borderRadius: 12 }}>
                        <View style={{ alignContent: 'center' }}>
                          <Image style={styles.IconInTextInput} source={ResourceUtils.images.ic_heartbeat_solid} />
                        </View>
                        <TextViewMedium
                          text={!AppUtils.isNull(selectedSpecialityName) ? selectedSpecialityName : ''}
                          textStyle={styles.bookingInfoTextStyle}
                          numberOfLines={2}
                        />
                        <View style={{ alignContent: 'center', alignItems: 'flex-end', backgroundColor: AppColors.colorWhite, height: 60, width: 55, borderRadius: 50, }}>
                          <Image style={styles.IconInTextInputRight} source={ResourceUtils.images.ic_edit} />
                        </View>

                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => this.goToConsultantScreen()}>
                      <View style={{ marginTop: 30, flex: 1, flexDirection: 'row', backgroundColor: '#EBFFEE', alignItems: 'center', height: 57, marginLeft: 10, borderRadius: 12 }}>
                        <View style={{ alignContent: 'center' }}>
                          <Image style={styles.IconInTextInput} source={ResourceUtils.images.ic_consultant} />
                        </View>
                        <TextViewMedium
                          text={!AppUtils.isNull(selectedConultantName) ? selectedConultantName : 'select doctor'}
                          textStyle={styles.bookingInfoTextStyle}
                          numberOfLines={2}
                        />
                        <View style={{ alignContent: 'center', alignItems: 'flex-end', backgroundColor: AppColors.colorWhite, marginRight: 5, height: 60, width: 55, borderRadius: 50, }}>
                          <Image style={styles.IconInTextInputRight} source={AppUtils.isNull(selectedConultantName) ? ResourceUtils.images.greenArrow : ResourceUtils.images.ic_edit} />
                        </View>

                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => this.goToDateScreen()}>
                      <View style={{ marginTop: 30, flexDirection: 'row', backgroundColor: '#FBF3FE', alignItems: 'center', height: 57, marginLeft: 10, marginRight: 4, borderRadius: 12 }}>
                        <View style={{ alignContent: 'center' }}>
                          <Image style={styles.IconInTextInput} source={ResourceUtils.images.date} />
                        </View>
                        <TextViewMedium
                          text={!AppUtils.isNull(selectedDate) ? moment(selectedDate, AppStrings.date_format_for_sql).format(AppStrings.date_format_new) : 'select date'}
                          textStyle={styles.bookingInfoTextStyle}
                          numberOfLines={2}
                        />
                        <View style={{ alignContent: 'center', alignItems: 'flex-end', backgroundColor: AppColors.colorWhite, height: 60, width: 55, borderRadius: 50, }}>
                          <Image style={styles.IconInTextInputRight} source={AppUtils.isNull(selectedDate) ? ResourceUtils.images.greenArrow : ResourceUtils.images.ic_edit} />
                        </View>

                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '100%' }} onPress={() => this.goToTimeSlot()}>
                      <View style={{ marginTop: 30, flexDirection: 'row', backgroundColor: '#FFF3E4', alignItems: 'center', height: 57, marginLeft: 10, marginRight: 4, borderRadius: 12 }}>
                        <View style={{ alignContent: 'center' }}>
                          <Image style={styles.IconInTextInput} source={ResourceUtils.images.clock} />
                        </View>
                        <TextViewMedium
                          text={!AppUtils.isNull(selectedTimeSlot) ? selectedTimeSlot : 'select time slot'}
                          textStyle={styles.bookingInfoTextStyle}
                          numberOfLines={2}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'flex-end', backgroundColor: AppColors.colorWhite, height: 60, width: 55, borderRadius: 50, }}>
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
                    text={"view summary"}
                    textStyle={{ fontSize: 15 }}
                  />
                </View>

              </Card>
            </View>
          </View>
        </View>
      </FlowWrapView>

    );
  }
}
const BookConsultantElements = connectWithConsumer(
  {
    bookAppointmentProps: DoctorContextConsumer,
  })(BookConsultant);


export default BookConsultantElements;

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
    width: AppUtils.getDeviceWidth() / 2
  }
});