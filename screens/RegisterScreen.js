import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Button, TextInput, Pressable, StyleSheet, Settings, Alert, TouchableOpacity } from "react-native";
import axiosIntance, { updateToken } from "../apis/axios";
import { AuthContext } from "../context/auth";
import { response } from "express";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { color } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const RegisterScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    const [username, setUername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordcfm, setPasswordcfm] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const userCtx = useContext(AuthContext)
    const nav = useNavigation();
    const gotoRegister = () => {
        nav.navigate("LoginScreen");
    }
    const validateUsername = (Inusername) => {
        const reg = /^[a-z0-9_-]{3,15}$/;
        return reg.test(Inusername)
    };
    const validateEmail = (Inemail) => {
        const reg = /\S+@\S+\.\S+/
        return reg.test(Inemail);
    };
    const validatePassword = (Inpassword) => {
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        return reg.test(Inpassword);
    };
    const validatePasswordcfm = (Inpasswword, Inpasswordcfm) => {
        if (Inpasswword !== Inpasswordcfm) {
            return false;
        }
        return true;
    };
    const validating = async () => {
        let err = true;
        if (await !validateUsername(username)) {
            setMessage('USER NAME IS INVALID, INPUT AGAIN');
            err = false;
        }
        if (err && await !validateEmail(email)) {
            setMessage('EMAIL ADDRESS IS INVALID, INPUT AGAIN');
            err = false;
        }
        if (err && await !validatePassword(password)) {
            setMessage('PASSWORD IS INVALID, INPUT AGAIN');
            err = false;
        }
        if (err && await !validatePasswordcfm(password, passwordcfm)) {
            setMessage('PASSWORD CONFIRM NOT MATCH');
            err = false;
        }
        if (err) {
            setMessage('')
        }
        return err;
    }

    const handbleSubmit = async () => {
        let err = true;
        let errms = '';
        if (submit) {
            err = await validating();
            try {
                if (await validating) {
                    try {
                        const res = await axiosIntance.post('auth/signup', {
                            username: username,
                            password: password,
                            email: email,

                        })
                        const resLogin = await axiosIntance.post('auth/signin', {
                            username: username,
                            password: password
                        })
                        userCtx.setUser(resLogin.data.user.username);
                        updateToken(resLogin.token);
                        AsyncStorage.setItem('token', resLogin.token)
                    } catch (error) {
                        console.log(error);
                        setMessage('CAN NOT REGISTER NOW');
                    }
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    };
    const HandlerEndEditting = () => {
        if (!username || !password || !passwordcfm || !email) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    // const validate= () => {

    // }

    return (
        <KeyboardAwareScrollView style={styles.container} behavior="height" >
            <View style={styles.loginCont}>
                <View style={styles.logo}>
                    <MaterialCommunityIcons name="spotify" size={70} color={"#2ebd59"} />
                    <Text style={styles.logoText}>Spotify</Text>
                </View>
                <View style={styles.blockHead}>
                    <TouchableOpacity onPress={gotoRegister} style={styles.btnSignIn}>
                        <Text style={styles.text}>SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSignUp}>
                        <Text style={styles.text}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.block}>
                    <TextInput
                        placeholder="User Name"
                        placeholderTextColor="#b1b2b7"
                        value={username}
                        style={styles.input}
                        onChangeText={
                            newText => {
                                setUername(newText);
                            }
                        }
                        onEndEditing={
                            HandlerEndEditting
                        }
                        maxLength={20}
                    />

                </View>
                <View style={styles.block}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#b1b2b7"
                        value={email}
                        style={styles.input}
                        onChangeText={
                            newText => {
                                setEmail(newText);
                            }
                        }
                        onEndEditing={
                            HandlerEndEditting
                        }
                        maxLength={20}
                    />

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
                            }
                        }
                        onEndEditing={
                            HandlerEndEditting
                        }
                        maxLength={20}
                    />
                </View>
                <View style={styles.block}>
                    <TextInput
                        placeholder="Confirm the password"
                        placeholderTextColor="#b1b2b7"
                        value={passwordcfm}
                        style={styles.input}
                        password={true}
                        secureTextEntry={true}
                        onChangeText={
                            newText => {
                                setPasswordcfm(newText);
                            }
                        }
                        onEndEditing={
                            HandlerEndEditting
                        }
                        maxLength={20}
                    />
                </View>
                <Text style={{ color: 'white', marginBottom: 20, fontSize: 15 }}>
                    {message}
                </Text>
                <Pressable onPress={handbleSubmit} style={submit ? (styles.buttonEnable) : (styles.buttonDisable)}  >
                    <Text style={submit ? (styles.textEnable) : (styles.textDisable)} >Register</Text>
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
        marginTop: 70,
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
        // borderColor: '#2ebd59',
        // borderBottomWidth: 3,
        backgroundColor: '#2e2f33',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 50
    },
    btnSignUp: {
        width: 80,
        height: 40,
        borderColor: '#2ebd59',
        borderBottomWidth: 3,
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
export default RegisterScreen;