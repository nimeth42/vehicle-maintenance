import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import DateTimePicker from '@react-native-community/datetimepicker';

const PieChartPage = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleBackPress = () => {
    navigation.goBack();
  };

  const data = [
    {
      key: 'Amuka Dumaka',
      value: 45,
      svg: { fill: 'blue' },
    },
    {
      key: 'Ranjan',
      value: 90,
      svg: { fill: 'green' },
    },
    {
      key: 'Google',
      value: 55,
      svg: { fill: 'orange' },
    },
    {
      key: 'AKD',
      value: 190,
      svg: { fill: 'red' },
    },
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      console.log('Selected date:', selectedDate); // Log selected date to console
    }
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <PieChart style={{ height: 200, width: 200 }} data={data} />
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={item.key} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.svg.fill }]} />
            <Text style={styles.legendText}>{`  ${item.key}: ${item.value}%`}</Text>
          </View>
        ))}
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.datePickerButton} onPress={showDateTimePicker}>
        <Text style={styles.datePickerButtonText}>Select Date</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    position: 'absolute',
    top: 180,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  legendContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    backgroundColor: '#FFA500',
    width: 70,
    height: 35,
    borderRadius: 7,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    left: -80, // Adjusted to align with the left edge
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 16,
    color: 'white',
  },
  datePickerButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius:8,
    margin: 15,
    width: 200,
  },
  datePickerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default PieChartPage;
