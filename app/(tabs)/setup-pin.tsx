import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SetupPinScreen() {
  const [pin, setPin] = useState<string>('');
  const router = useRouter();

  const handleKeyPress = (value: string) => {
    if (value === 'back') {
      setPin(pin.slice(0, -1));
    } else if (pin.length < 5) {
      setPin(pin + value);
    }
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('userPin', pin);
      // Navigate to the next step (update route as needed)
      router.push('/(tabs)/success' as any);
    } catch (error) {
      console.error('Error saving PIN:', error);
    }
  };

  const renderPinCircles = () => {
    return (
      <View style={styles.pinCirclesContainer}>
        {[0, 1, 2, 3, 4].map(i => (
          <View
            key={i}
            style={[
              styles.pinCircle,
              pin.length > i && styles.pinCircleFilled,
            ]}
          />
        ))}
      </View>
    );
  };

  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', 'back'],
  ];

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <Text style={styles.title}>Let's setup your 5 digits PIN</Text>
      <Text style={styles.subtitle}>so you can login to Plouta safely and securely</Text>
      {renderPinCircles()}
      <View style={styles.keypadContainer}>
        {keypad.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keypadButton}
                onPress={() => handleKeyPress(key)}
                disabled={key === 'back' && pin.length === 0}
              >
                <Text style={styles.keypadButtonText}>
                  {key === 'back' ? '←' : key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, pin.length !== 5 && { opacity: 0.5 }]}
        onPress={handleContinue}
        disabled={pin.length !== 5}
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
    width: '90%', // Adjust as needed
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
  pinCirclesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  pinCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#065F46',
    marginHorizontal: 8,
    backgroundColor: '#fff',
  },
  pinCircleFilled: {
    backgroundColor: '#E0F7E9',
    borderColor: '#065F46',
  },
  keypadContainer: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  keypadButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F7E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  keypadButtonText: {
    fontSize: 24,
    color: '#065F46',
    fontWeight: 'bold',
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