import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ScrollView } from 'react-native';

// Importing images statically
import photo1 from '../assets/assets/bg5.jpg';
import photo2 from '../assets/assets/bg5.jpg';

const ViewMaintainceDetails = () => {
  // Creating an object array called data
  const data = [
    { time: "10:00 AM", date: "2024-02-23", note: "This function takes a parameter length specifying the length of the random text to generate. It then iterates length times, randomly selecting characters from the characters string and appending them to the result string. Finally, it returns the generated random text.", photo: photo1 },
    { time: "02:30 PM", date: "2024-02-24", note: "In this corrected version, I've wrapped both the <Text> and <Image> components inside a <View> component for each item in the data array. This ensures that both elements are displayed together for each object", photo: photo2 },
    { time: "02:30 PM", date: "2024-02-24", note: "In this corrected version,  both the <Text> and <Image> components inside a <View> component for each item in the data array. This ensures that both elements are displayed together for each object", photo: photo2 },

    // Add more objects as needed
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>View Maintenance Details</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subContainer}>
          {/* Render both time and photo for each object */}
          {data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.text}>Time: {item.time}</Text>
              <Text style={styles.text}>Date: {item.date}</Text>
              <Text style={styles.text}>Note: {item.note}</Text>
              <Image source={item.photo} style={styles.photo} />
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
    backgroundColor: '#000', // Black background
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
    backgroundColor: '#EEA818', // Red background for each item
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
});

export default ViewMaintainceDetails;