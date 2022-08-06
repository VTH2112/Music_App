import React, {useState, useContext} from "react";
import {useNavigation} from '@react-navigation/native'
import {View, Text, Button, TextInput, Pressable, StyleSheet, Settings, Alert } from "react-native";
import axiosIntance, { updateToken } from "../apis/axios";
import { AuthContext } from "../context/auth";
import { response } from "express";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { color } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAvoidingView} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview"

const RegisterScreen = () =>{
    const [username, setUername]= useState('');
    const [password, setPassword]= useState('');
    const [passwordcfm, setPasswordcfm]= useState('');
    const [email, setEmail]= useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const userCtx = useContext(AuthContext)
    const navigation = useNavigation();
    const gotoRegister = () => {
        navigation.navigate("LoginScreen");
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
    const validating = async()=> {
        let err = true;
        if ( await !validateUsername(username)) {
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

    const handbleSubmit = async() =>{  
        let err = true;
        let errms = '';
        if  (submit) {
            err = await validating();
            try 
             {
                if (await validating)  {
                    try {
                        const res =  await axiosIntance.post('auth/signup', {
                            username: username,
                            password: password,
                            email: email,
        
                        })
                        const resLogin =  await axiosIntance.post('auth/signin', {
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
        }  else {
            setSubmit(true)
        }
    }
    // const validate= () => {

    // }
        
    return(
        <KeyboardAwareScrollView style = {styles.container} behavior="height" > 
            <View >
                <View style = {styles.block}>
                    <Text style = {styles.title}>User Name</Text>
                    <TextInput
                            value = {username}
                            style = {styles.input}
                            onChangeText = {
                                newText =>{
                                    setUername(newText);
                                }
                            }
                            onEndEditing = {
                                HandlerEndEditting  
                            }
                            maxLength ={20}
                            />
                    
                </View>
                <View style = {styles.block}>
                    <Text style = {styles.title}>Email</Text>
                    <TextInput
                            value = {email}
                            style = {styles.input}
                            onChangeText = {
                                newText =>{
                                    setEmail(newText);
                                }
                            }
                            onEndEditing = {
                                HandlerEndEditting  
                            }
                            maxLength ={20}
                            />
                    
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
                                }
                            }
                            onEndEditing = {
                                HandlerEndEditting  
                            }
                            maxLength ={20}
                    />
                </View>
                <View style = {styles.block}>
                    <Text style = {styles.title}>Confirm the password </Text>
                    <TextInput
                            value = {passwordcfm}
                            style = {styles.input}
                            password={true} 
                            secureTextEntry={true}
                            onChangeText = {
                                newText =>{
                                    setPasswordcfm(newText); 
                                }
                            }
                            onEndEditing = {
                                HandlerEndEditting  
                            }
                            maxLength ={20}
                    />
                </View>
                <Text style= {{color: 'white', marginBottom: 20, fontSize: 15}}>
                    {message}
                </Text>
                <Pressable onPress={handbleSubmit} style= {submit ?  (styles.buttonEnable) : (styles.buttonDisable)}  >
                    <Text  style= {submit ?  (styles.textEnable) : (styles.textDisable)} >Register</Text>
                </Pressable>
                <Pressable onPress={gotoRegister} style = {styles.button}>
                    <Text style ={styles.text}>Go to Login</Text>
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
        marginBottom: 40,
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
export default RegisterScreen;