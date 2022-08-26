import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const PlaylistCard = ({ img, name, artist, duration, singer, id, url }) => {
    const nav = useNavigation();
    //console.log('show card: ' +img, name, artist, duration, singer ,id, url)
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                nav.navigate("MusicPlayer", { name: name, duration: duration, singer: singer, img: img, id: id, url: url });
            }}>
                {/* <Pressable onPress={() => nav.navigate("SingleMusicPlayer")} > */}
                <Image style={{ height: 330, width: 363, borderRadius: 20, resizeMode: "stretch", }} source={{ uri: img }} />
                <Text style={styles.text} numberOfLines={1}>{name}</Text>
                <Text style={styles.subText} numberOfLines={1}>{singer}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default PlaylistCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        minHeight: 380,
        maxWidth: 380,
        marginRight: 20,

    },
    text: {
        color: "white",
        marginTop: 10,
        fontWeight: "800",
    },
    subText: {
        color: "gray",
        marginTop: 4,
        fontWeight: "800",
    }
})