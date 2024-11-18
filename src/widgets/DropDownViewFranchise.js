import React from "react";
import { ScrollView, View, Text, Image, TextInput } from "react-native";
import AppUtils from "../utils/AppUtils";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import TextViewNormal from "./TextViewNormal";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import { Keyboard } from "react-native";

export default DropDownViewFranchise = props => {

    const { visible = true, onPress, doCitySearch, doCenterSearch, searchType = '', items = [], title = "Choose One", triggerTextColor = AppColors.editTextPlaceHolderColor, fontSize = 16, paddingStart = 10, paddingEnd = 10, fontFamily = ResourceUtils.fonts.celias_normal, showArrow = true, } = props;

    if (visible) {

        return (
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='never'>
                <Menu onSelect={value => {
                    Keyboard.dismiss()
                    onPress && onPress(value)
                }} style={{ paddingStart: paddingStart, paddingEnd: paddingEnd, flex: 1 }}>
                    <MenuTrigger >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                flex: 1, color: triggerTextColor,
                                fontSize: fontSize,
                                fontFamily: fontFamily
                            }}>{title}</Text>
                            {
                                showArrow ?
                                    <Image style={{ height: 15, width: 15, marginEnd: 10 }} source={ResourceUtils.images.right_arrow} />
                                    : null
                            }
                        </View>
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ width: AppUtils.getAppViewWidth(), marginStart: -20 }}>
                       
                            <View style={{
                                width: AppUtils.getDeviceWidth() - 100,
                                height: 40,
                                backgroundColor: AppColors.inputviewBoxColor,
                                flexDirection: 'row',
                                borderRadius: 10, justifyContent: 'space-between', alignItems: 'center',
                                borderWidth: 1, margin: 15,
                                borderColor: AppColors.inputviewBoxColor,
                            }}>

                                <TextInput
                                    placeholder={searchType == 'city' ? "search city..." : "search center..."}
                                    placeholderTextColor={'#5D5D5D'}
                                    returnKeyType="done"
                                    // onChangeText={(_cityName) => this.setState({ _cityName })}
                                    text={'_cityName'}
                                    style={{
                                        marginLeft: 20,
                                        fontSize: 15,
                                        height: 52, width: '85%',
                                        color: AppColors.colorBlack,
                                    }}
                                    onChangeText={async (_searchItem) => {
                                        searchType == 'city' ?
                                        doCitySearch && doCitySearch(_searchItem) : doCenterSearch && doCenterSearch(_searchItem)
                                    }}
                                />


                            </View>
                       
                        <ScrollView style={{ height: items.length > 3 ? 200 : 150 }} >
                            {
                                items.map(item => {
                                    return <MenuOption value={item} disabled={item.id == '-1'} >
                                        <TextViewNormal text={item.name} textStyle={{ paddingStart: 10, paddingTop: 7, paddingBottom: 7, paddingEnd: 10, color: (item.id == '-1') ? AppColors.colorGray : AppColors.colorBlack, fontSize: 16 }} />
                                    </MenuOption>
                                })

                            }
                        </ScrollView>
                    </MenuOptions>
                </Menu>
            </ScrollView>

        );
    }

    return null;
}
