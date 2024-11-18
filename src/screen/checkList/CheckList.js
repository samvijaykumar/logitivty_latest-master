import React, { Fragment } from 'react';
import { View, Text, StatusBar, Keyboard, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, SafeAreaView } from 'react-native';
import AppColors from '../../utils/AppColors';
import ResourceUtils from '../../utils/ResourceUtils'
import { connectWithContext } from '../../container';
import UserProfileContextProvider, { UserProfileContextConsumer } from '../../context/UserProfileContext';
import AppUtils from '../../utils/AppUtils';
import AppStrings from '../../utils/AppStrings';
import TextViewMedium from '../../widgets/TextViewMedium';
import FlowWrapView from '../../widgets/FlowWrapView';
import TopBackArrowView from '../../widgets/TopBackArrowView';
import UserSession from '../../utils/UserSession';
import { GlobalContextConsumer } from '../../context/GlobalContext';
import HTML from 'react-native-render-html';

class CheckList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checkListData: ''
            
        }

    }
    
    componentDidMount() {
        this.checkListApiCall()
    }
    async componentDidUpdate(prevs, prevState, snapshot) {
        if (
            prevs.CheckListProps.checkListLoading !== this.props.CheckListProps.checkListLoading &&
            !this.props.CheckListProps.checkListLoading
        ) {
            let response = this.props.CheckListProps.checkListResponse;
            console.log(`checkList Resp: ${JSON.stringify(response)}`)
            await this.setState({
                checkListData: this.props.CheckListProps.checkListResponse.data[0].option_value,
            })
        }

    }

    render() {
        const {checkListData}= this.state;
        return (
            <FlowWrapView>
                 <TopBackArrowView onPressBack={() => this.props.navigation.goBack()}  onPressHome={()=>{this.props.navigation.navigate('Dashboard')}} />
                <View style={{ marginTop: 20, marginLeft: 16, }}>
                <TextViewMedium
                        textStyle={{
                            color: AppColors.colorBlack,
                            fontSize: 20,
                            marginEnd: 3, fontFamily: ResourceUtils.fonts.poppins_semibold
                        }} numberOfLines={1}
                        text={'checklist before screening'}
                    />
                    <View style={{ marginTop: 20, marginLeft: 16, marginRight:16}}>
                        <HTML html={checkListData} imagesMaxWidth={'100%'} />
                        </View>
                    </View>
            </FlowWrapView>
        );

        }
        checkListApiCall() {
            var data = {
                "option_name": 'mammography_todos_before_screening',
            }
            this.props.CheckListProps.getCheckList(data)
        }

}
const CheckListScreenElement = connectWithContext(UserProfileContextProvider)({
    globalProps: GlobalContextConsumer,
    CheckListProps: UserProfileContextConsumer,
})(CheckList);

export default CheckListScreenElement;
