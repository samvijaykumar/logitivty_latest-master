import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppStrings from "../../utils/AppStrings";
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import { Card } from 'react-native-elements';
import ButtonView from '../../widgets/ButtonView';
import FamilyMemberContextProvider, {
  FamilyMemberContextConsumer,
} from '../../context/FamilyMemberContext';
import { TextInput } from 'react-native';
import AppUtils from '../../utils/AppUtils';
import TopImageView from '../../widgets/TopImageView';
import ActivityIndicatorView from '../../widgets/ActivityIndicatorView';
import AIThermoMammographyBottom from '../../widgets/AIThermoMammographyBottom';
import SomethingWentWrongView from '../../widgets/SomethingWentWrongView';

class BookForSomeoneElseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membersList: [],
      something_went_worng: true,
      _memberName: '',
      _searchMember: '',
      setVisibility:false
    };
  }

  retryButtonCalled() {
    this.getMemberList();
  }

  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.getMemberList();
      }
    );
  }

  getMemberList = () => {
    this.props.memberListProps.userFamilyMembersApiCall({});
  };
  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }

  doNameSearch = (_searchMember) => {
    if (!AppUtils.isNull(this.state._searchMember)) {
      this.setState({
        membersList: this.props.memberListProps.response.data
          .filter((item) => !AppUtils.isNull(item.name))
          .filter((item) =>
            item.name
              .toLowerCase()
              .includes(this.state._searchMember.toLowerCase())
          ),
      });
    } else {
      this.setState({
        membersList: this.props.memberListProps.response.data || [],
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.memberListProps.loading !==
      this.props.memberListProps.loading &&
      !this.props.memberListProps.loading
    ) {
      let response = this.props.memberListProps.response;

      if (response.statusCode == 200) {


        if (!response.data.length <= 0) {
          console.log('memberListProps', response.data);

          this.setState({
            membersList: response.data,
            something_went_worng: true,
            setVisibility: false,
          });
        } else {
          this.setState({
            something_went_worng: true,
            setVisibility: true,
            membersList: [],
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

  selectedTimeslot = (item) => {
    this.setState({ selectedItem: item.id });

    this.props.navigation.pop(1);

    this.props.navigation.navigate('BookApointment', {
      member_name: item.name,
      member_email: item.email,
      bookForSomeOne: 'bookForSomeOne',
      familyMemberId: item.id
    });
  };
  render() {
    const { membersList, something_went_worng, _memberName, _searchMember, setVisibility } =
      this.state;
    return (
      <FlowWrapView>
        <StatusBar backgroundColor={AppColors.statusBarColor} barStyle="light-content" />
        <SomethingWentWrongView
          visible={something_went_worng == false}
          onPressRetry={() => {
            this.retryButtonCalled();
          }}
        />
        {something_went_worng == true ? (
          <View>
            <TopImageView
              image={ResourceUtils.images.book_for_someone_else_banner}
              onPress={() => {
                this.props.navigation.pop();
              }}
              text1={'book for '}
              text2={'someone else'}
              textStyle={{ color: AppColors.colorBlack }}
              onPressHome={()=>{this.props.navigation.navigate('Dashboard')}}
            />

            <View
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#E5E5E5',
              }}
            >
              {!setVisibility ? (
                <Card
                  containerStyle={{
                    shadowColor: '#2A64B7',
                    shadowOpacity: 0.2,
                    margin: -1,
                    marginTop: -10,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: '#fff',
                    width: '99%',
                  }}
                >
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={"search member..."}
                      placeholderTextColor={'#5D5D5D'}
                      returnKeyType="done"
                      // onChangeText={(_memberName) => this.setState({ _memberName })}
                      text={_memberName}
                      style={styles.inputStype}
                      onChangeText={async (_searchMember) => {
                        await this.setState({ _searchMember });
                        this.doNameSearch(_searchMember);
                      }}
                    />
                    <Image
                      style={styles.IconInTextInput}
                      source={ResourceUtils.images.ic_check_right}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginTop: 20,
                      marginBottom: 5,
                    }}
                  >
                    {this.props.memberListProps.loading ? (
                      <ActivityIndicatorView loading={true} />
                    ) : (
                      <View style={{ marginRight: 1, flex: 1, width: '100%' }}>
                        <FlatList
                          style={{ flex: 1, width: '100%', height: 300 }}
                          data={membersList}
                          nestedScrollEnabled
                          keyExtractor={(item, index) => index.toString()}
                          // renderItem={this.renderListItem}
                          renderItem={({ item }) => (
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                width: '100%',
                              }}
                            >
                              <TouchableOpacity
                                activeOpacity={0.2}
                                // onPress={() => {
                                //   this.props.navigation.navigate('BookApointment', { item: item})

                                // }}
                                onPress={() => this.selectedTimeslot(item)}
                              >
                                <View style={{ flexDirection: 'column' }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginLeft: 5,
                                      marginTop: 5,
                                      flex: 1,
                                    }}
                                  >
                                    <View
                                      style={{
                                        alignSelf: 'center',
                                        marginLeft: 8,
                                        width: '100%',
                                        flex: 1,
                                      }}
                                    >
                                      <TextViewMedium
                                        text={item.name}
                                        textStyle={styles.name_text}
                                      />
                                      <TextViewMedium
                                        text={item.relation}
                                        textStyle={styles.relation_text}
                                      />
                                    </View>

                                    <View
                                      style={{
                                        alignSelf: 'flex-end',
                                        marginLeft: 25,
                                        marginRight: 10,
                                      }}
                                    >
                                      <Image
                                        style={styles.arrow_icon_style}
                                        source={
                                          this.state.selectedItem == item.id
                                            ? ResourceUtils.images.green_checked
                                            : ''
                                        }
                                      />
                                    </View>
                                  </View>
                                  <View style={styles.sepraterLineView} />
                                </View>
                              </TouchableOpacity>
                            </View>
                          )}
                        />
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{ alignSelf: 'flex-end' }}
                    activeOpacity={0.2}
                    onPress={() => {
                      this.props.navigation.navigate('AddMemberScreen');
                    }}
                  >
                    <Image
                      style={styles.plus_icon_style}
                      resizeMode={'cover'}
                      source={ResourceUtils.images.blue_plus}
                    />
                  </TouchableOpacity>
                </Card>
              ) : null}
              {setVisibility ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: AppColors.colorWhite,
                    height: 400,
                    shadowColor: '#2A64B7',
                    shadowOpacity: 0.2,
                    margin: -1,
                    marginTop: -10,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: '#fff',
                    width: '99%',
                  }}
                >
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
                    text={'Sorry, but no member'}
                    textStyle={{
                      textAlign: 'center',
                      marginTop: 5,
                      fontSize: 16,
                      color: '#333333',
                    }}
                  />
                  <TextViewMedium
                    text={'was found.'}
                    textStyle={{
                      textAlign: 'center',

                      fontSize: 16,
                      color: '#333333',
                    }}
                  />
                  <ButtonView
                    containerStyle={styles.noDataFoundButton}
                    onPress={() => {
                      this.props.navigation.navigate('AddMemberScreen');
                    }}
                    text={'Add your member now'}
                  />
                </View>
              ) : null}

              <AIThermoMammographyBottom />
            </View>
          </View>
        ) : null}

      </FlowWrapView>
    );
  }
}

