import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleLogin = async () => {
    // Immediate alert to verify function is called
    Alert.alert('Login Button Pressed', 'Attempting to log in...');

    try {
      // First check stored values
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');

      Alert.alert(
        'Stored Values',
        `Stored Email: ${storedEmail || 'none'}\nTrying to login with: ${email}`
      );

      // Simple comparison
      if (email === storedEmail && password === storedPassword) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        Alert.alert('Success', 'Login successful!', [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/dashboard')
          }
        ]);
      } else {
        Alert.alert('Login Failed', 'Incorrect email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check credentials');
    }
  };

  const goToSignup = () => {
    router.push({
      pathname: '/(tabs)'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={styles.subHeading}>Login to continue</Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        style={[styles.input, emailError ? styles.inputError : null]}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity 
        style={[styles.button, (!email || !password) ? styles.buttonDisabled : null]}
        onPress={handleLogin}
        disabled={!email || !password}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => Alert.alert('Test', 'Button works!')}
      >
        <Text style={styles.buttonText}>Test Button</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToSignup}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 50,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#dc3545',
    borderWidth: 1,
  },
  errorText: {
    color: '#dc3545',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
}); 