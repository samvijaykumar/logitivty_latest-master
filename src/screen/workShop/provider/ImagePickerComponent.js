/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Modal,
    Platform,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import {RNCamera} from 'react-native-camera';
  import DocumentPicker from 'react-native-document-picker';
  import RNFS from 'react-native-fs';
  import ImageResizer from '@bam.tech/react-native-image-resizer';
  import {useSafeAreaInsets} from 'react-native-safe-area-context';
  //ICONS
  // import ic_switch_camera from './switch-camera.png';
  import {Icon} from '@rneui/themed';
  import {PERMISSIONS, request} from 'react-native-permissions';
  import {StatusBar} from 'expo-status-bar';

  // vector icon
  import Icon1 from "react-native-vector-icons/Feather";
  import Icon2 from "react-native-vector-icons/FontAwesome";
import Cameragallery from './Cameragallery';

  
  const CameraScreen = ({setShowCamera, showCamera, handleResizing}) => {
    const inset = useSafeAreaInsets();
    const cameraRef = useRef(null);
    const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
    const switchCameraType = () => {
      setCameraType(prevType =>
        prevType === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back,
      );
    };
    const takePicture = async () => {
      if (cameraRef.current) {
        try {
          const options = {quality: 0.2, base64: true};
          const data = await cameraRef.current.takePictureAsync(options);
          setShowCamera(false);
          handleResizing(data);
          // Here, you can do whatever you want with the captured picture data.
        } catch (error) {
          console.log('Error taking picture:', error);
        }
      }
    };
    return (
      <Modal visible={showCamera} onRequestClose={() => setShowCamera(false)}>
        <StatusBar style="auto" backgroundColor="#000" />
        <View
          style={[
            cameraStyles.captureButtonContainer,
            {
              paddingTop: inset.top,
              flex: 0.3,
              justifyContent: 'flex-start',
            },
          ]}>
          <TouchableOpacity
            style={{marginHorizontal: wp(4)}}
            onPress={() => setShowCamera(false)}>
            <Icon
              raised
              type="material-icons"
              name="arrow-back-ios"
              size={12}
              iconStyle={{
                fontSize: wp(6),
                marginHorizontal: 6,
              }}
              containerStyle={{margin: 0}}
            />
          </TouchableOpacity>
        </View>
        <RNCamera
          pictureSize="322x332"
          ref={cameraRef}
          style={{
            flex: 4.5,
          }}
          type={cameraType}
          flashMode={RNCamera.Constants.FlashMode.auto}
          captureAudio={false}></RNCamera>
        <View style={cameraStyles.captureButtonContainer}>
          <TouchableOpacity
            onPress={takePicture}
            style={cameraStyles.camButton}
          />
          <TouchableOpacity
            style={{alignSelf: 'center', right: wp(15), position: 'absolute'}}
            onPress={switchCameraType}>
            {/* <Image source={ic_switch_camera } style={{width: 30, height: 30}} /> */}
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  const cameraStyles = StyleSheet.create({
    captureButtonContainer: {
      flex: 1,
      // backgroundColor: 'transparent',
      backgroundColor: '#000',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    camButton: {
      height: 70,
      width: 70,
      borderRadius: 40,
      backgroundColor: '#fff',
      borderWidth: 4,
      borderColor: '#b2beb5',
    },
  });
  //###############################################
  const ImagePickerComponent = ({
    isVisible,
    setIsVisible,
    handleDone,
    navigation,
  }) => {
    const [showCamera, setShowCamera] = useState(false);
    const handleModal = () => setIsVisible(!isVisible);
    const handleCamera = async () => {
      setIsVisible(false);
      setShowCamera(true);
    };
    const readAndConvertToBase64 = async uri => {
      try {
        const imageData = await RNFS.readFile(uri, 'base64');
        return imageData;
      } catch (error) {
        console.error('Error reading and converting to base64:', error);
      }
    };
    const handleLibrary = async () => {
      if (Platform.OS === 'ios') {
        // const cameraStatus = await PermissionsIOS.check('camera');
        // const photoLibraryStatus = await PermissionsIOS.('photo');
        const photoLibraryPermissionStatus = await request(
          PERMISSIONS.IOS.PHOTO_LIBRARY,
        );
  
        if (
          photoLibraryPermissionStatus === 'granted' ||
          photoLibraryPermissionStatus === 'limited'
        ) {
          try {
            const result = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });
            // console.log(result);
            const data = result[0];
            const base64 = await readAndConvertToBase64(data.uri);
            // console.log('pic', {result, base64});
            handleResizing({...data, base64});
            setIsVisible(false);
          } catch (err) {
            setIsVisible(false);
            if (DocumentPicker.isCancel(err)) {
              console.log('User cancelled document picker');
            } else {
              console.error('Error while picking a document:', err);
            }
          }
        } else {
          console.log('photo library access not authorized.');
        }
      } else {
        setIsVisible(false);
        try {
          const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
          });
          // console.log(result);
          const data = result[0];
          const base64 = await readAndConvertToBase64(data.uri);
          handleResizing({...data, base64});
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled document picker');
          } else {
            console.error('Error while picking a document:', err);
          }
        }
      }
    };
    const handleResizing = picData => {
      const newWidth = 322;
      const newHeight = 332;
      const uri = picData.uri;
      // const uri = `data:image/jpeg;base64,${picData.base64}`;
      console.log('base64', picData);
      ImageResizer.createResizedImage(
        uri,
        newWidth,
        newHeight,
        'JPEG',
        20,
        0,
        null,
        true,
        {mode: 'stretch', onlyScaleDown: true},
      )
        .then(resized => {
          // console.log('resized==>>', resized);
          handleDone({
            name: resized.name,
            type: 'image/jpeg',
            uri: resized.uri,
            base64: `data:image/jpeg;base64,${picData.base64}`,
          });
  
          // handleDone({
          //   fileName: resized.name,
          //   mimeType: 'image/jpeg',
          //   pathName: resized.uri,
          //   base64: `data:image/jpeg;base64,${picData.base64}`,
          // });
        })
        .catch(error => console.log(error));
    };
    return showCamera ? (
      <CameraScreen
        setShowCamera={setShowCamera}
        showCamera={showCamera}
        handleResizing={handleResizing}
      />
    ) : (
      <Cameragallery
        Camerapopen={handleCamera}
        Galleryopen={handleLibrary}
        onRequestClose={setIsVisible}
        visible={isVisible}
      />
    );
  };
  export default ImagePickerComponent;
  const styles = StyleSheet.create({
    modal: {
      width: wp(120),
      left: -18,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      flex: 1,
      maxHeight: 100,
      backgroundColor: '#c1c1c1',
      bottom: -20,
      flexDirection: 'row',
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: wp(7),
    },
    iconContainer: {
      borderRadius: 50,
      borderWidth: 0.5,
      borderColor: '#fff',
      padding: 13,
    },
    icon: {
      width: 25,
      height: 25,
    },
    text: {color: '#000080'},
  });