const BookForSomeoneElseScreenElement = connectWithContext(
  FamilyMemberContextProvider
)({
  memberListProps: FamilyMemberContextConsumer,
})(BookForSomeoneElseScreen);

export default BookForSomeoneElseScreenElement;

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
    alignSelf: 'flex-end',
    width: 21,
    height: 21,
    marginTop: -10,
  },
  plus_icon_style: {
    width: 50,
    height: 50,
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
  Circle_Button_style: {
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 2,
    marginLeft: 5,
    borderColor: AppColors.ramaBule,
    alignSelf: 'center',
    backgroundColor: AppColors.ramaBule,
    justifyContent: 'center',
    flex: 0.1,
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
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  relation_text: {
    textAlign: 'left',
    color: '#757575',
    marginTop: -5,
    fontSize: 12,
    fontFamily: ResourceUtils.fonts.poppins_regular,
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
    width: '95%',
    marginTop: 10,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 10,
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
  },

  inputView: {
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

  IconInTextInput: {
    marginRight: 30,
    width: 50,
    marginTop: 5,
    height: 50,
    resizeMode: 'contain',
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 52,
    width: '85%',
    color: AppColors.colorBlack,
  },
   noDataFoundButton: {
    width: 320,
    marginTop: 15,
    alignSelf: 'center', marginLeft:10,marginRight:10,fontSize:11,
    justifyContent: 'center',
  },
});