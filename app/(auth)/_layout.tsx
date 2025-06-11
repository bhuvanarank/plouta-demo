import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="verify-otp"
        options={{
          title: 'Verify Email',
          headerShown: false,
        }}
      />
    </Stack>
  );
} 