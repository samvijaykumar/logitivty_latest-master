import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
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
import DownArrow from "react-native-vector-icons/Feather";
import UpIcon from "react-native-vector-icons/Ionicons";
import CustomWorkShopTab from "../../../NewModule/Stacks/CustomWorkShopTab";
import { useNavigation } from "@react-navigation/native";
import useHardwareBackPress from "../../../screen/workShop/provider/useHardwareBackPress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apifuntion } from "../provider/api/ApiInfo";
import AppLoader from "../provider/AppLoader";

const FaqScreens = () => {
  // globle navigation
  const navigation = useNavigation();
  const [faqStatus, setFaqStatus] = useState(null);
  const [loader, setLoader] = useState(false);
  const [faqData, setFaqData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // filter data
  const filteredFaqData = faqData.filter((item) =>
    item.day_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // key board
  const [iskeyBoardVisible, setIskeyBoardVisible] = useState(false);

  const toggleFaq = (question_id) => {
    setFaqStatus((prevStatus) =>
      prevStatus == question_id ? null : question_id
    );
  };

  const data2 = [
    {
      id: 1,
      day: 1,
      questions: [
        {
          question_id: 1,
          question:
            "Will i have access to all resources and FAQs after the workshop?",
          dec: "FAQs after the workshop",
        },
        {
          question_id: 2,
          question: "how can I stay connected with my tribe",
          dec: "FAQs after the workshop FAQs after the workshop",
        },
        {
          question_id: 3,
          question: "ahow can I stay connected with my tribe dd",
          dec: "FAQs after the workshop. FAQs after the workshop?",
        },
      ],
    },

    {
      id: 2,
      day: 2,
      questions: [
        {
          question_id: 4,
          question:
            "Will i have access to all resources and FAQs after the workshop?",
          dec: "Will i have access to all resources and FAQs after the workshop",
        },
        {
          question_id: 5,
          question: "how can I stay connected with my tribe",
          dec: "sdfds FAQs after the workshop?",
        },
        {
          question_id: 6,
          question: "how can I stay connected with my tribe dd",
          dec: "553425230580948nd FAQs after the workshop?",
        },
      ],
    },
    {
      id: 3,
      day: 3,
      questions: [
        {
          question_id: 5,
          question:
            "Will i have access to all resources and FAQs after the workshop?",
          dec: "Will i have access to all resources and FAQs after the workshop",
        },
        {
          question_id: 6,
          question: "how can I stay connected with my tribe",
          dec: "sdfds FAQs after the workshop?",
        },
        {
          question_id: 7,
          question: "how can I stay connected with my tribe dd",
          dec: "553425230580948nd FAQs after the workshop?",
        },
      ],
    },
  ];
  // Original data from API
  const originalData = [
    {
      faq_id: "Sb5",
      day_no: "23",
      day_title: "Laravel",
      faq_arr: [
        {
          id: 6,
          question: "What are migrations in Laravel?",
          answer:
            "<p>Migrations in Laravel are version control for your database schema. They allow you to modify the structure of your database using PHP rather than SQL, making it easy to manage and rollback changes.<br></p>",
        },
        {
          id: 5,
          question: "How does Laravel's Eloquent ORM work?",
          answer:
            "<p>Eloquent is Laravel’s ORM (Object-Relational Mapping) tool that helps you interact with databases using models instead of raw SQL queries. It allows you to perform CRUD operations and database relationships efficiently.<br></p>",
        },
        {
          id: 4,
          question: "What is Laravel?",
          answer:
            "<p>Laravel is a PHP framework designed for web application development. It provides an expressive and elegant syntax to streamline tasks like routing, authentication, sessions, and caching.<br></p>",
        },
      ],
    },
    {
      faq_id: "Sb4",
      day_no: "24",
      day_title: "Laravel",
      faq_arr: [
        {
          id: 10,
          question: "What are migrations in Laravel?",
          answer:
            "<p>Migrations in Laravel are version control for your database schema. They allow you to modify the structure of your database using PHP rather than SQL, making it easy to manage and rollback changes.<br></p>",
        },
        {
          id: 20,
          question: "How does Laravel's Eloquent ORM work?",
          answer:
            "<p>Eloquent is Laravel’s ORM (Object-Relational Mapping) tool that helps you interact with databases using models instead of raw SQL queries. It allows you to perform CRUD operations and database relationships efficiently.<br></p>",
        },
        {
          id: 30,
          question: "What is Laravel?",
          answer:
            "<p>Laravel is a PHP framework designed for web application development. It provides an expressive and elegant syntax to streamline tasks like routing, authentication, sessions, and caching.<br></p>",
        },
      ],
    },

    {
      faq_id: "Sb4",
      day_no: "25",
      day_title: "Laravel",
      faq_arr: [
        {
          id: 40,
          question: "What are migrations in Laravel?",
          answer:
            "<p>Migrations in Laravel are version control for your database schema. They allow you to modify the structure of your database using PHP rather than SQL, making it easy to manage and rollback changes.<br></p>",
        },
        {
          id: 50,
          question: "How does Laravel's Eloquent ORM work?",
          answer:
            "<p>Eloquent is Laravel’s ORM (Object-Relational Mapping) tool that helps you interact with databases using models instead of raw SQL queries. It allows you to perform CRUD operations and database relationships efficiently.<br></p>",
        },
        {
          id: 60,
          question: "What is Laravel?",
          answer:
            "<p>Laravel is a PHP framework designed for web application development. It provides an expressive and elegant syntax to streamline tasks like routing, authentication, sessions, and caching.<br></p>",
        },
      ],
    },
  ];

  // keyboardDidShowListener
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

  // Back handler
  useHardwareBackPress(() => {
    navigation.goBack();
    return true;
  });

  useEffect(() => {
    (async () => {
      const get_workshop_id = await AsyncStorage.getItem("workShopId");

      if (get_workshop_id) {
        handleFaq(get_workshop_id);
      } else {
        handleFaq();
      }
    })();
  }, []);

  const handleFaq = (id) => {
    setLoader(true);
    apifuntion
      .postApi(`get_workshop_faq`, { workshop_id: id })
      .then((res) => {
        const { status, data } = res;
        if (status == 200) {
          setLoader(false);

          // Initialize a counter for unique IDs
          let uniqueId = 1;

          // Function to assign unique IDs
          const updatedData = data.data.map((item) => {
            const updatedFaqArr = item.faq_arr.map((faq) => ({
              ...faq,
              id: uniqueId++, // Increment the unique ID for each question
            }));

            return {
              ...item,
              faq_arr: updatedFaqArr,
            };
          });
          setFaqData(updatedData);
        }
      })
      .catch((err) => {
        setLoader(false), console.log("wwwwsdkjflasjd;lfjasdl;fjas;lk", err);
      });
  };
  return (
    <View style={styles.container}>
      <AppLoader loading={loader} />

      <StatusBar barStyle={"dark-content"} backgroundColor={"#F3F4F6"} />
      <Text style={styles.resourceText}>FAQ</Text>

      <View style={styles.homeContainer}>
        <View style={styles.serchBox}>
          <SearchIcon name="search" size={hp(2.6)} color="#000" />
          <TextInput
            placeholder="Search FAQs"
            style={styles.serchInputBox}
            placeholderTextColor={"#000"}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>

        <FlatList
          data={filteredFaqData ? filteredFaqData : faqData}
          style={{ height: hp(5) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const regex = /(<([^>]+)>)/gi;
            return (
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.completeText,
                    { marginLeft: wp(4), fontSize: hp(2.6) },
                  ]}
                >
                  {item.day_no} Day
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
                  {item?.day_title}
                </Text>
                {item.faq_arr.map((question, index) => (
                  <View key={question.id}>
                    <View
                      style={[
                        styles.invitedBox,
                        index == item.faq_arr.length - 1 &&
                          faqStatus != question.id && {
                            marginBottom: hp(2),
                          },
                        {
                          paddingHorizontal: wp(2),
                          borderBottomLeftRadius:
                            faqStatus === question.id ? 0 : wp(3),
                          borderBottomRightRadius:
                            faqStatus === question.id ? 0 : wp(3),
                          // marginBottom:lastItem ? hp(2) : hp(0)
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.titleTextStyle,
                          { fontWeight: "600", fontFamily: "Poppins-SemiBold" },
                        ]}
                      >
                        {question.question}
                      </Text>
                      <TouchableOpacity onPress={() => toggleFaq(question.id)}>
                        {faqStatus != question.id && (
                          <DownArrow
                            style={styles.icon}
                            color={"#000"}
                            name="chevron-down"
                            size={hp(3.2)}
                          />
                        )}
                        {faqStatus == question.id && (
                          <UpIcon
                            style={styles.icon}
                            color={"#000"}
                            name="chevron-up"
                            size={hp(3)}
                          />
                        )}
                      </TouchableOpacity>
                    </View>

                    {faqStatus == question.id && (
                      <View
                        style={[
                          styles.decBox,
                          index == item.faq_arr.length - 1 && {
                            marginBottom: hp(2),
                          },
                        ]}
                      >
                        <View
                          style={{
                            height: hp(0.2),
                            backgroundColor: "#e4e4e4",
                            marginBottom: hp(1.5),
                          }}
                        />
                        <Text
                          style={[styles.titleTextStyle, { color: "#424242" }]}
                        >
                          {question.answer.replace(regex, "")}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            );
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: hp(2),
              }}
            >
              <Text
                style={{ fontSize: hp(2), color: "#000", fontWeight: "600" }}
              >
                No Data Found
              </Text>
            </View>
          )}
        />
      </View>

      {!iskeyBoardVisible && (
        <CustomWorkShopTab navigation={navigation} parent="FaqScreens" />
      )}
    </View>
  );
};

export default FaqScreens;

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
    marginHorizontal: wp(4),
    borderRadius: wp(3),
    backgroundColor: "#fff",
    paddingVertical: hp(1),
    marginTop: hp(1.4),
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: hp(2),
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
  },
  dayText: {
    fontSize: wp(3.5),
    color: "#A5A6A8",
    fontWeight: "500",
  },

  titleText: {
    fontSize: hp(2.1),
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    color: "#000",
    // textAlign:'center'
  },

  //  dropdown
  dropdownContainer: {
    height: hp(10),
    backgroundColor: "#fff",
    width: wp(91.5),
    paddingHorizontal: wp(4),
  },

  selectedTextStyle: {
    fontSize: hp(2.1),
    fontFamily: "Poppins-Medium",
    fontWeight: "600",
    color: "#000",
  },

  decText: {
    fontSize: hp(1.9),
    color: "#000",
    fontWeight: "400",
  },
  decBox: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    backgroundColor: "#fff",
    marginHorizontal: wp(4),
    borderBottomRightRadius: wp(3),
    borderBottomLeftRadius: wp(3),
  },
  titleTextStyle: {
    fontSize: hp(2.1),
    fontWeight: "500",
    color: "#2a2a2a",
    fontFamily: "Poppins-Medium",
  },
});

