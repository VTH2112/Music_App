

import {StyleSheet,Text,View,ScrollView} from 'react-native';
import React,{useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import  Header  from '../components/Header';
import PlaylistCard from '../components/PlaylistCard';
import ShowCard from '../components/ShowCard';
import LinearGradient from 'react-native-linear-gradient'
import TrendingCard from '../components/TrendingCard';
import  data from '../data/Data';
import MixCard from '../components/MixCard';
import Icon from 'react-native-vector-icons/FontAwesome5';


console.log(data);
console.log(data.map(dat=>  dat.img));
// for(let i of cardData){
//     console.log(i);
// }
// console.log(cardData.map(dat=>  dat.name));
<script src="http://localhost:8097"></script>
    const HomeScreen = ({navigation}) => {
        useEffect(() => {
            navigation.setOptions({
                headerShown: false,
            });
        },[])
    
    return (
        <SafeAreaView style= {styles.container}>
            <LinearGradient   colors={['#8a0a0a','#111','#111','#111','#111','#111']}start ={{x:-0.1,y:0.2}} end ={{x:1,y:1}} location={[0.01,0.2,0.3,1,1,1]}>
            <ScrollView>
                <View style={styles.subContainer}> 
                    <Header />
                    <View style={styles.cardContainer}>
                        {
                        data.map(dat=>
                            <PlaylistCard key={dat.name} name={dat.name} img={dat.img}/>
                            )}
                    </View>
                    
                    
                    <View style={styles.showContainer}>

                    </View>
                </View>
            </ScrollView>
            </LinearGradient>
          
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    subContainer:{
        paddingRight:15,
        paddingLeft:15,
    },
    cardContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight:210,
    },
    text:{
        color:"white",
        fontSize:22,
        fontWeight:"bold",
        marginBottom:20,
    }
})

export default HomeScreen;

