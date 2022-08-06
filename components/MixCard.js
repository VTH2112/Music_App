import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const MixCard = ({ img, name, artists }) => {
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable onPress={() => nav.navigate("MusicPlayer", { name: name })} >
                <Image style={{ height: 160, width: 160, borderRadius: 20, }} source={require("../assets/img/songs/2.jpeg")} />
                <Text style={styles.text} numberOfLines={1}>{name}</Text>
                <Text style={styles.subText} numberOfLines={1}>{artists}</Text>
            </Pressable>
        </View>
    )
}
export default MixCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        minHeight: 220,
        maxHeight: 220,
        maxWidth: 160,
        marginRight: 20
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