import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ConfirmAddressScreen() {
  const { address } = useLocalSearchParams();
  // You can split the address string if needed, or just use it as Address Line 1
  //const addressArray = address?.split(',');
  const addressArray = (address as string)?.split(',').map(part => part.trim()) || [];

  const [addressLine1, setAddressLine1] =  useState(addressArray[1] || '');
  const [addressLine2, setAddressLine2] = useState(addressArray[2] || '');
  const [town, setTown] = useState(addressArray[3] || '');
  const [postcode, setPostcode] = useState(addressArray[0] || '');
  const router = useRouter();

  const handleContinue = async () => {
    try {
      const addressData = {
        addressLine1,
        addressLine2,
        town,
        postcode
      };
      
      await AsyncStorage.setItem('userAddress', JSON.stringify(addressData));
      router.push('/(tabs)/setup-pin' as any);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <View style={styles.container}>
    {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <Text style={styles.title}>Got it</Text>
      <Text style={styles.subtitle}>Please confirm your home address below</Text>
      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        value={addressLine1}
        onChangeText={setAddressLine1}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 2"
        value={addressLine2}
        onChangeText={setAddressLine2}
      />
      <TextInput
        style={styles.input}
        placeholder="Town/City"
        value={town}
        onChangeText={setTown}
      />
      <TextInput
        style={styles.input}
        placeholder="Postcode"
        value={postcode}
        onChangeText={setPostcode}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
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
      width: '80%', // 80% progress for this step
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
    suggestionBox: {
      backgroundColor: '#fff',
      borderColor: '#E0E0E0',
      borderWidth: 1,
      borderRadius: 8,
      maxHeight: 150,
      marginTop: -10,
      marginBottom: 10,
      zIndex: 10,
    },
    suggestionItem: {
      padding: 12,
      borderBottomColor: '#E0E0E0',
      borderBottomWidth: 1,
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