{
  /* <FlatList
          data={data2}
          style={{ height: hp(5) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            console.log("ffffffffffffffffitem", item);
            return (
              <View>
                <Text
                  style={[
                    styles.completeText,
                    { marginLeft: wp(4), fontSize: hp(2.6) },
                  ]}
                >
                  Day {item.day}
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
                  BRINGING IT TOGETHER
                </Text>
                {item.questions.map((question) => (
                  <View key={question.question_id}>
                    <View
                      style={[styles.invitedBox, { paddingHorizontal: wp(4) }]}
                    >
                      <Text style={styles.titleText}>{question.question}</Text>
                      <TouchableOpacity
                        onPress={() => toggleFaq(question.question_id)}
                      >
                        <DownArrow
                          style={styles.icon}
                          color={"#000"}
                          name="chevron-down"
                          size={hp(3.2)}
                        />
                      </TouchableOpacity>
                    </View>

                    {faqStatus === question.question_id && (
                      <View style={styles.decBox}>
                        <Text style={styles.decText}>{question.dec}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            );
          }}
        /> */
}

// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   Keyboard,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // svg
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// // vector icon
// import SearchIcon from "react-native-vector-icons/Feather";
// import DownArrow from "react-native-vector-icons/Feather";
// import CustomWorkShopTab from "../../../NewModule/Stacks/CustomWorkShopTab";
// import { useNavigation } from "@react-navigation/native";
// import useHardwareBackPress from "../../../screen/workShop/provider/useHardwareBackPress";

