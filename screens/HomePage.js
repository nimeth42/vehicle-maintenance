import React, { useState } from "react";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function NotificationButton({ onPress, hasUnreadNotifications }) {
  return (
    <TouchableOpacity
      style={[
        styles.notificationButton,
        hasUnreadNotifications && styles.notificationButtonUnread
      ]}
      onPress={onPress}
    >
      <Text style={styles.notificationButtonText}>Notification</Text>
    </TouchableOpacity>
  );
}

function HomePage() {
  const navigation = useNavigation();
  const [unreadNotifications, setUnreadNotifications] = useState(true);

  const handleAddExpenses = () => {
    navigation.navigate('AddExpensesPage');
  };

  const handleAddMaintenances = () => {
    navigation.navigate('AddMaintainceDetails');
  };

  const handleViewMaintenances = () => {
    navigation.navigate('ViewMaintainceDetails');
  };

  const handleViewExpences = () => {
    navigation.navigate('PieChartPage');
  };

  const handleNotification = () => {
    // Implement notification functionality here
    // For example, mark notifications as read
    setUnreadNotifications(false);
  };

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

      <View style={styles.vehicleNumberContainer}>
        <Text style={styles.vehicleNumberText}>{vehicleNumber}</Text>
        <NotificationButton
          onPress={handleNotification}
          hasUnreadNotifications={unreadNotifications}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <CustomButton title="Add Expenses" onPress={handleAddExpenses} />
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton title="Add Maintenances" onPress={handleAddMaintenances} />
        </View>
      </View>

      <View style={styles.additionalButtonContainer}>
        <CustomButton title="Get Dashboard Indicator Info" onPress={() => console.log("Get Dashboard Indicator pressed")} />
      </View>

      <View style={styles.bottomButtonContainer}>
        <View style={styles.whiteSquare}>
          <CustomButton title="View Expenses" onPress={handleViewExpences} />
        </View>
        <View style={styles.whiteSquare}>
          <CustomButton title="View Maintenance Record" onPress={handleViewMaintenances} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    top: 0,
    left: 10,
    width: 150,
    height: 120,
    zIndex: 1,
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
    color: '#FAA500',
    fontSize: 25,
    padding: 10,
    zIndex: 1,
    fontStyle: 'italic',
  },
  buttonContainer: {
    position: 'absolute',
    top: '30%',
    left: '38%',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(250, 165, 0, 0.5)',
    padding: 20,
    borderRadius: 20,
    zIndex: 2,
  },
  
  buttonWrapper: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleNumberContainer: {
    position: 'absolute',
    top: 90,
    left: 10,
    padding: 10,
    backgroundColor: 'rgba(250, 165, 0, 0.5)',
    borderRadius: 10,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleNumberText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  notificationButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  notificationButtonText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationButtonUnread: {
    backgroundColor: 'red', // Change to red for unread notifications
  },
  additionalButtonContainer: {
    position: 'absolute',
    top: '57%',
    left: '10%',
    right: '10%',
    alignItems: 'center',
    zIndex: 2,
    flexDirection: 'row',
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
    marginVertical: 10,
  },
});

export default HomePage;
