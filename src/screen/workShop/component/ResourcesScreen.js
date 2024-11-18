import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// svg
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// vector icon
import SearchIcon from "react-native-vector-icons/Feather";

//png image
import ic_notImg from "../../workShop/provider/png/notsImg.png";
import CustomWorkShopTab from "../../../NewModule/Stacks/CustomWorkShopTab";
import useHardwareBackPress from "../../../screen/workShop/provider/useHardwareBackPress";
import { apifuntion } from "../provider/api/ApiInfo";
import AppLoader from "../provider/AppLoader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResourcesScreen = (props) => {
  // navigation
  const navigation = useNavigation();
  // key boardAware
  const [iskeyBoardVisible, setIskeyBoardVisible] = useState(false);
  const [resourceItemData, setResourceItemData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // To store the search input
  const [loading, setLoading] = useState(false);
  const [upserId, setUserId] = useState("");
  const [workShopId, setWorkShopId] = useState("");

  const data = [
    {
      id: 1,
      day: 1,
      resourceData: [
        { id: 1, img: ic_notImg },
        { id: 2, img: ic_notImg },
      ],
    },
    {
      id: 2,
      day: 2,
      resourceData: [
        { id: 3, img: ic_notImg },
        // { id: 4, img: ic_notImg },
      ],
    },
    {
      id: 3,
      day: 3,
      resourceData: [
        { id: 4, img: ic_notImg },
        { id: 5, img: ic_notImg },
      ],
    },
  ];

  // Function to filter data based on the search query
  const filteredData = resourceItemData.filter((item) =>
    // console.log('kkkkkkkkkkkkk',item)
    item.day_description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const { pastworkId, sessionId } = props?.route.params || {};
    if (pastworkId && sessionId) {
      getResourceNoteData(pastworkId, sessionId);
    } else {
      getResourceNoteData();
    }
  }, [props?.route.params]);

  // props.route.params

  const getResourceNoteData = (pastworkId, sessionId) => {
    setLoading(true);
    setResourceItemData([]); // Clear previous data
    const data = {
      workshop_id: pastworkId || "", // Send empty string or null if not provided
      session_id: sessionId || "", // Send empty string or null if not provided
    };

    apifuntion
      .postApi("get_resource_note_list", data)
      .then((res) => {
        if (res?.data?.statusCode == 200) {
          setLoading(false);
          setResourceItemData(res?.data?.data); // Make sure res.data is structured correctly
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Error", err.message || "An error occurred", [
          { text: "OK" },
        ]);
      });
  };

  const attendWorkShop = async (workshop_id,session_id,user_id) => {
    setLoading(true);
    const data = {
      workshop_id: workshop_id,
      session_id: session_id,
      user_id: user_id,
    };
    await apifuntion
      .postApi("attend_workshop", data)
      .then((res) => {
        const { data } = res;
        if (data.statusCode == 200) {
          // Alert.alert("", data?.message);
          // setJourneyData(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert("", "Soething went wrong");
        setLoading(false);
      });
  };

  // Back handler
  useHardwareBackPress(() => {
    navigation.goBack();
    return true;
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIskeyBoardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIskeyBoardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getUserId = await AsyncStorage.getItem("userId");
      const getWorkShopId = await AsyncStorage.getItem("workShopId");
      const { sessionId } = props?.route.params;
      if (getUserId && getWorkShopId && sessionId) {
        attendWorkShop(getWorkShopId, getUserId, sessionId);
      }
    };
    fetchData();
  }, [props?.route.params]); // Empty dependency array, so this runs once on mount

  return (
    <View style={styles.container}>
      <AppLoader loading={loading} />
      <StatusBar barStyle={"dark-content"} backgroundColor={"#F3F4F6"} />
      <Text style={styles.resourceText}>Resources</Text>

      <View style={styles.homeContainer}>
        <View style={styles.serchBox}>
          <SearchIcon name="search" size={hp(2.6)} color="#000" />
          <TextInput
            placeholder="Search Resources..."
            style={styles.serchInputBox}
            placeholderTextColor={"#000"}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        <FlatList
          data={filteredData ? filteredData : resourceItemData}
          style={{ height: hp(5) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View>
                <Text
                  style={[
                    styles.completeText,
                    { marginLeft: wp(4), fontSize: hp(2.6) },
                  ]}
                >
                  {item.day_title}
                </Text>
                <Text
                  style={[
                    styles.completeText,
                    {
                      color: "#A5A6A8",
                      fontSize: hp(1.8),
                      marginTop: hp(0),
                      marginLeft: wp(4),
                    },
                  ]}
                >
                  {item?.day_description}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.invitedBox,
                    {
                      height: hp(10.5),
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: hp(2),
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate("NoteDetailsScreen", {
                      resourceName: item.resource_name,
                      not_type: item?.note_type,
                    })
                  }
                >
                  <Image
                    // source={item.img}
                    source={ic_notImg}
                    style={{
                      height: hp(10.5),
                      width: wp(38),
                      borderTopLeftRadius: wp(3),
                      borderBottomLeftRadius: wp(3),
                    }}
                  />
                  <View style={{ marginLeft: wp(2) }}>
                    <Text
                      style={[
                        styles.completeText,
                        { color: "#000", fontSize: hp(2.1) },
                      ]}
                    >
                      Notes
                    </Text>
                    <Text style={[styles.dayText, { fontSize: hp(1.3) }]}>
                      {item.day_title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          ListEmptyComponent={() => (
            <Text
              style={{
                fontSize: wp(4),
                color: "#000",
                fontWeight: "500",
                alignSelf: "center",
                marginTop: hp(4),
              }}
            >
              No Note Found
            </Text>
          )}
        />

        {/* share your revired */}
      </View>

      {!iskeyBoardVisible && (
        <CustomWorkShopTab navigation={navigation} parent="ResourcesScreen" />
      )}
    </View>
  );
};

export default ResourcesScreen;

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

  serchInputBox: {
    fontSize: hp(1.8),
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    paddingVertical: 0,
    width: wp(83),
  },
  serchBox: {
    height: hp(5),
    marginHorizontal: wp(4),
    borderRadius: wp(2),
    borderColor: "#CDCDCD",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: wp(3),
    borderWidth: 1,
  },

  completeText: {
    fontSize: wp(4.1),
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    color: "#363636",
    marginTop: hp(2.5),
  },

  invitedBox: {
    height: hp(30),
    marginHorizontal: wp(4),
    borderRadius: wp(3),
    backgroundColor: "#fff",
    paddingVertical: hp(1),
    marginTop: hp(1.4),
  },
  dayText: {
    fontSize: wp(3.5),
    color: "#A5A6A8",
    fontWeight: "500",
  },
});
