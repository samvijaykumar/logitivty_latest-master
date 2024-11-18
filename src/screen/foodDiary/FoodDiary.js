import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Modal,
    StyleSheet,
    BackHandler,
    Pressable,
    ActivityIndicator,
    Dimensions,
    ScrollView,
} from "react-native";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppUtils from "../../utils/AppUtils";
import ResourceUtils from "../../utils/ResourceUtils";
import CongratulationsDialog from "../../widgets/CongratulationsDialog";
import ButtonView from "../../widgets/ButtonView";
import AppStrings from "../../utils/AppStrings";
import AppColors from "../../utils/AppColors";
import TextViewMedium from "../../widgets/TextViewMedium";
import NetworkConstants from "../../network/NetworkConstant";
import UserSession from "../../utils/UserSession";
import { height } from "../../NewModule/Stacks/utils/Dimensions";

export default class FoodDiary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible2: false,
            visible3: false,
            data: [
                {
                    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
                    title: "add water",
                    image: require("../../utils/images/plusbg.jpg"),
                    foodImage: require("../../utils/images/water.png"),
                },
                {
                    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
                    title: "random snack",
                    image: require("../../utils/images/arrowbg.png"),
                    foodImage: require("../../utils/images/randomSnack.jpg"),
                },
                {
                    id: "58694a0f-3da1-471f-bd96-145571e29d72",
                    title: "random beverage",
                    image: require("../../utils/images/arrowbg3.png"),
                    foodImage: require("../../utils/images/randomBevarage.png"),
                },
            ],
            data2: [
                {
                    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
                    title: "breakfast",
                    image: require("../../utils/images/arrowbg2.png"),
                    foodImage: require("../../utils/images/breakfast.png"),
                },
                {
                    id: "58694a0f-3da1-471f-bd96-145571e29d72",
                    title: "lunch",
                    image: require("../../utils/images/arrowbg4.png"),
                    foodImage: require("../../utils/images/lunch.png"),
                },
                {
                    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
                    title: "dinner",
                    image: require("../../utils/images/arrowbg5.png"),
                    foodImage: require("../../utils/images/dinner.png"),
                },
            ],
            variant: "veg",
            // disable: false
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    resetStack = () => {
        this.props.navigation.goBack();
    };
    componentWillMount() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    }
    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );

        // BackHandler.removeEventListener('backPress', () => {
        //     return true
        // });
    }

    handleBackButtonClick() {
        this.resetStack();
        return true;
    }
    onOptionMenuClick = () => {
        this.setState({
            visible: false,
        });
    };
    onOptionMenuClick2 = () => {
        this.setState({
            visible2: false,
        });
    };

    PermitToCallWaterApi() {
        this.setState({
            visible2: true,
        });
    }
    async callWaterApi() {
        this.setState({
            visible2: false,
            // visible3: true
        });

        const userData = await UserSession.getUserSessionData();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userData.token}`);

        var formdata = new FormData();
        formdata.append("food_type", "water");
        formdata.append("diet_type", this.state.variant);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };

        fetch(NetworkConstants.BASE_URL + "/add_water", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.statusCode == 200) {
                    this.setState({
                        visible3: false,
                        // disable: false
                    });
                    AppUtils.showAlert(result.message);
                } else {
                    this.setState({
                        visible3: false,
                    });
                    AppUtils.showAlert(result.message);
                }
            })
            .catch((error) => console.log("error", error));
    }
    render() {
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                {/* <TopBarEcommerce
          screenTitle={"food diary"}
          visibleCart={false}
          visibleFav={false}
          visibleSearch={false}
          onPressBack={() => {
            this.resetStack();
          }}
        /> */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.visible}
                >
                    <View style={styles.container}>
                        <View style={styles.wrapper}>
                            <Image
                                resizeMode={"cover"}
                                style={{ width: 55, height: 55, margin: 20 }}
                                source={require("../../utils/images/question.jpg")}
                            />
                            <TextViewBold
                                text={"are you ..?"}
                                textStyle={{
                                    fontSize: 18,
                                    margin: 10,
                                    textAlign: "center",
                                }}
                            />

                            <View
                                style={{
                                    flexDirection: "row",
                                    marginBottom: wp("3%"),
                                    marginTop: wp("3%"),
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            variant: "veg",
                                        });
                                    }}
                                    style={{
                                        backgroundColor:
                                            this.state.variant == "veg"
                                                ? "#0C7793"
                                                : null,
                                        borderWidth: wp(".3%"),
                                        borderColor: "#ccc",
                                        borderRadius: wp("5%"),
                                        paddingLeft: wp("5%"),
                                        paddingRight: wp("5%"),
                                        marginRight: wp("3%"),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily:
                                                ResourceUtils.fonts
                                                    .poppins_medium,
                                            fontSize: wp("3.5%"),
                                            color:
                                                this.state.variant == "veg"
                                                    ? "white"
                                                    : "grey",
                                        }}
                                    >
                                        veg
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            variant: "non-veg",
                                        });
                                    }}
                                    style={{
                                        backgroundColor:
                                            this.state.variant == "non-veg"
                                                ? "#0C7793"
                                                : null,
                                        borderWidth: wp(".3%"),
                                        borderColor: "#ccc",
                                        borderRadius: wp("5%"),
                                        paddingLeft: wp("3%"),
                                        paddingRight: wp("3%"),
                                        marginRight: wp("3%"),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily:
                                                ResourceUtils.fonts
                                                    .poppins_medium,
                                            fontSize: wp("3.5%"),
                                            color:
                                                this.state.variant == "non-veg"
                                                    ? "white"
                                                    : "grey",
                                        }}
                                    >
                                        non-veg
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            variant: "both",
                                        });
                                    }}
                                    style={{
                                        backgroundColor:
                                            this.state.variant == "both"
                                                ? "#0C7793"
                                                : null,
                                        borderWidth: wp(".3%"),
                                        borderColor: "#ccc",
                                        borderRadius: wp("5%"),
                                        paddingLeft: wp("5%"),
                                        paddingRight: wp("5%"),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily:
                                                ResourceUtils.fonts
                                                    .poppins_medium,
                                            fontSize: wp("3.5%"),
                                            color:
                                                this.state.variant == "both"
                                                    ? "white"
                                                    : "grey",
                                        }}
                                    >
                                        both
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <ButtonView
                                text={AppStrings.btn_title_continue}
                                onPress={() => {
                                    this.onOptionMenuClick();
                                }}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.visible2}
                >
                    <View style={styles.container}>
                        <View
                            style={{
                                ...Platform.select({
                                    ios: {
                                        borderTopWidth: 10,
                                        width: "75%",
                                    },
                                    android: {
                                        borderRadius: 10,
                                        width: "75%",
                                    },
                                }),
                                backgroundColor: AppColors.colorWhite,
                                alignItems: "center",
                                justifyContent: "center",
                                borderColor: AppColors.colorGray,
                                borderWidth: 2,
                                paddingLeft: wp("5%"),
                                // paddingRight: wp('5%'),
                                paddingBottom: wp("5%"),
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    backgroundColor: "white",
                                    marginRight: wp("-3%"),
                                    marginTop: wp("-2%"),
                                    borderRadius: wp("10%"),
                                    zIndex: 100,
                                    borderWidth: 0.5,
                                    borderColor: "black",
                                    alignSelf: "flex-end",
                                    padding: wp("3%"),
                                }}
                                onPress={() => {
                                    this.setState({ visible2: false });
                                }}
                            >
                                <Image
                                    source={require("../../utils/images/close_red.png")}
                                />
                            </TouchableOpacity>
                            <Image
                                resizeMode={"cover"}
                                style={{
                                    width: 55,
                                    height: 55,
                                    margin: 20,
                                    paddingRight: wp("5%"),
                                }}
                                source={require("../../utils/images/bottle.jpg")}
                            />

                            <TextViewBold
                                text={"Do you want to add water"}
                                textStyle={{
                                    fontSize: 18,
                                    margin: 10,
                                    textAlign: "center",
                                    paddingRight: wp("5%"),
                                }}
                            />

                            <TextViewMedium
                                text={"1 glass of water add to your food diary"}
                                textStyle={{
                                    fontSize: 15,
                                    margin: 10,
                                    textAlign: "center",
                                    color: "grey",
                                    paddingRight: wp("5%"),
                                }}
                            />
                            {/* {this.state.disable == false ? */}
                            <View style={{ paddingRight: wp("5%") }}>
                                <ButtonView
                                    text={"okay"}
                                    onPress={() => {
                                        this.callWaterApi();
                                    }}
                                />
                            </View>
                            {/* : null} */}
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.visible3}
                >
                    <View style={styles.container}>
                        <View style={{ backgroundColor: "white" }}>
                            <ActivityIndicator
                                size={"large"}
                                color={"#D83772"}
                            ></ActivityIndicator>
                        </View>
                    </View>
                </Modal>
                {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate("HealthFood")}
        >
          <ImageBackground
            source={require("../../utils/images/foodDiary.jpg")}
            resizeMode={"contain"}
            style={{
              // backgroundColor: "red",
              width: wp("90%"),
              height: hp("13%"),
              alignSelf: "center",
              borderRadius: wp("2%"),
              marginTop: wp("5%"),
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                marginLeft: wp("3%"),
                borderRadius: wp("2%"),
              }}
            >
              <Text
                style={{
                  fontFamily: ResourceUtils.fonts.poppins_medium,
                  fontSize: wp("3.5%"),
                }}
              >
                healthy food menu
              </Text>
              <Image
                source={require("../../utils/images/red_right_arrow.png")}
                style={{ width: wp("11%"), height: wp("11%") }}
              ></Image>
            </View>
          </ImageBackground>
        </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate("HealthyFoodStack")
                    }
                >
                    <ImageBackground
                        source={require("../../utils/images/healty_food_menu.png")}
                        resizeMode={"contain"}
                        style={{
                            width: wp("90%"),
                            height: hp("13%"),
                            alignSelf: "center",
                            borderRadius: wp("2%"),
                            marginTop: wp("5%"),
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                flex: 1,
                                marginLeft: wp("3%"),
                                borderRadius: wp("2%"),
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_medium,
                                    fontSize: wp("3.5%"),
                                }}
                            >
                                view my
                            </Text>
                            <Text
                                style={{
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_medium,
                                    fontSize: wp("3.5%"),
                                }}
                            >
                                food menu
                            </Text>
                            <Image
                                source={require("../../utils/images/red_right_arrow.png")}
                                style={{ width: wp("11%"), height: wp("11%") }}
                            ></Image>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <Text
                    style={{
                        marginTop: 20,
                        fontFamily: ResourceUtils.fonts.poppins_semibold,
                        fontSize: wp("4.2%"),
                        marginLeft: wp("5%"),
                    }}
                >
                   Healthy Recipes for Food
                </Text>

                <View style={{ flexDirection: "column", }}>
                    <FlatList
                        data={this.state.data}
                        scrollEnabled={false}
                        numColumns={3} // Change to 3 for better layout
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignSelf:'center',
                            justifyContent:'center',
                            
                        }}
                        style={{
                            marginLeft: wp("3%"),
                            marginRight: wp("3%"),
                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        item.title == "add water"
                                            ? this.PermitToCallWaterApi()
                                            : this.props.navigation.navigate(
                                                  "uploadPicture",
                                                  {
                                                      dietType: item.title,
                                                      foodType:
                                                          this.state.variant,
                                                  }
                                              );
                                    }}
                                >
                                    <ImageBackground
                                        source={item.image}
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            // height: Dimensions.get("screen").width * 0.2, // Reduced height
                                            // width: Dimensions.get("screen").width * 0.2,  // Reduced width
                                            // marginRight: wp("3%"),
                                            width: wp("29%"),
                                            height: hp("14%"),
                                            margin: wp("1%"),
                                        }}
                                        resizeMode="contain"
                                    >
                                        <View
                                            style={{
                                                padding: wp("5%"),
                                                alignItems: "center",
                                                marginBottom: wp("-5%"),
                                            }}
                                        >
                                            <Image
                                                source={item.foodImage}
                                                style={{
                                                    width: wp("10%"),
                                                    height: wp("10%"),
                                                    resizeMode: "contain",
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        ResourceUtils.fonts
                                                            .poppins_medium,
                                                    fontSize: wp("3.5%"),
                                                    width: wp("20%"),
                                                    textAlign: "center",
                                                }}
                                            >
                                                {item.title}
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

                <View style={{ flexDirection: "column",  }}>
                    <FlatList
                        data={this.state.data2}
                        scrollEnabled={false}
                        numColumns={3} // Change to 3 for better layout
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        style={{
                            marginLeft: wp("3%"),
                            marginRight: wp("3%"),
                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        item.title == "add water"
                                            ? this.PermitToCallWaterApi()
                                            : this.props.navigation.navigate(
                                                  "uploadPicture",
                                                  {
                                                      dietType: item.title,
                                                      foodType:
                                                          this.state.variant,
                                                  }
                                              );
                                    }}
                                >
                                    <ImageBackground
                                        source={item.image}
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            // height:
                                            //     Dimensions.get("screen").width *
                                            //     0.3, // Reduced height
                                            // width:
                                            //     Dimensions.get("screen").width *
                                            //     0.3, // Reduced width
                                            // marginRight: wp("3%"),
                                            width: wp("29%"),
                                            height: hp("12%"),
                                            margin: wp("1%"),
                                        }}
                                        resizeMode="contain"
                                    >
                                        <View
                                            style={{
                                                padding: wp("5%"),
                                                alignItems: "center",
                                                marginBottom: wp("-5%"),
                                            }}
                                        >
                                            <Image
                                                source={item.foodImage}
                                                style={{
                                                    width: wp("10%"),
                                                    height: wp("10%"),
                                                    resizeMode: "contain",
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        ResourceUtils.fonts
                                                            .poppins_medium,
                                                    fontSize: wp("3.5%"),
                                                    width: wp("20%"),
                                                    textAlign: "center",
                                                }}
                                            >
                                                {item.title}
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
                {/* niche wala row */}
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate("myFoodDiary")
                    }
                >
                    <ImageBackground
                        source={require("../../utils/images/foodDiary.jpg")}
                        resizeMode={"contain"}
                        style={{
                            width: wp("90%"),
                            height: hp("13%"),
                            alignSelf: "center",
                            borderRadius: wp("2%"),
                            marginTop: wp("5%"),
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                flex: 1,
                                marginLeft: wp("3%"),
                                borderRadius: wp("2%"),
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_medium,
                                    fontSize: wp("3.5%"),
                                }}
                            >
                                view my
                            </Text>
                            <Text
                                style={{
                                    fontFamily:
                                        ResourceUtils.fonts.poppins_medium,
                                    fontSize: wp("3.5%"),
                                }}
                            >
                                food diary
                            </Text>
                            <Image
                                source={require("../../utils/images/red_right_arrow.png")}
                                style={{ width: wp("11%"), height: wp("11%") }}
                            ></Image>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                alignSelf: "center",
                justifyContent: "center",
            },
            android: {
                alignSelf: "center",
                justifyContent: "center",
            },
        }),
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
        flex: 1,
        alignItems: "center",
    },
    wrapper: {
        ...Platform.select({
            ios: {
                borderTopWidth: 10,
                width: "75%",
            },
            android: {
                borderRadius: 10,
                width: "75%",
            },
        }),
        backgroundColor: AppColors.colorWhite,
        alignItems: "center",
        justifyContent: "center",
        borderColor: AppColors.colorGray,
        borderWidth: 2,
        padding: 16,
    },
});
