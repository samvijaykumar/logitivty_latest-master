// import { View, Text, StyleSheet } from "react-native";
// import React from "react";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import AppColors from "../../../utils/AppColors";
// interface Props {
//   item: any;
//   isSelected: boolean;
//   onPress: () => void;
// }
// export default function CategoryTile(props: Props) {
//   return (
//     <TouchableOpacity onPress={props.onPress}>
//       <View
//         style={[
//           style.container,
//           {
//             backgroundColor: props.isSelected
//               ? AppColors.buttonPinkColor
//               : "white",
//           },
//         ]}
//       >
//         <Text style={{ color: props.isSelected ? "white" : "black" }}>
//           {props.item}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const style = StyleSheet.create({
//   container: {
//     marginHorizontal: 5,
//     marginVertical: 10,
//     height: 30,
//     borderWidth: 1,
//     borderColor: "grey",
//     backgroundColor: "white",
//     paddingHorizontal: 12,
//     justifyContent: "center",
//     borderRadius: 8,
//   },
// });


import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppColors from "../../../utils/AppColors";

interface Props {
  item: any;
  isSelected: boolean;
  onPress: () => void;
}

export default function CategoryTile(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: props.isSelected ? AppColors.buttonPinkColor : "white",
            borderColor: props.isSelected ? "#D83772" : "grey", // Border color white on focus, grey by default
          },
        ]}
      >
        <Text
          style={{
            color: props.isSelected ? "white" : "black",
            opacity: props.isSelected ? 0.9 : 0.7, // Tint effect by opacity
          }}
        >
          {props.item}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 10,
    height: 30,
    borderWidth: 1, 
    backgroundColor: "white",
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 8,
  },
});

