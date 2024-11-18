import React from "react";
import { StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ResourceUtils from "../utils/ResourceUtils";
import AppUtils from "../utils/AppUtils";

export default DateTimePickerView = props => {
    const { isVisible, onConfirm, onCancel, maximumDate = '', minimumDate = '', date = new Date(), mode = "date" } = props;

    let pickerProps = {};

    if (!AppUtils.isNull(isVisible)) {
        pickerProps["isVisible"] = isVisible;
    }

    if (onConfirm) {
        pickerProps["onConfirm"] = onConfirm;
    }

    if (onCancel) {
        pickerProps["onCancel"] = onCancel;
    }

    if (!AppUtils.isNull(minimumDate)) {
        pickerProps["minimumDate"] = minimumDate;
    }

    if (!AppUtils.isNull(maximumDate)) {
        pickerProps["maximumDate"] = maximumDate;
    }


    pickerProps["mode"] = mode;

    pickerProps["date"] = date;

    pickerProps = { ...pickerProps, ...props.pickerProps };

    return (
        <DateTimePickerModal
            {...pickerProps}
        />
    );
};

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        height: 48,
        borderRadius: 5,
        width: '100%',
        marginTop: 12,
        borderColor: '#AE4793',
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        color: "#676666",
        textAlign: "center",
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: ResourceUtils.fonts.poppins_medium,
        width: '100%'
    }
});