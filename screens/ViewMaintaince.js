import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios'; // Import axios for making HTTP requests
import baseUrl from '../baseUrl/baseUrl'; // Import the baseUrl function

const ViewMaintainceDetails = () => {
  const [data, setData] = useState([]); // State to hold maintenance data

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPlateNo = await AsyncStorage.getItem('plateNo');

        // Set token as default header for all axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        const response = await axios.post(`${baseUrl}/api/v1/maintaince/viewMaintaince`, {
          plateNo: storedPlateNo
        });

        setData(response.data.data); // Update state with response data
      } catch (error) {
        console.error('Error retrieving data:', error);
        Alert.alert('Error', 'Failed to retrieve data. Please try again later.');
      }
    };

    retrieveData();
  }, []); // Empty dependency array to run effect only once
  const handleDelete = async (id) => {
    // Implement delete logic here
    console.log('Deleting item with id:', id);
    // You can update the data state after deleting
  
    try {
      // Make a POST request to delete the maintenance item with the given id
      await axios.post(`${baseUrl}/api/v1/maintaince/deleteMaintaince`, {
        _id: id, // Use the passed id parameter
      });
  
      // If deletion is successful, update the data state or do any necessary operations
      // For example, if data is an array of maintenance items, you can filter out the deleted item
      const updatedData = data.filter(item => item._id !== id);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item. Please try again later.');
    }
  };
  
  

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>View Maintenance Details</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subContainer}>
          {/* Render both time, photo, and delete button for each object */}
          {data.map((item) => (
            <View key={item._id} style={styles.itemContainer}>
              <Text style={styles.text}>Date: {formatDate(item.updatedAt)}</Text>
              <Text style={styles.text}>Note: {item.note}</Text>
              <Text style={styles.text}>Cost: {item.cost}</Text>
              <Image source={{ uri: item.imageUrl }} style={styles.photo} />
              <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete this Record</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222', // Black background
  },
  title: {
    color: '#EEA818',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  subContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#EEA818', //  background for each item
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
  },
  text: {
    color: '#fff', // White text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold font weight
    paddingTop: 5,
    paddingBottom: 5,
  },
  photo: {
    width: '100%', // Make the image take up full width
    height: 200, // Adjust height as needed
    resizeMode: 'cover', // Adjust resizeMode as needed
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#3B3B3B', // Dark gray button color
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewMaintainceDetails;
