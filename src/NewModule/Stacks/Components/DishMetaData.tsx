import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { width } from "../utils/Dimensions";
interface Props {
  title: string;
  value: string;
}
export default function DishMetaData(props: Props) {
  return (
    <View style={style.container}>
      <Text style={style.titleStyle}>{props.title}</Text>
      <Text style={style.valueStyle}>{props.value}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    marginHorizontal:10
  },
  titleStyle: {
    color: "grey",
    fontSize: width * 0.035,
  },
  valueStyle: {
    fontSize: width * 0.035,
  },
});
