import React, { Component } from "react";
import { View, SafeAreaView, ImageBackground, Text } from "react-native";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import TextViewMedium from "./TextViewMedium";
import TouchableImageView from "./TouchableImageView";
import AppStatusBar from "./AppStatusBar";
import UserSession from "../utils/UserSession";
import { TouchableOpacity } from "react-native";
// import { withNavigation } from '@react-navigation/core';
import { connectWithContext } from "../container";
import EcommerceHomeContextProvider, {
  EcommerceHomeContextConsumer,
} from "../context/EcommerceHomeContext";
import { FadeInLeft } from "react-native-reanimated";

class TopBarEcommerce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
    };
  }

  async componentDidMount() {
  
    // this.didFocusSubscription = this.props.navigation.addListener(
    //   'focus',
    //   () => {
    //     setTimeout(() => {
    //       this.getCount();
    //       console.log(`------ timer running -------`);
    //     }, 1000);
    //   }
    // );
    
    
    /*
  let user = await UserSession.getUserSessionData()
        let cartCountt = await UserSession.getCartCount()
        this.setState({ cartCount: cartCountt })
        console.log('user data: ' + JSON.stringify(user))
        */

    this.getCount();
  }

  async getCount() {
    let cartCountt = await UserSession.getCartCount();
    console.log("cartCount: " + cartCountt);
    this.setState({ cartCount: cartCountt });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.updatedAt !== this.props.updatedAt) {
      let cartCountt = await UserSession.getCartCount();
      console.log("cartCount: " + cartCountt);
      this.setState({ cartCount: cartCountt });
    }
  }
  onSearch = () => {
    this.props.onPressSearchIcon && this.props.onPressSearchIcon();
  };

  onFavourite = () => {
    this.props.onPressFavourite && this.props.onPressFavourite();
  };

  onBack = () => {
    this.props.onPressBack && this.props.onPressBack();
  };
  onCart = () => {
    this.props.onPressCart && this.props.onPressCart();
  };

  render() {
    const {
      screenTitle = "",
      visibleBack = true,
      onPressSearchIcon,
      onPressFavourite,
      onPressBack,
      searchIcon = ResourceUtils.images.ic_search,
      showRightIcon = true,
      backgroundColor = AppColors.primaryColor,
      visibleImage = false,
      visibleFav = true,
      visibleCart = true,
      visibleSearch = true,
      onPressCart,
      updatedAt = 0,
    } = this.props;

    //let name = this.props.screenTitle.indexOf(' ') > -1 ? this.props.screenTitle.split(' ')[0] : this.props.screenTitle
    let name = this.props.screenTitle;
    const { cartCount } = this.state;
    // alert(cartCount)
    let finalName =
      name.length < 22 ? `${name}` : `${name.substring(0, 20)}...`;
    return (
      <SafeAreaView>
        <AppStatusBar />
        <View
          style={{
            elevation: 2,
            flexDirection: "row",
            width: "100%",
            height: 54,
            alignItems: "center",
            // backgroundColor: backgroundColor,
              backgroundColor:"#f2f0ef"
          }}
        >
          {visibleImage ? (
            <ImageBackground
              style={{ height: "100%", width: "100%", position: "absolute" }}
              source={ResourceUtils.images.top_header_bg}
            />
          ) : null}

          <TouchableImageView
            onPress={this.onBack}
            imageStyle={{
              marginStart: 10,
              marginEnd: 20,
              width: 20,
              height: "100%",
              left:15,
              transform: [{ rotate: "180deg" }],
              tintColor: '#D83772',
            
            }}
            image={ResourceUtils.images.arrow_left}
          />
          {/* <View style={{ width: visibleSearch && visibleFav && visibleCart ? '50%' : visibleFav || visibleCart ? '60%' : '70%' }}> */}
          <View style={{ flex: 1 }}>
            <TextViewMedium
              textStyle={{
                color: "black",
                fontSize: 16,
                marginEnd: 10,
                textAlign: "center",
              }}
              numberOfLines={1}
              text={finalName}
            />
          </View>
          {visibleSearch ? (
            <TouchableImageView
              image={searchIcon}
              onPress={this.onSearch}
              imageStyle={{ width: 26, height: 40, marginEnd: 10 }}
            />
          ) : (
            <TouchableImageView
              image={""}
              imageStyle={{ width: 26, height: 40, marginEnd: 10 }}
            />
          )}
          {visibleFav ? (
            <TouchableImageView
              onPress={this.onFavourite}
              imageStyle={{ marginStart: 10, width: 24, height: "100%" }}
              image={ResourceUtils.images.ic_favorite_border}
            />
          ) : null}
          {/* {
                    visibleCart ?

                        <View>
                            <TouchableImageView
                                onPress={this.onCart}
                                imageStyle={{ marginStart: 10, width: 24, height: '100%' }}
                                image={ResourceUtils.images.ic_shopping_cart} />
                        </View>
                        : null
                } */}
          {visibleCart ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity onPress={this.onCart}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableImageView
                    onPress={this.onCart}
                    imageStyle={{ marginStart: 10, width: 24, height: "100%" }}
                    image={ResourceUtils.images.ic_shopping_cart}
                  />
                  {cartCount > 0 ? (
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: "white",
                        width: 13,
                        height: 13,
                        borderRadius: 13 / 2,
                        right: 10,
                        top: +10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#D83772",
                          fontSize: 8,
                        }}
                      >
                        {cartCount}
                      </Text>
                    </View>
                  ) : null}
                  <View></View>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

// const CartScreenElement = connectWithContext(EcommerceHomeContextProvider)({
//     cartProps: EcommerceHomeContextConsumer
// })(TopBarEcommerce);

export default TopBarEcommerce;
