/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
// import colors from '../color';
// import fonts from '../font';
import {StatusBar} from 'expo-status-bar';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class Cameragallery extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          this.props.onRequestClose(false);
        }}>
        <StatusBar style="auto" backgroundColor="#00000030" />

        <View
          style={{flex: 1, backgroundColor: '#00000030', alignItems: 'center'}}>
          <View style={{position: 'absolute', bottom: 10, width: screenWidth}}>
            <View style={{alignSelf: 'center', width: '100%'}}>
              <View
                style={{
                  width: '94%',
                  backgroundColor: 'white',
                  paddingVertical: (screenWidth * 3.6) / 100,
                  alignSelf: 'center',
                  borderTopLeftRadius: (mobileW * 5) / 100,
                  borderTopRightRadius: (mobileW * 5) / 100,
                }}>
                <Text
                  style={{
                    // fontFamily: fonts.roboto_Medium,
                    textAlign: 'center',
                    fontSize: (screenWidth * 4) / 100,
                    color: 'black',
                  }}>
                  Select Option
                </Text>
              </View>
              <View
                style={{
                  width: (mobileW * 94) / 100,
                  height: (mobileW * 0.3) / 100,
                  backgroundColor: 'grey',
                  alignSelf: 'center',
                }}></View>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.9}
                onPress={() => {
                  this.props.Camerapopen();
                }}>
                <View
                  style={{
                    width: '94%',
                    backgroundColor: 'white',
                    paddingVertical: (screenWidth * 3.5) / 100,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      // fontFamily: fonts.roboto_Medium,
                      textAlign: 'center',
                      fontSize: (screenWidth * 4) / 100,
                      color: 'black',
                    }}>
                    Camera
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  height: (mobileW * 0.3) / 100,
                  backgroundColor: '#d9d9d9',
                  alignSelf: 'center',
                }}></View>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.props.Galleryopen();
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    width: '94%',
                    backgroundColor: 'white',
                    paddingVertical: (screenWidth * 3.5) / 100,
                    borderBottomLeftRadius: (mobileW * 5) / 100,
                    borderBottomRightRadius: (mobileW * 5) / 100,
                  }}>
                  <Text
                    style={{
                      // fontFamily: fonts.roboto_Medium,
                      textAlign: 'center',
                      fontSize: (screenWidth * 4) / 100,
                      color: 'black',
                    }}>
                    Gallery
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 15,
                alignSelf: 'center',
                borderRadius: 15,
                backgroundColor:'white',
                width: '94%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.onRequestClose(false);
                }}
                style={{
                  alignSelf: 'center',
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: (screenWidth * 3.5) / 100,
                }}>
                <Text
                  style={{
                    // fontFamily: fonts.roboto_Medium,
                    fontSize: (screenWidth * 4) / 100,
                    color: '#2964e2',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#00000040',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  activityIndicatorWrapper: {
    height: 80,
    width: 90,
    display: 'flex',
    backgroundColor: 'black',
    borderRadius: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
  },
});