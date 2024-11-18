import React from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// svg
import ReviewSuccessSvgImg from '../provider/svg/ReviewSuccessSvgImg';
import { useNavigation } from '@react-navigation/native';

const ReviewSendSuccessFully = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#F3F4F6'}/>
      {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> */}
        <ReviewSuccessSvgImg />
        <Text style={styles.yourText}>
          Your Review has {`\n`}
          been sent Successfully
        </Text>
        <Text
          style={[
            styles.yourText,
            {
              fontWeight: '400',
              fontSize: hp(2.1),
              fontFamily: 'Poppins-Regular',
              marginTop: hp(1),
            },
          ]}>
          Thank you for sharing your Review
        </Text>
      {/* </View> */}
      <TouchableOpacity style={styles.backToWorkShopbox} onPress={() => navigation.navigate('UpCommingWorkShop')}>
        <Text style={styles.backButtonText}>Back To Workshop</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ReviewSendSuccessFully;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F3F4F6',
    alignItems:'center',
    justifyContent:'center'

  },
  yourText: {
    fontSize: hp(3.1),
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  backToWorkShopbox: {
    backgroundColor: '#D73871',
    borderRadius: wp(8),
    height: hp(6),
    marginTop: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    width:wp(90),
  },

  backButtonText: {
    fontSize: wp(4.1),
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
});
