import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Share,
} from "react-native";

// svg
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import useHardwareBackPress from "../../../screen/workShop/provider/useHardwareBackPress";
import { apifuntion } from "../provider/api/ApiInfo";
import AppLoader from "../provider/AppLoader";

//svg
import DateSvgImg from "../provider/svg/DateSvgImg";

// vector icon
import LeftIcon from "react-native-vector-icons/AntDesign";
import GlobeIcon from "react-native-vector-icons/FontAwesome5";
import RupeeIcon from "react-native-vector-icons/MaterialIcons";
import InvitedOtherImg from "../provider/svg/InvitedOtherImg";
import RightIcon from "react-native-vector-icons/Feather";
import ResourceSvgImg from "../provider/svg/ResourceSvgImg";
import ShareExpirenceModal from "../provider/modal/ShareExpirenceModal";
import RequestSvgImg from "../provider/svg/RequestSvgImg";
import RightFinishedSvgImg from "../provider/svg/RightFinishedSvgImg";

//png img
import img_attendence from "../../workShop/provider/png/attendence.png";
import img_langestStreak from "../../workShop/provider/png/langestStreak.png";
import img_satvicImg1 from "../../workShop/provider/png/satvicImg1.png";
import up_commingImg from "../provider/png/upCommingImg.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const PastWorkShopDetailsScreen = (props) => {
  // remove html tag
  const regex = /(<([^>]+)>)/gi;

  const ratings = [
    { value: 1, color: "#F55B58" }, // Default background color
    { value: 2, color: "#F6A707" }, // Yellow
    { value: 3, color: "#E9DD03" }, // Light Yellow
    { value: 4, color: "#B0C92C" }, // Green-Yellow
    { value: 5, color: "#67C663" }, // Green
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [journeyData, setJourneyData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upcommingItemData, setUpcommingItemData] = useState([]);
  const [viewLink, setViewLink] = useState("");

  const [upserId, setUserId] = useState("");
  const [workShopId, setWorkShopId] = useState("");
  const [address, setAddress] = useState("");

  useHardwareBackPress(() => {
    props.navigation.goBack();
    return true;
  });

  const getjourneyData = () => {
    setLoading(true);
    apifuntion
      .getApi("get_journey_list")
      .then((res) => {
        if (res.statusCode == 200) {
          setJourneyData(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert("", err);
        setLoading(false);
      });
  };

  const getRatingData = async (rating) => {
    setLoading(true);
    const data = {
      workshop_id: workShopId,
      rating: rating,
      user_id: upserId,
    };
    await apifuntion
      .postApi("add_rating_workshop", data)
      .then((res) => {
        const { data } = res;
        if (data.statusCode == 200) {
          Alert.alert("", data?.message);
          // setJourneyData(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert("", "Soething went wrong");
        setLoading(false);
      });
  };

  useEffect(() => {
    getjourneyData();
  }, []);

  useEffect(() => {
    // getjourneyData()
    if (props?.route?.params?.upcommingData) {
      setUpcommingItemData(props?.route?.params?.upcommingData);
    }

    if (props?.route?.params?.pastworkData?.link) {
      setViewLink(props?.route?.params?.pastworkData?.link);
    }
    if (props?.route?.params) {
      setAddress(props?.route?.params?.pastworkData?.attendSession);
    }
    
  }, [props?.route]);

  useEffect(() => {
    const fetchData = async () => {
      const getUserId = await AsyncStorage.getItem("userId");
      const getWorkShopId = await AsyncStorage.getItem("workShopId");
      setUserId(getUserId);
      setWorkShopId(getWorkShopId);
    };

    fetchData();
  }, []); // Empty dependency array, so this runs once on mount

  const shareLink = async (link) => {
    const options = {
      message:
        "You’re invited! Come join me on this all-in-one app where you can learn something new" +
        link,
    };

    try {
      const shareResponse = await Share.share(options);
      console.log("Response from share:", shareResponse);
    } catch (err) {
      console.log("Error while sharing:", err);
    }
  };

  return (
    <View style={styles.container}>
      <AppLoader loading={loading} />
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
      <ScrollView
        style={styles.homeContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.leftArrowBox}>
          <TouchableOpacity
            style={{ alignSelf: "flex-start", marginLeft: hp(2) }}
            onPress={() => props.navigation.goBack()}
          >
            <LeftIcon name="left" size={hp(3)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Ultimate Health Challenge</Text>
        </View>

        <View style={styles.requestBox}>
          <View style={styles.heyBox}>
            <Text style={styles.heyText}>Hey Deepak!</Text>
            <RequestSvgImg />
          </View>

          <View style={styles.rightBox}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RightFinishedSvgImg />
              <Text style={styles.youText}>
                You finished the ultimate Health Challenge
              </Text>
            </View>
          </View>

          <View style={styles.dayBox}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={img_langestStreak}
                style={styles.langestStreakImg}
              />
              <View style={{ marginLeft: wp(1) }}>
                <Text style={styles.oneDayText}>1 Day</Text>
                <Text style={styles.longestText}>Longest Streak</Text>
              </View>
            </View>

            <View
              style={{
                height: hp(6),
                width: wp(0.4),
                backgroundColor: "#E5E6E6",
                marginHorizontal: wp(2),
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Image source={img_attendence} style={styles.langestStreakImg} />
              <View style={{ marginLeft: wp(1) }}>
                <Text style={styles.oneDayText}>{address}%</Text>
                <Text style={styles.longestText}>Attendance</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.mySatavicJOurneyBox}>
          <Text style={styles.mySatvicText}>My Wellness journey</Text>
          <FlatList
            data={journeyData}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <View style={{ marginLeft: wp(0.8) }}>
                  <Image
                    source={img_satvicImg1}
                    style={{ height: hp(10), aspectRatio: 1 / 1 }}
                  />

                </View>
              );
            }}
          />
        </View>

        <View
          style={[
            styles.mySatavicJOurneyBox,
            {
              paddingVertical: hp(0),
              height: hp(25),
              paddingHorizontal: wp(0),
              marginTop: hp(4),
            },
          ]}
        >
          <View style={styles.howLikeBox}>
            <Text style={styles.howLikeText}>
              How likely are you to recommend this workshop?
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: wp(4),
              marginVertical: hp(1),
            }}
          >
            <Text
              style={[
                styles.howLikeText,
                { fontSize: hp(1.6), fontFamily: "Poppins-Regular" },
              ]}
            >
              NOT AT ALL LIKELY
            </Text>
            <Text
              style={[
                styles.howLikeText,
                { fontSize: hp(1.6), fontFamily: "Poppins-Regular" },
              ]}
            >
              EXTREMELY LIKELY
            </Text>
          </View>

          {/* <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <TouchableOpacity style={styles.ratingBox}>
              <Text style={styles.inputText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ratingBox, { backgroundColor: "#F6A707" }]}
            >
              <Text style={styles.inputText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ratingBox, { backgroundColor: "#E9DD03" }]}
            >
              <Text style={styles.inputText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ratingBox, { backgroundColor: "#B0C92C" }]}
            >
              <Text style={styles.inputText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ratingBox, { backgroundColor: "#67C663" }]}
            >
              <Text style={styles.inputText}>5</Text>
            </TouchableOpacity>
          </View> */}

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {ratings.map((rating) => (
              <TouchableOpacity
                key={rating.value} // Use rating.value as the unique key
                style={[styles.ratingBox, { backgroundColor: rating.color }]}
                onPress={() => getRatingData(rating.value)}
              >
                <Text style={styles.inputText}>{rating.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginTop: hp(3.5),
          }}
        >
          <View
            style={{
              height: hp(0.1),
              width: wp(19),
              backgroundColor: "#818183",
            }}
          />
          <Text style={styles.completeText}>Complete Your journey</Text>
          <View
            style={{
              height: hp(0.1),
              width: wp(19),
              backgroundColor: "#818183",
            }}
          />
        </View>
        <Text style={[styles.upcommingText]}>Upcoming workshops</Text>

        <FlatList
          data={upcommingItemData}
          horizontal={true}
          renderItem={({ item }) => {
            const date = item?.start_date_time;
            const options = {
              // year:'numeric',
              month: "short",
              day: "numeric",
              // hour:'numeric',
              // minute:'numeric',
            };
            const formatedDate = new Date(date).toLocaleDateString(
              "en-GB",
              options
            );

            // title ref
            const upCommingTitleShort = (title, maxLength) => {
              if (title.length > maxLength) {
                return title.substring(0, maxLength) + "...";
              }
              return title;
            };

            let newTitle = upCommingTitleShort(item.title, 35);
            // dec ref
            const upDecShort = (dec, maxLength) => {
              if (dec.length > maxLength) {
                return dec.substring(0, maxLength) + "...";
              }
              return dec;
            };

            const decShort = upDecShort(
              // "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              item?.description.replace(regex, ""),
              142
              // "if you have been wanting to wake up early, ",142
            );

            const our_new_created_date = (title, maxLength) => {
              if (title.length > maxLength) {
                return title.substring(0, maxLength);
              }
              return title;
            };

            let newDate = our_new_created_date(item.our_new_created_date, 8);

            const formattedDate = moment(item.start_date_time).format('Do MMM');


            return (
              <View style={styles.upcommingWorkshowBox}>
                <ImageBackground
                  source={{
                    uri: "https://demo.sgvproject.in/longetivity/uploads/workshop/16082312546892211726742303.png"
                      ? "https://demo.sgvproject.in/longetivity/uploads/workshop/16082312546892211726742303.png"
                      : up_commingImg,
                  }}
                  borderTopLeftRadius={wp(4)}
                  borderTopRightRadius={wp(4)}
                  style={styles.upCommingImg}
                >
                  <View style={styles.startinBox}>
                    <Text style={[styles.startinText, { marginVertical: 0 }]}>
                      Starts in:
                    </Text>
                    <Text
                      style={[
                        styles.startinText,
                        {
                          marginVertical: 0,
                          fontWeight: "400",
                          color: "#000",
                          fontSize: wp(4.1),
                          textTransform: "uppercase",
                        },
                      ]}
                    >
                      {item?.workshop_start_in_no_of_days} Days
                    </Text>
                  </View>
                </ImageBackground>

                <Text
                  style={[
                    styles.nameText,
                    {
                      fontSize: wp(4.1),
                      marginTop: wp(3),
                      marginBottom: hp(2),
                      marginLeft: wp(4),
                      fontWeight: "700",
                    },
                  ]}
                >
                  {newTitle}
                </Text>

                <View style={[styles.dataBox, { paddingHorizontal: wp(3) }]}>
                  <View
                    style={{
                      marginVertical: hp(1),
                      // marginLeft: wp(2),
                      flexDirection: "row",
                      // borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DateSvgImg />
                    <View>
                      {/* <Text style={styles.dateText}>{formatedDate}</Text> */}
                      <Text style={styles.dateText}>{formattedDate}</Text>
                    </View>
                  </View>
                  <View style={styles.boxVerticle} />
                  <View>
                    <View
                      style={{
                        marginVertical: hp(1),
                        // marginLeft: wp(2),
                        flexDirection: "row",
                        // borderWidth: 1,
                        // alignSelf: "flex-start",
                      }}
                    >
                      <Image
                        source={require("../../workShop/provider/png/days.png")}
                        style={{ height: hp(2.5), width: hp(2.5) }}
                      />
                      <Text style={styles.dateText}>
                        {item?.no_of_workshop_day} Days
                      </Text>
                    </View>
                  </View>
                  <View style={styles.boxVerticle} />
                  <View
                    style={{
                      marginVertical: hp(1),
                      // marginLeft: wp(2.5),
                      flexDirection: "row",
                      // borderWidth: 1,
                    }}
                  >
                    <GlobeIcon
                      name="globe"
                      size={hp(2.5)}
                      color="#000"
                      style={{ alignSelf: "flex-start" }}
                    />
                    <Text
                      style={[styles.dateText, { textTransform: "capitalize" }]}
                    >
                      {item?.language}
                    </Text>
                  </View>
                </View>

                <Text style={styles.updecText}>{decShort}</Text>

                <View style={styles.mainRegisterBox}>
                  <TouchableOpacity
                  onPress={() => Linking.openURL(item?.view_link)}
                  >
                    <Text style={styles.ViewDetialsText}>View Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => Linking.openURL(item?.community_link)}
                  >
                    <Text style={[styles.ViewDetialsText, { color: "#fff" }]}>
                      Register Now
                    </Text>

                    <View style={styles.registerVerticleBox} />
                    <RupeeIcon
                      name="currency-rupee"
                      size={hp(2)}
                      color="#fff"
                      style={{ marginLeft: wp(1) }}
                    />
                    <Text style={[styles.ViewDetialsText, { color: "#fff" }]}>
                      {item?.amount}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />

        {/* invite */}
        <Text
          style={[
            styles.completeText,
            { color: "#363636", marginHorizontal: wp(4), marginTop: hp(2) },
          ]}
        >
          Invite others
        </Text>

        <View style={styles.invitedBox}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <InvitedOtherImg />
            <View>
              <Text
                style={[styles.pastText, { fontSize: wp(3.5), width: wp(40) }]}
              >
                invitge others on this Tlc Journey
              </Text>
              <Text style={[styles.invitedDec]}>
                Spread the wellness! Invite others to join you on this enriching
                Tlc journey and grow together!
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.pastWorkButton, {}]}
            onPress={() => shareLink(viewLink)}
          >
            <Text style={[styles.pastText, { color: "#fff" }]}>
              Invite others
            </Text>
            {/* <View> */}

            <RightIcon name="chevron-right" size={hp(4)} color="#fff" />
            {/* </View> */}
          </TouchableOpacity>
        </View>

        {/* share your revired */}
        <Text
          style={[
            styles.completeText,
            { color: "#363636", marginHorizontal: wp(4), marginTop: hp(4) },
          ]}
        >
          Share your review
        </Text>

        <View style={styles.invitedBox}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <InvitedOtherImg />
            <View>
              <Text
                style={[styles.pastText, { fontSize: wp(3.5), width: wp(40) }]}
              >
                invitge others on this Tlc Journey
              </Text>
              <Text style={[styles.invitedDec]}>
                Spread the wellness! Invite ohters to join you on this enriching
                tlc journey and grow together!
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.pastWorkButton, {}]}
            onPress={() => {
              setIsModalVisible(true);
            }}
          >
            <Text style={[styles.pastText, { color: "#fff" }]}>
              Share your experience
            </Text>
            {/* <View> */}

            <RightIcon name="chevron-right" size={hp(4)} color="#fff" />
            {/* </View> */}
          </TouchableOpacity>

          <ShareExpirenceModal
            isModalVisible={isModalVisible}
            modalClose={() => setIsModalVisible(false)}
          />
        </View>

        {/* share your revired */}
        <Text
          style={[
            styles.completeText,
            { color: "#363636", marginHorizontal: wp(4), marginTop: hp(2.5) },
          ]}
        >
          Resources
        </Text>

        <TouchableOpacity
          style={[
            styles.invitedBox,
            {
              height: hp(10.4),
              flexDirection: "row",
              alignItems: "center",
              marginBottom: hp(2),
              paddingBottom: hp(0),
            },
          ]}
          onPress={() => props.navigation.navigate("ResourcesScreen")}
        >
          <View style={{ marginBottom: hp(1) }}>
            <ResourceSvgImg />
          </View>
          <View style={{ marginLeft: wp(2) }}>
            <Text style={[styles.completeText, { color: "#000" }]}>Notes</Text>
            <Text style={styles.dayText}>Day 21</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PastWorkShopDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  leftArrowBox: {
    marginTop: hp(2),
    justifyContent: "center",
  },
  headerText: {
    fontSize: wp(5.4),
    fontFamily: "Poppins-Medium",
    color: "#000",
    alignSelf: "center",
    position: "absolute",
  },
  requestBox: {
    // height: hp(20),
    paddingVertical: hp(1),
    backgroundColor: "#fff",
    borderRadius: wp(2),
    marginHorizontal: wp(5),
    marginTop: hp(4),
  },

  completeText: {
    fontSize: wp(4.1),
    color: "#818183",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    marginHorizontal: wp(1),
  },
  // upCommingText: {
  //   fontSize: wp(4.1),
  //   color: '#363636',
  //   fontWeight: '500',
  //   fontFamily: 'Poppins-Medium',
  //   marginLeft: wp(4),
  //   marginTop: hp(3),
  //   marginBottom: hp(2),
  // },

  // flatlist
  upcommingText: {
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#363636",
    fontSize: wp(4.1),
    marginLeft: wp(4),
    marginVertical: hp(1),
    marginTop: hp(3),
  },
  upCommingImg: {
    height: hp(30),
    width: wp(80),
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
  },

  startinBox: {
    height: hp(6.2),
    width: wp(25),
    backgroundColor: "#fff",
    borderRadius: wp(2),
    paddingLeft: wp(4),
    marginLeft: wp(4),
    marginTop: hp(2),
  },
  startinText: {
    fontWeight: "500",
    color: "#363636",
    fontSize: wp(3.5),
    // marginLeft: wp(4),
    marginVertical: hp(1),
    fontFamily: "Poppins-Regular",
  },
  workshopCompletedText: {
    fontSize: wp(3.5),
    fontFamily: "Poppins-Regular",
    // marginVertical: 0,
    fontWeight: "400",
    color: "#fff",
    fontFamily: "Poppins-Medium",
    marginTop: hp(0.6),
  },
  headerMainBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(4),
    marginLeft: wp(4),
  },
  dataBox: {
    height: hp(5),
    borderWidth: 1,
    marginHorizontal: wp(2.5),
    borderRadius: wp(2),
    borderColor: "#E4E4E4",
    flexDirection: "row",
  },
  dateText: {
    fontSize: wp(3.8),
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    marginLeft: wp(1),
    color: "#363636",
  },

  updecText: {
    fontSize: wp(3.8),
    color: "#5D5D5D",
    fontFamily: "Poppins-Regular",
    marginHorizontal: wp(2.5),
    marginTop: hp(1.5),
    height: hp(12),
    // borderWidth:1
  },

  ViewDetialsText: {
    fontSize: wp(3.5),
    fontWeight: "500",
    color: "#D73871",
    fontFamily: "Poppins-Medium",
  },
  boxVerticle: {
    backgroundColor: "#E4E4E4",
    height: hp(3.5),
    width: wp(0.3),
    // marginLeft: wp(1.5),
    marginTop: hp(0.7),
  },
  registerVerticleBox: {
    height: hp(2.1),
    backgroundColor: "#fff",
    width: wp(0.3),
    marginLeft: wp(1.5),
  },
  mainRegisterBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(3),
    marginTop: hp(2),
  },
  pastWorkButton: {
    backgroundColor: "#D73871",
    borderRadius: wp(8),
    height: hp(6),
    marginTop: hp(4),
    marginHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
  },
  pastText: {
    fontSize: wp(4.1),
    color: "#000",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
  },
  invitedDec: {
    fontSize: wp(3.5),
    color: "#5D5D5D",
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    width: wp(48),
  },
  invitedBox: {
    marginHorizontal: wp(4),
    borderRadius: wp(3),
    backgroundColor: "#fff",
    paddingVertical: hp(1),
    marginTop: hp(1.4),
    paddingBottom: hp(2),
  },
  dayText: {
    fontSize: wp(3.5),
    color: "#A5A6A8",
    fontWeight: "500",
  },

  heyText: {
    fontSize: hp(3.7),
    color: "#000",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    marginRight: wp(2),
  },
  heyBox: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp(1.5),
  },
  youText: {
    fontSize: hp(1.6),
    color: "#34AB00",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    marginLeft: wp(1),
  },
  rightBox: {
    height: hp(5.4),
    backgroundColor: "#E7F7E9",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(2),
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    marginTop: hp(2),
  },
  dayBox: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(1.5),
    marginTop: hp(2),
    backgroundColor: "#F3F4F6",
    borderRadius: wp(2),
    marginHorizontal: wp(2),
    flexDirection: "row",
    marginBottom: hp(1),
  },
  langestStreakImg: {
    height: hp(6),
    width: hp(6),
    // aspectRatio:1/1,
  },
  oneDayText: {
    fontSize: hp(2.1),
    color: "#000",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    marginLeft: wp(1),
  },
  longestText: {
    fontSize: hp(1.7),
    color: "#434344",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    marginLeft: wp(1),
  },
  mySatavicJOurneyBox: {
    paddingVertical: hp(2),
    backgroundColor: "#fff",
    paddingHorizontal: wp(2),
    marginHorizontal: wp(5),
    borderRadius: wp(2),
    marginTop: hp(2),
  },
  mySatvicText: {
    fontSize: hp(1.6),
    color: "#000",
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    marginLeft: wp(1),
    marginBottom: hp(0.5),
    // marginHorizontal:wp(4)
  },

  howLikeBox: {
    paddingVertical: hp(3.4),
    backgroundColor: "#EBF1F9",
    borderTopRightRadius: wp(2),
    borderTopLeftRadius: wp(2),
    // alignSelf:'center'
  },
  howLikeText: {
    fontSize: hp(1.8),
    color: "#000",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    alignSelf: "center",
  },

  inputText: {
    fontSize: hp(2.6),
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  ratingBox: {
    backgroundColor: "#F55B58",
    height: hp(5.5),
    width: wp(12),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(2),
    marginHorizontal: wp(2.8),
  },

  /////////////////

  upcommingWorkshowBox: {
    // height: hp(69),
    width: wp(80),
    backgroundColor: "#fff",
    borderRadius: wp(4),
    marginHorizontal: wp(4),
    // paddingVertical: hp(1),
    paddingBottom: hp(2),
  },
  startinBox: {
    height: hp(6.2),
    width: wp(25),
    backgroundColor: "#fff",
    borderRadius: wp(2),
    paddingLeft: wp(4),
    marginLeft: wp(4),
    marginTop: hp(2),
  },
  startinText: {
    fontWeight: "500",
    color: "#363636",
    fontSize: wp(3.5),
    // marginLeft: wp(4),
    marginVertical: hp(1),
    fontFamily: "Poppins-Regular",
  },
  workshopCompletedText: {
    fontSize: wp(3.5),
    fontFamily: "Poppins-Regular",
    // marginVertical: 0,
    fontWeight: "400",
    color: "#fff",
    fontFamily: "Poppins-Medium",
    marginTop: hp(0.6),
  },
  headerMainBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(4),
    marginLeft: wp(4),
  },
  dataBox: {
    height: hp(5),
    borderWidth: 1,
    marginHorizontal: wp(2.5),
    borderRadius: wp(2),
    borderColor: "#E4E4E4",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: wp(3.8),
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    marginLeft: wp(1),
    color: "#363636",
  },

  ViewDetialsText: {
    fontSize: wp(3.5),
    fontWeight: "500",
    color: "#D73871",
    fontFamily: "Poppins-Medium",
  },
  registerButton: {
    height: hp(5),
    // width: wp(45),
    borderRadius: wp(6),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#D73871",
    marginLeft: wp(4),
    paddingHorizontal: wp(3),
  },
});
