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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ic_noteImg from "../../workShop/provider/png/notes.png";
import NoteSvgImg from "../provider/svg/NoteSvgImg";

// svg
import QuestionIcon from "react-native-vector-icons/AntDesign";
import CustomWorkShopTab from "../../../NewModule/Stacks/CustomWorkShopTab";
import { useNavigation } from "@react-navigation/native";
import useHardwareBackPress from "../../../screen/workShop/provider/useHardwareBackPress";
import { apifuntion } from "../provider/api/ApiInfo";
import AppLoader from "../provider/AppLoader";
const SessionScreen = () => {
  const navigation = useNavigation();
  const data = [
    { id: 1, day: 2 },
    { id: 2, day: 2 },
    { id: 3, day: 3 },
    { id: 4, day: 4 },
  ];

  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState([]);

  // remove html tag
  const regex = /(<([^>]+)>)/gi;

  const getSessionData = () => {
    setLoading(true);
    apifuntion
      .postApi(`get_session_list`)
      .then((result) => {
        console.log("eesssss", result);
        setSessionData(result?.data?.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        Alert.alert("", e);
      });
  };

  useEffect(() => {
    getSessionData();
  }, []);

  // Back handler
  useHardwareBackPress(() => {
    navigation.goBack();
    return true;
  });

  return (
    <View style={styles.container}>
      <AppLoader loading={loading} />
      <StatusBar barStyle={"dark-content"} backgroundColor={"#F3F4F6"} />
      <Text style={styles.resourceText}>Session</Text>
      <View style={styles.homeContainer}>
        <Text style={styles.sessionText}>Ultimate Health Challenge</Text>

        <FlatList
          data={sessionData || []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const handletitleRep = (dec, maxLength) => {
              if (dec.length > maxLength) {
                return dec.substring(0, maxLength) + "...";
              }
              return dec;
            };

            const title = handletitleRep(
              item?.session_title.replace(regex, ""),
              28
            );

            const handleDecRep = (dec, maxLength) => {
              if (dec.length > maxLength) {
                return dec.substring(0, maxLength) + "...";
              }
              return dec;
            };

            const decs = handleDecRep(
              item?.description.replace(regex, ""),
              100
            );
            return (
              <View style={styles.notMainBox}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={ic_noteImg}
                    style={{
                      height: hp(20),
                      width: wp(35),
                      borderTopLeftRadius: wp(4),
                    }}
                  />

                  <View
                    style={{
                      marginLeft: wp(4),
                      marginTop: hp(1),
                      width: wp(48),
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text style={styles.dayText}>{item.day_title}</Text>
                      <TouchableOpacity style={styles.missedButton}>
                        <Text
                          style={[
                            styles.dayText,
                            { fontSize: hp(1.6), color: "#EB6564" },
                          ]}
                        >
                          {item?.our_session_status}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={[
                        styles.dayText,
                        {
                          color: "#A5A6A8",
                          fontSize: hp(1.8),
                          marginVertical: hp(1),
                        },
                      ]}
                    >
                      {title}
                    </Text>
                    <Text
                      style={[
                        styles.dayText,
                        {
                          color: "#000",
                          fontSize: hp(1.8),
                          fontWeight: "400",
                          fontFamily: "Poppins-Regular",
                        },
                      ]}
                    >
                      {decs}
                      {/* {item?.description.replace(regex, "")} */}
                    </Text>
                  </View>
                </View>
                <View style={styles.editBox}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      if (item?.workshop_detail?.id && item?.id) {
                        navigation.navigate("ResourcesScreen", {
                          pastworkId: item?.workshop_detail.id,
                          sessionId: item?.id,
                        });
                      } else {
                        console.log("helllow");
                      }
                    }}
                  >
                    <NoteSvgImg />
                    <Text style={styles.noteText}>Notes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => navigation.navigate("FaqScreens")}
                  >
                    <QuestionIcon
                      name="questioncircleo"
                      size={hp(3)}
                      color="#fff"
                    />
                    <Text style={styles.noteText}>FAQ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
      <CustomWorkShopTab navigation={navigation} parent="SessionScreen" />
    </View>
  );
};

export default SessionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  resourceText: {
    fontSize: hp(3.1),
    color: "#000",
    fontFamily: "Poppins-Medium",
    fontWeight: "600",
    alignSelf: "center",
    marginVertical: hp(2),
  },
  sessionText: {
    fontSize: hp(2.6),
    color: "#000",
    fontFamily: "Poppins-Medium",
    fontWeight: "600",
    marginTop: hp(2),
    marginLeft: wp(4),
    marginBottom: hp(2),
  },
  notMainBox: {
    height: hp(25),
    marginHorizontal: wp(4),
    backgroundColor: "#fff",
    borderRadius: wp(2),
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
    marginBottom: hp(2),
  },
  dayText: {
    fontSize: hp(2.1),
    color: "#000",
    fontWeight: "600",
  },
  missedButton: {
    height: hp(3),
    width: wp(15),
    backgroundColor: "#FEEEEE",
    borderRadius: wp(1),
    alignItems: "center",
    justifyContent: "center",
  },
  editBox: {
    backgroundColor: "#DF7199",
    height: hp(5),
    borderBottomLeftRadius: wp(2),
    borderBottomRightRadius: wp(2),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
  },
  noteText: {
    fontSize: hp(2.1),
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    marginLeft: wp(2),
  },
});
