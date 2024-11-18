import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import AppColors from "../../utils/AppColors";
import { connectWithContext } from "../../container";
import AppUtils from "../../utils/AppUtils";
import ActivityIndicatorView from "../../widgets/ActivityIndicatorView";
import EcommerceHomeContextProvider, {
  EcommerceHomeContextConsumer,
} from "../../context/EcommerceHomeContext";
import TopBarEcommerce from "../../widgets/TopBarEcommerce";
import NoDataFoundView from "../../widgets/NoDataFoundView";
import TextViewNormal from "../../widgets/TextViewNormal";
import TextViewBold from "../../widgets/TextViewBold";
import { Card } from "react-native-elements/dist/card/Card";
import BookingStatusCode from "../../utils/BookingStatusCode";
import DealsContextProvider, {
  DealsContextConsumer,
} from "../../context/DealsContext";
import FastImageView from "../../widgets/FastImageView";
import FastImage from "react-native-fast-image";
class DealsOrderHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
    };
  }

  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        let data = {
          order_type: "deal",
        };
        this.props.orderHistoryProps.getEComOrderHistoryList(data);
      }
    );
  }

  componentWillUnmount() {
    // this.didFocusSubscription.remove();
  }

  async componentDidUpdate(prevs, prevState, snapshot) {
    if (
      prevs.orderHistoryProps.loadingOrderHistory !==
        this.props.orderHistoryProps.loadingOrderHistory &&
      !this.props.orderHistoryProps.loadingOrderHistory
    ) {
      let response = this.props.orderHistoryProps.orderHistoryListResponse;
      console.log(`orderHistoryList : ${JSON.stringify(response)}`);
      if (response.statusCode == 200) {
        await this.setState({
          orderList: this.props.orderHistoryProps.orderHistoryListResponse.data,
        });
      }
    }
  }

  render() {
    const { orderList } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <TopBarEcommerce
          screenTitle={"Order History"}
          onPressBack={() => {
            this.props.navigation.navigate("NewHome");
          }}
          visibleFav={false}
          visibleCart={false}
          visibleSearch={false}
        />

        <FlatList
          ListFooterComponent={() => {
            return (
              <ActivityIndicatorView
                loading={this.props.orderHistoryProps.loadingOrderHistory}
              />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View>
                {AppUtils.isEmpty(orderList) &&
                !this.props.orderHistoryProps.loadingOrderHistory ? (
                  <NoDataFoundView />
                ) : null}
              </View>
            );
          }}
          style={{ width: AppUtils.getDeviceWidth() }}
          data={orderList}
          keyExtractor={({ item, index }) => "" + index}
          renderItem={({ item, index }) => {
            let status = item.order_status.toString().toLowerCase();

            let color = AppColors.primaryColor;

            let ecom = BookingStatusCode.EcommerceStatus;

            if (ecom.CONFIRM.title == status) {
              color = ecom.CONFIRM.color;
            } else if (ecom.SHIPPED.title == status) {
              color = ecom.CONFIRM.color;
            } else if (ecom.DELIVERED.title == status) {
              color = ecom.CONFIRM.color;
            } else if (ecom.CANCELLED.title == status) {
              color = ecom.CONFIRM.color;
            }

            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("DealsOrderDetailsScreen", {
                    order_id: item.order_id,
                  });
                }}
              >
                <Card
                  containerStyle={{
                    shadowColor: "#0000001A",
                    borderRadius: 3,
                    backgroundColor: AppColors.colorWhite,
                    borderColor: AppColors.primaryColor,
                    borderWidth: 0.5,
                    padding: 10,
                    margin: 7,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FastImageView
                      imageStyle={{
                        width: 90,
                        height: 90,
                        marginRight: 10,
                        borderColor: AppColors.colorGrayLight,
                        borderWidth: 1,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      image={item.product_image}
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row", flex: 1 }}>
                        <TextViewNormal
                          textStyle={{ fontSize: 13 }}
                          text={item.title}
                        />
                      </View>

                      <TextViewNormal
                        visible={!AppUtils.isNull(item.order_items_count)}
                        textStyle={{ fontSize: 12, color: AppColors.colorGray }}
                        text={item.order_items_count}
                      />

                      <TextViewNormal
                        textStyle={{
                          fontSize: 12,
                          marginBottom: 3,
                          color: AppColors.colorGray,
                        }}
                        numberOfLines={1}
                        text={`${item.order_date}`}
                      />

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextViewBold
                          textStyle={{ fontSize: 13 }}
                          numberOfLines={1}
                          text={AppUtils.addCurrencySymbole(item.order_total)}
                        />

                        <TextViewNormal
                          textStyle={{ fontSize: 13, color: color }}
                          numberOfLines={1}
                          text={status}
                        />
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
const CheckoutScreenElement = connectWithContext(DealsContextProvider)({
  orderHistoryProps: DealsContextConsumer,
})(DealsOrderHistoryScreen);

export default CheckoutScreenElement;
