import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput ,StatusBar} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

const AddExpensesPage = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedExpenseType, setSelectedExpenseType] = useState('fuel');
  const [note, setNote] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
    if (!note.trim() || !totalCost.trim()) {
      alert('Note or Total Cost are required!');
      return; // Prevent submission
    }

    console.log('Form submitted');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <Text style={styles.heading}>Add Expenses</Text>
      <View style={styles.datePickerContainer}>
        <Button title="Select Date" color="#FFA500" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Text style={styles.textValue}>Selected date: {date.toDateString()}</Text>

        <Text style={[styles.textValue, styles.marginBottom]}>Odometer</Text>
        <TextInput
          style={[styles.input, styles.marginBottom]}
          placeholder="Enter mileage (KM)"
          keyboardType="numeric"
          placeholderTextColor="black"
        />
        <Text style={[styles.textValue, styles.marginBottom]}>Note</Text>
        <TextInput
          style={[styles.input, styles.marginBottom]}
          placeholder="Enter note"
          multiline={true}
          placeholderTextColor="black"
          value={note}
          onChangeText={setNote}
        />
        <Text style={[styles.textValue, styles.marginBottom]}>Total cost</Text>
        <TextInput
          style={[styles.input, styles.marginBottom]}
          placeholder="Enter cost"
          keyboardType="numeric"
          placeholderTextColor="black"
          value={totalCost}
          onChangeText={setTotalCost}
        />

        <View style={styles.radioContainer}>
          <Text style={styles.textValue}>Expenses Type:</Text>
          <View style={styles.radioButtons}>
            <View style={styles.radioButton}>
              <RadioButton
                value="fuel"
                status={selectedExpenseType === 'fuel' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedExpenseType('fuel')}
                color="#FFA500" // Change the color of the checked radio button
              />
              <Text style={styles.radioText}>Fuel</Text>
            </View>
            <View style={[styles.radioButton, styles.insuranceButton]}>
              <RadioButton
                value="insurance"
                status={selectedExpenseType === 'insurance' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedExpenseType('insurance')}
                color="#FFA500" // Change the color of the checked radio button
              />
              <Text style={styles.radioText}>Insurance</Text>
            </View>
          </View>
          <View style={styles.radioButtons}>
            <View style={styles.radioButton}>
              <RadioButton
                value="repair"
                status={selectedExpenseType === 'repair' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedExpenseType('repair')}
                color="#FFA500" // Change the color of the checked radio button
              />
              <Text style={styles.radioText}>Repair</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="miscellaneous"
                status={selectedExpenseType === 'miscellaneous' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedExpenseType('miscellaneous')}
                color="#FFA500" // Change the color of the checked radio button
              />
              <Text style={styles.radioText}>Miscellaneous</Text>
            </View>
          </View>
          <View style={styles.radioButtons}>
            <View style={styles.radioButton}>
              <RadioButton
                value="other"
                status={selectedExpenseType === 'other' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedExpenseType('other')}
                color="#FFA500" // Change the color of the checked radio button
              />
              <Text style={styles.radioText}>Other</Text>
            </View>
          </View>
        </View>

        <View style={styles.submitBtnContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#FFA500" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFA500',
    marginTop: 10,
    marginBottom: 20,
  },
  datePickerContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
    width: 250,
    marginVertical: 5,
  },
  textValue: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
  radioContainer: {
    marginVertical: 10,
  },
  radioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    color: '#FFFFFF',
    marginLeft: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },
  submitBtnContainer: {
    marginTop: 15,
    width: 150, // Set width 
    backgroundColor: '#FFA500',
    borderRadius: 10,
    paddingVertical: 5,
    marginBottom: 10,
    alignSelf: 'center', // Center the container horizontally
  },insuranceButton: {
    marginLeft: 12, // Adjust the margin 
  },
  
});

export default AddExpensesPage;
