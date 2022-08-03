import React, {useState} from "react";
import {useNavigation} from '@react-navigation/native'
import {View, Text, Button, TextInput, Pressable} from "react-native";
import axiosIntance from "../apis/axios";
const LoginScreen = () =>{
    const [username, setUername]= useState('');
    const [password, setPassword]= useState('');
    const navigation = useNavigation();
    const gotoRegister = () => {
        navigation.navigate("Register");
    }
    const handbleSubmit =() =>{
        console.log('submit');
        const res =  axiosIntance.post('auth/signin', {
            username:username,
            password:password
        }).then(res => {
            console.log(res);
            console.log(res.data)
        })
        .catch(error => console.log(error));
        console.log(res);
    };

    return(
        <View>
            <Text>Login</Text>
            <TextInput
                    value = {username}
                    onChangeText = {
                        newText =>{
                            setUername(newText);
                        }
                    } />
            <TextInput
                    value = {password}
                    onChangeText = {
                        newText =>{
                            setPassword(newText);
                        }
                    }
            />
            <Button title="Login" onPress={handbleSubmit}/>
            <Pressable onPress={gotoRegister}>
                <Text>Go to Register</Text>
            </Pressable>
        </View>
    );
};
export default Login;