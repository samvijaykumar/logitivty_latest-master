import { RouteProp } from "@react-navigation/native";
import { FoodItem } from "../../Modal/FoodItem";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  FoodDetail: { item: FoodItem };
};
export type FoodDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FoodDetail"
>;
export type FoodDetailRouteProp = RouteProp<RootStackParamList, "FoodDetail">;
