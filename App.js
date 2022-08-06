<script src="http://localhost:8097"></script>
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Animated, { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import PremiumScreen from './screens/PremiumScreen';
import MusicPlayerScreen from './screens/MusicPlayer';
import NotiScreen from './screens/NotiScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingScreen from './screens/SettingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { AuthContext } from './context/auth';

import Icon from 'react-native-vector-icons/FontAwesome5';



const Tab    = createBottomTabNavigator()
const Stack  = createNativeStackNavigator()

const HomeStack = ({ navigation }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
              <Stack.Screen name="NotiScreen" component={NotiScreen} />
              <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
              <Stack.Screen name="SettingScreen" component={SettingScreen} />

    </Stack.Navigator>
  )
}
const AuthStack = ({ navigation }) => {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

const Maintab = ({ navigation }) => {
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        height: 65,
        paddingTop: 10,
        borderTopWidth: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
        elevation: 0,

      },
      tabBarLabelStyle: {
        marginBottom: 5,
        paddingBottom: 5,
        fontSize: 10,
        fontWeight: "bold",
      },
      tabBarActiveTintColor: "white",

    }}

  >
    <Tab.Screen name="Home" component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => {
          return <MaterialIcons name="home" size={30} color={color} />
        },
      }}
    />



    <Tab.Screen name="Search" component={SearchScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="search" size={30} color={color} />
        )
      }}
    />
    <Tab.Screen name="Library" component={LibraryScreen}

      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="my-library-music" size={30} color={color} />
        )
      }}
    />
    <Tab.Screen name="Premium" component={PremiumScreen}

      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="spotify" size={30} color={color} />
        )
      }}
    />
  </Tab.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (user) {
      console.log('hello');
    }
  },[user]);

  return (
    <AuthContext.Provider value={{user: user, setUser:setUser}}>
      <NavigationContainer >
        {user && <Maintab navigation ={ {headerShown: false}} />}
        {!user && <AuthStack />}
        {/* <Maintab /> */}
      </NavigationContainer >
    </AuthContext.Provider>

  )
}


const styles = StyleSheet.create({


})

