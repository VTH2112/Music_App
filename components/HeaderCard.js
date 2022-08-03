import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';


const HeaderCard = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.topCont}>
            <View>
            <IconButton style={styles.icon}
                    icon="arrow-left-thin"
                    color="white"
                    size={30}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topCont: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 35,
        paddingBottom: 10,
        justifyContent: 'space-between',
    },
    icon: {
        marginLeft: 10,
        marginRight:-15,
        marginTop:0,
        marginBottom:0,
    }
})

export default HeaderCard;