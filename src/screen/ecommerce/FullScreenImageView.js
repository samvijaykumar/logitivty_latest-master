import React from 'react';
import {
    View,
    ImageBackground
} from 'react-native';
import Swiper from 'react-native-swiper';
import AppColors from '../../utils/AppColors';
import TopBarEcommerce from '../../widgets/TopBarEcommerce';
import AppUtils from '../../utils/AppUtils';
import ResourceUtils from '../../utils/ResourceUtils';
import FastImage from 'react-native-fast-image';

let navigate;

class FullScreenImageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageArray: [],
            loadingImage: true
        };
    }

    async componentDidMount() {
        navigate = this.props.navigation;

        let array = this.props.route.params?.imageArray

        await this.setState({
            imageArray: JSON.parse(array),
        })


    }

    goBack = () => {
        navigate.goBack();
    }
    stopImageLoading = () => {
        this.setState({ loadingImage: false })
    }

    render() {
        let { imageArray, loadingImage } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TopBarEcommerce
                    screenTitle={''}
                    cartCount={'0'}
                    onPressBack={() => {
                        this.goBack()
                    }}
                    visibleFav={false}
                    visibleCart={false}
                    visibleSearch={false}

                />

                {
                    !AppUtils.isEmpty(imageArray) ?
                        <Swiper activeDotColor={AppColors.primaryColor} dotColor={AppColors.colorGray} loadMinimal={true} // only loads the current page + [loadMinimalSize] amount of pages before and after
                            loadMinimalSize={0}>
                            {
                                imageArray.map(item => {
                                    return <View style={{ flex: 1, padding: 10 }}>
                                        {/* <ImageBackground
                                            style={{ height: '100%', width: '100%' }}
                                            resizeMode={'center'}
                                            source={loadingImage ? ResourceUtils.images.logo_gray_color : { uri: AppUtils.getImageURLDynamic(item.image_url) }}
                                            onLoadStart={() => {
                                                //setLoading(true)
                                            }}
                                            onLoadEnd={() => {
                                                this.stopImageLoading();
                                            }}
                                        /> */}

                                        <FastImage
                                            style={{ height: '100%', width: '100%' }}
                                            source={loadingImage ? ResourceUtils.images.logo_gray_color : {
                                                uri: AppUtils.getImageURLDynamic(item.image_url),
                                                priority: FastImage.priority.normal,
                                            }}
                                            onLoadStart={() => {
                                                //setLoading(true)
                                            }}
                                            onLoadEnd={() => {
                                                this.stopImageLoading();
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                    </View>
                                })
                            }
                        </Swiper> : null
                }

            </View>
        );
    }
}

export default FullScreenImageView;
