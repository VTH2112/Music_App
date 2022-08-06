import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useEffect } from 'react';
import HeaderCard from '../../components/HeaderCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native';
import { IconButton, MD3Colors } from 'react-native-paper';
import ListMusic from '../../components/listMusic';
import { cardData, showCardData, MixCardData } from '../../data/Data';


const MusicPlayerScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    const route = useRoute()

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#5d5640', '#111', '#111', '#111', '#111', '#111']} start={{ x: -0.1, y: 0.4 }} end={{ x: 1, y: 1 }} location={[0.01, 0.2, 0.3, 1, 1, 1]}>
                <ScrollView>
                    <HeaderCard />
                    <View style={styles.headContainer}>
                        <View style={styles.textCont}>
                            <Text style={styles.text}>{route.params.name}
                            </Text>
                        </View>
                        <View style={styles.imgDisk}>
                            <Image style={{ height: 330, width: 330, borderRadius: 330 / 2 }} resizeMode={"cover"} source={require("../../assets/img/songs/1.webp")} />
                        </View>
                        <View style={styles.iconCont}>
                            <IconButton style={styles.icon}
                                icon="reload"
                                color="white"
                                size={35}
                                onPress={() => {
                                    navigation.navigate('#')
                                }}
                            />
                            <IconButton style={styles.icon}
                                icon="step-backward"
                                color="white"
                                size={35}
                                onPress={() => { navigation.navigate('#') }}
                            />
                            <IconButton style={styles.icon}
                                icon="pause"
                                color="white"
                                size={35}
                                onPress={() => { navigation.navigate('#') }}
                            />
                            <IconButton style={styles.icon}
                                icon="step-forward"
                                color="white"
                                size={35}
                                onPress={() => { navigation.navigate('#') }}
                            />
                            <IconButton style={styles.icon}
                                icon="shuffle-variant"
                                color="white"
                                size={35}
                                onPress={() => { navigation.navigate('#') }}
                            />
                        </View>
                    </View>
                    <View style={styles.songCont}>
                        <View style={styles.songBorder}>
                            <View style={styles.ImageSongCont}>
                                <Image style={{ height: 80, width: 80, borderRadius: 120 / 2 }} source={require("../../assets/img/songs/13.webp")} />
                            </View>
                            <View style={styles.textSongCont}>
                                <Text style={styles.songText} numberOfLines={1}>{route.params.name}</Text>
                                <Text style={styles.subText} numberOfLines={1}>{route.params.singer}</Text>
                            </View>
                            <View style={styles.iconSongCont}>
                                <IconButton style={styles.icon}
                                    icon="heart"
                                    color="white"
                                    size={17}
                                    onPress={() => { navigation.navigate('#') }}
                                />
                                <Text style={styles.duration}>{route.params.duration}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ListMusic}>
                        {cardData.map(dat =>
                            <ListMusic key={dat.name} name={dat.name} duration={dat.duration} singer={dat.singer} />
                        )}
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgDisk: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    textCont: {
        marginBottom: 60,
        marginTop: -73,
    },
    headContainer: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCont: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginRight: 10,
        marginLeft: 10,
    },
    text: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,

    },
    songCont: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 330,
        marginLeft: 50,
    },
    songBorder: {
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
    ImageSongCont: {
        marginLeft: -18,
    },
    textSongCont: {
        marginLeft: 15,
        marginRight: 5,
        flex: 1,

    },

    songText: {
        fontSize: 17,
        color: "white",

    },
    subText: {
        fontSize: 12,

    },
    duration: {
        marginRight: 0,
        marginTop: 0,
        fontSize: 11,
    },
    ListMusic: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 50,
        marginBottom: 80,

    }
})

export default MusicPlayerScreen;

