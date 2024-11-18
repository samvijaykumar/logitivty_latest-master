/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  Platform,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import FooterComponent from '../component/FooterComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

//images
import backgroundDesign_1 from '../provider/local_Image_Provider/png/backgroundDesign_1.png';
import PostImage from '../provider/local_Image_Provider/png/Image.png';
import businessProfile from '../provider/local_Image_Provider/png/businessProfile.png';
import Design_2 from '../provider/local_Image_Provider/png/Design_2.png';
import Design_3 from '../provider/local_Image_Provider/png/Design_3.png';
import homePostCard from '../provider/local_Image_Provider/png/homePostCard.png';
import globe from '../provider/local_Image_Provider/png/globe.png';
import AllIcon from '../provider/local_Image_Provider/png/All.png';
import AllIcon2 from '../provider/local_Image_Provider/png/All_icon2.png';

import {makeRequest} from '../api/ApiInfo';
import {Dropdown} from 'react-native-element-dropdown';

import {useIsFocused} from '@react-navigation/native';
import {async_keys, getData} from '../api/UserPreference';
import ReactNativeModal from 'react-native-modal';
import {CategoryContext, CountryContext} from '../provider/Context';

// import Video from 'react-native-video';
import {Icon} from '@rneui/themed';
import {StatusBar} from 'react-native';
import VideoPlayer from 'react-native-video-player';
// import {createThumbnail} from 'react-native-create-thumbnail';
// import RNThumbnail from 'react-native-thumbnail';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/Ionicons';
// create a component

