import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PersonalDetailsScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('dob', dob);
      router.replace('/(tabs)/address-search' as any);
    } catch (error) {
      console.error('Error storing personal details:', error);
    }
  };

  const onChange = (_event: unknown, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setDob(selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <Text style={styles.title}>Enter your personal details</Text>
      <Text style={styles.subtitle}>Let's get set up...</Text>
      <TextInput
        style={styles.input}
        placeholder="Your First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#A9A9A9"
      />
      <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
        <Text style={{ color: dob ? '#222' : '#A9A9A9' }}>{dob ? dob : 'Date of birth'}</Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0F7E9',
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressBar: {
    width: '40%', // 40% progress for this step
    height: '100%',
    backgroundColor: '#00ff00',
    borderRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222',
    textAlign: 'left',
    width: '100%',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    marginBottom: 30,
    width: '100%',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    color: '#222',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#065F46',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 