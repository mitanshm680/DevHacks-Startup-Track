import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft } from 'lucide-react-native';
import { validateDemoCredentials } from '../data/demoUsers';
import DemoCredentials from '../components/DemoCredentials';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoCredentialSelect = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  const handleLogin = () => {
    console.log('Login button clicked - HARDCODED TO ALWAYS WORK!');
    
    // Check if fields have ANY content
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // HARDCODED SUCCESS - Always navigate regardless of what they type
    console.log('HARDCODED SUCCESS - Going to main app...');
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#65695A" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.appName}>Thribble</Text>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="ASU Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <DemoCredentials onSelectCredentials={handleDemoCredentialSelect} />

        <TouchableOpacity 
          style={styles.registerLink} 
          onPress={() => router.push('/register')}
        >
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#65695A',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#65695A',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#65695A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  forgotButton: {
    marginBottom: 30,
  },
  forgotText: {
    color: '#65695A',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  registerLink: {
    alignItems: 'center',
  },
  registerText: {
    color: '#666666',
    fontSize: 16,
  },
  registerBold: {
    color: '#65695A',
    fontWeight: '600',
  },
});