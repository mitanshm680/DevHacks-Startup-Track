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
import { LinearGradient } from 'expo-linear-gradient';
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
    <LinearGradient
      colors={['#0d1335', '#6ecded']}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        style={styles.keyboardContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar style="light" />
      
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={[styles.appName, Platform.OS === 'web' && { fontFamily: 'Pacifico, cursive' }]}>Thribble</Text>
          <Text style={[styles.title, Platform.OS === 'web' && { fontFamily: 'Pacifico, cursive' }]}>Welcome Back</Text>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
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
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000000',
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