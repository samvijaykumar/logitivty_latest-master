import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from "react-native";
import AppUtils from "../utils/AppUtils";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";

export default class InputViewNormal extends React.Component {

    constructor() {
        super();
    }

    // componentDidMount() {
    //     this.setState({ text: AppUtils.isNull(this.props.text) ? "" : this.props.text.toString() });
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.text !== this.props.text) {
    //         this.setState({ text: AppUtils.isNull(this.props.text) ? "" : this.props.text.toString() });
    //     }
    // }

    onChange = (text) => {
        let value = text;
        // if (!AppUtils.isNull(this.props.keyboardType) && this.props.keyboardType == 'numeric') {
        //     value = value.toString().split(".").map((el, i) => i ? el.split("").slice(0, 2).join("") : el).join(".");
        // }

        this.setState({ text: value })
        this.props.onChangeText && this.props.onChangeText(value);
    }

    render() {
        const { ref,
            editable = true,
            onSubmitEditing,
            placeholderTextColor = AppColors.editTextPlaceHolderColor,
            returnKeyType,
            placeholder,
            keyboardType,
            style = {},
            containerStyle = {},
            multiline = false,
            numberOfLines,
            autoCapitalize = 'none',
            maxLength,
            onPress,
            autoCorrect,
            underlineColorAndroid,
            autoFocus,
            secureTextEntry,
            selectTextOnFocus,
            contextMenuHidden,
            blurOnSubmit,
            icon,
            value
        } = this.props;

        let inputProps = {};

        if (ref) {
            inputProps["ref"] = ref;
        }

        if (!AppUtils.isNull(placeholder)) {
            inputProps["placeholder"] = placeholder;
        }

        if (!AppUtils.isNull(keyboardType)) {
            inputProps["keyboardType"] = keyboardType;
        }

        if (onSubmitEditing) {
            inputProps["onSubmitEditing"] = onSubmitEditing;
        }

        if (!AppUtils.isNull(placeholderTextColor)) {
            inputProps["placeholderTextColor"] = placeholderTextColor;
        }

        if (!AppUtils.isNull(returnKeyType)) {
            inputProps["returnKeyType"] = returnKeyType;
        }


        if (!AppUtils.isNull(numberOfLines)) {
            inputProps["numberOfLines"] = numberOfLines;
        }

        if (!AppUtils.isNull(maxLength)) {
            inputProps["maxLength"] = maxLength;
        }

        if (!AppUtils.isNull(autoCorrect)) {
            inputProps["autoCorrect"] = autoCorrect;
        }

        if (!AppUtils.isNull(underlineColorAndroid)) {
            inputProps["underlineColorAndroid"] = underlineColorAndroid;
        }

        if (!AppUtils.isNull(autoFocus)) {
            inputProps["autoFocus"] = autoFocus;
        }

        if (!AppUtils.isNull(secureTextEntry)) {
            inputProps["secureTextEntry"] = secureTextEntry;
        }

        if (!AppUtils.isNull(selectTextOnFocus)) {
            inputProps["selectTextOnFocus"] = selectTextOnFocus;
        }

        if (!AppUtils.isNull(contextMenuHidden)) {
            inputProps["contextMenuHidden"] = contextMenuHidden;
        }

        if (!AppUtils.isNull(blurOnSubmit)) {
            inputProps["blurOnSubmit"] = blurOnSubmit;
        }
        
        inputProps["multiline"] = multiline;
        inputProps["autoCapitalize"] = autoCapitalize;
        inputProps["editable"] = editable;

        inputProps = { ...inputProps, ...this.props.inputProps };

        // onPressItem = () => {
        //     onPress && onPress();
        // }

        renderInput = () => {
            return (
                <View style={[multiline ? styles.multilineStyle : styles.style, containerStyle]}>
                    {
                        AppUtils.isNull(icon)?null:
                        <Image 
                            resizeMode={'contain'}
                            source={icon}  
                            style={{width:20,height:20,marginStart:10}}
                        />
                    }
                    
                    <TextInput
                        style={[styles.inputStyle, style]}
                        onChangeText={this.onChange}
                        value={AppUtils.isNull(value) ? "" : value}
                        {...inputProps}>
                    </TextInput>
                </View>
            )
        }

        if (editable) {
            return renderInput();
        } else {
            return (
                <TouchableOpacity style={styles.wrapper} onPress={()=>{
                    onPress && onPress()
                }}>
                    {renderInput()}
                </TouchableOpacity>
            )
        }
    }

};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    multilineStyle: {
        borderWidth: 1,
        flexDirection:'row',
        borderRadius: 10,
        width: '100%',
        borderColor: AppColors.editTextBorderColor,
        marginTop: 12,
        marginBottom: 4,
        minHeight:45,
        maxHeight:400,
        height:200,
        justifyContent:'center',
        alignItems:'flex-start'
    },
    style: {
        flexDirection:'row',
        borderBottomWidth: 0.5,
        height: 45,
        width: '100%',
        borderColor: AppColors.editTextBorderColor,
        marginTop: 12,
        marginBottom: 4,
        justifyContent:'center',
        alignItems:'center'
    },
    inputStyle: {
        width: '100%',
        flex: 1,
        color: AppColors.colorWhite,
        fontSize: 15,
        paddingStart:10,
        paddingEnd:10,
        fontFamily: ResourceUtils.fonts.poppins_regular
    }
});