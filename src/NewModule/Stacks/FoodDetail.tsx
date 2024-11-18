import {
    View,
    Text,
    Image,
    ImageBackground,
    Linking,
    Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { FoodItem } from "../Modal/FoodItem";
import { ParamListBase } from "@react-navigation/native";

import {
    FoodDetailNavigationProp,
    FoodDetailRouteProp,
    RootStackParamList,
} from "./Components/types";
import Endpoints from "../ApiManager/Endpoints";
import NetworkConstants from "../../network/NetworkConstant";
import { height, width } from "./utils/Dimensions";
import DishMetaData from "./Components/DishMetaData";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Video, { VideoRef } from "react-native-video";
import ResourceUtils from "../../utils/ResourceUtils";
import AppColors from "../../utils/AppColors";
import HealthyFoodApi from "../NetworkCalls/HealthyFoodApi";
import Loader from "./Components/Loader";
import UserSession from "../../utils/UserSession";

type Props = {
    navigation: FoodDetailNavigationProp;
    route: FoodDetailRouteProp;
};
export default function FoodDetail(props: Props) {
    const { route, navigation } = props;
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const item = route.params.item;
    const [isBookmarked, setIsboolmarked] = useState<boolean>(
        item.is_bookmarked
    );
    const videoRef = useRef<VideoRef>(null);

    const addBookmark = async () => {
        setLoading(true);
        try {
            const response = await HealthyFoodApi.shared.addFoodToBokkmark({
                foodId: item.id,
            });
            if (response.status == 200) {
                setIsboolmarked(!isBookmarked);
                Alert.alert("Success", `${response.message}`);
            } else {
                Alert.alert("Error", `${response.message}`);
            }
        } catch (error) {
            Alert.alert("Error", `${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <ImageBackground
                    style={{
                        height: height * 0.35,
                        justifyContent: "flex-end",
                        padding: 15,
                    }}
                    source={{
                        uri: `${NetworkConstants.IMAGE_URL}${item.food_image}`,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: width * 0.05,
                                color: "black",
                                flex: 1,
                                fontWeight: "500",
                                // left:20,
                                top: 80,
                                // justifyContent:'space-around'
                                paddingHorizontal: 8,
                            }}
                        >
                            {item.dish_name}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("FoodWishlist")}
                        >
                            <Image
                                source={require("../../utils/images/love.png")}
                                tintColor={
                                    isBookmarked
                                        ? AppColors.buttonPinkColor
                                        : AppColors.colorWhite
                                }
                                style={{
                                    alignSelf: "flex-end",
                                    height: 25,
                                    width: 25,
                                    top: 80,
                                    tintColor: "black",
                                    right: 8,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View
                    style={{
                        //  padding: 8,
                         paddingLeft: 15, 
                        paddingRight: 15,
                     }}
                >
                    <View
                        style={{
                            height: 40,
                            justifyContent: "center",
                            marginTop: 80,
                        }}
                    >
                        <DishMetaData
                            title="Calories"
                            value={item.callery ?? "0"}
                        />
                    </View>
                    <View style={{ height: 40, justifyContent: "center" }}>
                        <DishMetaData title="Carbs" value={item.carb ?? "0"} />
                    </View>

                    <View style={{ height: 40, justifyContent: "center", }}>
                        <DishMetaData
                            title="Protien"
                            value={item.protein ?? "0"}
                        />
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 14,
                        //   height: 40,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ left:9,top:7}}>See Recepie</Text>
                    <TouchableOpacity
                        onPress={() =>
                            Linking.openURL(`${item.recepie_video_url}`)
                        }
                    >
                        <Image
                            source={require("../../utils//images/Youtube_image.png")}
                            style={{
                                width: 40,
                                height: 25,
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                alignSelf: "flex-end",
                                borderRadius: 10,
                                top:7,
                                marginBottom:8,
                                right:5
                            }}
                        />
                    </TouchableOpacity>
                    {/* <Text
                        onPress={() =>
                            Linking.openURL(`${item.recepie_video_url}`)
                        }
                        style={{
                            textAlign: "right",
                            color: "#551A8B",
                            flex: 1,
                        }}
                    >{`${item.recepie_video_url}`}</Text> */}
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    {item.recepie_video_file && (
                        <Video
                            style={{ height: height * 0.3, width: width - 20 }}
                            ref={videoRef}
                            source={{
                                uri: `${NetworkConstants.IMAGE_URL}${item.recepie_video_file}`,
                            }}
                        />
                    )}
                </View>
                <Loader isLoading={isLoading} />
            </View>
        </ScrollView>
    );
}
