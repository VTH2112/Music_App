import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

const InputCard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [Title, onChangeTitle] = React.useState("");
    const [Artists, onChangeArtists] = React.useState("");
    const [Artworks, onChangeArtworks] = React.useState("");
    const [Url, onChangeUrl] = React.useState("");
    const [Type, onChangeType] = React.useState("");

    return (
        <View View style={styles.block} >
            <TextInput
                placeholder="Title"
                onChangeText={onChangeTitle}
                placeholderTextColor="#b1b2b7"
                value={Title}
                style={styles.input}
            />
            <TextInput
                placeholder="Artist"
                onChangeText={onChangeArtists}
                placeholderTextColor="#b1b2b7"
                value={Artists}
                style={styles.input}

            />
            <TextInput
                placeholder="Artworks"
                onChangeText={onChangeArtworks}
                placeholderTextColor="#b1b2b7"
                value={Artworks}
                style={styles.input}
            />
            <TextInput
                placeholder="Music Url"
                placeholderTextColor="#b1b2b7"
                onChangeText={onChangeUrl}
                value={Url}
                style={styles.input}
            />
            <TextInput
                placeholder="Type"
                onChangeText={onChangeType}
                placeholderTextColor="#b1b2b7"
                value={Type}
                style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    input: {
        width: 285,
        height: 50,
        borderColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 50,
        color: 'white',
        fontSize: 16,
        paddingLeft: 30,
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 10,
    },
})


export default InputCard;