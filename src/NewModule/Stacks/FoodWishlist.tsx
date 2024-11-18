import { View, Text, Alert, FlatList, ListRenderItem } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HealthyFoodApi from "../NetworkCalls/HealthyFoodApi";
import Loader from "./Components/Loader";
import { FoodItem } from "../Modal/FoodItem";
import ListItem from "./Components/ListItem";

export default function FoodWishlist() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [bookMarkFood, setBookmarkFood] = useState<FoodItem[]>([]);

  useEffect(() => {
    getFoodList();
  }, [0]);
  const getFoodList = async () => {
    setIsLoading(true);
    try {
      const response = await HealthyFoodApi.shared.getBookmark();
      if (response.success) {
        const jsonArray = response.data as FoodItem[];
        setBookmarkFood(jsonArray);
      } else {
        Alert.alert("Error", `${response.message}`);
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addBookmark = async (food: FoodItem, index: number) => {
    setIsLoading(true);
    try {
      const response = await HealthyFoodApi.shared.addFoodToBokkmark({
        foodId: food.id,
      });
      if (response.status == 200) {
        setBookmarkFood((previousList) => {
          const newFoodList = [...previousList];
          newFoodList[index] = {
            ...newFoodList[index],
            is_bookmarked:
              newFoodList[index].is_bookmarked !== undefined
                ? !newFoodList[index].is_bookmarked
                : false,
          };

          return newFoodList;
        });
        Alert.alert("Success", `${response.message}`);
      } else {
        Alert.alert("Error", `${response.message}`);
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const FoodItem = useCallback<ListRenderItem<FoodItem>>(({ item, index }) => {
    return (
      <ListItem
        isBookmark={item.is_bookmarked}
        item={item}
        onPressFav={() => {
          addBookmark(item, index);
        }}
      />
    );
  }, []);
  return (
    <View style={{ flex: 1 }}>
      
      <FlatList data={bookMarkFood} renderItem={FoodItem} />
      <Loader isLoading={loading} />
    </View>
  );
}
