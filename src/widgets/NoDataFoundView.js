import React from "react";
import AppColors from "../utils/AppColors";
import TextViewNormal from "./TextViewNormal";

export default NoDataFoundView = props => {
    let { text = 'no data found', color = AppColors.colorGray } = props
         return (
            <TextViewNormal
                textStyle={{
                    color: color,
                    margin: 20,
                    alignItems:'center',
                    justifyContent:'center',
                    textAlign:'center'
                }}
                numberOfLines = {1}
                text={text}
            />
        );
};
