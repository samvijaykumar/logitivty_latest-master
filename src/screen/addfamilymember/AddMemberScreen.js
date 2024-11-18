import React, { Component } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Text,
} from "react-native";
import AppColors from "../../utils/AppColors";
import AppStrings from "../../utils/AppStrings";
import ResourceUtils from "../../utils/ResourceUtils";
import { connectWithContext } from "../../container";
import TextViewMedium from "../../widgets/TextViewMedium";
import FlowWrapView from "../../widgets/FlowWrapView";
import { Card, Icon } from "react-native-elements";
import ButtonView from "../../widgets/ButtonView";
import { TextInput } from "react-native";
import AppUtils from "../../utils/AppUtils";
import TopImageView from "../../widgets/TopImageView";
import TextViewNormal from "../../widgets/TextViewNormal";
import FamilyMemberContextProvider, {
  FamilyMemberContextConsumer,
} from "../../context/FamilyMemberContext";
import DropDownView from "../../widgets/DropDownView";
import SomethingWentWrongView from "../../widgets/SomethingWentWrongView";
import { MenuProvider } from "react-native-popup-menu";
import TextViewSemiBold from "../../widgets/TextViewSemiBold";
import { Keyboard } from "react-native";


const MyCheckBox = ({ checked, onPress, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => {
      if (!checked) { 
        onPress(!checked);
        onSelect(!checked);
      }
    }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' ,marginLeft:10,marginRight: 6}}>
    <Image
        source={checked ? ResourceUtils.images.checkedRadio : ResourceUtils.images.uncheckedRadio}
        style={{ width: 20, height: 20, borderRadius: 10, marginRight: 8 }}
    />
      </View>
    </TouchableOpacity>
  );
};

class AddMemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _email: "",
      _name: "",
      _mobile: "",
      something_went_worng: true,
      relationList: [],
      is_edit: false,
      selectedRelation: {},
      memberId: 0,
      dob: "",
      checkedFamilyMemb: 0,
    };
  }

  //   static navigationOptions = ({ navigation }) => ({
  //     headerShown: false,
  // });

  retryButtonCalled() {}

  async componentDidMount() {
    navigate = this.props.navigation;
    let memberDetails = this.props.route.params?.item

    await this.setState({ is_edit: !AppUtils.isNull(memberDetails) });
    this.props.addMemberProps.getRelationApi();
    if (this.state.is_edit) {
      this.setState({
        _name: memberDetails.name,
        _email: AppUtils.isNull(memberDetails.email) ? "" : memberDetails.email,
        _mobile: memberDetails.mobile_no,
        selectedRelation: {
          name:
            memberDetails.relation == "friends"
              ? ""
              : memberDetails.relation == "social"
              ? ""
              : memberDetails.relation,
        },
        memberId: memberDetails.id,
        dob: memberDetails.dob,
        checkedFamilyMemb:
          memberDetails.family_member_type == "family"
            ? 0
            : memberDetails.family_member_type == "friends"
            ? 1
            : memberDetails.family_member_type == "social"
            ? 2
            : 0,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.addMemberProps.loading !== this.props.addMemberProps.loading &&
      !this.props.addMemberProps.loading
    ) {
      let response = this.props.addMemberProps.response;

      if (response.statusCode == 200) {
        console.log("get relation data", response.data);
        if (response.data.length > 0) {
          await this.setState({
            //relationList: response.data.filter((item) => (item.type == "female")),
            relationList: response.data,
          });
        }
      }
    }
    if (
      prevProps.addMemberProps.adding !== this.props.addMemberProps.adding &&
      !this.props.addMemberProps.adding
    ) {
      let response = this.props.addMemberProps.response;
      if (response.statusCode == 200) {
        console.log("addMember data", response);
        AppUtils.showAlert(response.message);
        this.props.navigation.pop();
      }
    }
  }

  cancelSelection = () => {
    this.props.navigation.pop();
  };

  addFamilyMemberCall() {
    const {
      _email,
      _mobile,
      _name,
      is_edit,
      selectedRelation,
      checkedFamilyMemb,
    } = this.state;
    var eml = _email.trim();
    var name = _name.trim();
    var mobile = _mobile.trim();

    /**
     * From Validations
     * */
    if (AppUtils.isNull(name)) {
      AppUtils.showAlert("Please enter name.");
    } else if (AppUtils.isNull(mobile)) {
      AppUtils.showAlert("Please enter  mobile number");
    } else if (
      checkedFamilyMemb == 0 &&
      AppUtils.isNull(selectedRelation.name)
    ) {
      AppUtils.showAlert("Please select relation type.");
    } else {
      if (!AppUtils.isNull(eml)) {
        if (!AppUtils.isValidEmail(eml)) {
          AppUtils.showAlert("Please enter a valid email address");
          return;
        } else {
          this.saveData(name, eml, mobile);
        }
      } else {
        this.saveData(name, eml, mobile);
      }
    }
  }

  saveData = (name, eml, mobile) => {
    let { selectedRelation, dob, memberId, is_edit, checkedFamilyMemb } =
      this.state;
    var data = {
      email: eml,
      name: name,
      mobile_no: mobile,
      dob: dob,
      gender: "female",
      task_type: is_edit ? "edit" : "add",
      country_code: "+91",
      relation:
        checkedFamilyMemb == 0
          ? selectedRelation.name
          : checkedFamilyMemb == 1
          ? "friends"
          : checkedFamilyMemb == 2
          ? "social"
          : "other",
      is_working: 0,
      company: "",
      family_member_id: memberId,
      family_member_type:
        checkedFamilyMemb == 0
          ? "family"
          : checkedFamilyMemb == 1
          ? "friends"
          : checkedFamilyMemb == 2
          ? "social"
          : "family",
    };
    console.log(`add member ` + JSON.stringify(data));
    this.props.addMemberProps.addFamilyMemberApi(data);
  };
  selectFamilyMember = (index) => {
    this.setState({ checkedFamilyMemb: index });
  };

  render() {
    const {
      _email,
      _mobile,
      _name,
      something_went_worng,
      _relation,
      is_edit,
      relationList,
      selectedRelation,
      checkedFamilyMemb,
    } = this.state;
    console.log("relationList", relationList);
    return (
      <MenuProvider>
        <FlowWrapView
          showLoader={
            this.props.addMemberProps.loading ||
            this.props.addMemberProps.adding
          }
        >
          <StatusBar
            backgroundColor={AppColors.statusBarColor}
            barStyle="light-content"
          />
          <SomethingWentWrongView visible={something_went_worng == false} />
          {something_went_worng == true ? (
            <View>
              <TopImageView
                image={
                  is_edit == true
                    ? ResourceUtils.images.Add_family_members_banner
                    : ResourceUtils.images.Add_family_members_banner
                }
                // image={ResourceUtils.images.Add_family_members_banner}
                onPress={() => {
                  this.props.navigation.pop();
                }}
                text1={is_edit == true ? "edit " : "add "}
                text2={"member details"}
                textStyle={{ color: AppColors.colorBlack }}
                onPressHome={() => {
                  this.props.navigation.navigate("Dashboard");
                }}
              />

              <View style={{ flex: 1, width: "100%", height: "100%" }}>
                <Card
                  containerStyle={{
                    shadowColor: "#2A64B7",
                    shadowOpacity: 0.2,
                    margin: -1,
                    marginTop: -8,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "#fff",
                  }}
                >
                  <View>
                    <View
                      style={{ marginBottom: 5, marginTop: 30, marginLeft: 25 }}
                    >
                      <TextViewSemiBold
                        textStyle={{
                          fontSize: 16,
                          textAlign: "left",
                          textTransform: "lowercase",
                        }}
                        text={"please select one"}
                      ></TextViewSemiBold>
                    </View>
                    <View style={{ flexDirection: "column" }}>

                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:5}}>
                          <MyCheckBox
                            checked={checkedFamilyMemb === 0}
                            onPress={(newValue) => this.setState({ checkedFamilyMemb: newValue })}
                            onSelect={(newValue) => this.selectFamilyMember(newValue ? 0 : -1)}
                          />
                          <Text style={{ color: 'black' }}>Family</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:5}}>
                          <MyCheckBox
                            checked={checkedFamilyMemb === 1}
                            onPress={(newValue) => this.setState({ checkedFamilyMemb: newValue })}
                            onSelect={(newValue) => this.selectFamilyMember(newValue ? 1 : -1)}
                          />
                          <Text style={{ color: 'black' }}>Friends</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                          <MyCheckBox
                            checked={checkedFamilyMemb === 2}
                            onPress={(newValue) => this.setState({ checkedFamilyMemb: newValue })}
                            onSelect={(newValue) => this.selectFamilyMember(newValue ? 2 : -1)}
                          />
                          <Text style={{ color: 'black' }}>Social</Text>
                        </View>
                      </View>







                  {/*     <CheckBox
                        checkedColor={AppColors.primaryColor}
                        checkedIcon="checkedRadio"
                        uncheckedIcon="uncheckedRadio"
                        checked={checkedFamilyMemb == 0}
                        title = "family"
                       containerStyle={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                        }}
                        onPress={() => this.selectFamilyMember(0)}
                      />
                      <CheckBox
                        checkedColor={AppColors.primaryColor}
                        checkedIcon="checkedRadio"
                        uncheckedIcon="uncheckedRadio"
                        title={"friends"}
                        checked={checkedFamilyMemb == 1}
                        containerStyle={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          marginTop: -5,
                        }}
                        onPress={() => this.selectFamilyMember(1)}
                      />
                      <CheckBox
                        checkedColor={AppColors.primaryColor}
                        checkedIcon="checkedRadio"
                        uncheckedIcon="uncheckedRadio"
                        title={"social"}
                        containerStyle={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          marginTop: -5,
                        }}
                        checked={checkedFamilyMemb == 2}
                        onPress={() => this.selectFamilyMember(2)}
                      /> */}
                    </View>
                    <View>
                      <View
                        style={{
                          marginBottom: 5,
                          marginTop: 30,
                          marginLeft: 25,
                        }}
                      >
                        <TextViewNormal
                          textStyle={{
                            fontSize: 14,
                            textAlign: "left",
                            textTransform: "lowercase",
                          }}
                          text={AppStrings.name}
                        ></TextViewNormal>
                      </View>

                      <View style={styles.inputView}>
                        <TextInput
                          myRef={(ref) => (this.userName = ref)}
                          placeholderImg={ResourceUtils.images.img_help}
                          returnKeyType="next"
                          onChangeText={(_name) => this.setState({ _name })}
                          value={_name}
                          style={styles.inputStype}
                        />
                        <Image
                          style={styles.IconInTextInput}
                          source={ResourceUtils.images.user}
                        />
                      </View>
                    </View>
                    <View>
                      <View
                        style={{
                          marginBottom: 5,
                          marginTop: 12,
                          marginLeft: 25,
                        }}
                      >
                        <TextViewNormal
                          textStyle={{
                            fontSize: 14,
                            textAlign: "left",
                            textTransform: "lowercase",
                          }}
                          text={AppStrings.mobile}
                        ></TextViewNormal>
                      </View>
                      <View style={styles.inputView}>
                        <TextInput
                          myRef={(ref) => (this.userMobile = ref)}
                          placeholderImg={ResourceUtils.images.img_help}
                          returnKeyType="next"
                          keyboardType={"numeric"}
                          onChangeText={(_mobile) => this.setState({ _mobile })}
                          value={_mobile}
                          maxLength={10}
                          style={styles.inputStype}
                        />
                        <Image
                          style={styles.IconInTextInput}
                          source={ResourceUtils.images.phone}
                        />
                      </View>
                    </View>

                    <View>
                      <View>
                        <View
                          style={{
                            marginBottom: 5,
                            marginTop: 15,
                            marginLeft: 25,
                          }}
                        >
                          <TextViewNormal
                            textStyle={{
                              fontSize: 14,
                              textAlign: "left",
                              textTransform: "lowercase",
                            }}
                            text={`${AppStrings.email} (optional)`}
                          ></TextViewNormal>
                        </View>
                        <View style={styles.inputView}>
                          <TextInput
                            myRef={(ref) => (this.userEmail = ref)}
                            placeholderImg={ResourceUtils.images.img_help}
                            keyboardType={"email-address"}
                            returnKeyType="done"
                            onChangeText={(_email) => this.setState({ _email })}
                            value={_email}
                            style={styles.inputStype}
                          />
                          <Image
                            style={styles.IconInTextInput}
                            source={ResourceUtils.images.mail}
                          />
                        </View>
                      </View>
                      <View>
                        {checkedFamilyMemb == 0 ? (
                          <View>
                            <View
                              style={{
                                marginBottom: 5,
                                marginTop: 15,
                                marginLeft: 25,
                              }}
                            >
                              <TextViewNormal
                                textStyle={{ fontSize: 14, textAlign: "left" }}
                                text={AppStrings.relation}
                              ></TextViewNormal>
                            </View>
                            <TouchableOpacity
                              onPress={() => Keyboard.dismiss()}
                            >
                              <View style={styles.inputView}>
                                <DropDownView
                                  onPress={(value) => {
                                    this.setState({ selectedRelation: value });
                                  }}
                                  showArrow={false}
                                  triggerTextColor={
                                    AppUtils.isNull(selectedRelation.name)
                                      ? AppColors.editTextPlaceHolderColor
                                      : AppColors.colorBlack
                                  }
                                  items={relationList}
                                  title={
                                    AppUtils.isNull(selectedRelation.name)
                                      ? "Select your relation"
                                      : selectedRelation.name
                                  }
                                />
                                <Image
                                  style={styles.IconInTextInput}
                                  source={ResourceUtils.images.ic_heart}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 30,
                      marginBottom: 15,
                    }}
                  >
                    <TouchableOpacity onPress={() => this.cancelSelection()}>
                      <TextViewSemiBold
                        text={"Cancel"}
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
                        this.addFamilyMemberCall();
                      }}
                      text={is_edit ? "Save" : "Add"}
                    />
                  </View>
                </Card>
              </View>
            </View>
          ) : null}
        </FlowWrapView>
      </MenuProvider>
    );
  }
}

const AddMemberScreenElement = connectWithContext(FamilyMemberContextProvider)({
  addMemberProps: FamilyMemberContextConsumer,
})(AddMemberScreen);

export default AddMemberScreenElement;

const styles = StyleSheet.create({
  subscrption_image_style: {
    width: 100,
    height: 100,
  },

  image: {
    flex: 1,
    width: "100%",
    height: 220,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },
  inputView: {
    width: "90%",
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: AppColors.inputviewBoxColor,
  },
  logo_icon_style: {
    marginLeft: 15,
    marginTop: -30,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  IconInTextInput: {
    marginTop: 5,
    width: 20,
    marginRight: 20,
    height: 20,
    resizeMode: "contain",
  },
  inputStype: {
    marginLeft: 15,
    fontSize: 15,
    width: 250,
    alignItems: "flex-start",
    height: 52,
    color: AppColors.colorBlack,
  },
  sepraterLineView: {
    width: 100,
    height: 2,
    shadowColor: AppColors.sepraterLineColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
  ButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: "center",
  },
  ButtonTouch1: {
    width: 160,
    height: 45,
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#D83772",
    backgroundColor: "#D83772",
    marginLeft: 30,
    shadowColor: "#D83772",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
});
