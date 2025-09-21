import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingScreen() {
  return (
    <LinearGradient
      colors={['#0d1335', '#6ecded']}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      {/* App Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.appName}>
          Thribble
        </Text>
      </View>
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.getStartedButton} 
          onPress={() => router.push('/register')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  titleContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -65 }, 
      { translateY: -50 }, 
      { rotate: '-15deg' }
    ],
    alignItems: 'center',
  },
  appName: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 60,
    gap: 20,
  },
  getStartedButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 15,
    borderRadius: 16,
    width: '100%',
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 16,
    width: '100%',
  },
  loginText: {
    color: '#000000',
    fontSize: 18,
    textAlign: 'center',
  },
});