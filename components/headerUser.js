import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const HeaderUser = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.topCont}>
            <View style={styles.header}>
                <View style={styles.iconLeft}>
                    <IconButton style={styles.icon}
                        icon="arrow-left-thin"
                        color="white"
                        size={30}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    />
                </View>
                <View style={styles.iconCenter}>
                    <Text style={styles.text}>User</Text>
                </View>
                <View style={styles.iconRight}>
                    <IconButton style={styles.icon}
                        icon="cog-outline"
                        color="white"
                        size={30}
                        onPress={() => { navigation.navigate('SettingScreen') }}
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    topCont: {
        paddingTop: 35,
        paddingBottom: 10,
        width: '100%',
    },
    text: {
        color: 'white',
        fontSize: 20,

    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default HeaderUser;