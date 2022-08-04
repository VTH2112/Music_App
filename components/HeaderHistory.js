import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const HeaderHistory = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.topCont}>
            <View style={styles.header}>
                <IconButton style={styles.icon}
                    icon="arrow-left-thin"
                    color="white"
                    size={30}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
                <Text style={styles.text}>Recently played</Text>
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
        marginLeft: 5,
        marginRight: 85,
        marginTop: 0,
        marginBottom: 0,
    },
    text: {
        color: 'white',
        fontSize: 20,

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default HeaderHistory;