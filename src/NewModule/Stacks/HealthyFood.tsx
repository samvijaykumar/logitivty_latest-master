import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useCallback, useEffect } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import ListItem from "./Components/ListItem";
import CategoryTile from "./Components/CategoryTile";
import { Dropdown } from "react-native-element-dropdown";
import { dropdownData } from "./Components/ProfileItem";
import HealthyFoodApi from "../NetworkCalls/HealthyFoodApi";
import { CuisineItem } from "../Modal/CuisineItem";
import { FoodItem } from "../Modal/FoodItem";
import { height } from "./utils/Dimensions";
import Loader from "./Components/Loader";
import { useIsFocused } from "@react-navigation/native";

export default function HealthyFood(props: StackScreenProps<any>) {
  const { navigation, route } = props;

  const isFocused = useIsFocused();
  const [category, setCategory] = React.useState<string[]>(["All"]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [cuisines, setCuisine] = React.useState<CuisineItem[]>([]);
  const [foodList, setFoodList] = React.useState<FoodItem[]>([]);
  const [selectedFoodType, setSelectedFoodType] = React.useState<
    CuisineItem | undefined
  >();
  const [selectedCategory, setSelectedCategory] = React.useState<
    number | undefined
  >(0);

  const FoodItem: ListRenderItem<FoodItem> = useCallback<
    ListRenderItem<FoodItem>
  >(({ item, index }) => {
    return (
      <TouchableOpacity style={{height:140}}
        onPress={() =>
          props.navigation.navigate("FoodDetail", {
            item: item,
          })
        }
      >
        <ListItem
          isBookmark={item.is_bookmarked}
          onPressFav={() => {
            addBookmark(item, index);
          }}
          item={item}
        />
      </TouchableOpacity>
    );
  }, []);

  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await HealthyFoodApi.shared.getFoodCategory();
      if (response.status == 200) {
        let jsonArray = response.data as string[];
        const mergedArray = [...category, ...jsonArray];
        setCategory(mergedArray);
      } else {
        Alert.alert("Error", `${response.message}`);
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getCuisineType = async () => {
    setLoading(true);
    try {
      const response = await HealthyFoodApi.shared.getCuisineType();
      if (response.status == 200) {
        let jsonArray = response.data as CuisineItem[];

        setCuisine(jsonArray);
      } else {
        Alert.alert("Error", `${response.message}`);
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
    } finally {
      setLoading(false);
    }
  };
  const addBookmark = async (food: FoodItem, index: number) => {
    setLoading(true);
    try {
      const response = await HealthyFoodApi.shared.addFoodToBokkmark({
        foodId: food.id,
      });
      if (response.status == 200) {
        setFoodList((previousList) => {
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
      setLoading(false);
    }
  };

  const getFoodList = async (params?: {
    food_categoty?: string;
    ciusine_type_id?: number;
    search?: string;
  }) => {
    setLoading(true);
    try {
      const response = await HealthyFoodApi.shared.getFoodList(params);
      if (response.status == 200) {
        let jsonArray = response.data as FoodItem[];

        setFoodList(jsonArray);
        // setCuisine(jsonArray);
      } else {
        Alert.alert("Error", `${response.message}`);
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
    getCuisineType();
  }, [0]);

  useEffect(() => {
    getFoodList({
      food_categoty: category[selectedCategory ?? 0],
      ciusine_type_id: selectedFoodType?.id ?? 0,
    });
  }, [selectedCategory, selectedFoodType, isFocused]);
  return (
    <View style={style.mainView}>
      <TextInput
        returnKeyType="search"
        onSubmitEditing={(val) => {
          console.log(val.nativeEvent.text);
          getFoodList({
            food_categoty: category[selectedCategory ?? 0],
            ciusine_type_id: selectedFoodType?.id ?? 0,
            search: val.nativeEvent.text,
          });
        }}
        onChangeText={(value) => {
          if (!value) {
            getFoodList({
              food_categoty: category[selectedCategory ?? 0],
              ciusine_type_id: selectedFoodType?.id ?? 0,
            });
          }
        }}
        style={style.textInput}
        placeholder="Search your favourite food..."
      />

      <View style={style.category}>
        <FlatList
          data={category}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <CategoryTile
                isSelected={selectedCategory == index}
                onPress={() => setSelectedCategory(index)}
                item={item}
                key={index}
              />
            );
          }}
        />
      </View>

      <Dropdown
        style={style.dropDownStyle}
        placeholder="All Cuisine"
        valueField={"id"}
        onChange={(value) => setSelectedFoodType(value)}
        data={cuisines}
        value={selectedFoodType}
        labelField={"cuisine_name"}
      />
 
  <FlatList numColumns={1} data={foodList} renderItem={FoodItem} />

     
      <Loader isLoading={isLoading} />
    </View>
  );
}

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    // alignItems: "flex-start",
    flexDirection: "column",

    backgroundColor: "white",
  },
  category: {
    flexDirection: "row",
    height: height * 0.07,
    alignItems: "center",

    marginBottom: 15,
  },
  dropDownStyle: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,

    backgroundColor: "white",
    paddingHorizontal: 10,
    borderColor: "grey",
    height: 40,
    marginBottom: 10,
  },

  textInput: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    borderColor: "grey",
    marginTop: 30,
  },
});
