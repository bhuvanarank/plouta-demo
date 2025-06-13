import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddressSearchScreen() {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const router = useRouter();

  // Fetch suggestions from Postcodes.io as user types
  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`https://api.postcodes.io/postcodes?q=${encodeURIComponent(query)}`);
      if (res.data && res.data.result) {
        setSuggestions(res.data.result.map((item: any) => item.postcode + (item.admin_ward ? ", " + item.admin_ward : '')));
      } else {
        setSuggestions([]);
      }
    } catch (e) {
      setSuggestions([]);
    }
    setLoading(false);
  };

  const handleChange = (text: string) => {
    setAddress(text);
    setSelected('');
    fetchSuggestions(text);
  };

  const handleSelect = (item: string) => {
    setAddress(item);
    setSelected(item);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  const handleContinue = () => {
    // pass the addresss to the confirm-address page
    router.push({
      pathname: '/(tabs)/confirm-address' as any,
      params: { address: address }
    });
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <Text style={styles.title}>Your current home address</Text>
      <Text style={styles.subtitle}>This must be your current UK address.</Text>
      <View style={{ width: '100%' }}>
        <TextInput
          style={styles.input}
          placeholder="Your address or postcode..."
          value={address}
          onChangeText={handleChange}
          placeholderTextColor="#A9A9A9"
          autoCapitalize="none"
        />
        {loading && <ActivityIndicator size="small" color="#065F46" style={{ marginTop: -15, marginBottom: 10 }} />}
        {suggestions.length > 0 && (
          <View style={styles.suggestionBox}>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)} style={styles.suggestionItem}>
                  <Text style={{ color: '#222' }}>{item}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, { opacity: address ? 1 : 0.5 }]}
        onPress={handleContinue}
        disabled={!address}
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
    width: '60%', // 60% progress for this step
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