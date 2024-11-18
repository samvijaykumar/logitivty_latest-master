import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Linking,
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
import useHardwareBackPress from "../provider/useHardwareBackPress";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// web view
import WebView from "react-native-webview";

// vector icon
import BackIcon from "react-native-vector-icons/Ionicons";

// video player
import VideoPlayer from "react-native-video-player";

const NoteDetailsScreen = (props) => {
  console.log("prodddddddddddddd", props);

  const navigation = useNavigation();
  const [pdfUrl, setPdfUrl] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  console.log("viderqqqqqqqqq", videoUrl);

  const [imageUrl, setImageUrl] = useState("");

  // video player state
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("qqqqqqqqqqqqwwww", props.route.params.not_type);
    setResourceType(props?.route.params.not_type);

    if (props?.route.params.not_type == "pdf") {
      setPdfUrl(props.route.params.resourceName);
    } else if (props.route.params.not_type == "video") {
      setVideoUrl(props?.route.params.resourceName);
    } else {
      setImageUrl(props?.route.params.resourceName);
    }
  }, [props.route.params]);

  // Back handler
  useHardwareBackPress(() => {
    navigation.navigate("ResourcesScreen");
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={{ marginTop: hp(1.5), marginBottom: hp(2) }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <BackIcon
            name="chevron-back-outline"
            size={hp(4)}
            color={"#000"}
            style={{ marginLeft: wp(2) }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: hp(3.1),
            color: "#000",
            fontWeight: "500",
            fontFamily: "Poppins-Medium",
            alignSelf: "center",
            position: "absolute",
          }}
        >
          Notes
        </Text>
      </View>

      <View
        style={[
          styles.homeContainer,
          {
            alignItems:
              resourceType == "image" || resourceType == "video"
                ? "center"
                : "",
            justifyContent:
              resourceType == "image" || resourceType == "video"
                ? "center"
                : "",
          },
        ]}
      >
        {resourceType == "pdf" && (
          <WebView
            source={{
              uri: `https://docs.google.com/gview?embedded=true&url=https://demo.sgvproject.in/longetivity/uploads/resource_note/${pdfUrl}`,
            }}
            startInLoadingState={true}
            style={{
              width: "100%",
              height: "80%",
              borderRadius: 8,
              alignSelf: "center",
              borderWidth: 1,
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
        {resourceType == "image" && (
          <Image
            source={{
              uri: imageUrl
                ? `https://demo.sgvproject.in/longetivity/uploads/resource_note/${imageUrl}`
                : "https://demo.sgvproject.in/longetivity/uploads/workshop/16082312546892211726742303.png",
            }}
            style={{ height: hp(40), width: "100%", resizeMode: "cover" }}
          />
        )}

        {resourceType == "video" && (
          <TouchableOpacity
            style={{
              height: hp(25),
              width: wp(90),
              borderRadius: wp(3),
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={togglePlay}
          >
            {/* Using require for local video */}
            <VideoPlayer
              video={{
                uri: `https://demo.sgvproject.in/longetivity/uploads/resource_note/${videoUrl}`,
              }}
              style={{
                height: hp(25),
                width: wp(94),
                borderRadius: wp(3),
                backgroundColor: "black",
                justifyContent: "center",
                alignSelf: "center",
              }}
              pauseOnPress
              customStyles={{
                wrapper: {},
                video: {
                  backgroundColor: "black",
                },
                controls: {
                  opacity: 1, // Control visibility
                },
                seekBar: {
                  opacity: 1,
                },
              }}
              automaticallyWaitsToMinimizeStalling={true}
              borderRadius={wp(3)}
              paused={isPlaying}
              muted={false} // Set to true if you want to mute
              resizeMode="contain"
              onEnd={() => setIsPlaying(false)}
              onError={(error) => console.log("Video Error:", error)}
              controls={true} // Show default controls
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NoteDetailsScreen;
const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  webView: {
    width: "100%",
    height: "100%",
  },

  homeContainer: {
    flex: 1,
  },
});
