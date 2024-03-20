import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import baseUrl from '../baseUrl/baseUrl';
import axios from 'axios';

const GarageUser = () => {
    const [state, setState] = useState({
        photo: '',
        description: '',
    });

    const option = {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
    }

    const toast = (msg) => {
        Alert.alert('Info', msg);
    }

    const openCamera = () => {
        launchCamera(option, handleImageSelection);
    }

    const openGallery = () => {
        launchImageLibrary(option, handleImageSelection);
    }

    const handleImageSelection = (res) => {
        if (res.didCancel) {
            toast('Operation canceled');
        } else if (res.errorCode) {
            toast('Error occurred', res.errorCode);
        } else {
            const photoUri = res.uri ? res.uri : res.assets[0].uri;
            setState({ ...state, photo: photoUri });
        }
    }

    const handleSubmit = () => {
        if (!state.photo) {
            toast('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: state.photo,
            type: 'image/jpeg',
            name: 'maintenance_image.jpg',
        });

        axios.post(`${baseUrl}/api/v1/tag/grageUserTag`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log(response.data);
            if (response.data.success === "success") {
                toast('Submitted successfully');
                setState({ ...state, description: response.data.description });
            } else {
                throw new Error(response.data.comment);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Alert.alert('Error', error.message || 'Failed to submit');
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <Text style={styles.heading}> Get Dashboard Info</Text>
            <Text style={styles.textTopic}>Add Photo here...</Text>
            {state.photo ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: state.photo }} style={styles.image} />
                </View>
            ) : null}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={openCamera}>
                    <Text style={styles.buttonText}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={openGallery}>
                    <Text style={styles.buttonText}>Open Gallery</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
                <Text style={styles.buttonTextSubmit}>Submit</Text>
            </TouchableOpacity>
            {state.description ? (
                <View style={styles.descriptionBox}>
                    <Text style={styles.description}>{state.description}</Text>
                </View>
            ) : null}
        </View>
    );
};

export default GarageUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222222',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    textTopic: {
        fontSize: 20,
        color: 'white',
        margin: 10,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFA500',
        marginTop: 10,
        marginBottom: 20,
    },
    imageContainer: {
        width: 190,
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#FFA500',
        borderRadius: 10,
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 7,
        width: '38%',
        borderRadius: 10,
        alignItems: 'center',
        margin: 5,
    },
    buttonSubmit: {
        backgroundColor: '#FFA500',
        paddingVertical: 12,
        borderRadius: 40,
        margin: 10,
        width: 200,
    },
    buttonTextSubmit: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    descriptionBox: {
        backgroundColor: 'grey',
        padding: 60,
        borderRadius: 10,
        marginTop: 20,
    },
    description: {
        fontSize: 16,
        color: 'white',
    },
});
