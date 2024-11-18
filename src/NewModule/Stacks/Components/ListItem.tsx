import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { width } from "../utils/Dimensions";
import DishMetaData from "./DishMetaData";
import { FoodItem } from "../../Modal/FoodItem";
import NetworkConstants from "../../../network/NetworkConstant";
import AppColors from "../../../utils/AppColors";
interface Props {
  item: FoodItem;
  isBookmark: boolean;
  onPressFav: () => void;
}
export default function ListItem(item: Props) {
  return (
    <View style={styles.main}>
      <Image
        style={styles.image}
        source={{
          uri: `${NetworkConstants.IMAGE_URL}${item.item.food_image}`,
        }}
      />
      <View style={styles.dataView}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.distTitle}numberOfLines={2}>{item.item.dish_name ?? ""}</Text>
          <TouchableOpacity onPress={item.onPressFav}>
            <Image
              source={require("../../../utils/images/love.png")}
              tintColor={
                item.isBookmark
                  ? AppColors.buttonPinkColor
                  : AppColors.colorBlack
              }
              style={{
                height: 20,
                width: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <DishMetaData title="Calories" value={item.item.callery ?? "0"} />
        <DishMetaData title="Carbs" value={item.item.carb ?? "0"} />

        <DishMetaData title="Protien" value={item.item.protein ?? "0"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.35,
    overflow: "hidden",
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
  },
  distTitle: {
    fontSize: width * 0.04,
    fontWeight: "500",
    flex: 1,
  },
  dishSubTitle: {
    marginTop: 5,
    fontSize: width * 0.03,
    fontWeight: "200",
  },
  main: {
    height: width * 0.28,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    flex: 1,
    borderRadius: 15,
    borderColor: "gray",
    margin: 10,
  },
  dataView: {
    flex: 1,
    padding: 10,
    height: width * 0.4,
  },
});
