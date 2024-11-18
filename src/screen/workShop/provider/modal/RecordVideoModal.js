import React, { useRef, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// rn camera
import { RNCamera } from "react-native-camera";

// vector icon
import Close from "react-native-vector-icons/SimpleLineIcons";

// svg icon
import LogoSvgImg from "../svg/LogoSvgImg";
import RecordVideoReviewModal from "./RecordVideoReviewModal";
import { useNavigation } from "@react-navigation/native";
import VideoRecordScreen from "./VideoRecordScreen";

// upload video
import { launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "@bam.tech/react-native-image-resizer";
import { types } from "react-native-document-picker";
import axios from "axios";

const RecordVideoModal = ({ isVideoModal, closeModal }) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [recordVideoReviewModal, setRecordVideoReviewModal] = useState(false);

  // const [modalVisible, setModalVisible] = useState(false);

  const cameraRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [uploadVideo, setUploadVideo] = useState(false);
  

  const toggleRecording = async () => {
    if (recording) {
      setRecording(false);
      try {
        const data = await cameraRef.current.stopRecording();
        setRecordVideoReviewModal(!recordVideoReviewModal);
        console.log("Video recorded:aaa", data);
      } catch (error) {
        console.log("Recording error:", error);
      }
    } else {
      setRecording(true);
      try {
        const data = await cameraRef.current.recordAsync();
        console.log("Recording started:", data);
      } catch (error) {
        console.log("Error starting recording:", error);
      }
    }
  };

  const handleRecordVideo = () => {
    setVideoVisible(!videoVisible);
      
    // closeModal()
  };

  // const handleDocumentupload1 = () => {
  //   launchImageLibrary({ mediaType: "video" }, async (response) => {
  //     if (!response.didCancel && !response.error) {
  //       const newWidth = 500;
  //       const newHeight = 500;

  //       const resizedImageURI = await ImageResizer.createResizedImage(
  //         response.assets[0].uri,
  //         newWidth,
  //         newHeight,
  //         "JPEG",
  //         100
  //       );

  //       const { name, uri } = resizedImageURI;
  //     setUploadVideo({name, uri})
  //       // setInputs({ ...inputs, Document2: { name, uri, type: "image/jpeg" } });
  //       // setShowCamera(false);
  //     }
  //   });
  // };


  const handleDocumentUpload1 = () => {
    // Open the image library to select a video
    launchImageLibrary({ mediaType: 'video' }, async (response) => {
      if (!response.didCancel && !response.error) {
        const { fileName, uri, type } = response.assets[0];
  // console.l/og('ffffffffffffaaaa',uri);
  setUploadVideo(uri)
  setRecordVideoReviewModal(!recordVideoReviewModal);

  
        // Prepare the video file data for upload
        const formData = new FormData();
        formData.append('video', {
          name: fileName,
          uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri, // Adjust URI for iOS
          type: type || 'video/mp4',  // If type is missing, default to 'video/mp4'
        });
  
        // Example API request for uploading the video
        // try {
        //   const uploadResponse = await axios.post('YOUR_API_ENDPOINT_HERE', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   });
        //   console.log('Upload success:', uploadResponse.data);
        //   // Handle successful upload, e.g., update state or UI
        // } catch (error) {
        //   console.error('Upload failed:', error);
        // }
      }
    });
  };
  

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVideoModal}
        onRequestClose={closeModal}
      >
        <Pressable
          style={styles.obeverlay}
          onPress={closeModal} // This ensures that the modal closes when the user presses outside the modal
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
                    paddingTop: hp(1),
                    // borderWidth:1,
                    paddingVertical:hp(1),
                    marginTop:hp(1)
                  }}
                  onPress={closeModal}
                  
                >
                  <Close name="close" size={hp(4)} color="#000" />
                </TouchableOpacity>

                <View style={{ alignSelf: "center", marginBottom: hp(3) }}>
                  <LogoSvgImg />
                </View>

                <Text style={styles.wouldText}>Record Video Review</Text>

                <Pressable />

                {/* <RNCamera
                  ref={cameraRef}
                  style={{ 
                    height: hp(20),
                    // width: wp(60),
                    backgroundColor: "#fff",
                    aspectRatio: 1/ 4,  // Ensures the 4:3 aspect ratio
                }}
                  
                  type={RNCamera.Constants.Type.back}
                  flashMode={RNCamera.Constants.FlashMode.on}
                  captureAudio={true}
                 // Ensure audio is captured
                />
                <TouchableOpacity
                  onPress={toggleRecording}
                  style={{ padding: 20, backgroundColor: "red" }}
                >
                  <Text style={{ color: "white" }}>
                    {recording ? "Stop Recording" : "Start Recording"}
                  </Text>
                </TouchableOpacity> */}

                {/* {recording && ( */}
                <>
                  <TouchableOpacity
                    style={[
                      styles.recordButton,
                      {
                        backgroundColor: "#2E2E2E",
                        marginVertical: hp(2),
                        marginTop: hp(6),
                      },
                    ]}
                    // onPress={() =>
                    // setRecordVideoReviewModal(!recordVideoReviewModal)
                    // navigation.navigate('VideoRecordScreen')
                    // }
                    onPress={handleRecordVideo}
                    // onPress={() => setVideoVisible(!videoVisible)}
                  >
                    <Text style={styles.textStyle}>Record a Video</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.recordButton]}
                    // onPress={() => setModalVisible(!modalVisible)}
                    onPress={handleDocumentUpload1}
                  >
                    <Text style={styles.textStyle}>Upload Video</Text>
                  </TouchableOpacity>
                </>

                <VideoRecordScreen
                  videoVisible={videoVisible}
                  onClose={() => setVideoVisible(false)}
                />

                <RecordVideoReviewModal
                  recordVideoReviewVisible={recordVideoReviewModal}
                  data={uploadVideo}
                  onRecordVideoModalClose={() =>
                    setRecordVideoReviewModal(false)
                  }
                  // uploadVideo= {recordVideoReviewModal ? uploadVideo : ''}
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
    fontSize: hp(1.8),
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
    fontWeight: "600",
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

export default RecordVideoModal;
