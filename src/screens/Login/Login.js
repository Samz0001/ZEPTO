import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWrapper from '../../components/AppWrapper';
import {myColors} from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        await AsyncStorage.setItem('key', JSON.stringify(userInfo));
        navigation.replace('Home');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log(error, 'PLease Try Again Later');
      }
    }
  };
  return (
    <AppWrapper>
      <StatusBar backgroundColor={myColors.violet} />
      <View
        style={{
          flex: 1,
          backgroundColor: myColors.violet,
          paddingHorizontal: 20,
        }}>
        <View style={{flex: 0.5}}>
          <Image
            style={{
              width: responsiveWidth(70),
              height: 100,
              alignSelf: 'center',
            }}
            source={{
              uri: 'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/12/zepto-1640066094.jpg',
            }}
          />
          <Text
            style={{
              color: myColors.white,
              fontSize: responsiveFontSize(1.7),
              textAlign: 'center',
              top: -20,
              letterSpacing: 1.4,
            }}>
            10 Minutes Delivery!
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'red',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={signIn}
            activeOpacity={0.8}
            style={{
              backgroundColor: myColors.white,
              padding: 15,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 10,
            }}>
            <AntDesign name="google" size={25} color={myColors.violet} />
            <Text
              style={{
                color: myColors.black,
                fontSize: responsiveFontSize(1.7),
                fontWeight: '700',
              }}>
              SignIn with Google
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: myColors.white,
              fontSize: responsiveFontSize(1.4),
              fontWeight: '400',
              textAlign: 'center',
              top: 10,
            }}>
            I accept the terms & privacy policy
          </Text>
        </View>
      </View>
    </AppWrapper>
  );
};

export default Login;