// // api
// import { apifuntion } from "../provider/api/ApiInfo";
// import AppLoader from "../provider/AppLoader";

// // async storage
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const FaqScreens = () => {
//   // globle navigation
//   const navigation = useNavigation();
//   const [faqStatus, setFaqStatus] = useState(null);
//   const [loader, setLoader] = useState(false);
//   const [faqData, setFaqData] = useState([]);

//   // key board
//   const [iskeyBoardVisible, setIskeyBoardVisible] = useState(false);

//   const toggleFaq = (question_id) => {
//     setFaqStatus((prevStatus) =>
//       prevStatus === question_id ? null : question_id
//     );
//   };

//   const data2 = [
//     {
//       id: 1,
//       day: 1,
//       questions: [
//         {
//           question_id: 1,
//           question:
//             "Will i have access to all resources and FAQs after the workshop?",
//           dec: "FAQs after the workshop",
//         },
//         {
//           question_id: 2,
//           question: "how can I stay connected with my tribe",
//           dec: "FAQs after the workshop FAQs after the workshop",
//         },
//         {
//           question_id: 3,
//           question: "ahow can I stay connected with my tribe dd",
//           dec: "FAQs after the workshop. FAQs after the workshop?",
//         },
//       ],
//     },

//     {
//       id: 2,
//       day: 2,
//       questions: [
//         {
//           question_id: 4,
//           question:
//             "Will i have access to all resources and FAQs after the workshop?",
//           dec: "Will i have access to all resources and FAQs after the workshop",
//         },
//         {
//           question_id: 5,
//           question: "how can I stay connected with my tribe",
//           dec: "sdfds FAQs after the workshop?",
//         },
//         {
//           question_id: 6,
//           question: "how can I stay connected with my tribe dd",
//           dec: "553425230580948nd FAQs after the workshop?",
//         },
//       ],
//     },
//     {
//       id: 3,
//       day: 3,
//       questions: [
//         {
//           question_id: 5,
//           question:
//             "Will i have access to all resources and FAQs after the workshop?",
//           dec: "Will i have access to all resources and FAQs after the workshop",
//         },
//         {
//           question_id: 6,
//           question: "how can I stay connected with my tribe",
//           dec: "sdfds FAQs after the workshop?",
//         },
//         {
//           question_id: 7,
//           question: "how can I stay connected with my tribe dd",
//           dec: "553425230580948nd FAQs after the workshop?",
//         },
//       ],
//     },
//   ];

//   // keyboardDidShowListener
//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       "keyboardDidShow",
//       () => {
//         setIskeyBoardVisible(true);
//       }
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       "keyboardDidHide",
//       () => {
//         setIskeyBoardVisible(false);
//       }
//     );

//     return () => {
//       keyboardDidHideListener.remove();
//       keyboardDidShowListener.remove();
//     };
//   }, []);

//   // Back handler
//   useHardwareBackPress(() => {
//     navigation.goBack();
//     return true;
//   });

// useEffect(() => {
//   (async () => {
//     const get_workshop_id = await AsyncStorage.getItem("workShopId");
//     console.log("wwwwwwww", get_workshop_id);

//     if (get_workshop_id) {
//       handleFaq(get_workshop_id);
//     } else {
//       handleFaq();
//     }
//   })();
// }, []);

// const handleFaq = (id) => {
//   setLoader(true);
//   apifuntion
//     .postApi(`get_workshop_faq`, { workshop_id: id })
//     .then((res) => {
//       const { status, data } = res;
//       if (status == 200) {
//         setLoader(false);
//         setFaqData(data);
//       }
//     })
//     .catch((err) => {
//       setLoader(false), console.log("wwwwsdkjflasjd;lfjasdl;fjas;lk", err);
//     });
// };

//   return (
//     <View style={styles.container}>
//       <AppLoader loading={loader} />
//       <StatusBar barStyle={"dark-content"} backgroundColor={"#F3F4F6"} />
//       <Text style={styles.resourceText}>FAQ</Text>

//       <View style={styles.homeContainer}>
//         <View style={styles.serchBox}>
//           <SearchIcon name="search" size={hp(2.6)} color="#000" />
//           <TextInput
//             placeholder="Search FAQs"
//             style={styles.serchInputBox}
//             placeholderTextColor={"#000"}
//           />
//         </View>

//         <FlatList
//           data={faqData?.data}
//           style={{ height: hp(5) }}
//           showsVerticalScrollIndicator={false}
//           renderItem={({ item }) => {
//             console.log("ffffffffffffffffitem", item);
//             const regex = /(<([^>]+)>)/gi;
//             return (
//               <View style={{ flex: 1 }}>
//                 <Text
//                   style={[
//                     styles.completeText,
//                     { marginLeft: wp(4), fontSize: hp(2.6) },
//                   ]}
//                 >
//                   Day {item.day_no}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.completeText,
//                     {
//                       color: "#A5A6A8",
//                       fontSize: hp(1.8),
//                       marginTop: hp(0),
//                       marginLeft: wp(4),
//                     },
//                   ]}
//                 >
//                   BRINGING IT TOGETHER
//                 </Text>
//                 {item.faq_arr.map((question, index) => (
//                   <View key={item?.id}>
//                     <View
//                       style={[styles.invitedBox, { paddingHorizontal: wp(4) }]}
//                     >
//                       <Text style={styles.titleText}>{question.question}</Text>
//                       <TouchableOpacity onPress={() => toggleFaq(item?.id)}>
//                         <DownArrow
//                           style={styles.icon}
//                           color={"#000"}
//                           name="chevron-down"
//                           size={hp(3.2)}
//                         />
//                       </TouchableOpacity>
//                     </View>

//                     {faqStatus == item?.id && (
//                       <View style={styles.decBox}>
//                         <Text style={styles.decText}>
//                           {question.answer.replace(regex, "")}
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 ))}
//               </View>
//             );
//           }}
//           ListEmptyComponent={() => (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: hp(2),
//               }}
//             >
//               <Text
//                 style={{ fontSize: hp(2), color: "#000", fontWeight: "600" }}
//               >
//                 No Data Found
//               </Text>
//             </View>
//           )}
//         />
//       </View>

