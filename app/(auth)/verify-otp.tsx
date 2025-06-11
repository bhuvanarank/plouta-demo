import { styles } from '@/components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Get the email from storage that was saved during signup
    AsyncStorage.getItem('tempEmail').then((storedEmail) => {
      if (storedEmail) {
        setEmail(storedEmail);
      }
    });

    // Start the countdown timer
    startTimer();
  }, []);

  const startTimer = () => {
    setCanResend(false);
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((currentTimer) => {
        if (currentTimer <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return currentTimer - 1;
      });
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const storedOTP = await AsyncStorage.getItem('tempOTP');
      
      if (storedOTP === otp) {
        // OTP is correct, proceed with account creation
        const tempEmail = await AsyncStorage.getItem('tempEmail');
        const tempPassword = await AsyncStorage.getItem('tempPassword');
        
        // Store the verified credentials
        await AsyncStorage.setItem('userEmail', tempEmail || '');
        await AsyncStorage.setItem('userPassword', tempPassword || '');
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('isEmailVerified', 'true');
        
        // Clean up temporary storage
        await AsyncStorage.removeItem('tempOTP');
        await AsyncStorage.removeItem('tempEmail');
        await AsyncStorage.removeItem('tempPassword');
        
        Alert.alert(
          'Success',
          'Email verified and account created successfully!',
          [
            {
              text: 'Continue',
              onPress: () => router.replace('/(tabs)/dashboard')
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    try {
      // Here you would typically call your API to resend the OTP
      // For now, we'll simulate it with a new random OTP
      const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
      await AsyncStorage.setItem('tempOTP', newOTP);
      
      // Start the timer again
      startTimer();
      
      Alert.alert('Success', 'New OTP has been sent to your email');
      console.log('New OTP (for testing):', newOTP);
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/plouta-logo.png')} style={styles.logoImage} />
      <Text style={styles.heading}>Verify your email</Text>
      
      <Text style={styles.subHeading}>
        We've sent a verification code to{'\n'}
        {email}
      </Text>

      <TextInput
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={6}
        editable={!isLoading}
      />

      <TouchableOpacity
        style={[
          styles.button,
          (otp.length !== 6 || isLoading) ? styles.buttonDisabled : null
        ]}
        onPress={handleVerifyOTP}
        disabled={otp.length !== 6 || isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.timerText}>
          {canResend ? 'Didn\'t receive the code?' : `Resend code in ${timer}s`}
        </Text>
        <TouchableOpacity
          onPress={handleResendOTP}
          disabled={!canResend || isLoading}
        >
          <Text style={[
            styles.link,
            (!canResend || isLoading) ? styles.linkDisabled : null
          ]}>
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 