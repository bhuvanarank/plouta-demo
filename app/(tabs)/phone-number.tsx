import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PhoneNumberScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      // Navigate to the next page or dashboard if needed
      router.replace('/(tabs)/personal-details' as any);
    } catch (error) {
      console.error('Error storing phone number:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <Text style={styles.title}>Enter your phone number</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Mobile number (+44)"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholderTextColor="#A9A9A9"
      />
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
    width: '20%', // Example: 20% progress
    height: '100%',
    backgroundColor: '#00ff00', // Light green
    borderRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginBottom: 30,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    color: '#222',
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