//       {!iskeyBoardVisible && (
//         <CustomWorkShopTab navigation={navigation} parent="FaqScreens" />
//       )}
//     </View>
//   );
// };

// export default FaqScreens;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F3F4F6",
//   },
//   homeContainer: {
//     flex: 1,
//     backgroundColor: "#F3F4F6",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#F3F4F6",
//   },
//   resourceText: {
//     fontSize: hp(3.1),
//     color: "#000",
//     fontFamily: "Poppins-Medium",
//     fontWeight: "600",
//     alignSelf: "center",
//     marginVertical: hp(2),
//   },

//   serchInputBox: {
//     fontSize: hp(1.8),
//     color: "#000",
//     fontFamily: "Poppins-Regular",
//     fontWeight: "400",
//     paddingVertical: 0,
//     width: wp(83),
//   },
//   serchBox: {
//     height: hp(5),
//     marginHorizontal: wp(4),
//     borderRadius: wp(2),
//     borderColor: "#CDCDCD",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingLeft: wp(3),
//     borderWidth: 1,
//   },

//   completeText: {
//     fontSize: wp(4.1),
//     fontFamily: "Poppins-Medium",
//     fontWeight: "500",
//     color: "#363636",
//     marginTop: hp(2.5),
//   },

//   invitedBox: {
//     marginHorizontal: wp(4),
//     borderRadius: wp(3),
//     backgroundColor: "#fff",
//     paddingVertical: hp(1),
//     marginTop: hp(1.4),
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp(2),
//     justifyContent: "space-between",
//     paddingHorizontal: wp(4),
//   },
//   dayText: {
//     fontSize: wp(3.5),
//     color: "#A5A6A8",
//     fontWeight: "500",
//   },

//   titleText: {
//     fontSize: hp(2.1),
//     fontFamily: "Poppins-Medium",
//     fontWeight: "600",
//     color: "#000",
//     // textAlign:'center'
//   },

//   //  dropdown
//   dropdownContainer: {
//     height: hp(10),
//     backgroundColor: "#fff",
//     width: wp(91.5),
//     paddingHorizontal: wp(4),
//   },

//   selectedTextStyle: {
//     fontSize: hp(2.1),
//     fontFamily: "Poppins-Medium",
//     fontWeight: "600",
//     color: "#000",
//   },

//   decText: {
//     fontSize: hp(1.9),
//     color: "#000",
//     fontWeight: "400",
//   },
//   decBox: {
//     paddingVertical: hp(1),
//     paddingHorizontal: wp(3),
//     backgroundColor: "#fff",
//     marginHorizontal: wp(4),
//     marginTop: hp(-1),
//     borderRadius: wp(1),
//   },
// });
