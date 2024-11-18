import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,

} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppStrings from "../../utils/AppStrings";
import ResourceUtils from '../../utils/ResourceUtils';
import { connectWithContext } from '../../container';
import FlowWrapView from '../../widgets/FlowWrapView';
import MamographyContextProvider, { MamographyContextConsumer } from '../../context/MamographyContext';
import AppUtils from '../../utils/AppUtils';
import TopImageView from '../../widgets/TopImageView';
//import MapView, { Marker } from 'react-native-maps';

class CenterLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      mapDetails: ''
    };
  }

  async componentDidMount() {
    navigate = this.props.navigation;
    // console.log('mapDetails', navigate.getParam('mapDetails'))
    // let mapDetails = navigate.getParam('mapDetails')

    // let region = {
    //   latitude: parseFloat(mapDetails.lat),
    //   longitude: parseFloat(mapDetails.lng),
    //   latitudeDelta: 5,
    //   longitudeDelta: 5
    // };

    // await this.setState({ region: region, mapDetails: mapDetails });
    const latitude = "26.9124";
    const longitude = "75.7873";
    const label = "Jaipur";

    const url = Platform.select({
      ios: "maps:" + latitude + "," + longitude + "?q=" + label,
      android: "geo:" + latitude + "," + longitude + "?q=" + label
    });

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url =
          "https://www.google.de/maps/@" +
          latitude +
          "," +
          longitude +
          "?q=" +
          label;
        return Linking.openURL(browser_url);
      }
    });

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {

  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    const { region, mapDetails } = this.state;
    return (


      <FlowWrapView>

        <StatusBar backgroundColor={'#D93337'} barStyle="light-content" />


        <View>
          <TopImageView
            image={ResourceUtils.images.bubble_bg_light}
            onPress={() => {
              this.props.navigation.pop()
            }}
            text1={'center '}
            text2={'location'}
            textStyle={{ color: AppColors.colorBlack }}
            onPressHome={()=>{this.props.navigation.navigate('Dashboard')}}
          />
          {/* <MapView
            // region={region}
            onMapLoaded={() => console.log('MAP IS LOADED')}

            nRegionChange={this.onRegionChange}
            initialRegion={region}
            style={{ width: '100%', height: '100%' }}
            moveOnMarkerPress={true}
            //showsUserLocation={true}
            zoomEnabled={true}
            // ref={ map => { this.map = map }}
            followUserLocation={true}
            showsMyLocationButton={true}
          >
            <Marker
              coordinate={{ latitude: mapDetails.lat, longitude: mapDetails.lng }}
              title={mapDetails.name}
              description={mapDetails.address}
            />
          </MapView> */}


        </View>
      </FlowWrapView>

    );
  }
}

const CenterLocationScreenElement = connectWithContext(MamographyContextProvider)({
  cityListProps: MamographyContextConsumer,
})(CenterLocationScreen);

export default CenterLocationScreenElement;

const styles = StyleSheet.create({
  logo_icon_style: {
    width: 400,
    height: 120,
  },

  container: {
    flex: 1,
    backgroundColor: AppColors.colorWhite,
  },


});
