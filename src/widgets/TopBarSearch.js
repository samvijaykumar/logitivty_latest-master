import React from "react";
import {
    View,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    Text, Image
} from "react-native";
import AppColors from "../utils/AppColors";
import ResourceUtils from "../utils/ResourceUtils";
import AppStrings from "../utils/AppStrings";
import TextViewMedium from "./TextViewMedium";
import TouchableImageView from "./TouchableImageView";
import AppStatusBar from "./AppStatusBar";
import UserSession from "../utils/UserSession";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { TextInput } from "react-native";
import { Keyboard } from "react-native";
class TopBarSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchText: ''
        }
       // this.inputRef = React.createRef();
    }

    async componentDidMount() {
        let user = await UserSession.getUserSessionData()
        console.log('user data: ' + JSON.stringify(user))
    }

    onCancel = () => {
        this.props.onPressBack && this.props.onPressBack();
    };
    doProductSearch=(searchVal)=>{
        //this.inputRef.current.focus();
        this.props.onPressSearch && this.props.onPressSearch(searchVal);
    }
    

    render() {
        const {
            visibleBack = true,
            onPressBack,
            searchIcon = ResourceUtils.images.ic_search,
            showRightIcon = true,
            backgroundColor = AppColors.primaryColor,
            visibleSearch = true,
            onPressSearch,
            updatedAt = 0
        } = this.props;
        const { searchText, } = this.state;
        
        //let name = this.props.screenTitle.indexOf(' ') > -1 ? this.props.screenTitle.split(' ')[0] : this.props.screenTitle

        return (<SafeAreaView >
            <AppStatusBar />
            <View style={{
                elevation: 2,
                flexDirection: 'row',
                width: '100%',
                height: 54,
                alignItems: 'center',
                backgroundColor: backgroundColor
            }}>




                <View style={{ flexDirection: 'row', width: '70%', height: 35, backgroundColor: AppColors.colorWhite, marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 16, height: 16, marginRight: 8, marginLeft: 10, }} resizeMode={'center'}
                        source={ResourceUtils.images.ic_search_grey}
                    />
                    <TextInput
                        placeholder={"Search..."}
                       // ref={this.inputRef}
                        placeholderTextColor={AppColors.editTextPlaceHolderColor}
                        placeholderImg={ResourceUtils.images.img_help}                        
                        autoFocus={true}
                        onChangeText={async (searchText) => {
                            await this.setState({ searchText });
                            this.doProductSearch(searchText);
                          }}
                        text={searchText}
                        value={searchText}
                        style={{
                            fontSize: 15,
                            height: 40,
                            width: "90%",
                            color: AppColors.colorBlack,
                        }}
                    />

                </View>


                <TouchableOpacity
                    onPress={this.onCancel}>
                    <TextViewMedium
                        textStyle={{
                            color: AppColors.colorWhite,
                            fontSize: 16,
                            marginLeft: 10,
                            textAlign: 'center'
                        }} numberOfLines={1}
                        text={'cancel'}
                    />
                </TouchableOpacity>

            </View>

        </SafeAreaView >
        );
    }

}
export default TopBarSearch;
