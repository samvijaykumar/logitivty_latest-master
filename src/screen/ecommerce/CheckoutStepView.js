import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import AppColors from '../../utils/AppColors';
import TextViewMedium from '../../widgets/TextViewMedium';
import TextViewNormal from '../../widgets/TextViewNormal';

class CheckoutStepView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }

    }


    async componentDidUpdate(prevs, prevState, snapshot) {

    }

    render() {

        let {selectedType} = this.props

        let color1 = selectedType==1?AppColors.primaryColor:AppColors.colorGray
        let color2 = selectedType==2?AppColors.primaryColor:AppColors.colorGray
        let color3 = selectedType==3?AppColors.primaryColor:AppColors.colorGray

        return (
            <View style={styles.container}>
            <View style={styles.containerChild}>

                <View style={styles.lineStyle} />

                <View style={[styles.circleStyle, { borderColor: color1 }]}>
                    <TextViewMedium text={'1'} textStyle={[styles.circleTextStyle, { color: color1 }]} />
                </View>

                <View style={styles.lineFixStyleWidth50} />

                <View style={[styles.circleStyle, { borderColor: color2 }]}>
                    <TextViewMedium text={'2'} textStyle={[styles.circleTextStyle, { color: color2 }]} />
                </View>

                <View style={styles.lineFixStyleWidth50} />

                <View style={[styles.circleStyle, { borderColor: color3 }]}>
                    <TextViewMedium text={'3'} textStyle={[styles.circleTextStyle, { color: color3 }]} />
                </View>
                <View style={styles.lineStyle} />

            </View>
            <View style={[styles.containerChild,{marginTop:5}]}>

                <View style={{flex:1}} />
                <TextViewNormal text={'address'} textStyle={[styles.circleTextStyle, { color: color1,fontSize:12 }]} />

                <View style={{width:35}} />

                <TextViewNormal text={'delivery options'} textStyle={[styles.circleTextStyle, { color: color2,fontSize:12 }]} />

                <View style={{width:38}} />

                <TextViewNormal text={'payment'} textStyle={[styles.circleTextStyle, { color: color3,fontSize:12 }]} />
                <View style={{flex:1}} />

            </View>
            </View>
        );
    }
}

export default CheckoutStepView;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        backgroundColor:'#ffffff',
        marginTop:10,
    },
    containerChild: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lineStyle: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: AppColors.colorGrayLight
    },
    circleStyle: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center'
    },
    circleTextStyle: {
        alignSelf: 'center',
    },
    lineFixStyleWidth50: {
        width:70,
        borderBottomWidth: 1,
        borderColor: AppColors.colorGrayLight
    },
});
