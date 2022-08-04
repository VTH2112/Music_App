import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.topCont}>
            <View>
                <Text style={styles.text}>To get you started</Text>
            </View>
            <View style={styles.iconCont}>
                <IconButton style={styles.icon}
                    icon="bell-outline"
                    color="white"
                    size={30}
                    onPress={() => {
                        navigation.navigate('NotiScreen')
                    }}
                />
                <IconButton style={styles.icon}
                    icon="history"
                    color="white"
                    size={30}
                    onPress={() => { navigation.navigate('HistoryScreen') }}
                />
                <IconButton style={styles.icon}
                    icon="cog-outline"
                    color="white"
                    size={30}
                    onPress={() => { navigation.navigate('SettingScreen') }}
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
    text: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    },
    iconCont: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 15,
        marginRight: -15,
        marginTop: 0,
        marginBottom: 0,
    }
})

export default Header;