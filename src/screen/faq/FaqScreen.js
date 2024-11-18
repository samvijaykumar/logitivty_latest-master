import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppColors from "../../utils/AppColors";
import TextViewMedium from "../../widgets/TextViewMedium";
import FlowWrapView from "../../widgets/FlowWrapView";
import ResourceUtils from "../../utils/ResourceUtils";
import AppStrings from "../../utils/AppStrings";
import ButtonView from "../../widgets/ButtonView";
import { connectWithContext } from "../../container";
import FaqContextProvider, {
  FaqContextConsumer,
} from "../../context/FaqContext";
import AppUtils from "../../utils/AppUtils";
var tempId = '';
class FaqScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something_went_worng: true,
      selectedRelation: {},
      FaqCategoriesList: [],
      FaqList: [],
      _faqName: "",
      selected: true,
      selectedItem: 0,
      selectedFAQItem: 0,
      selectedFAQ: true,
      _searchFaq: '',
    };
  }

  doFaqSearch = (_searchFaq) => {
    if (!AppUtils.isNull(this.state._searchFaq)) {
      this.setState({
        FaqList: this.props.getFaqProps.faqResponse.data
          .filter((item) => !AppUtils.isNull(item.title))
          .filter((item) =>
            item.title
              .toLowerCase()
              .includes(this.state._searchFaq.toLowerCase())
          ),
      });
    } else {
      this.setState({
        FaqList: this.props.getFaqProps.faqResponse.data || [],
      });
    }
  };
  static navigationOptions = ({ navigation }) => ({
    headerShown: false,
  });

  componentDidMount() {
    let data = {};
    this.props.getFaqCategoriesProps.getFaqCategoriesApiCall(data);
  }
  retryButtonCalled(){
    let data = {};
    this.props.getFaqCategoriesProps.getFaqCategoriesApiCall(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.getFaqCategoriesProps.listLoading !==
        this.props.getFaqCategoriesProps.listLoading &&
      !this.props.getFaqCategoriesProps.listLoading
    ) {
      let response = this.props.getFaqCategoriesProps.listResponse;

      if (response.statusCode == 200) {
        console.log("getFaqCategoriesProps", response.data);
        this.setState({
          FaqCategoriesList: response.data,
          something_went_worng: true,
          selectedItem: response.data[0].id,
        });
        let faqData = {
          category_id: response.data[0].id,
        };
        this.props.getFaqProps.getFaqsDataApiCall(faqData);
      } else {
        this.setState({
          something_went_worng: false,
        });
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.cityListProps.response.message);
        // }, 100)
      }
    }
    if (
      prevProps.getFaqProps.loading !== this.props.getFaqProps.loading &&
      !this.props.getFaqProps.loading
    ) {
      let response = this.props.getFaqProps.faqResponse;

      if (response.statusCode == 200) {
        console.log("getFaqProps", response.data);
        this.setState({
          FaqList: response.data,
          something_went_worng: true,
        });
      } else {
        this.setState({
          something_went_worng: false,
        });
        // setTimeout(() => {
        //     AppUtils.showAlert(this.props.cityListProps.response.message);
        // }, 100)
      }
    }
  }

  selectedCategorie = (item) => {
    this.setState({ selectedItem: item.id, FaqList: [], selected: true });
    let data = {
      category_id: item.id,
    };
    this.props.getFaqProps.getFaqsDataApiCall(data);
  };

  selectedCategorieFaq = (item) => {
    if (item.id == tempId) {
      this.setState({ selectedFAQItem: item.id, selectedFAQ: false });
      tempId = "";
    } else {
      this.setState({ selectedFAQItem: item.id, selectedFAQ: true });
      tempId = item.id;
    }
  };
  render() {
    const {
      something_went_worng,
      FaqCategoriesList,
      selected,
      selectedItem,
      selectedFAQItem,
      selectedFAQ,
      _faqName,
      FaqList,
      _searchFaq,
    } = this.state;
    return (
      <FlowWrapView
        showLoader={
          this.props.getFaqCategoriesProps.listLoading ||
          this.props.getFaqProps.loading
        }
      >
        <StatusBar
          backgroundColor={AppColors.statusBarColor}
          barStyle="light-content"
        />
        <TopBackArrowView
          onPressBack={() => {
            this.props.navigation.pop();
          }}
          onPressHome={() => {
            this.props.navigation.navigate('Dashboard');
          }}
        />
        {something_went_worng == false ? (
          <View
            style={{
              flexDirection: "column",
              marginTop: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.subscrption_image_style}
              source={ResourceUtils.images.logo}
            />
            <TextViewMedium
              text={"Oops!"}
              textStyle={{
                textAlign: "center",
                fontSize: 25,
                marginTop: 15,
                color: AppColors.primaryColor,
              }}
            />

            <TextViewMedium
              text={"Something Went Wrong. "}
              textStyle={{
                textAlign: "center",
                marginTop: 5,
                fontSize: 20,
                color: "#333333",
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
        ) : null}
        {something_went_worng == true ? (
          <View>
            <View
              style={{
                flexDirection: "column",
                margin: 15,
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              <TextViewSemiBold
                text={"faqs"}
                textStyle={{
                  textAlign: "left",
                  fontSize: 18,
                  color: "#333333",
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                marginTop: 10,
                marginBottom: 5,
                flex: 1,
                width: "100%",
                alignItems: "center",
              }}
            >
              <View style={styles.inputView}>
                <TextInput
                  placeholder={"search FAQ..."}
                  placeholderTextColor={"#5D5D5D"}
                  returnKeyType="done"
                  text={_faqName}
                  style={styles.inputStype}
                  onChangeText={async (_searchFaq) => {
                    await this.setState({ _searchFaq });
                    this.doFaqSearch(_searchFaq);
                  }}
                />

                <Image
                  style={styles.IconInTextInput}
                  source={ResourceUtils.images.ic_check_right}
                />
              </View>

              <FlatList
                style={{
                  flex: 1,
                  width: '90%',
                  marginTop: 10,
                  marginLeft: 40,
                  marginRight: 40,
                }}
                data={FaqCategoriesList}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.2}
                      onPress={() => {
                        this.selectedCategorie(item);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",

                          marginRight: 10,
                          marginTop: 5,
                          flex: 1,
                          borderColor: "#CCCCCC",
                          backgroundColor:
                            selectedItem == item.id && selected
                              ? "#0C7793"
                              : "#FFFFFF",
                          borderRadius: 20,
                          borderWidth: 1,
                        }}
                      >
                        <TextViewNormal
                          text={item.name}
                          textStyle={{
                            textAlign: "center",
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 5,
                            marginBottom: 5,
                            fontSize: 12,
                            fontFamily: ResourceUtils.fonts.poppins_regular,
                            color:
                              selectedItem == item.id && selected
                                ? "#FFFFFF"
                                : "#5D5D5D",
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <FlatList
                style={{ flex: 1, width: "100%", marginTop: 8 }}
                data={FaqList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.2}
                      onPress={() => {
                        this.selectedCategorieFaq(item);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 10,
                            height: 50,
                            alignItems: "center",
                            flex: 1,
                            backgroundColor:
                              selectedFAQItem == item.id && selectedFAQ
                                ? "#D83772"
                                : "#FFFFFF",
                            borderColor: "#CCCCCC",
                            borderRadius: 20,
                            borderWidth: 1,
                          }}
                        >
                          <View
                            style={{
                              alignSelf: "center",
                              marginLeft: 8,
                              width: "100%",
                              flex: 1,
                            }}
                          >
                            <TextViewMedium
                              text={item.title}
                              textStyle={{
                                textAlign: "left",
                                marginLeft: 10,
                                marginRight: 10,
                                fontSize: 12,
                                fontFamily: ResourceUtils.fonts.poppins_regular,
                                color:
                                  selectedFAQItem == item.id && selectedFAQ
                                    ? "#FFFFFF"
                                    : "#5D5D5D",
                              }}
                            />
                          </View>

                          <View
                            style={{
                              marginLeft: 25,
                              marginRight: 10,
                            }}
                          >
                            <Image
                              style={styles.arrow_icon_style}
                              source={
                                this.state.selectedFAQItem == item.id &&
                                selectedFAQ
                                  ? ResourceUtils.images.white_arrow
                                  : ResourceUtils.images.black_arrow
                              }
                            />
                          </View>
                        </View>
                        {this.state.selectedFAQItem == item.id &&
                        selectedFAQ ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginLeft: 40,
                              marginRight: 40,
                              marginTop: 5,
                              alignItems: 'center',
                              flex: 1,
                            }}
                          >
                            <TextViewNormal
                              text={item.detail}
                              textStyle={{
                                textAlign: 'left',
                                fontSize: 14,
                                color: '#333333',
                              }}
                              numberOfLines={10}
                            />
                          </View>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        ) : null}
      </FlowWrapView>
    );
  }
}

const FaqScreennElements = connectWithContext(FaqContextProvider)({
  getFaqCategoriesProps: FaqContextConsumer,
  getFaqProps: FaqContextConsumer,
})(FaqScreen);

export default FaqScreennElements;

const styles = StyleSheet.create({
  subscrption_image_style: {
    width: 100,
    height: 100,
  },
  image: {
    flex: 1,
    width: "100%",
    height: 220,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },

  RetryButtonTouch: {
    width: 180,
    marginTop: 25,
    alignSelf: "center",
    justifyContent: "center",
  },
  name_text: {
    textAlign: "center",
    color: AppColors.colorBlack,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  name_text1: {
    textAlign: "left",
    color: AppColors.colorBlack,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontFamily: ResourceUtils.fonts.poppins_regular,
  },
  inputView: {
    width: AppUtils.getDeviceWidth() - 50,
    height: 40,
    backgroundColor: AppColors.inputviewBoxColor,
    flexDirection: "row",
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.inputviewBoxColor,
  },

  IconInTextInput: {
    marginRight: 30,
    width: 50,
    marginTop: 5,
    height: 50,
    resizeMode: "contain",
  },
  inputStype: {
    marginLeft: 20,
    fontSize: 15,
    height: 52,
    width: "85%",
    color: AppColors.colorBlack,
  },
  arrow_icon_style: {
    width: 16,
    height: 16,
  },
});
