/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  Animated,
} from 'react-native';

import Locations from '../model/locations';

// import SunIcon from './assets/sun.svg';
// import CloudIcon from './assets/cloudy.svg';
// import MoonIcon from './assets/moon.svg';
// import RainIcon from './assets/rain.svg';
// import MenuIcon from './assets/menu.svg';
// import SearchIcon from './assets/search.svg';

// import {getStatusBarHeight} from 'react-native-status-bar-height';

// const WeatherIcon = (weatherType) => {
//   if (weatherType == 'Sunny') {
//     return <SunIcon width={34} height={34} fill="#fff" />;
//   }
//   if (weatherType == 'Rainy') {
//     return <RainIcon width={34} height={34} fill="#fff" />;
//   }
//   if (weatherType == 'Cloudy') {
//     return <CloudIcon width={34} height={34} fill="#fff" />;
//   }
//   if (weatherType == 'Night') {
//     return <MoonIcon width={34} height={34} fill="#fff" />;
//   }
// };
import SunIcon from '../assets/sun.svg';
import CloudIcon from '../assets/cloudy.svg';
import MoonIcon from '../assets/moon.svg';
import RainIcon from '../assets/rain.svg';
import MenuIcon from '../assets/menu.svg';
import SearchIcon from '../assets/search.svg';
const WeatherIcon = (weatherType) => {
  if (weatherType === 'Night') {
    return <MoonIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Cloudy') {
    return <CloudIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Sunny') {
    return <SunIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Rainy') {
    return <RainIcon width={34} height={34} fill="#fff" />;
  }
};
const Main = () => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={1}>
        {Locations.map((location, index) => {
          if (location.weatherType === 'Night') {
            bgImg = require('../assets/night2.jpg');
          }
          if (location.weatherType === 'Cloudy') {
            bgImg = require('../assets/cloudy.jpeg');
          }
          if (location.weatherType === 'Sunny') {
            bgImg = require('../assets/sunny.jpg');
          }
          if (location.weatherType === 'Rainy') {
            bgImg = require('../assets/rainy.jpg');
          }
          return (
            <View
              style={{width: windowWidth, height: windowHeight}}
              key={index}>
              <ImageBackground
                source={bgImg}
                style={{
                  flex: 1,
                }}>
                <View style={styles.container}>
                  <View style={styles.topInfoWrapper}>
                    <View>
                      <Text style={styles.city}>{location.city}</Text>
                      <Text style={styles.time}>{location.dateTime}</Text>
                    </View>
                    <View>
                      <Text style={styles.temperature}>
                        {location.temperature}
                      </Text>
                      <View>
                        {WeatherIcon(location.weatherType)}
                        <Text style={styles.weatherType}>
                          {location.weatherType}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgba(255,255,255,0.7)',
                      marginTop: 20,
                      borderBottomWidth: 1,
                    }}
                  />
                  <View style={styles.bottomInfoWrapper} />
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.indicatorWrapper}>
        {Locations.map((location, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [5, 12, 5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View key={index} style={[styles.normalDot, {width}]} />
          );
        })}
      </View>
    </>
  );
};
export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  normalDot: {
    height: 5,
    width: 5,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  indicatorWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    top: 160,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topInfoWrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
  },
  city: {
    fontSize: 30,
    color: '#fff',
    // fontFamily: 'Lato-Regular ',
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    // fontFamily: 'Lato-Regular ',
    fontWeight: 'bold',
  },
  temperature: {
    color: '#fff',
    fontSize: 85,
    // fontFamily: 'Lato-Thin',
  },
  weatherType: {
    color: '#fff',
    fontSize: 25,
    lineHeight: 34,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bottomInfoWrapper: {},
});
