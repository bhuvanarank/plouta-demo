import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const { selectedGoal } = useLocalSearchParams<{ selectedGoal: string }>();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!selectedGoal) {
      router.replace('/(tabs)/select-goal');
    }

    // Retrieve stored credentials
    const getUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        
        if (!isLoggedIn) {
          router.replace('/(tabs)');
          return;
        }
        
        setUserEmail(email);
        setIsLoading(false);
      } catch (error) {
        console.error('Error retrieving user data:', error);
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome{userEmail ? ` ${userEmail}` : ''} to Plouta!</Text>
        <Text style={styles.subText}>Your goal tracking journey starts here</Text>
      </View>

      {selectedGoal ? (
        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>Your Main Goal</Text>
          <Text style={styles.goalText}>{selectedGoal}</Text>
          <TouchableOpacity 
            style={styles.changeGoalButton}
            onPress={() => router.push('/(tabs)/select-goal')}
          >
            <Text style={styles.changeGoalText}>Change Goal</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.selectGoalButton}
          onPress={() => router.push('/(tabs)/select-goal')}
        >
          <Text style={styles.selectGoalText}>Select Your Goal</Text>
        </TouchableOpacity>
      )}

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Active Goals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addGoalButton}>
        <AntDesign name="plus" size={24} color="white" />
        <Text style={styles.addGoalText}>Create New Goal</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No recent activity</Text>
          <Text style={styles.emptyStateSubText}>Start by creating your first goal!</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  goalCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    alignItems: 'center',
  },
  goalLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  goalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 12,
  },
  selectGoalButton: {
    margin: 20,
    padding: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectGoalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  changeGoalButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  changeGoalText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    width: '45%',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  addGoalButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  addGoalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
}); 