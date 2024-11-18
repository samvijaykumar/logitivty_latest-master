
import { KeyboardAvoidingView, ScrollView, View, StyleSheet, SafeAreaView, Dimensions } from "react-native"
import React, { Fragment } from "react"
import AppColors from "../utils/AppColors";

export default BaseViewSlider = props => {
  const screenHeight = Dimensions.get('window').height;
  const { children } = props;

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: AppColors.primaryColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.colorWhite, }}>
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} enabled>
          <ScrollView style={styles.scrollViewWH}>
            <View style={styles.container}>
              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollViewWH: {
    width: "100%",
    height: "100%",
    backgroundColor: AppColors.colorWhite,
    // minHeight: Dimensions.get('window').height
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
    //minHeight: Dimensions.get('window').height
  }

  // scrollViewWH: {
  //   height:'100%',
  //   width: "100%",
  //   backgroundColor: AppColors.white,
  //   minHeight: Dimensions.get('window').height


  // },
  //  container: {
  //       flex: 1,
  //        height:'100%',
  //       backgroundColor: AppColors.white,
  //       minHeight: Dimensions.get('window').height
  //     }
  // container: {
  //   flex:1,
  //   height:'100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: AppColors.white,
  //   minHeight: Dimensions.get('window').height


  // }


});