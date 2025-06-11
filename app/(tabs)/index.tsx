import { styles } from '@/components/styles';
import { AUTH_CONFIG } from '@/config/auth';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Initialize WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

// Temporary debug log
if (__DEV__) {
  console.log('Auth Config:', {
    iosClientId: AUTH_CONFIG.google.iosClientId,
    androidClientId: AUTH_CONFIG.google.androidClientId,
    webClientId: AUTH_CONFIG.google.webClientId,
    platform: Platform.OS,
  });
}

export default function PloutaSignupScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    ...AUTH_CONFIG.google,
  });

  useEffect(() => {
    if (__DEV__ && request) {
      console.log('Google Auth Request:', {
        clientId: request.clientId,
        redirectUri: request.redirectUri,
        scopes: request.scopes,
        responseType: request.responseType,
      });
    }
  }, [request]);

  useEffect(() => {
    handleGoogleResponse();
  }, [response]);

  const handleGoogleResponse = async () => {
    if (response?.type === 'success') {
      setIsLoading(true);
      try {
        const { code } = response.params;
        console.log('Successfully received authorization code');
        
        await AsyncStorage.setItem('isAuthenticated', 'true');
        router.replace('/(tabs)/dashboard');
      } catch (error) {
        console.error('Google sign in error:', error);
        if (error instanceof Error) {
          console.error('Error details:', error.message);
        }
        Alert.alert(
          'Authentication Error',
          'Failed to complete Google sign in. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    } else if (response?.type === 'error') {
      console.error('Google sign in error:', response.error);
      Alert.alert(
        'Authentication Error',
        'Failed to sign in with Google. Please try again.'
      );
    }
  };

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

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  const validatePassword = (text: string) => {
    // if (!text) {
    //   setPasswordError('Password is required');
    //   return false;
    // }
    // if (text.length < 8) {
    //   setPasswordError('Password must be at least 8 characters long');
    //   return false;
    // }
    // if (!/(?=.*[A-Z])/.test(text)) {
    //   setPasswordError('Password must contain at least one uppercase letter');
    //   return false;
    // }
    // if (!/(?=.*[a-z])/.test(text)) {
    //   setPasswordError('Password must contain at least one lowercase letter');
    //   return false;
    // }
    // if (!/(?=.*\d)/.test(text)) {
    //   setPasswordError('Password must contain at least one number');
    //   return false;
    // }
    // if (!/(?=.*[!@#$%^&*])/.test(text)) {
    //   setPasswordError('Password must contain at least one special character (!@#$%^&*)');
    //   return false;
    // }
    setPasswordError('');
    return true;
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleEmailSignup = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsLoading(true);
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');

        if (storedEmail === email) {
          Alert.alert(
            'Account Exists',
            'An account with this email already exists. Please use a different email or login.',
            [{ text: 'OK' }]
          );
        } else {
          // Generate a 6-digit OTP
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          
          // Store the email and OTP temporarily
          await AsyncStorage.setItem('tempEmail', email);
          await AsyncStorage.setItem('tempOTP', otp);
          await AsyncStorage.setItem('tempPassword', password);
          
          // For development/testing purposes, log the OTP
          if (__DEV__) {
            console.log('Generated OTP:', otp);
          }

          // Here you would typically call your API to send the OTP via email
          // For now, we'll just simulate it
          
          Alert.alert(
            'Verification Required',
            'We have sent a verification code to your email. Please verify your email to continue.',
            [
              {
                text: 'OK',
                onPress: () => {
                  console.log('Navigating to OTP verification...');
                  router.replace('../(auth)/verify-otp');
                }
              }
            ]
          );
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Failed to create account. Please try again.',
          [{ text: 'OK' }]
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      console.log('Starting Google Sign-In...');
      const result = await promptAsync();
      console.log('Google Sign-In result:', result);
      
      if (result.type === 'error') {
        console.error('Google prompt error:', result.error);
        Alert.alert('Error', 'Google Sign In failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert('Error', 'Failed to connect to Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/plouta-logo.png')} style={styles.logoImage} />
      <Text style={styles.heading}>Create your Plouta account</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        style={[styles.input, emailError ? styles.inputError : null]}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        editable={!isLoading}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        placeholder="Choose password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        style={[styles.input, passwordError ? styles.inputError : null]}
        editable={!isLoading}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity 
        style={[
          styles.button, 
          (!email || !password || emailError || passwordError || isLoading) ? styles.buttonDisabled : null
        ]} 
        onPress={handleEmailSignup}
        disabled={!email || !password || !!emailError || !!passwordError || isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Please wait...' : 'Continue'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.or}>or</Text>

      <TouchableOpacity 
        style={[styles.socialButton, isLoading && styles.buttonDisabled]} 
        onPress={handleGoogleLogin}
        disabled={isLoading}
      >
        <AntDesign name="google" size={20} color="#000" />
        <Text style={styles.socialButtonText}>
          {isLoading ? 'Please wait...' : 'Continue with Google'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        By continue you confirm you have read and accepted Plouta's{' '}
        <Text style={styles.link}>Terms & Conditions</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
    </View>
  );
}
