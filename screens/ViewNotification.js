import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseUrl from '../baseUrl/baseUrl'; // Import the baseUrl function

const ViewMaintenanceDetails = () => {
  const navigation = useNavigation();
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [refresh, setRefresh] = useState(false); // State variable to trigger re-render

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPlateNo = await AsyncStorage.getItem(';plateNo')

        // Set token as default header for all axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        const response = await axios.post(`${baseUrl}/api/v1/notification/displayAll`, {
          email: storedEmail,
          plateNo: storedPlateNo
        });

        setMaintenanceData(response.data.data); // Update state with response data
      } catch (error) {
        console.error('Error retrieving data:', error);
        Alert.alert('Error', 'Failed to retrieve data. Please try again later.');
      }
    };

    retrieveData();
  }, [refresh]); // Include refresh in the dependency array

  const handleAccept = async (_id) => {
    try {
      const updatedData = maintenanceData.filter(item => item._id !== _id);
      const storedPlateNo = await AsyncStorage.getItem('plateNo');
      
  
      await axios.post(`${baseUrl}/api/v1/notification/accept`, {
        _id: _id,
        plateNo: storedPlateNo
      });
  
      setMaintenanceData(updatedData);
      setRefresh(prev => !prev); // Toggle refresh state to trigger re-render
    } catch (error) {
      console.error('Error accepting item:', error);
      Alert.alert('Error', 'Failed to accept item. Please try again later.');
    }
  };

  const handleDecline = async (_id) => {
    try {
      const updatedData = maintenanceData.filter(item => item._id !== _id);
      const storedPlateNo = await AsyncStorage.getItem('plateNo');
  
      await axios.post(`${baseUrl}/api/v1/notification/deleteOne`, {
        _id: _id,
        plateNo: storedPlateNo
      });
  
      setMaintenanceData(updatedData);
      setRefresh(prev => !prev); // Toggle refresh state to trigger re-render
    } catch (error) {
      console.error('Error declining item:', error);
      Alert.alert('Error', 'Failed to decline item. Please try again later.');
    }
  };

    const handleView = async (_id) => {
    try {
      const updatedData = maintenanceData.filter(item => item._id !== _id);
      const storedPlateNo = await AsyncStorage.getItem('plateNo');
  
      await axios.post(`${baseUrl}/api/v1/notification/viewOne`, {
        _id: _id,
        plateNo: storedPlateNo
      });
  
      setMaintenanceData(updatedData);
      setRefresh(prev => !prev); // Toggle refresh state to trigger re-render
    } catch (error) {
      console.error('Error declining item:', error);
      Alert.alert('Error', 'Failed to decline item. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>Scan details</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subContainer}>
          {maintenanceData.map((item) => (
            <View key={item._id} style={[styles.itemContainer, { backgroundColor: item.notificationFlag ? '#a9a9a9' : '#EEA818' }]}>
               <Text style={[styles.text, { color: item.viewFlag ? 'white' : 'blue' }]}>Date: {item.date}</Text>
              <Text style={[styles.text, { color: item.viewFlag ? 'white' : 'blue' }]}>Note: {item.note}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleAccept(item._id)} style={[styles.button, styles.acceptButton]}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDecline(item._id)} style={[styles.button, styles.declineButton]}>
                  <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleView(item._id)} style={[styles.button, styles.viewButton]}>
                  <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#222222',
  },
  title: {
    color: '#FFA500',
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
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#EEA818',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  declineButton: {
    backgroundColor: '#F44336',
    marginRight: 5,
  },
  viewButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewMaintenanceDetails;
