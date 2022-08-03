import React, {useState} from "react";
import {View, Text, Button, TextInput} from "react-native";
const RegisterScreen = () =>{
    const [username, setUername]= useState('');
    const [password, setPassword]= useState('');
    return(
        <View>
            <Text>Login</Text>
            <TextInput
                    value = {username}
                    onChangeText = {
                        newText =>{
                            setUername(newText);
                        }
                    }
                    />
            <TextInput
                    value = {password}
                    onChangeText = {
                        newText =>{
                            setUername(newText);
                        }
                    }
            />
            <Button title="Login"/>
        </View>
    );
}
export default Register;