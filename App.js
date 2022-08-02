
// import React from 'react';
// import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import {NavigationContainer} from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const Tab = createBottomTabNavigator();
// const App = () => {
//   return ( 
//     <NavigationContainer>


//     </NavigationContainer>  
//   )
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default App
<script src="http://localhost:8097"></script>
import React from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';

import Icon from 'react-native-vector-icons/FontAwesome5';



const Tab = createBottomTabNavigator()

const App = () => {

  return ( 
    <NavigationContainer>
      <Tab.Navigator initialRouteHome = "Home"
        screenOptions={{
          tabBarStyle:{
            height: 65,
            paddingTop: 10,
            borderTopWidth: 0,
            backgroundColor: 'rgb(0,0,0)',
          },
          tabBarLabelStyle:{
            marginBottom:5,
            paddingBottom:5,
            fontSize: 10,
            fontWeight:"bold",
          },
          tabBarActiveTintColor:"white",

        }}
      >
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarIcon: ({color,size}) => {
             return <MaterialIcons name="home" size={30} color={color} />
            },
          }}
        />
        <Tab.Screen name="Search" component={SearchScreen} 
             options={{
              tabBarIcon: ({color,size}) => (
                <MaterialIcons name="search" size={30} color={color} />
              )
            }}
        />
        <Tab.Screen name="Library" component={LibraryScreen}
        
        options={{
          tabBarIcon: ({color,size}) => (
            <MaterialIcons name="my-library-music" size={30} color={color} />
          )
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>  
  )
}

const styles = StyleSheet.create({


})

export default App