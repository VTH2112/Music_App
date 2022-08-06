import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native';
import React, { useEffect } from 'react';
import HeaderUser from '../components/headerUser';
import SignInScreen from './signInScreen';
import SignUpScreen from './signUpScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const UserScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    const nav = useNavigation();
    return (


        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#7B68EE', '#111', '#111', '#111', '#111', '#111']} start={{ x: -0.3, y: 0.2 }} end={{ x: 1, y: 1.2 }} location={[0.01, 0.2, 0.3, 1, 1, 1]}>
                <ScrollView>
                    <HeaderUser />
                    <View style={styles.topCont} >
                        <View style={styles.Avatar}>
                            <Image style={{ height: 160, width: 160, borderRadius: 160 / 2, }} source={require("../assets/img/songs/1.webp")} />
                        </View>
                        <View style={styles.btn} >
                            <Button
                                onPress={() => { nav.navigate('SignInScreen') }}
                                title="Sign In"
                                color="black"
                                style={styles.signInBtn}
                            />
                        </View>
                        <View style={styles.btn} >
                            <Button
                                onPress={() => { nav.navigate('SignUpScreen') }}
                                title="Sign Up"
                                color="black"
                                style={styles.signUpBtn}
                            />
                        </View>
                    </View>
                    <View style={styles.centerCont}>
                        <View style={styles.textHeadBorder}>
                            <Text style={styles.textHead}>
                                Offline Music
                            </Text>
                        </View>
                        <View style={styles.textCentBorder}>
                            <View style={styles.listItem}>
                                <View style={styles.leftList}>
                                    <MaterialCommunityIcons name="music-note" size={25} color="white" />
                                    <Text style={styles.textListHead}>
                                        Music
                                    </Text>
                                </View>
                                <Text style={styles.textList}>123</Text>
                            </View>
                            <View style={styles.listItem}>
                                <MaterialCommunityIcons name="music-box-multiple" size={25} color="white" />
                                <View style={styles.leftList}>
                                    <Text style={styles.textListHead}>
                                        Album
                                    </Text>
                                </View>
                                <Text style={styles.textList}>42</Text>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.leftList}>
                                    <MaterialCommunityIcons name="account" size={25} color="white" />
                                    <Text style={styles.textListHead}>
                                        Artists
                                    </Text>
                                </View>
                                <Text style={styles.textList}>38</Text>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.leftList}>
                                    <MaterialCommunityIcons name="download-outline" size={25} color="white" />
                                    <Text style={styles.textListHead}>
                                        Download
                                    </Text>
                                </View>
                                <Text style={styles.textList}>7</Text>
                            </View>
                        </View>
                        <View style={styles.textHeadBorder}>
                            <Text style={styles.textHead}>
                                Online Music
                            </Text>
                        </View>
                        <View style={styles.textBottomBorder}>
                            <View style={styles.listItem}>
                                <View style={styles.leftList}>
                                    <MaterialCommunityIcons name="heart" size={25} color="white" />
                                    <Text style={styles.textListHead}>
                                        Favorite
                                    </Text>
                                </View>
                                <Text style={styles.textList}>123</Text>
                            </View>
                            <View style={styles.listItem}>
                                <View style={styles.leftList}>
                                    <MaterialCommunityIcons name="music" size={25} color="white" />
                                    <Text style={styles.textListHead}>
                                        Playlist
                                    </Text>
                                </View>
                                <Text style={styles.textList}>42</Text>
                            </View>
                            <View style={styles.textListLast}>
                                <View style={styles.leftList}>
                                    <MaterialCommunityIcons name="cloud-upload-outline" size={25} color="white" />
                                    <Text style={styles.textListHead}>
                                        Upload
                                    </Text>
                                </View>
                                <Text style={styles.textList}>7</Text>
                            </View>
                        </View>
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
    topCont: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: 180,
        marginBottom: 30,

    },
    Avatar: {
        marginLeft: 20,
    },
    btn: {
        height: '23%',
        width: "20%",
        borderWidth: 3,
        borderColor: "white",
        borderRadius: 10,
        marginLeft: 10,
    },
    centerCont: {
        flex: 1,
        marginLeft: 25,
        marginRight: 25,
    },
    textHead: {
        fontSize: 23,
    },
    textHeadBorder: {
        borderBottomWidth: 3,
        borderBottomColor: "#8A2BE2",
        marginBottom: 20,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: "#663399",
        marginBottom: 20,
    },
    textListHead: {
        fontSize: 17,
        marginLeft: 5,
        alignItems: 'flex-end',
    },
    textBottomBorder: {
        marginBottom: 60,
    },
    textListLast: {
        borderBottomWidth: 3,
        borderBottomColor: "#8A2BE2",
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 50,
    },
    leftList: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
})

export default UserScreen;
