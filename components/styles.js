import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 24,
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    logoImage: {
      width: 220,
      height: 100,
      alignSelf: 'center',
      marginBottom: 20,
      resizeMode: 'contain',
    },
    logo: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#006400',
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      fontSize: 14,
      color: '#444',
      marginBottom: 20,
    },
    heading: {
      fontSize: 18,
      marginBottom: 16,
      textAlign: 'center',
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: '#aaa',
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    inputError: {
      borderColor: '#ff0000',
      marginBottom: 4,
    },
    errorText: {
      color: '#ff0000',
      fontSize: 12,
      marginBottom: 12,
      marginLeft: 4,
    },
    button: {
      backgroundColor: '#006400',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 16,
    },
    buttonDisabled: {
      backgroundColor: '#cccccc',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
    or: {
      textAlign: 'center',
      marginVertical: 10,
      color: '#555',
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    socialButtonText: {
      marginLeft: 8,
      fontWeight: '500',
    },
    googleIconContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    googleText: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    appleButton: {
      height: 44,
      marginBottom: 16,
    },
    footerText: {
      textAlign: 'center',
      fontSize: 12,
      color: '#666',
      marginTop: 16,
    },
    link: {
      color: '#006400',
      textDecorationLine: 'underline',
    },
  });

export { styles };

