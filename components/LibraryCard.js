import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Evillcons from 'react-native-vector-icons/EvilIcons';
const LibraryCard = ({ img, name, artist, duration, singer, id, url }) => {
    const nav = useNavigation();
    return (
        // <View style={styles.container}>
        //     <Pressable onPress={() => nav.navigate("MusicPlayer", { name: name })} >
        //         <Image style={{ height: 160, width: 160, borderRadius: 20, }} source={require("../assets/img/songs/2.jpeg")} />
        //         <Text style={styles.text} numberOfLines={1}>{name}</Text>
        //         <Text style={styles.subText} numberOfLines={1}>{artists}</Text>
        //     </Pressable>
        // </View>
        <TouchableOpacity onPress={() => nav.navigate("SingleMusicPlayer", { name: name, duration: duration, singer: singer, img: img, id: id, url: url })} >
            <View style={styles.card}>
                <View style={styles.cardImg}>
                    <Image style={{ height: 100, width: 100, }} source={{ uri: img }} />
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.subText}>{singer}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 20,
    },
    cardCreate: {
        flexDirection: 'row',
        marginBottom: 20,

    },
    card: {
        flexDirection: 'row',
        marginBottom: 20,

    },
    text: {
        fontSize: 18,
        color: '#ffffff',
    },
    subText: {
        fontSize: 14,
        color: '#7e7e7e',
        marginTop: 8,
    },
    cardText: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20,
    },
})

export default LibraryCard;