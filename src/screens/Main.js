/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
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

const Main = () => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
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
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white'}}>{location.city}</Text>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 160,
          left: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {Locations.map((location, index) => {
          return (
            <View
              style={{
                height: 5,
                width: 5,
                borderRadius: 5,
                marginHorizontal: 4,
                backgroundColor: '#fff',
              }}
            />
          );
        })}
      </View>
    </>
  );
};
export default Main;
// const styles = StyleSheet.create({});
