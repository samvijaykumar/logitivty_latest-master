import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ResourceUtils from "../utils/ResourceUtils";
import AppColors from "../utils/AppColors";
import { useNavigation } from "@react-navigation/native";
import { color } from "@rneui/base";

const Myfile = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Image
                    source={ResourceUtils.images.splash_logo}
                    style={styles.headerLogo}
                />
            ),
            headerTitle: "The Longevity Club",

            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerStyle: {
                elevation: 0,
                backgroundColor: AppColors.buttonPinkColor,
            },
            headerTintColor: "white",
            // cardStyle: { opacity: 1, backgroundColor: "transparent" },
            // mode: "modal",
        });
        
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coming Soon</Text>
            <Text style={styles.subtitle}>
                We're working hard to bring something awesome. Stay tuned!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    headerLogo: {
        tintColor: AppColors.colorWhite,
        height: 35,
        marginRight: 10,
        width: 35,
        left:16,
        justifyContent:"center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        paddingHorizontal: 20,
    },
});

export default Myfile;
