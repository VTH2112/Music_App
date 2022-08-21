import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Button, TextInput, Pressable, StyleSheet, Settings } from "react-native";
import axiosIntance, { updateToken } from "../apis/axios";
import { AuthContext } from "../context/auth";
import { response } from "express";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { color } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const LoginScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    const [username, setUername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const userCtx = useContext(AuthContext)
    const nav = useNavigation();
    const gotoRegister = () => {
        nav.navigate("RegisterScreen");

    }
    const handbleSubmit = async () => {
        if (submit) {
            const res = await axiosIntance.post('auth/signin', {
                username: username,
                password: password
            }).catch(error => setMessage(error.message))
            console.log(res.data.user.username);
            await userCtx.setUser(res.data.user.username);
            await updateToken(res.data.token);
            await AsyncStorage.setItem('token', res.data.token)
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.loginCont}>
                <View style={styles.logo}>
                    <MaterialCommunityIcons name="spotify" size={70} color={"#2ebd59"} />
                    <Text style={styles.logoText}>Spotify</Text>
                </View>
                <View style={styles.blockHead}>
                    <Pressable style={styles.btnSignIn}>
                        <Text style={styles.text}>SIGN IN</Text>
                    </Pressable>
                    <Pressable onPress={gotoRegister} style={styles.btnSignUp}>
                        <Text style={styles.text}>SIGN UP</Text>
                    </Pressable>
                </View>
                <View style={styles.block}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#b1b2b7"
                        value={username}
                        style={styles.input}
                        onChangeText={
                            newText => {
                                setUername(newText);
                                if (newText && password) { setSubmit(true) } else { setSubmit(false) };
                            }
                        } />

                </View>
                <View style={styles.block}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#b1b2b7"
                        value={password}
                        style={styles.input}
                        password={true}
                        secureTextEntry={true}
                        onChangeText={
                            newText => {
                                setPassword(newText);
                                if (newText && username) { setSubmit(true) } else { setSubmit(false) };
                            }
                        }
                    />
                </View>
                <Text style={{ color: 'white', marginBottom: 20, fontSize: 15 }}>
                    {message}
                </Text>
                <Pressable onPress={handbleSubmit} style={submit ? (styles.buttonEnable) : (styles.buttonDisable)}  >
                    <Text style={submit ? (styles.textEnable) : (styles.textDisable)} >SIGN IN</Text>
                </Pressable>
                <Pressable style={styles.btnForgot}>
                    <Text style={styles.textForgot}>Forgot Password ?</Text>
                </Pressable>
            </View>
        </KeyboardAwareScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e2f33'
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    logoText: {
        fontSize: 35,
        color: "#ffffff",
        marginLeft: 10,
    },
    loginCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
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
        paddingTop: 10
    },
    blockHead: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    block: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 25,
    },
    buttonEnable: {
        width: 335,
        height: 55,
        borderRadius: 50,
        backgroundColor: '#2ebd59',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 30,
    },
    buttonDisable: {
        width: 335,
        height: 55,
        borderRadius: 50,
        backgroundColor: '#a9a9a9',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 30,
    },
    textEnable: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    },
    textDisable: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'gray'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
    },
    textForgot: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#969799',
    },
    btnSignIn: {
        width: 80,
        height: 40,
        borderColor: '#2ebd59',
        borderBottomWidth: 3,
        backgroundColor: '#2e2f33',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 50
    },
    btnSignUp: {
        width: 80,
        height: 40,
        // borderColor: '#2ebd59',
        // borderBottomWidth: 3,
        backgroundColor: '#2e2f33',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginLeft: 25,
        marginTop: 50
    },
    btnForgot: {
        marginTop: 55,
    },
})
export default LoginScreen;