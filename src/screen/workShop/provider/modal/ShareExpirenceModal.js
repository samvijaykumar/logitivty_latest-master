import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// vector icon
import Close from "react-native-vector-icons/SimpleLineIcons";
import VideoIcon from "react-native-vector-icons/Ionicons";
import Message from "react-native-vector-icons/AntDesign";

// svg icon
import LogoSvgImg from "../svg/LogoSvgImg";
import MessageSvgImg from "../svg/MessageSvgImg";
import TextReviewModal from "./TextReviewModal";
import RecordVideoModal from "./RecordVideoModal";

const ShareExpirenceModal = ({ isModalVisible, modalClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isVideoModal, setIsVideoModal] = useState(false);

  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={modalClose}
      >
        <Pressable
          style={styles.obeverlay}
          onPress={modalClose} // This ensures that the modal closes when the user presses outside the modal
        >
          <View style={styles.centeredView}>
            <Pressable
              style={styles.modalView} // This ensures that pressing inside the modal won't close it
              onPress={() => {}}
            >
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    marginRight: wp(4),
                    // paddingRight: wp(0.1),
                    // paddingTop: hp(2),
                    marginTop: hp(2),
                    marginBottom: hp(1),
                    paddingBottom: hp(1),
                    // borderWidth:1
                  }}
                  onPress={modalClose}
                >
                  <Close
                    name="close"
                    size={hp(4)}
                    color="#000"
                    // style={{ paddingBottom: hp(1) }}
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={{
                    // borderWidth: 1,
                    alignSelf: "flex-end",
                    marginRight: wp(4),
                    marginTop: hp(2),
                  }}
                >
                  <Image
                    source={require("../../../workShop/provider/png/close.png")}
                    style={{ height: hp(5), width: hp(5) }}
                  />
                </TouchableOpacity> */}

                <View style={{ alignSelf: "center", marginBottom: hp(3) }}>
                  <LogoSvgImg />
                </View>

                <Text style={styles.wouldText}>
                  Would you like to give us a review for the Ultimate Health
                  Challenge?
                </Text>

                <Text style={styles.ToshareText}>
                  To share your testimonial please answer the following 3
                  question:
                </Text>

                <Text style={styles.questionText}>QUESTIONS</Text>
                <View
                  style={{
                    height: hp(0.4),
                    backgroundColor: "#D73871",
                    width: wp(11.5),
                    marginLeft: wp(2.9),
                  }}
                />

                <View style={styles.questionBox}>
                  <View style={styles.dotBox} />
                  <Text style={styles.whatText}>
                    What is the biggest benefit you received?
                  </Text>
                </View>
                <View style={[styles.questionBox, { marginTop: hp(0) }]}>
                  <View style={styles.dotBox} />
                  <Text style={styles.whatText}>
                    What is the biggest benefit you received?
                  </Text>
                </View>
                <View
                  style={[
                    styles.questionBox,
                    { marginTop: hp(0), alignItems: "flex-start" },
                  ]}
                >
                  <View style={[styles.dotBox, { marginTop: hp(1) }]} />
                  <Text
                    style={[
                      styles.whatText,
                      { verticalAlign: "top", lineHeight: 20 },
                    ]}
                  >
                    What is the biggest benefit you received? is the biggest
                    benefit you received?
                  </Text>
                </View>
                <Pressable />

                {/* <RecordVideoModal /> */}

                <TouchableOpacity
                  style={[
                    styles.recordButton,
                    {
                      backgroundColor: "#2E2E2E",
                      marginVertical: hp(2),
                      marginTop: hp(6),
                    },
                  ]}
                  onPress={() => setIsVideoModal(!isVideoModal)}
                >
                  <VideoIcon name="videocam" size={hp(3)} color="#fff" />
                  {/* <Message name="message1" size={hp(3)} color="#fff" /> */}
                  {/* <MessageSvgImg/> */}
                  <Text style={styles.textStyle}>Record a Video</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.recordButton]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  {/* <VideoIcon name="videocam" size={hp(3)} color="#fff" /> */}
                  {/* <Message name="message1" size={hp(3)} color="#fff" /> */}
                  <MessageSvgImg />
                  <Text style={styles.textStyle}>Text a Meassage</Text>
                </TouchableOpacity>

                <RecordVideoModal
                  isVideoModal={isVideoModal}
                  closeModal={() => setIsVideoModal(false)}
                />

                <TextReviewModal
                  isModalVisible={modalVisible}
                  closeModal={() => setModalVisible(false)}
                />
              </View>
            </Pressable>
          </View>
        </Pressable>
        {/* </View> */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-end',
    // backgroundColor:'rgbe(0.)'
  },
  obeverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "#fff",
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    width: "100%",
    height: hp(78), // Adjust this height to control how much space the modal takes up from the bottom
  },
  recordButton: {
    height: hp(6),
    marginHorizontal: wp(4),
    backgroundColor: "#D73871",
    borderRadius: wp(8),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // marginVertical: hp(4),
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: hp(1.9),
    marginLeft: wp(2),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  //

  wouldText: {
    fontSize: wp(5),
    color: "#000",
    fontWeight: "700",
    fontFamily: "Poppins-SemiBold",
    alignSelf: "center",
    marginHorizontal: wp(3.2),
  },

  ToshareText: {
    fontSize: wp(3.8),
    color: "#717C86",
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    marginHorizontal: wp(10),
    textAlign: "center",
    // width: wp(90),
    marginBottom: hp(6),
    marginTop: hp(2),
  },
  questionText: {
    fontSize: wp(4.1),
    color: "#000",
    fontWeight: "700",
    fontFamily: "Poppins-Medium",
    marginLeft: wp(2.9),
  },

  whatText: {
    fontSize: wp(4.1),
    color: "#717C86",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    marginLeft: wp(2),
  },

  questionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp(4),
    marginTop: wp(4),
  },
  dotBox: {
    height: hp(0.6),
    aspectRatio: 1 / 1,
    backgroundColor: "#717C86",
    borderRadius: wp(4),
  },
});

export default ShareExpirenceModal;
