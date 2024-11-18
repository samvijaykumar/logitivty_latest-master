import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import AppUtils from '../utils/AppUtils';
import ResourceUtils from '../utils/ResourceUtils';

export default TopBackArrow = (props) => {
  let { onPressBack, icon = ResourceUtils.images.back } = props;
  return (
    <TouchableOpacity
      onPress={() => onPressBack && onPressBack()}
      style={{ alignSelf: 'flex-start' }}
    >
      <View
        style={{
          marginLeft: 15,
          marginTop: AppUtils.isIOS() ? 45 : 20,
          alignSelf: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <Image
          source={icon}
          style={{
            width: 25,
            height: 24,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
