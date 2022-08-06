import React, {useState, useContext} from "react";
import {useNavigation} from '@react-navigation/native'
import {View, Text, Button, TextInput, Pressable, StyleSheet, Settings} from "react-native";
import axiosIntance, { updateToken } from "../apis/axios";
import { AuthContext } from "../context/auth";
import { response } from "express";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { color } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const LoginScreen = () =>{
    const [username, setUername]= useState('');
    const [password, setPassword]= useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const userCtx = useContext(AuthContext)
    const navigation = useNavigation();
    const gotoRegister = () => {
        navigation.navigate("RegisterScreen");
    }
    const handbleSubmit = async() =>{  
        if  (submit) {
            const res =  await axiosIntance.post('auth/signin', {
                username: username,
                password: password
            }).catch(error => setMessage("USER NAME OR PASSWORD IS INCORRECT"))
            console.log(res);
            userCtx.setUser(res.data.user.username);
            updateToken(res.token);
            AsyncStorage.setItem('token', res.token)
        }
    };
        
    return(
        <KeyboardAwareScrollView style = {styles.container}>
            <View  >
                <View style = {styles.block}>
                    <Text style = {styles.title}>User Name</Text>
                    <TextInput
                            value = {username}
                            style = {styles.input}
                            onChangeText = {
                                newText =>{
                                    setUername(newText);
                                    if (newText && password) {setSubmit(true)} else {setSubmit(false)};
                                }
                            } />
                    
                </View>
                <View style = {styles.block}>
                    <Text style = {styles.title}>Password</Text>
                    <TextInput
                            value = {password}
                            style = {styles.input}
                            password={true} 
                            secureTextEntry={true}
                            onChangeText = {
                                newText =>{
                                    setPassword(newText);
                                    if (newText && username) {setSubmit(true)} else {setSubmit(false)};  
                                }
                            }
                    />
                </View>
                <Text style= {{color: 'white', marginBottom: 20, fontSize: 15}}>
                    {message}
                </Text>
                <Pressable onPress={handbleSubmit} style= {submit ?  (styles.buttonEnable) : (styles.buttonDisable)}  >
                    <Text  style= {submit ?  (styles.textEnable) : (styles.textDisable)} >LOGIN</Text>
                </Pressable>
                <Pressable onPress={gotoRegister} style = {styles.button}>
                    <Text style ={styles.text}>Go to Register</Text>
                </Pressable>
            </View>
        </KeyboardAwareScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    input:{
        backgroundColor: 'gray',
        borderRadius: 5,
        color: 'white',
        fontSize: 20
    },
    block:{
        marginBottom: 50,
    },
    buttonEnable:{
        width: 200,
        height: 50,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginLeft:'auto',
    marginRight:'auto',
    },
    buttonDisable:{
        width: 200,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#a9a9a9',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginLeft:'auto',
        marginRight:'auto',
    },
    textEnable:{
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black'
    },
    textDisable:{
        fontWeight: 'bold',
        fontSize: 15,
        color: 'gray'
    },
    text:{
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
    },
    button:{
        width: 150,
        height: 25,
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 2,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: 50
    },


    
})
export default LoginScreen;