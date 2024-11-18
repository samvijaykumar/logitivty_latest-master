import React, { Component } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import ButtonView from './ButtonView';
import AppColors from '../utils/AppColors';
import ResourceUtils from '../utils/ResourceUtils';
import TextViewNormal from './TextViewNormal';
import AppUtils from '../utils/AppUtils';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';


class PriceInfoDialog extends Component {

  handleDialog = () => {
    this.setState({ visible: false });
    this.props.onOptionCloseClick && this.props.onOptionCloseClick();
  }

  render() {
    const { visible, itemDetails } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
        }}>
        <View style={styles.container}>
          <View style={styles.wrapper}>

            <View
              style={{
                flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 10,
                justifyContent: 'space-between', alignItems: 'center'
              }}
            >

              <TextViewMedium
                text={'price breakdown'}
                textStyle={{
                  textAlign: 'left',
                  fontSize: 16,
                  color: '#000000',
                }}
              />
              <TouchableOpacity
                activeOpacity={0.2}
                onPress={() => {
                  this.handleDialog(itemDetails);


                }}
              >
                <Image style={{ width: 18, height: 18, marginRight: 8, borderRadius: 18 / 2 }} resizeMode={'center'}
                  source={ResourceUtils.images.ic_close_red}
                />
              </TouchableOpacity>

            </View>
            <View
              style={{
                margin: 15,
                borderWidth: 1, borderColor: '#DDDDDD',
              }}
            >

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F8F8F8', height: 40,
                  justifyContent: 'space-between', alignItems: 'center'
                }}
              >

                <TextViewMedium
                  text={'price'}
                  textStyle={{
                    textAlign: 'left',
                    fontSize: 14, marginLeft: 10,
                    color: '#000000',
                  }}
                />
                <TextViewMedium
                  text={'quantity'}
                  textStyle={{
                    textAlign: 'left',
                    fontSize: 14,
                    color: '#000000',
                  }}
                />
                <TextViewMedium
                  text={'total'}
                  textStyle={{
                    textAlign: 'right',
                    fontSize: 14, marginRight: 10,
                    color: '#000000',
                  }}
                />

              </View>

              <View style={styles.sepraterLineView} />

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10, marginRight: 10, height: 40,
                  justifyContent: 'space-between', alignItems: 'center'
                }}
              >

                <View style={{ flex: .4 }}>
                  <TextViewMedium
                    text={`${AppUtils.addCurrencySymbole(itemDetails.quota_rate)} `}
                    textStyle={{
                      textAlign: 'left',
                      fontSize: 14,
                      color: '#666666',
                    }}
                  > </TextViewMedium>
                  <TextViewNormal
                    text={`(zero profit price)`}
                    textStyle={{
                      textAlign: 'left',
                      fontSize: 9,
                      color: '#666666',
                    }}
                  ></TextViewNormal>
                </View>
                <View style={{ flex: .2 }}>
                  <TextViewMedium
                    text={itemDetails.quota_qty}
                    textStyle={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#666666',
                    }}
                  />
                </View>
                <View style={{ flex: .4 }}>
                  <TextViewMedium
                    text={AppUtils.addCurrencySymbole(itemDetails.quota_amount)}
                    textStyle={{
                      textAlign: 'right',
                      fontSize: 14,
                      color: '#D83772',
                    }}
                  />
                </View>
              </View>
              <View style={styles.sepraterLineView} />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10, marginRight: 10, height: 40,
                  justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <View style={{ flex: .4 }}>
                  <TextViewMedium
                    text={`${AppUtils.addCurrencySymbole(itemDetails.mrp_rate)} `}
                    textStyle={{
                      textAlign: 'left',
                      fontSize: 14,
                      color: '#666666',
                    }}
                  > </TextViewMedium>
                  <TextViewNormal
                    text={`(mrp)`}
                    textStyle={{
                      textAlign: 'left',
                      fontSize: 10,
                      color: '#666666',
                    }}
                  ></TextViewNormal>
                </View>
                <View style={{ flex: .2 }}>
                  <TextViewMedium
                    text={itemDetails.mrp_qty}
                    textStyle={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#666666',
                    }}
                  />
                </View>
                <View style={{ flex: .4 }}>
                  <TextViewMedium
                    text={AppUtils.addCurrencySymbole(itemDetails.mrp_amount)}
                    textStyle={{
                      textAlign: 'right',
                      fontSize: 14,
                      color: '#D83772',
                    }}
                  />
                </View>

              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#0C7793', marginTop: 5,
                  height: 35, justifyContent: 'center', alignItems: 'center'
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    alignItems: 'flex-start',
                    justifyContent: 'center', marginLeft: 5

                  }}
                >
                  <TextViewMedium
                    text={'item total'}
                    textStyle={{
                      textAlign: 'left',
                      fontSize: 14,
                      color: '#ffffff',

                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    alignItems: 'flex-end',
                    marginRight: 5
                  }}
                >
                  <TextViewNormal
                    text={AppUtils.addCurrencySymbole(itemDetails.item_total)}
                    textStyle={{
                      textAlign: 'right',
                      fontSize: 14,
                      color: '#ffffff',
                    }}
                  />
                </View>
              </View>

            </View>


          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    flex: 1,
    alignItems: "center"
  },
  wrapper: {
    borderRadius: 10,
    width: "90%",
    backgroundColor: AppColors.colorWhite,

    // borderColor: AppColors.colorGray,
    // borderWidth: 2,
    padding: 16
  },
  sepraterLineView: {
    width: '100%',
    marginTop: 1,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    height: 1,
    alignSelf: "center",
    backgroundColor: AppColors.sepraterLineColor,
  },
});


export default PriceInfoDialog;