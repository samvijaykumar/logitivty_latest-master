
import React from "react";
import { View, Image,Text, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";

export default NavigationBarOptions = ({ navigation }) => ({
     headerStyle: {
      backgroundColor: AppColors.primaryColor,
    },
    headerTitle: (
        <View>
            <Text style={{ fontFamily: ResourceUtils.fonts.poppins_regular, fontSize: 18,alignSelf: "center", marginBottom:8,marginLeft:-15}}>Longevity Club</Text>
        </View>

    ),
    headerLeft: (
        <TouchableOpacity onPress={() => {
            navigation.toggleDrawer();
            Keyboard.dismiss();
        }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image
                    source={ResourceUtils.images.menu}
                    style={{ marginLeft:10, width: 28, height: 24, marginBottom:10}}
                />
            </View>
        </TouchableOpacity>
    ),
    headerRight: (
        <TouchableOpacity 
        onPress={() => {
            // navigation.navigate('AddTechnique',{})
        }}
        >
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image
                    source={ResourceUtils.images.logo}
                    style={{  marginRight:10, marginBottom:10}}
                />
            </View>
        </TouchableOpacity>
    )
});