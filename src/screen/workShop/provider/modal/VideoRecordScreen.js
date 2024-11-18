// import React, { useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   Pressable,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// // rn camera
// import { RNCamera } from "react-native-camera";
// import RecordVideoReviewModal from "./RecordVideoReviewModal";

// const VideoRecordScreen = ({ videoVisible, onClose }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [recordVideoReviewModal, setRecordVideoReviewModal] = useState(false);

//   // const [modalVisible, setModalVisible] = useState(false);

//   const cameraRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [uriData, setUriData] = useState("");
//   console.log("urifataaaa", uriData);

//   const toggleRecording = async () => {
//     if (recording) {
//       setRecording(false);
//       try {
//         const data = await cameraRef.current.stopRecording();
//         console.log("uri dataaass:", data); // Simplified log statement
//         setUriData(data?.uri);
//         onClose();
//         setRecordVideoReviewModal(true);
//       } catch (error) {
//         console.log("Error stopping recording:", error);
//       }
//     } else {
//       setRecording(true);
//       try {
//         const uriData = await cameraRef.current.recordAsync();
//         setUriData(uriData.uri);
//         onClose();
//         setRecordVideoReviewModal(true);
//         // onClose();
//         console.log("Recording started");
//       } catch (error) {
//         console.log("Error starting recording:", error);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={videoVisible}
//         onRequestClose={onClose}
//       >
//         {/* <Pressable
//           style={styles.obeverlay}
//           onPress={onClose} // This ensures that the modal closes when the user presses outside the modal
//         > */}
//         <View style={styles.centeredView}>
//           <Pressable
//             style={styles.modalView} // This ensures that pressing inside the modal won't close it
//             onPress={() => {}}
//           >
//             <View style={{ backgroundColor: "#000" }}>
//               {/* <RecordVideoReviewModal
//                 recordVideoReviewVisible={recordVideoReviewModal}
//                 onRecordVideoModalClose={() => setRecordVideoReviewModal(false)}
//                 uriData={uriData}
//               /> */}
//               {/* Conditionally render the RecordVideoReviewModal only if uriData is available */}
//               {/* {recordVideoReviewModal && uriData && ( */}
//               <RecordVideoReviewModal
//                 recordVideoReviewVisible={recordVideoReviewModal}
//                 data={uriData}
//                 onRecordVideoModalClose={() => {
//                   setRecordVideoReviewModal(false);
//                 }}
//                 // Passing the recorded video URI to the modal
//               />
//               {/* )} */}

//               {/* {recordVideoReviewModal && uriData && (
//                 <RecordVideoReviewModal
//                   recordVideoReviewVisible={recordVideoReviewModal}
//                   onRecordVideoModalClose={() =>
//                     setRecordVideoReviewModal(false)
//                   }
//                   uriData={uriData} // Pass the recorded video URI to the modal
//                 />
//               )} */}
//             </View>
//             <View style={styles.modalView}>
//               <RNCamera
//                 ref={cameraRef}
//                 style={{ flex: 1, backgroundColor: "#fff" }}
//                 type={RNCamera.Constants.Type.back}
//                 flashMode={RNCamera.Constants.FlashMode.on}
//                 captureAudio={true} // Ensure audio is captured
//               />
//               <TouchableOpacity
//                 onPress={toggleRecording}
//                 style={{
//                   backgroundColor: "red",
//                   padding: 15,
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Text style={{ color: "white" }}>
//                   {recording ? "Stop Recording" : "Start Recording"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </Pressable>
//         </View>
//         {/* </Pressable> */}
//         {/* </View> */}
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'flex-end',
//     // backgroundColor:'rgbe(0.)'
//   },
//   obeverlay: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,.5)",
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   modalView: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: wp(4),
//     borderTopRightRadius: wp(4),
//     width: "100%",
//     flex: 1,
//     // height: hp(78),
//     // Adjust this height to control how much space the modal takes up from the bottom
//   },
//   recordButton: {
//     height: hp(6),
//     marginHorizontal: wp(4),
//     backgroundColor: "#D73871",
//     borderRadius: wp(8),
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     // marginVertical: hp(4),
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "600",
//     textAlign: "center",
//     fontSize: hp(1.8),
//     marginLeft: wp(2),
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   //

//   wouldText: {
//     fontSize: wp(5),
//     color: "#000",
//     fontWeight: "700",
//     fontFamily: "Poppins-SemiBold",
//     alignSelf: "center",
//     marginHorizontal: wp(3.2),
//   },

//   ToshareText: {
//     fontSize: wp(3.8),
//     color: "#717C86",
//     fontWeight: "400",
//     fontFamily: "Poppins-Regular",
//     alignSelf: "center",
//     marginHorizontal: wp(10),
//     textAlign: "center",
//     // width: wp(90),
//     marginBottom: hp(6),
//     marginTop: hp(2),
//   },
//   questionText: {
//     fontSize: wp(4.1),
//     color: "#000",
//     fontWeight: "600",
//     fontFamily: "Poppins-Medium",
//     marginLeft: wp(2.9),
//   },

//   whatText: {
//     fontSize: wp(4.1),
//     color: "#717C86",
//     fontWeight: "600",
//     fontFamily: "Poppins-Medium",
//     marginLeft: wp(2),
//   },

//   questionBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: wp(4),
//     marginTop: wp(4),
//   },
//   dotBox: {
//     height: hp(0.6),
//     aspectRatio: 1 / 1,
//     backgroundColor: "#717C86",
//     borderRadius: wp(4),
//   },
// });

// export default VideoRecordScreen;

import React, { useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";
import RecordVideoReviewModal from "./RecordVideoReviewModal";

const VideoRecordScreen = ({ videoVisible, onClose }) => {
  const [recordVideoReviewModal, setRecordVideoReviewModal] = useState(false);
  const [uriData, setUriData] = useState("");
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef(null);

  const startRecording = async () => {
    setRecording(true);
    try {
      const data = await cameraRef.current.recordAsync();
      setUriData(data.uri); // Store the recorded video URI
      setRecording(false);
      closeVideoRecordAndOpenReview();
    } catch (error) {
      console.log("Error starting recording:", error);
      setRecording(false);
    }
  };

  const stopRecording = async () => {
    setRecording(false);
    try {
      const data = await cameraRef.current.stopRecording();
      setUriData(data?.uri); // Store the recorded video URI
      closeVideoRecordAndOpenReview();
    } catch (error) {
      console.log("Error stopping recording:", error);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // This ensures that the VideoRecordScreen modal closes and the review modal opens after recording
  const closeVideoRecordAndOpenReview = () => {
    onClose(); // Close the video recording modal
    setTimeout(() => {
      setRecordVideoReviewModal(true); // Open the review modal
    }, 500); // Delay slightly to allow modal close animation to finish
  };

  return (
    <View style={styles.container}>
      {/* Video Recording Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={videoVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RNCamera
              ref={cameraRef}
              style={styles.camera}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              captureAudio={true}
            />
            <TouchableOpacity
              onPress={toggleRecording}
              // style={styles.recordButton}
              style={{
                backgroundColor: "red",
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                {recording ? "Stop Recording" : "Start Recording"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Video Review Modal */}
      {recordVideoReviewModal && uriData && (
        <RecordVideoReviewModal
          recordVideoReviewVisible={recordVideoReviewModal}
          data={uriData}
          onRecordVideoModalClose={() => setRecordVideoReviewModal(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
    backgroundColor: "#fff",
  },
  recordButton: {
    backgroundColor: "red",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: "40%",
    right: "40%",
  },
});

export default VideoRecordScreen;
