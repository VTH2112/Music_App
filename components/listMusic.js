import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderCard from '../components/HeaderCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native';
import { IconButton, MD3Colors } from 'react-native-paper';
const ListMusic = ({ img, name, artist, duration, singer, id, url }) => {
    const nav = useNavigation();
    const [isShow, setIsShow] = useState(true);
    return (
        <TouchableOpacity onPress={() => {
            nav.navigate("MusicPlayer", { name: name, duration: duration, singer: singer, img: img, id: id, url: url })
            setIsShow(true);
        }}>
            <View style={styles.listSongCont}>
                <View style={styles.listSongBorder}>
                    <View style={styles.listImageSongCont}>
                        <Image style={{ height: 80, width: 80, borderRadius: 120 / 2 }} source={{ uri: img }} />
                    </View>
                    <View style={styles.listTextSongCont}>
                        <Text style={styles.listSongText} numberOfLines={1}>{name}</Text>
                        <Text style={styles.listSubText} numberOfLines={1}>{singer}</Text>
                    </View>
                    <View style={styles.listIconSongCont}>
                        <IconButton style={styles.listIcon}
                            icon="heart"
                            color="white"
                            size={17}
                            onPress={() => { navigation.navigate('#') }}
                        />
                        <Text style={styles.listDuration}>{duration}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listSongCont: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 330,
        marginLeft: 50,
    },
    listSongBorder: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 330,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    listImageSongCont: {
        marginLeft: -18,
    },
    listTextSongCont: {
        marginLeft: 15,
        marginRight: 5,
        flex: 1,

    },

    listSongText: {
        fontSize: 17,
        color: "white",

    },
    listSubText: {
        fontSize: 12,

    },
    listDuration: {
        marginRight: 0,
        marginTop: 0,
        fontSize: 11,
    },

})

export default ListMusic;

