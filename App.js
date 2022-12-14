
import React, { useEffect , useState} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Animated, { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import UserScreen from './screens/UserScreen';
import MusicPlayerScreen from './screens/musicPlayerHomeScreen/MusicPlayer';
import SingleMusicPlayerScreen from './screens/musicPlayerHomeScreen/singleMusicPlayer';
import NotiScreen from './screens/musicPlayerHomeScreen/NotiScreen';
import HistoryScreen from './screens/musicPlayerHomeScreen/HistoryScreen';
import SettingScreen from './screens/musicPlayerHomeScreen/SettingScreen';
import userScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { AuthContext } from './context/auth';
import UpSongScreen from './screens/upSong';


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = ({ navigation }) => {
  // useEffect(() => {
  //   // navigation.setOptions({
  //   //   headerShown: false,
  //   // });
  // }, [])
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="HomeStack" component={HomeScreen} option={{ title: 'Home' }} />
      <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} option={{ title: 'MusicPlayer' }} />
      <Stack.Screen name="SingleMusicPlayer" component={SingleMusicPlayerScreen} option={{ title: 'SingleMusicPlayer' }} />
      <Stack.Screen name="NotiScreen" component={NotiScreen} option={{ title: 'NotiScreen' }} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} option={{ title: 'HistoryScreen' }} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} option={{ title: 'SettingScreen' }} />
    </Stack.Navigator>

  )
}
const SearchStack = ({ navigation }) => {
  // useEffect(() => {
  //   // navigation.setOptions({
  //   //   headerShown: false,
  //   // });
  // }, [])
  return (
    <Stack.Navigator initialRouteName='Search'>
      <Stack.Screen name="SearchStack" component={SearchScreen} option={{ title: 'Search' }} />
      <Stack.Screen name="SingleMusicPlayer" component={SingleMusicPlayerScreen} option={{ title: 'SingleMusicPlayer' }} />
    </Stack.Navigator>

  )
}

const UserStack = ({ navigation }) => {
  // useEffect(() => {
  //   // navigation.setOptions({
  //   //   headerShown: false,
  //   // });
  // }, [])
  return (
    <Stack.Navigator initialRouteName='User'>
      <Stack.Screen name="UserStack" component={userScreen} option={{ title: 'User' }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} option={{ title: 'SignIn' }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} option={{ title: 'SignUp' }} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} option={{ title: 'SettingScreen' }} />
      <Stack.Screen name="UpSongScreen" component={UpSongScreen} option={{ title: 'UpSongScreen' }} />
    </Stack.Navigator>

  )
}

const LibraryStack = ({ navigation }) => {
  // useEffect(() => {
  //   // navigation.setOptions({
  //   //   headerShown: false,
  //   // });
  // }, [])
  return (
    <Stack.Navigator initialRouteName='Library'>
      <Stack.Screen name="LibraryStack" component={LibraryScreen} option={{ title: 'Library' }} />
      <Stack.Screen name="SingleMusicPlayer" component={SingleMusicPlayerScreen} option={{ title: 'SingleMusicPlayer' }} />
    </Stack.Navigator>

  )
}
const AuthStack = ({ navigation }) => {
  // useEffect(() => {
  //   // navigation.setOptions({
  //   //   headerShown: false,
  //   // });
  // }, [])
  return (
    <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen name="LoginScreen" component={LoginScreen} option={{ title: 'SignIn' }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} option={{ title: 'SignUp' }} />
      <Stack.Screen name="HomeStack" component={HomeScreen} option={{ title: 'Home' }} />
    </Stack.Navigator>

  )
}
const Maintab = ({ navigation }) => {
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
    headerShown: false
  }}
>
  <Tab.Screen name="Home" component={HomeStack}
    options={{
      tabBarIcon: ({ color, size }) => {
        return <MaterialIcons name="home" size={30} color={color} />
      },
    }}
  />
  <Tab.Screen name="Search" component={SearchStack}
    options={{
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="search" size={30} color={color} />
      )
    }}
  />
  <Tab.Screen name="Library" component={LibraryStack}

    options={{
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="my-library-music" size={30} color={color} />
      )
    }}
  />
  <Tab.Screen name="User" component={UserStack}

    options={{
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="account" size={30} color={color} />
      )
    }}
  />
</Tab.Navigator>)
};

export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (user) {
      console.log(user);
    }
  },[user]);
  return (
    <AuthContext.Provider value={{user: user, setUser:setUser}}>
      <NavigationContainer >
        {/* {user && <Maintab  navigation ={ {headerShown: false}} />}
        {!user && <AuthStack />} */}
        <Maintab />
      </NavigationContainer >
    </AuthContext.Provider>
  )
}


const styles = StyleSheet.create({


})

