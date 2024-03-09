import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

const ViewMaintenanceDetails = () => {
  const [maintenanceData, setMaintenanceData] = React.useState([
    { id: 1, date: "2024-02-23", note: "This function takes a parameter length specifying the length of the random text to generate. It then iterates length times, randomly selecting characters from the characters string and appending them to the result string. Finally, it returns the generated random text.", showButtons: true, backgroundColor: '#FFA500' },
    { id: 2, date: "2024-02-24", note: "In this corrected version, I've wrapped both the <Text> and <Image> components inside a <View> component for each item in the data array. This ensures that both elements are displayed together for each object", showButtons: true, backgroundColor: '#FFA500' },
    { id: 3, date: "2024-02-24", note: "In this corrected version, both the <Text> and <Image> components inside a <View> component for each item in the data array. This ensures that both elements are displayed together for each object", showButtons: true, backgroundColor: '#FFA500' },
  ]);

  const handleAccept = (id) => {
    const updatedData = maintenanceData.map(item => {
      if (item.id === id) {
        return { ...item, showButtons: false, backgroundColor: '#CCCCCC' };
      }
      return item;
    });
    setMaintenanceData(updatedData);
  };

  const handleDecline = (id) => {
    const updatedData = maintenanceData.filter(item => item.id !== id);
    setMaintenanceData(updatedData);
  };

  const handleView = (id) => {
    const updatedData = maintenanceData.map(item => {
      if (item.id === id) {
        return { ...item, showButtons: false, backgroundColor: '#CCCCCC' };
      }
      return item;
    });
    setMaintenanceData(updatedData);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>Scan details</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subContainer}>
          {maintenanceData.map((item) => (
            <View key={item.id} style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}>
              <Text style={styles.text}>Date: {item.date}</Text>
              <Text style={styles.text}>Note: {item.note}</Text>
              <View style={styles.buttonContainer}>
                {item.showButtons && (
                  <>
                    <TouchableOpacity onPress={() => handleAccept(item.id)} style={[styles.button, styles.acceptButton]}>
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDecline(item.id)} style={[styles.button, styles.declineButton]}>
                      <Text style={styles.buttonText}>Decline</Text>
                    </TouchableOpacity>
                  </>
                )}
                {item.showButtons && (
                  <TouchableOpacity onPress={() => handleView(item.id)} style={[styles.button, styles.viewButton]}>
                    <Text style={styles.buttonText}>View</Text>
                  </TouchableOpacity>
                )}
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
    backgroundColor: '#222222', // Black background
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
  },
  text: {
    color: '#fff', // White text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold font weight
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
    backgroundColor: '#4CAF50', // Green button color for accept
    marginRight: 5,
  },
  declineButton: {
    backgroundColor: '#F44336', // Red button color for decline
    marginRight: 5,
  },
  viewButton: {
    backgroundColor: '#2196F3', // Blue button color for view
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewMaintenanceDetails;
