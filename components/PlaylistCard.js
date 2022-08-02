import {StyleSheet,Text,View,Image} from 'react-native';
import React from 'react';

const PlaylistCard = ({ img , name}) => {
    console.log(img);
    return (
        
        <View style={styles.container}>
            <Image style={{height:60,width:60}} source={require("../assets/img/songs/13.webp")} />
            <View style={styles.textCont}> 
                <Text style={styles.text}>{name}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        minWidth:170,
        maxWidth:210,
        maxHeight:60,
        backgroundColor:"rgba(51,51,51,0.7)",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderRadius:4,
        overflow:'hidden',
        marginRight:8,
        marginBottom:9,

    },
    textCont:{
        textAlign:"center",
        width:"55%",

    },
    text:{
        color:"white",
    }
})

export default PlaylistCard
