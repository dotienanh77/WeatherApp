/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

import Locations from '../model/locations';

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
  // useEffect(() => {
  //   //TODO fetch something
  // }, [])
  // const [state, setState] = useState(initialStateValue)
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await fetch(
      'http://api.openweathermap.org/data/2.5/weather?appid=86183a23377ed034aef7aad102f43d64&units=metric&q=Hanoi',
    );
    const jsondata = await res.json();

    // console.log(jsondata.main.temp);
    setTemperature(jsondata.main.temp);
    setWind(jsondata.wind.speed);
    setHumidity(jsondata.main.humidity);
  };
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  // const updateTemperature = () => setTemperature(jsondata.main.temp);
  // const fetchData = () => {
  //   fetch(
  //     'http://api.openweathermap.org/data/2.5/weather?appid=86183a23377ed034aef7aad102f43d64&units=metric&q=Hanoi',
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((jsonData) => {
  //       console.log(jsonData);
  //     });
  // };

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
                        {`${temperature}\u2103`}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
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
                  <View style={styles.bottomInfoWrapper}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Wind</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {wind}
                      </Text>
                      <Text style={styles.infoText}>km/h</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.wind / 2,
                            height: 5,
                            backgroundColor: '#69F0AE',
                            borderRadius: 5,
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Rain</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {location.rain}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.rain / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                            borderRadius: 5,
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Humidty</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {humidity}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.humidity / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                            borderRadius: 5,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={() => {}}>
          <SearchIcon width={25} height={25} fill="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MenuIcon width={25} height={25} fill="#fff" />
        </TouchableOpacity>
      </View>
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
  bottomInfoWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoBar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'absolute',
    paddingHorizontal: 20,
    top: 0,
    width: '100%',
    height: getStatusBarHeight() + 40,
  },
});