const HomeScreen = props => {
  const [category, setCategory] = useState([]);
  const [post, setpost] = useState([]);
  const [country, setCountry] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const {selectedCountry, setSelectedCountry} = useContext(CountryContext);
  const {selectedCategory, setSelectedCategory} = useContext(CategoryContext);
  const [thumbnailUri, setThumbnailUri] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  ///////////////////////////////

  const focus = useIsFocused();
  useEffect(() => {
    getDetail();
  }, [focus]);

  useEffect(() => {
    getBusinessCategory();
    getHome();
    getCountry();
  }, []);

  // useEffect(() => {
  //   const generateThumbnail = async () => {
  //     try {
  //       const response = await createThumbnail({
  //         url: thumbnailUri ,
  //         timeStamp: 10000, // 10 seconds
  //       });
  //       console.log("MMMMMMMMMMMMMMMMMMMMMMM", response.path)
  //       setThumbnailUri(response.path);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   generateThumbnail();
  // }, [thumbnailUri]);

  // const generateThumbnail = async ()=>{

  // }

  const getDetail = async () => {
    try {
      // setLoading(true);
      const response = await makeRequest('get_profile');

      if (response) {
        const {Status, Data} = response;

        if (Status === true) {
          setProfile(Data);
          console.log(Data);
          // setLoading(false);
        }
      }
      // setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBusinessCategory = async () => {
    try {
      setLoading(true);
      const response = await makeRequest('category');

      if (response) {
        const {Status, Data} = response;
        const allOption = {
          name: 'All',
          id: 0,
        };
        const categoryWithAll = [allOption, ...Data];

        if (Status === true) {
          setCategory(categoryWithAll);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const getHome = async () => {
    try {
      setLoading(true);
      const response = await makeRequest('home');

      console.log('HHHHHHHHHHHH', response);

      if (response) {
        const {Status, Data} = response;

        if (Status === true) {
          // fetchThumbnails(Data)
          setpost(Data.map(item => ({...item, paused: true})));
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  // const fetchThumbnails = async (data) => {
  //   const thumbnailPromises = data.map(async (item) => {
  //     console.log('Fetching thumbnail for:', item.src);
  //     try {
  //       if (item.type === 'video') {
  //         const thumbnail = await createThumbnail({
  //           url: item.src,
  //           timeStamp: 10000, // Optional: specify the timestamp for the thumbnail (in milliseconds)
  //         });

  //         return thumbnail;
  //       } else {
  //         console.log(Skipping thumbnail creation for non-video item: ${item.src});
  //         return null;
  //       }
  //     } catch (e) {
  //       console.error(Failed to create thumbnail for ${item.src}, e);
  //       return null;
  //     }
  //   });

  //   try {
  //     const thumbnails = await Promise.all(thumbnailPromises);
  //     setThumbnails(thumbnails.filter((thumbnail) => thumbnail !== null));
  //   } catch (error) {
  //     console.error('Failed to generate thumbnails:', error);
  //   }
  // };

  const getCountry = async () => {
    try {
      setLoading(true);
      const response = await makeRequest('country');

      if (response) {
        const {Status, Data} = response;

        if (Status === true) {
          setCountry(Data);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const categoryItem = ({item}) => {
    // const categoryNameWords = item?.name?.split(' ');÷
    const truncateString = (str, num) => {
      if (str?.length <= num) {
        return str;
      }
      return str?.slice(0, num) + '...';
    };
    const truncatedString = truncateString(item?.name, 3);
    return (
      <View style={{marginHorizontal: wp(2), flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#F1E8ED', '#FBE7EE']}
          style={{borderRadius: wp(6), alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              if (selectedCategory?.id === item?.id) {
                setSelectedCategory({});
              } else {
                setSelectedCategory(item);
              }
              handleDirectory();
            }}
            style={[
              styles.categoryContainer,
              selectedCategory?.id === item?.id && {backgroundColor: 'purple'},
            ]}>
            {item?.name === 'All' ? (
              <Image
                // source={AllIcon}
                source={AllIcon2}
                resizeMode="contain"
                style={[
                  styles.categoryIconAll,
                  selectedCategory?.id === item?.id && {tintColor: '#fff'},
                ]}
              />
            ) : (
              <Image
                source={{uri: item?.images}}
                resizeMode="contain"
                style={[
                  styles.categoryIcon,
                  selectedCategory?.id === item?.id && {tintColor: '#fff'},
                ]}
              />
            )}
            {/* <Image
              source={{uri: item.images}}
              resizeMode="contain"
              style={[
                styles.categoryIcon,
                selectedCategory?.id === item.id && {tintColor: '#fff'},
              ]}
            /> */}
          </TouchableOpacity>
        </LinearGradient>
        {/* <View style={{ flex: 1, alignSelf: 'center', marginTop: hp(1) }}>
        {categoryNameWords.map((word, index) => (
          <Text
            key={index}
            style={[
              styles.categoryName,
              selectedCategory?.id === item.id && { color: 'purple' },
            ]}>
            {word}
          </Text>
        ))}
      </View> */}
        <Text
          numberOfLines={2}
          style={[
            styles.tt,
            // styles.categoryName,
            {
              color: '#6C3082',
              fontFamily: 'Poppins-Regular',
              // fontSize: hp(1.5),

              fontSize: Platform.OS ? hp(1.2) : hp(1.5),
              marginTop: hp(0.5),
              // fontWeight: "600",
              width: hp(11),
              // borderWidth: wp(.1),
              alignSelf: 'center',
              // marginTop: hp(1),
              textAlign: 'center',
            },
            selectedCategory?.id === item?.id && {
              color: 'purple',
            },
          ]}>
          {item?.name.includes('&') ? (
            <>
              {item?.name.split('&')[0]} &{'\n'}
              {item?.name.split('&')[1]}
            </>
          ) : item?.name.includes(' ') ? (
            item?.name.split(' ').map((part, index) => (
              <Text key={index}>
                {part}
                {index !== item?.name.split(' ').length - 1 && '\n'}
              </Text>
            ))
          ) : (
            item?.name
          )}
        </Text>
      </View>
    );
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const postItem = ({item}) => {
    setThumbnailUri(item?.src);
    return (
      <ImageBackground
        borderRadius={wp(3)}
        source={homePostCard}
        style={{
          marginHorizontal: wp(3),
          marginVertical: hp(1),
          paddingBottom: hp(2),
          padding: wp(2),
        }}>
        <View
          style={{
            marginTop: hp(4),
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: wp(4.5),
              fontWeight: '500',
              marginHorizontal: wp(6),
            }}>
            {item?.new_date} {item?.month} {item?.year}
          </Text>

          {/*  */}

          <View
            style={{
              height: hp(40),
              aspectRatio: 0.9 / 1,
              alignSelf: 'center',
              marginVertical: hp(2),
              borderRadius: wp(3),
              backgroundColor: '#000',
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            {item?.type === 'image' ? (
              <Image
                source={{uri: item?.src}}
                style={{
                  flex: 1,
                  height: hp(36),
                  aspectRatio: 1 / 1,
                  alignSelf: 'center',
                  marginVertical: hp(2),
                  borderRadius: wp(3),
                  marginHorizontal: wp(3),
                }}
              />
            ) : (
              <TouchableOpacity
                style={{
                  height: hp(40),
                  width: wp(71.7),
                  borderRadius: wp(3),
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={togglePlay}>
                {/* <Iconss  name={isPlaying ? "play" : "pause"} size={50} color="#FFF" style={{alignSelf: "center", justifyContent: "center", }}/> */}
                <VideoPlayer
                  video={{
                    uri: item?.src,
                  }}
                  style={{
                    height: hp(40),
                    width: wp(71.7),
                    borderRadius: wp(3),
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                  // disableSeek
                  pauseOnPress
                  customStyles={{
                    wrapper: {
                      // Use any wrapper styles if needed
                      // backgroundColor: "black"
                    },
                    video: {
                      // Use any video container styles if needed
                      backgroundColor: 'black',
                    },
                    controls: {
                      // Hide all controls
                      opacity: 1, // Make controls transparent
                    },
                    seekBar: {
                      // Hide seek bar
                      opacity: 1,
                    },
                    // playButton: {
                    //   // Hide play button
                    //   opacity: isPlaying ? 0 : 1,
                    // },
                  }}
                  thumbnail={{uri: item?.thumbnail}}
                  // paused={item?.paused}
                  // style={{
                  //   position: 'absolute',
                  //   top: 0,
                  //   left: 0,
                  //   right: 0,
                  //   bottom: 0,
                  //   zIndex: -9,
                  // }}
                  automaticallyWaitsToMinimizeStalling={true}
                  borderRadius={wp(3)}
                  resizeMode="contain"
                  // autoRun={true}
                  paused={isPlaying}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{alignSelf: 'center', marginHorizontal: wp(5.5)}}>
            <Text
              // numberOfLines={3}
              numberOfLines={isExpanded ? undefined : 3}
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                alignSelf: 'center',
                fontWeight: '400',
                // alignContent: "center",
                textAlign: 'left',

                fontSize: hp(1.9),
              }}>
              {item?.description}
            </Text>

            <Text
              onPress={toggleExpand}
              style={{
                // borderBottomWidth: wp(.1),
                color: '#fff',
                fontFamily: 'Poppins-Medium',
                alignSelf: 'flex-start',
                textAlign: 'center',
                fontSize: hp(1.9),
                marginTop: hp(0.3),
                textDecorationLine: 'underline',
              }}>
              {isExpanded ? 'show less' : 'read more'}
            </Text>
          </View>

          {/* <ExpandableText description={item?.description} /> */}
        </View>
      </ImageBackground>
    );
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleDirectory = () => {
    props.navigation.navigate('Directory');
  };

  return loading ? (
    // <View style={{marginHorizontal: wp(4), marginVertical: hp(2)}}>
    //   <ShimmerPlaceHolder
    //     LinearGradient={LinearGradient}
    //     style={{
    //       width: '100%',
    //       height: hp(5),
    //       marginVertical: hp(5),
    //       alignSelf: 'center',
    //     }}
    //     autoRun={true}
    //     visible={false}
    //   />
    //   {/* Shimmer effect for WE ARE WeUNITE */}
    //   <ShimmerPlaceHolder
    //     LinearGradient={LinearGradient}
    //     style={{
    //       width: '40%',
    //       height: hp(5),
    //       marginBottom: hp(2),
    //       alignSelf: 'center',
    //     }}
    //     autoRun={true}
    //     visible={false}
    //   />
    //   {/* Shimmer effect for other text */}
    //   <ShimmerPlaceHolder
    //     LinearGradient={LinearGradient}
    //     style={{
    //       width: '90%',
    //       height: hp(10),
    //       marginBottom: hp(2),
    //       alignSelf: 'center',
    //     }}
    //     autoRun={true}
    //     visible={false}
    //   />
    //   {/* Shimmer effect for category */}
    //   <FlatList
    //     data={[1, 2, 3, 4]} // Placeholder data
    //     renderItem={() => (
    //       <ShimmerPlaceHolder
    //         LinearGradient={LinearGradient}
    //         style={{
    //           height: hp(10),
    //           width: hp(10),
    //           marginBottom: hp(2),
    //           marginHorizontal: wp(2),
    //         }}
    //         autoRun={true}
    //         visible={false}
    //       />
    //     )}
    //     keyExtractor={(_, index) => index.toString()}
    //     horizontal={true}
    //     showsHorizontalScrollIndicator={false}
    //   />
    //   {/* Shimmer effect for post */}
    //   <FlatList
    //     data={[1, 2, 3]} // Placeholder data
    //     showsVerticalScrollIndicator={false}
    //     renderItem={() => (
    //       <View style={{marginVertical: hp(2)}}>
    //         <ShimmerPlaceHolder
    //           LinearGradient={LinearGradient}
    //           style={{
    //             height: hp(60),
    //             width: wp(90),
    //             marginBottom: hp(2),
    //             borderRadius: wp(4),
    //           }}
    //           autoRun={true}
    //           visible={false}
    //         />
    //       </View>
    //     )}
    //     keyExtractor={(_, index) => index.toString()}
    //   />
    // </View>
    ''
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Image
        source={backgroundDesign_1}
        style={{height: hp(25), aspectRatio: 1 / 1, alignSelf: 'flex-end'}}
      />

      {/* Header.... */}
      <View
        // style={{
        //   position: 'absolute',
        //   flex: 1,
        //   width: '100%',
        //   paddingVertical: hp(2),
        //   top: 40,
        // }}
        style={Platform.select({
          ios: {
            position: 'absolute',
            flex: 1,
            width: '100%',
            paddingVertical: hp(2),
            top: 57,
          },
          android: {
            position: 'absolute',
            flex: 1,
            width: '100%',
            paddingVertical: hp(2),
          },
        })}>
        <View
          style={{
            paddingHorizontal: hp(3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#D60B52',
              fontSize: wp(4.5),
              fontWeight: '500',
              // fontStyle: 'italic',
              fontFamily: 'Lobster-Regular',
              flex: 1,
            }}>
            Hey {profile?.first_name}, how are you?
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Setting')}>
              {profile?.profile === null ? (
                <Image
                  source={businessProfile}
                  style={{height: hp(6), width: hp(6), borderRadius: wp(100)}}
                />
              ) : (
                <Image
                  source={{uri: profile?.profile}}
                  style={{height: hp(6), width: hp(6), borderRadius: wp(100)}}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDropdown}>
              <Image
                borderRadius={wp(100)}
                source={
                  selectedCountry?.image ? {uri: selectedCountry?.image} : globe
                }
                style={{height: hp(6), width: hp(6), marginLeft: wp(2)}}
              />
            </TouchableOpacity>

            {/* Dropdown List Of Country */}
            <ReactNativeModal
              onBackButtonPress={() => setIsDropdownVisible(false)}
              onBackdropPress={() => setIsDropdownVisible(false)}
              isVisible={isDropdownVisible}>
              <View
                style={Platform.select({
                  ios: {
                    position: 'absolute',
                    top: hp(10), // Adjust this value to position the dropdown as needed
                    right: wp(6), // Adjust this value to position the dropdown as needed
                    backgroundColor: '#fff',
                    padding: hp(2),
                    borderRadius: wp(2),
                    borderWidth: 1,
                    borderColor: '#ccc',
                    elevation: 5,
                    zIndex: 999,
                  },
                  android: {
                    position: 'absolute',
                    top: hp(8), // Adjust this value to position the dropdown as needed
                    right: wp(2), // Adjust this value to position the dropdown as needed
                    backgroundColor: '#fff',
                    padding: hp(2),
                    borderRadius: wp(2),
                    borderWidth: 1,
                    borderColor: '#ccc',
                    elevation: 5,
                    zIndex: 999,
                  },
                })}
                // style={{
                //   position: 'absolute',
                //   top: hp(8), // Adjust this value to position the dropdown as needed
                //   right: wp(2), // Adjust this value to position the dropdown as needed
                //   backgroundColor: '#fff',
                //   padding: hp(2),
                //   borderRadius: wp(2),
                //   borderWidth: 1,
                //   borderColor: '#ccc',
                //   elevation: 5,
                //   zIndex: 999,
                // }}
              >
                <Text
                  style={{
                    marginBottom: hp(1),
                    color: '#555',
                  }}>
                  Select Country
                </Text>

                <Text
                  onPress={() => {
                    setSelectedCountry({});
                    setIsDropdownVisible(false);
                  }}
                  style={{
                    color: '#000',
                    marginLeft: wp(1),
                    marginVertical: hp(0.5),
                  }}>
                  All
                </Text>

                {country?.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCountry(item);
                      setIsDropdownVisible(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: hp(0.5),
                    }}>
                    <Image
                      source={{
                        uri: item?.image,
                      }}
                      style={{
                        height: hp(3),
                        width: hp(3),
                      }}
                      borderRadius={hp(3)}
                    />
                    <Text style={{color: '#000', marginLeft: wp(2)}}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ReactNativeModal>
          </View>
        </View>

        <Image
          source={Design_3}
          resizeMode="contain"
          style={{width: '30%', alignSelf: 'center', marginTop: hp(-1)}}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(-12)}}>
        <View
          style={{
            marginHorizontal: wp(4),
          }}>
          <Text
            style={{
              color: 'rgba(214, 11, 82, 1)',
              fontSize: wp(5),
              letterSpacing: 2,
              alignSelf: 'center',
            }}>
            WE ARE WeUNITE
          </Text>
          <Text
            style={{
              marginTop: hp(2),
              color: '#828282',
              textAlign: 'center',
              fontStyle: 'italic',
              alignSelf: 'center',
            }}>
            WeUnite is devoted to creating a welcoming space, uniting women
            across diverse backgrounds and industries to uplift and empower each
            other...
          </Text>
          <Image
            source={Design_2}
            resizeMode="contain"
            style={{width: '60%', marginVertical: hp(2), alignSelf: 'center'}}
          />

          {/* category */}
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={category}
            renderItem={categoryItem}
            horizontal={true}
            keyExtractor={item => item.key}
            style={{marginBottom: hp(2)}}
          />

          {/* post */}
          <FlatList
            data={post}
            renderItem={postItem}
            ListEmptyComponent={() => (
              <ImageBackground
                borderRadius={wp(3)}
                source={homePostCard}
                style={{
                  marginHorizontal: hp(2),
                  marginVertical: hp(1),
                  paddingBottom: hp(2),
                }}>
                <View
                  style={{
                    marginTop: hp(4),
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: wp(4.5),
                      fontWeight: '500',
                    }}></Text>

                  <View
                    style={{
                      height: hp(28),
                      aspectRatio: 1 / 1,
                      alignSelf: 'center',
                      marginVertical: hp(2),
                      borderRadius: wp(3),
                    }}>
                    <Text
                      numberOfLines={3}
                      style={{
                        color: '#fff',
                        alignSelf: 'center',
                        textAlign: 'justify',
                      }}>
                      No posts to display
                    </Text>
                  </View>

                  <View style={{alignSelf: 'center'}}>
                    <Text
                      numberOfLines={3}
                      style={{
                        color: '#fff',
                        alignSelf: 'center',
                        textAlign: 'justify',
                      }}></Text>
                  </View>
                </View>
              </ImageBackground>
            )}
            keyExtractor={item => item?.key}
            style={{marginVertical: hp(2)}}
          />
        </View>
      </ScrollView>
      <FooterComponent title="Home" />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    paddingVertical: hp(2),

    height: hp(11),
    width: hp(11),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(6),
  },
  categoryIcon: {
    // height: hp(6),
    // aspectRatio: 1 / 1,
    // // width: hp(8),
    // alignSelf: 'center',
    // tintColor: '#706F6F',
    // height: hp(6.5),
    height: hp(9),
    aspectRatio: 1 / 1,
    // width: hp(8),
    alignSelf: 'center',
    tintColor: '#706F6F',
  },
  categoryIconAll: {
    // height: hp(6),
    // aspectRatio: 1 / 1,
    // // width: hp(8),
    // alignSelf: 'center',
    // tintColor: '#706F6F',
    // height: hp(6.5),
    height: hp(9),
    aspectRatio: 1 / 1,
    // width: hp(8),
    alignSelf: 'center',
    // tintColor: '#706F6F',
  },
  tt: {
    width: wp(20),
  },
  categoryName: {
    // borderWidth: wp(.1),
    color: '#6C3082',
    fontFamily: 'Poppins-Regular',
    // fontSize: hp(1.5),
    fontSize: hp(1.2),
    marginTop: hp(0.5),
    // fontWeight: "600",
    width: hp(11),
    // borderWidth: wp(.1),
    alignSelf: 'center',
    // marginTop: hp(1),
    textAlign: 'center',
  },
  dropdown: {},
});

//make this component available to the app
export default HomeScreen;