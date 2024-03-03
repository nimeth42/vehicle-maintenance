import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, TextInput, StatusBar } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const GarageUser = () => {
    const [state, setState] = useState({
        photo: '',
        note: '', // State to hold the note value
        cost: '', // State to hold the cost value
        vehicleNumber: '', // State to hold the vehicle number value
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

    const handleVehicleNumberChange = (text) => {
        setState({ ...state, vehicleNumber: text }); // Update the vehicle number value in state
    }

    const handleSubmit = () => {
        if (!state.note.trim() || !state.cost.trim() || !state.photo || !state.vehicleNumber.trim()) {
            // Check if note, cost, photo, or vehicle number is empty
            toast('Please fill in all fields and select an image');
            return; // Return early if any field is empty
        }

        // Log the submitted values
        console.log('Note:', state.note);
        console.log('Cost:', state.cost);
        console.log('Vehicle Number:', state.vehicleNumber);

        // You can add further logic here to submit the data to your backend or perform other actions
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />

            <Text style={styles.heading}> Garage User</Text>
            <Text style={styles.textTopic}>Real time updates</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter vehicle number"
                placeholderTextColor="black"
                onChangeText={handleVehicleNumberChange} // Call handleVehicleNumberChange when the vehicle number text changes
                value={state.vehicleNumber} // Set the value of the vehicle number input field
            />
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
    buttonContainer: {
        flexDirection: 'row', // Arrange buttons horizontally
        justifyContent: 'space-between', // Evenly distribute space between the buttons
        marginTop: 30,
    },
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 7,
        width: '38%', // Adjust the width of each button, ensuring there's some space between them
        borderRadius: 10,
        alignItems: 'center', // Center the text vertically
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
});