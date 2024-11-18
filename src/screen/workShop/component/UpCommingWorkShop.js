import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// svg img
import LogoSvgImg from "../../workShop/provider/svg/LogoSvgImg";
import DateSvgImg from "../provider/svg/DateSvgImg";

// vector icon
import GlobeIcon from "react-native-vector-icons/FontAwesome5";
import RupeeIcon from "react-native-vector-icons/MaterialIcons";
import RightIcon from "react-native-vector-icons/Feather";
import UpIcon from "react-native-vector-icons/AntDesign";
import DownIcon from "react-native-vector-icons/AntDesign";
import WorkShopCompleted from "../provider/svg/WorkShopCompleted";
import CustomWorkShopTab from "../../../NewModule/Stacks/CustomWorkShopTab";
import useHardwareBackPress from "../../../screen/workShop/provider/useHardwareBackPress";

// api
import { apifuntion } from "../provider/api/ApiInfo";

//loader
import AppLoader from "../provider/AppLoader";

// png img
import up_commingImg from "../provider/png/upCommingImg.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { height, width } from "../../../NewModule/Stacks/utils/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { color } from "@rneui/base";
import { getDisplay } from "react-native-device-info";
import HomeStack from "../../../NewModule/Stacks/HomeStack";
import TouchableImageView from "../../../widgets/TouchableImageView";
import ResourceUtils from "../../../utils/ResourceUtils";

