import React from "react";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}


function HomePage() {
  const navigation = useNavigation(); // Initialize navigation hook

  const handleAddExpenses = () => {
    // Navigate to the AddExpensesPage
    navigation.navigate('AddExpensesPage');
  };

  const handleAddMaintenances = () => {
    // Navigate to the AddExpensesPage
    navigation.navigate('AddMaintainceDetails');
  };


  // Assuming vehicleNumber is fetched from the database
  const vehicleNumber = "CAK-0900";
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/assets/homebackground.png')}
        style={styles.backgroundImage}
      />
      <Image
        source={require('../assets/assets/drivelankalogo.png')}
        style={styles.logo}
      />
      
      <Text style={styles.text}>DRIVE  LANKA</Text>

      {/* Vehicle number display */}
      <View style={styles.vehicleNumberContainer}>
        <Text style={styles.vehicleNumberText}>{vehicleNumber}</Text>
      </View>

      {/* Button container */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <CustomButton title="Add Expenses" onPress={handleAddExpenses} />
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton title="Add Maintenances" onPress={handleAddMaintenances} />
        </View>
      </View>

      {/* Additional button container */}
      <View style={styles.additionalButtonContainer}>
        <CustomButton title="Get Dashboard Indicator Info" onPress={() => console.log("Get Dashboard Indicator pressed")} />
      </View>

      {/* Bottom button container */}
      <View style={styles.bottomButtonContainer}>
        <View style={styles.whiteSquare}>
          <CustomButton title="View Expenses" onPress={() => console.log("View Expenses pressed")} />
        </View>
        <View style={styles.whiteSquare}>
          <CustomButton title="View Maintenance Record" onPress={() => console.log("View Maintenance Record pressed")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative', // Ensure position relative for absolute positioning
  },
  logo: {
    position: 'absolute', // Position absolutely
    top: 0, // At the top
    left: 10, // At the left
    width: 150, // Adjust width as needed
    height: 120, // Adjust height as needed
    zIndex: 1, // Ensure logo appears above the background image
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    top: 12,
    right: 5,
    color: '#FAA500', // Change text color to FAA500
    fontSize: 25,
    padding: 10,
    zIndex: 1,
    fontStyle: 'italic',
  },
  buttonContainer: {
    position: 'absolute',
    top: '25%',
    left: '38%',
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(250, 165, 0, 0.5)', // Transparent yellow box
    padding: 20,
    borderRadius: 20,
    zIndex: 2,
    
  },
  buttonWrapper: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FFA500', // Orange background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleNumberContainer: {
    position: 'absolute',
    top: 90,
    left: 10,
    padding: 10,
    backgroundColor: 'rgba(250, 165, 0, 0.5)', // Transparent yellow box
    borderRadius: 10,
    zIndex: 2,
  },
  vehicleNumberText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },

  additionalButtonContainer: {
    position: 'absolute',
    top: '50%', // Adjust top position as needed
    left: '10%',
    right: '10%',
    //backgroundColor: 'transparent', // Set background color to transparent
    alignItems: 'center',
    zIndex: 2,
  },
  
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    
  },
  whiteSquare: {
    backgroundColor: '#525252',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginVertical: 10, // Separate buttons vertically
  },
});

export default HomePage;
