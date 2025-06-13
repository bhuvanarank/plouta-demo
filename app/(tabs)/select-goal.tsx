import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const goals = [
  'Grow my savings',
  'See all my wealth in one place',
  'Get advice from financial advisors',
  'Get a tailored financial plan',
  'Protect my wealth and family',
  'Reducing Inheritance Tax Bill (IHT)',
  'Reduce my spending'
];

export default function SelectGoalScreen() {
  const handleGoalSelection = async (goal: string) => {
    try {
      // Store the selected goal in AsyncStorage
      await AsyncStorage.setItem('selectedGoal', goal);
      // Navigate directly to next page
      router.replace('/(tabs)/phone-number' as any);
    } catch (error) {
      console.error('Error storing goal:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/plouta-logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>What is your main goal in using Plouta?</Text>
      
      {goals.map((goal, index) => (
        <TouchableOpacity
          key={index}
          style={styles.goalButton}
          onPress={() => handleGoalSelection(goal)}
        >
          <Text style={styles.goalButtonText}>{goal}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2c3e50',
  },
  goalButton: {
    backgroundColor: '#E8F5E9',
    width: '100%',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  goalButtonText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
  },
}); 