import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, TextInput, StatusBar, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios'; // Import axios for making HTTP requests
import baseUrl from '../baseUrl/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddMaintainceDetails = () => {
    const [state, setState] = useState({
        photo: '',
        note: '',
        cost: '',
        vehicleNumber: '', // Added state for vehicle number
    });

    const option = {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
    }

    const toast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    }

    const openCamera = () => {
        launchCamera(option, (res) => {
            if (res.didCancel) {
                toast('Take a picture canceled')
            } else if (res.errorCode) {
                toast('Error while taking an image', res.errorCode)
            } else {
                const photoUri = res.uri ? res.uri : res.assets[0].uri; // Handle both cases for image URI
                setState({ ...state, photo: photoUri });
            }
        });
    }

    const openGallery = () => {
        launchImageLibrary(option, (res) => {
            if (res.didCancel) {
                toast('Gallery open canceled')
            } else if (res.errorCode) {
                toast('Error while selecting an image', res.errorCode)
            } else {
                const photoUri = res.uri ? res.uri : res.assets[0].uri; // Handle both cases for image URI
                setState({ ...state, photo: photoUri });
            }
        });
    }

    const handleNoteChange = (text) => {
        setState({ ...state, note: text }); // Update the note value in state
    }

    const handleCostChange = (text) => {
        setState({ ...state, cost: text }); // Update the cost value in state
    }

    const handleSubmit = async () => {
        // Log the submitted values
        console.log('Note:', state.note);
        console.log('Cost:', state.cost);
        
        try {
            // Retrieve token, email, and plateNo from AsyncStorage
            const token = await AsyncStorage.getItem('token');
            const email = await AsyncStorage.getItem('email');
            const plateNo = await AsyncStorage.getItem('plateNo');
            console.log("** "+plateNo)
    
            // Check if note, cost, photo, or plateNo is empty or undefined
            if (!state.note || !state.cost || !state.photo || !plateNo) {
                toast('Please fill in all fields and select an image');
                return; // Return early if any field is empty or undefined
            }
    
            const dataObject = {
                plateNo: plateNo,
                note: state.note,
                cost: state.cost,
            };
    
            const dataString = JSON.stringify(dataObject);
    
            const formData = new FormData();
            formData.append('data', dataString);
            formData.append('image', {
                uri: state.photo,
                type: 'image/jpeg',
                name: 'maintenance_image.jpg',
            });
    
            // Make POST request to submit maintenance details
            const response = await axios.post(`${baseUrl}/api/v1/maintaince/addMiantainceDetails`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Include token in request header
                },
            });
    
            console.log(response.data.status);
            if (response.data.success === "success") {
                toast('Maintenance details submitted successfully');
                setState({
                    photo: '',
                    note: '',
                    cost: '',
                    plateNo: '',
                });
            } else if(response.data.success === "failed") {
                throw new Error(response.data.comment);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', error.message || 'Failed to submit maintenance details');
        }
    }
    
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />

            <Text style={styles.heading}>Add Maintenance Details</Text>
            <Text style={styles.textTopic}>Real time updates</Text>
            <Text style={styles.normalText}>Enter note about maintenance</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter note"
                placeholderTextColor="black"
                onChangeText={handleNoteChange} // Call handleNoteChange when the note text changes
                value={state.note} // Set the value of the note input field
            />
            <Text style={styles.normalText}>Enter cost </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter cost"
                placeholderTextColor="black"
                onChangeText={handleCostChange} // Call handleCostChange when the cost text changes
                value={state.cost} // Set the value of the cost input field
                keyboardType="numeric" // Set keyboardType to 'numeric'
            />
            <View style={styles.imageContainer}>
                {state.photo ? (
                    <Image source={{ uri: state.photo }} style={styles.image} />
                ) : (
                    <Text>No image</Text>
                )}
            </View>
            <View style={styles.wrapBtn}>
                <TouchableOpacity onPress={openCamera}>
                    <Text style={styles.buttonText}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openGallery}>
                    <Text style={styles.buttonText}>Open Gallery</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
                <Text style={styles.buttonTextSubmit}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddMaintainceDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    wrapBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 200,
        marginTop: 30,
        backgroundColor: "black",
        height: 45,
        alignItems: 'center',
        padding: 5,
        borderRadius: 7,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
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
    input: {
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        paddingHorizontal: 10,
        color: 'black',
        width: 250, // Added width to input fields
    },
    normalText: {
        fontSize: 15,
        color: 'white',
        marginTop: 5,
        marginBottom: 5,
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
    }
});
