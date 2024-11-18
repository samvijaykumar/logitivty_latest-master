import React from 'react';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AppUtils from '../utils/AppUtils';
import ResourceUtils from '../utils/ResourceUtils';
import ActivityIndicatorView from './ActivityIndicatorView';
import ProgressDialog from './ProgressDialog';

export default FlowWrapView = (props) => {
  const {
    children,
    containerStyle = {},
    viewStyle = {},
    showLoaderDialog = false,
    showLoader = false,
    useScroll = true,
  } = props;
  return (
    <KeyboardAvoidingView
      style={[styles.containerStyle, containerStyle]}
      behavior={AppUtils.isIOS() ? 'padding' : 'height'}
      enabled
    >
      {useScroll ? (
        <ScrollView
          nestedScrollEnabled
          style={styles.containerStyle}
          contentContainerStyle={styles.contentStyle}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
            accessible={false}
          >
            <View style={[styles.viewStyle, viewStyle]}>
              {showLoader ? (
                <ActivityIndicatorView
                  loading={true}
                  containerStyle={{ flex: 1 }}
                  title={'Please wait...'}
                />
              ) : (
                children
              )}

              <ProgressDialog visible={showLoaderDialog} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      ) : (
        <View style={[styles.viewStyle, viewStyle]}>
          {showLoader ? (
            <ActivityIndicatorView
              loading={true}
              containerStyle={{ flex: 1 }}
              title={'Please wait...'}
            />
          ) : (
            children
          )}

          <ProgressDialog visible={showLoaderDialog} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    width: '100%',
  },
  contentStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  viewStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
});