const UpCommingWorkShop = (props) => {
  const upcommingWorkData = [
    { id: 1, date: "26th Aug", day: "25 Days", lang: "Hindi" },
    { id: 2, date: "26th Aug", day: "25 Days", lang: "Hindi" },
    { id: 3, date: "26th Aug", day: "25 Days", lang: "Hindi" },
    { id: 4, date: "26th Aug", day: "25 Days", lang: "Hindi" },
  ];

  // loader
  const [loading, setLoading] = useState(false);
  const [upcommingData, setUpcommingData] = useState([]);
  const [pastWorkShopData, setPastWorkShopData] = useState([]);

  // remove html tag
  const regex = /(<([^>]+)>)/gi;

  const data = [
    {
      id: 1,
      title: "test book",
      image: "16143310256273881724669073.png",
      view_link: "https://demo.sgvproject.in/",
      start_date_time: "2024-09-09 00:00:00",
      end_date_time: "2024-09-16 00:00:00",
      description: "<p>ghf</p>",
      language: "english",
      amount: "200.00",
      status: "1",
      created_at: "2024-08-26T10:44:33.000000Z",
      updated_at: "2024-09-06T06:20:07.000000Z",
      no_of_workshop_day: 8,
      our_workshop_rating: "0",
      workshop_start_in_no_of_days: 2,
      is_workshop_completed: "0",
    },
  ];

  const pastWorkshopData = [
    {
      id: 1,
      title: "test book",
      image: "16143310256273881724669073.png",
      view_link: "https://demo.sgvproject.in/",
      start_date_time: "2024-09-02 00:00:00",
      end_date_time: "2024-09-05 00:00:00",
      description: "<p>ghf</p>",
      language: "english",
      amount: "200.00",
      status: "1",
      created_at: "2024-08-26T10:44:33.000000Z",
      updated_at: "2024-09-06T06:23:13.000000Z",
      no_of_workshop_day: 4,
      our_workshop_rating: "0",
      workshop_start_in_no_of_days: -4,
      is_workshop_completed: "0",
    },
  ];

  const [pastWorkStatus, setPastWorkStatus] = useState(false);

  const handlePastWorkShop = (currentStatus) => {
    setPastWorkStatus(currentStatus);
  };

  // bottom tab not show
  // useEffect(() => {
  //   props.navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       // display: "none",
        
  //     },
  //   });
  //   return () =>
  //     props.navigation.getParent()?.setOptions({
  //       tabBarStyle: undefined,
      
  //     });
  // }, [props.navigation]);

  // upcomming api function
  const getUpcommingData = () => {
    setLoading(true);
    apifuntion
      .getApi("get_upcomming_workshop_list")
      .then((res) => {
        if (res.statusCode == 200) {
          console.log(
            "gggggggggggggggggggggggggggggtttttttttttttttttttttt",
            res
          );

          setUpcommingData(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert("", err);
        setLoading(false);
      });
  };

  // past workshop api function
  const getPastWorkShopData = () => {
    setLoading(true);
    apifuntion
      .getApi("get_past_workshop_list")
      .then((res) => {
        if (res.statusCode == 200) {
          setPastWorkShopData(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert("", err);
        setLoading(false);
      });
  };
  const navigation = useNavigation(); //go back 
  // Back handler
  useHardwareBackPress(() => {
    props.navigation.goBack();
    return true;
  });

  useEffect(() => {
    getUpcommingData();
    getPastWorkShopData();
  }, []);
  

  return (
    <View style={styles.container}>
    
      <StatusBar barStyle={"dark-content"} backgroundColor={"#f3f4f6"} />

      <AppLoader loading={loading} />
      <ScrollView
        style={styles.homeContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerMainBox}>
        {/* <LogoSvgImg 
  style={{ 
    marginLeft: 20, 
   
  }} 
/> */}

              <Image
                        source={require("../../../utils/images/logo.png")}
                        style={{ height: hp(4.7), width: hp(4.7), left:16,tintColor:"white",bottom:2.1}}
                      />
          <Text
            style={[
              styles.nameText,
              {
                marginLeft: wp(7.2),
                fontWeight: "800",
                fontFamily: "Poppins-SemiBold",
                color:'white',
                 fontSize:20,
               bottom:2

              },
            ]}
          >
            The Longevity Club
          </Text>
        </View>

        <Text style={[styles.upcommingText]}></Text>
        {/* <View style={{ backgroundColor:'#D83772',bottom:35}}>
              <TouchableOpacity onPress={() =>props.navigation.goBack()}>
        <Image
                        source={require("../provider/png/back.png")}
                        style={{ height: hp(3.5), width: hp(3.5), left:20,tintColor:'white'}}
                      />
    </TouchableOpacity>
    <Text style={{left:67,bottom:30,fontSize:20,color:'black'}} >Work Shops</Text>
        </View> */}
        <View 
    //     style={{ backgroundColor: '#f2f0ef',
    // paddingVertical: hp(2),
    // flexDirection: 'row',
    // alignItems: 'center',
    // bottom:40,
    // }}
    >
      {/* <TouchableOpacity
       onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../provider/png/back.png")}
          style={{ height: hp(3), 
    width: hp(3),  
    marginLeft: wp(7), 
    tintColor: '#D83772',}}
        />
      </TouchableOpacity> */}
      {/* <TouchableImageView
             onPress={() => navigation.goBack()}
            imageStyle={{
              marginStart: 10,
              marginEnd: 20,
              width: 18,
              // height: "100%",
              left:15,
              transform: [{ rotate: "180deg" }],
              tintColor: '#D83772',
            
            }}
            image={ResourceUtils.images.arrow_left}
          /> */}
      {/* <Text style={{ fontSize: width * 0.05, 
    color: 'black',
    marginLeft: wp(5),}}>Work Shops</Text> */}
    </View>
    
        <FlatList
          data={upcommingData}
          horizontal={true}
          renderItem={({ item }) => {
            const formattedDate = moment(item.start_date_time).format('Do MMM');

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
              console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqmm', dec.length);

              if (dec.length > maxLength) {
                return dec.substring(0, maxLength) + "...";
              }
              return dec;
            };

            const decShort = upDecShort(
              item?.description.replace(regex, ""), 142
              // "if you have been wanting to wake up early, ",142
            );

            const our_new_created_date = (title, maxLength) => {
              if (title.length > maxLength) {
                return title.substring(0, maxLength);
              }
              return title;
            };

            let newDate = our_new_created_date(item.our_new_created_date, 8);

            return (
              <View style={styles.upcommingWorkshowBox}>
                <ImageBackground
                  // source={{ uri: item.image ? item.image : up_commingImg }}
                  source={{
                    uri: "https://demo.sgvproject.in/longetivity/uploads/workshop/16082312546892211726742303.png"
                      ? "https://demo.sgvproject.in/longetivity/uploads/workshop/16082312546892211726742303.png"
                      : up_commingImg,
                  }}
                  // source={up_commingImg}

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
                      marginLeft: wp(3),
                      fontWeight: "700"
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
        <TouchableOpacity
          style={[styles.pastWorkButton, { marginBottom: hp(1.5) }]}
          onPress={() => handlePastWorkShop(!pastWorkStatus)}
        >
          <Text style={styles.pastText}>Past workshops</Text>
          {!pastWorkStatus && (
            <DownIcon name="down" size={hp(3)} color="#000" />
          )}
          {pastWorkStatus && <UpIcon name="up" size={hp(3)} color="#000" />}
        </TouchableOpacity>
        {pastWorkStatus && (
          <>
            {/* <Text
              style={[
                styles.pastText,
                { marginLeft: wp(4), marginTop: hp(3), marginBottom: hp(2) },
              ]}
            >
              Past workshops
            </Text> */}

            {/*  past workshop */}
            <FlatList
              data={pastWorkShopData}
              horizontal={true}
              renderItem={({ item }) => {
                // Create a new Date object
                const date = new Date(item?.end_date_time);

                // Get the day and add ordinal suffix
                const day = date.getDate();
                const dayWithSuffix = (day) => {
                  if (day > 3 && day < 21) return day + "th"; // applies to 11th - 20th
                  switch (day % 10) {
                    case 1:
                      return day + "st";
                    case 2:
                      return day + "nd";
                    case 3:
                      return day + "rd";
                    default:
                      return day + "th";
                  }
                };

                // Get the month name and year
                const month = date.toLocaleString("en-US", { month: "long" });
                const year = date.getFullYear();

                // Format the date
                const formattedDate = `${dayWithSuffix(day)} ${month}, ${year}`;

                // title ref
                const pastTitleShort = (title, maxLength) => {
                  if (title.length > maxLength) {
                    return title.substring(0, maxLength) + "...";
                  }
                  return title;
                };

                let newPastTitle = pastTitleShort(item.title, 35);

                // starting date

                const pwCurrentDob = new Date(item?.start_date_time);
                const pcDay = pwCurrentDob.getDate();
                const pcMonth = date.toLocaleString("en-US", {
                  month: "short",
                });

                const pcFormattedDate = `${pcDay}${["th", "st", "nd", "rd"][((pcDay % 10) - 1) % 10] || "th"
                  } ${pcMonth}`;

                const pastDecShort = (dec, maxLength) => {
                  if (dec.length > maxLength) {
                    return dec.substring(0, maxLength) + "";
                  }
                  return dec;
                };

                const decPastShort = pastDecShort(
                  item?.description.replace(regex, ""),
                  90
                );

                const our_new_created_date = (title, maxLength) => {
                  if (title.length > maxLength) {
                    return title.substring(0, maxLength);
                  }
                  return title;
                };

                let newDate = our_new_created_date(
                  item.our_new_created_date,
                  8
                );

                const handleWorkShopId = async () => {
                  await AsyncStorage.setItem("workShopId", item?.id.toString());
                };

                const formattedDatePastWorkshop = moment(item.start_date_time).format('Do MMM');

                console.log('item?**', item?.attempt_session?.attempt_session_percentage);
                console.log('item?**++', item);

                return (
                  <View
                    style={[
                      styles.upcommingWorkshowBox,
                      { height: hp(59), marginBottom: hp(2), marginTop: hp(1) },
                    ]}
                  >
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
                      <View
                        style={[
                          styles.workshopButton
                        ]}
                      >
                        <WorkShopCompleted />
                        <Text style={[styles.workshopCompletedText]}>
                          Workshop Completed
                        </Text>
                      </View>
                    </ImageBackground>

                    <Text
                      style={[
                        styles.nameText,
                        {
                          fontSize: wp(5),
                          marginTop: wp(3),
                          marginBottom: hp(1),
                          marginLeft: wp(2),
                          fontWeight: "700",
                        },
                      ]}
                    >
                      {newPastTitle}
                    </Text>
                    <Text
                      style={[
                        styles.nameText,
                        {
                          fontSize: wp(3.8),
                          //   marginTop: wp(3),
                          marginBottom: hp(2),
                          marginLeft: wp(2),
                          color: "#5D5D5D",
                        },
                      ]}
                    >
                      Completed on {formattedDate}
                    </Text>

                    {/* <View style={styles.dataBox}>
                      <View>
                        <View
                          style={{
                            marginVertical: hp(1),
                            marginLeft: wp(2),
                            flexDirection: "row",
                          }}
                        >
                          <DateSvgImg />
                          <Text style={styles.dateText}>{pcFormattedDate}</Text>
                        </View>
                      </View>
                      <View style={styles.boxVerticle} />
                      <View
                        style={{
                          marginVertical: hp(1),
                          marginLeft: wp(2),
                          flexDirection: "row",
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
                      <View style={styles.boxVerticle} />

                      <View
                        style={{
                          marginVertical: hp(1),
                          // marginLeft: wp(2.5),
                          flexDirection: "row",
                        }}
                      >
                        <GlobeIcon name="globe" size={hp(2.5)} color="#000" />
                        <Text
                          style={[
                            styles.dateText,
                            { textTransform: "capitalize" },
                          ]}
                        >
                          {item?.language}
                        </Text>
                      </View>
                    </View> */}

                    <View
                      style={[styles.dataBox, { paddingHorizontal: wp(3) }]}
                    >
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
                          <Text style={styles.dateText}>
                            {formattedDatePastWorkshop}
                          </Text>
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
                          style={[
                            styles.dateText,
                            { textTransform: "capitalize" },
                          ]}
                        >
                          {item?.language}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.pastWorkButton,
                        {
                          backgroundColor: "#D73871",
                          borderRadius: wp(8),
                          height: hp(6),
                        },
                      ]}
                      onPress={async () => {
                        await handleWorkShopId(); // First, store the value in AsyncStorage
                        props.navigation.navigate("PastWorkShopDetailsScreen", {
                          upcommingData: upcommingData,
                          pastworkData: {
                            link: item?.view_link,
                            attendSession: item?.attempt_session?.attempt_session_percentage
                          }
                        });
                      }}
                    >
                      <Text style={[styles.pastText, { color: "#fff" }]}>
                        Enter Workshop Page
                      </Text>
                      <RightIcon
                        name="chevron-right"
                        size={hp(4)}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </>
        )}
      </ScrollView>

      {/* <CustomWorkShopTab navigation={props.navigation}/>
      {!iskeyBoardVisible && ( */}
      <CustomWorkShopTab
        navigation={props.navigation}
        parent="UpCommingWorkShop"
      />
      {/* )} */}
    </View>
  );
};

export default UpCommingWorkShop;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  nameText: {
    fontSize: wp(5.4),
    color: "#000",
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  upcommingText: {
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    color: "#363636",
    fontSize: wp(4.1),
    marginLeft: wp(4),
    marginVertical: hp(1),
  },
  upCommingImg: {
    height: hp(30),
    width: wp(80),
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
  },
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
    // marginTop: hp(1),
    // marginLeft: wp(1),
    backgroundColor:'#D83772',
    height:61,
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

  updecText: {
    fontSize: wp(3.8),
    color: "#5D5D5D",
    fontFamily: "Poppins-Regular",
    marginHorizontal: wp(2.5),
    marginTop: hp(1.5),
    // borderWidth: 1,
    height: hp(12)
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
    paddingHorizontal: wp(3)
  },

  workshopButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: wp(4),

    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "#fff",
    width: wp(50),
    height: wp(8),
    borderRadius: wp(3),
    marginTop: hp(2),
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
    justifyContent: "space-between",
  },
  pastWorkButton: {
    height: hp(5),
    borderRadius: wp(2),
    marginTop: hp(4),
    backgroundColor: "#fff",
    marginHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
  },
  pastText: {
    fontSize: wp(4.1),
    color: "#000",
    fontWeight: "700",
    fontFamily: "Poppins-Medium",
  },

  CustombottomTab: {
    height: hp(7),
    marginHorizontal: wp(4),
    borderWidth: 1,
    marginBottom: hp(2),
    borderRadius: wp(4),
    borderColor: "#CDCDCD",
    flexDirection: "row",
    alignItems: "center",
  },
});
