import { StyleSheet, Text, View, ScrollView, Button, Image, TextInput, Pressable ,TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderUser from '../components/headerUser';
import SignInScreen from './LoginScreen';
import SignUpScreen from './RegisterScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';



const UserScreen = ({ navigation }) => {
    const [showUpload, setShowUpload] = useState(false);
    const [Title, onChangeTitle] = React.useState("");
    const [Artists, onChangeArtists] = React.useState("");
    const [Artworks, onChangeArtworks] = React.useState("");
    const [Url, onChangeUrl] = React.useState("");
    const [Type, onChangeType] = React.useState("");
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
                                onPress={() => { nav.navigate('LoginScreen') }}
                                title="Sign In"
                                color="black"
                                style={styles.signInBtn}
                            />
                        </View>
                        <View style={styles.btn} >
                            <Button
                                onPress={() => { nav.navigate('RegisterScreen') }}
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
                            <TouchableOpacity onPress={() => { setShowUpload(true) }} style={styles.textListLast}>
                                <View style={styles.leftList}>
                                    <MaterialCommunityIcons name="cloud-upload-outline" size={25} color="white" />
                                    <Text style={styles.textListHead}>
                                        Upload
                                    </Text>
                                </View>
                                <Text style={styles.textList}>7</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            showUpload ? (
                                <View style={styles.uploadMusicCont}>
                                    <TouchableOpacity onPress={() => { setShowUpload(false) }} style={styles.closeUpload}>
                                        <MaterialCommunityIcons name="close" size={20} color="white" />
                                    </TouchableOpacity>
                                    <View style={styles.Avatar}>
                                        <Image style={{ height: 160, width: 160, borderRadius: 160 / 2, }} source={require("../assets/img/songs/1.webp")} />
                                    </View>
                                    <View style={styles.block}>
                                        <TextInput
                                            placeholder="Title"
                                            onChangeText={onChangeTitle}
                                            placeholderTextColor="#b1b2b7"
                                            value={Title}
                                            style={styles.input}
                                        />
                                        <TextInput
                                            placeholder="Artist"
                                            onChangeText={onChangeArtists}
                                            placeholderTextColor="#b1b2b7"
                                            value={Artists}
                                            style={styles.input}

                                        />
                                        <TextInput
                                            placeholder="Artworks"
                                            onChangeText={onChangeArtworks}
                                            placeholderTextColor="#b1b2b7"
                                            value={Artworks}
                                            style={styles.input}
                                        />
                                        <TextInput
                                            placeholder="Music Url"
                                            placeholderTextColor="#b1b2b7"
                                            onChangeText={onChangeUrl}
                                            value={Url}
                                            style={styles.input}
                                        />
                                        <TextInput
                                            placeholder="Type"
                                            onChangeText={onChangeType}
                                            placeholderTextColor="#b1b2b7"
                                            value={Type}
                                            style={styles.input}
                                        />
                                    </View>
                                    <View style={styles.btnSub} >
                                        <Button
                                            onPress={() => { nav.navigate('RegisterScreen') }}
                                            title="Submit"
                                            color="#8A2BE2"
                                            style={styles.btnSub}
                                        />
                                    </View>
                                </View>
                            ) : null
                        }
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
        marginBottom: 10,
    },
    textListLast: {
        borderBottomWidth: 3,
        borderBottomColor: "#8A2BE2",
        marginBottom: 80,
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
    block: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        width: 335,
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        color: 'black',
        fontSize: 16,
        paddingLeft: 30,
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    uploadMusicCont: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#8A2BE2',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -60,
        marginBottom: 70,
        paddingTop: 20,
    },
    btnSub: {
        borderColor: "#8A2BE2",
        width: "100%",
    },
    closeUpload: {
        marginTop: -20,
        width: "100%",
    },
})

export default UserScreen;
