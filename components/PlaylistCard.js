import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import LibraryScreen from '../screens/LibraryScreen';
import { useNavigation } from '@react-navigation/native';
import { cardData, showCardData, MixCardData } from '../data/Data';
import MusicPlayerScreen from '../screens/musicPlayerHomeScreen/MusicPlayer';
const PlaylistCard = ({ img, name, duration, singer }) => {
    console.log(img);
    const nav = useNavigation();
    return (
        <View style={styles.container}>

            <Pressable onPress={() => nav.navigate("MusicPlayer", { name: name, duration: duration, singer: singer })} style={styles.container1}>
                <Image style={{ height: 60, width: 60 }} source={require("../assets/img/songs/13.webp")} />
                <View style={styles.textCont} component={LibraryScreen}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: 170,
        maxWidth: 210,
        maxHeight: 60,
        backgroundColor: "rgba(51,51,51,0.7)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: 8,
        marginBottom: 9,

    },
    container1: {
        flex: 1,
        minWidth: 170,
        maxWidth: 210,
        maxHeight: 60,
        backgroundColor: "rgba(51,51,51,0.7)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 4,
        overflow: 'hidden',
    },
    textCont: {
        textAlign: "center",
        width: "55%",

    },
    text: {
        color: "white",
        marginRight: 2,
        marginLeft: -10,
    }
})

export default PlaylistCard
