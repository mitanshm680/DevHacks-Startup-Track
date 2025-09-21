import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToAuth = () => {
    scrollViewRef.current?.scrollTo({ y: height, animated: true });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView ref={scrollViewRef} style={styles.scrollView} pagingEnabled>
        {/* Landing Section */}
        <View style={[styles.landingSection, Platform.OS === 'web' && { className: 'thribble-hero' }]}>
          <View style={[styles.hero, Platform.OS === 'web' && { className: 'thribble-hero-content' }]}>
            <Text style={[styles.appName, Platform.OS === 'web' && { className: 'thribble-title' }]}>Thribble</Text>
            <Text style={[styles.title, Platform.OS === 'web' && { className: 'thribble-subtitle' }]}>Student Marketplace</Text>
            <Text style={[styles.subtitle, Platform.OS === 'web' && { className: 'thribble-description' }]}>
              Buy and sell with verified ASU students
            </Text>
            <Text style={[styles.description, Platform.OS === 'web' && { className: 'thribble-description' }]}>
              The modern way to trade textbooks, electronics, furniture, and more on campus
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.getStartedButton, Platform.OS === 'web' && { className: 'thribble-button' }]} 
            onPress={scrollToAuth}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
          
          <View style={[styles.features, Platform.OS === 'web' && { className: 'thribble-features' }]}>
            <View style={[styles.featureItem, Platform.OS === 'web' && { className: 'thribble-feature' }]}>
              <View style={[styles.featureIcon, Platform.OS === 'web' && { className: 'thribble-feature-icon' }]}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=center' }} 
                  style={styles.featureImage}
                />
              </View>
              <Text style={[styles.featureText, Platform.OS === 'web' && { className: 'thribble-feature-text' }]}>Verified Students</Text>
            </View>
            <View style={[styles.featureItem, Platform.OS === 'web' && { className: 'thribble-feature' }]}>
              <View style={[styles.featureIcon, Platform.OS === 'web' && { className: 'thribble-feature-icon' }]}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60&h=60&fit=crop&crop=center' }} 
                  style={styles.featureImage}
                />
              </View>
              <Text style={[styles.featureText, Platform.OS === 'web' && { className: 'thribble-feature-text' }]}>Best Prices</Text>
            </View>
            <View style={[styles.featureItem, Platform.OS === 'web' && { className: 'thribble-feature' }]}>
              <View style={[styles.featureIcon, Platform.OS === 'web' && { className: 'thribble-feature-icon' }]}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop&crop=center' }} 
                  style={styles.featureImage}
                />
              </View>
              <Text style={[styles.featureText, Platform.OS === 'web' && { className: 'thribble-feature-text' }]}>Safe Trading</Text>
            </View>
          </View>
        </View>

        {/* Auth Section */}
        <View style={[styles.authSection, Platform.OS === 'web' && { className: 'thribble-auth' }]}>
          <View style={Platform.OS === 'web' ? { className: 'thribble-auth-content' } : {}}>
            <Text style={[styles.authTitle, Platform.OS === 'web' && { className: 'thribble-auth-title' }]}>Join the Community</Text>
            <Text style={[styles.authSubtitle, Platform.OS === 'web' && { className: 'thribble-auth-subtitle' }]}>
              Sign in or create your account to start trading
            </Text>
            
            <View style={[styles.authButtons, Platform.OS === 'web' && { className: 'thribble-auth-buttons' }]}>
              <TouchableOpacity 
                style={[styles.loginButton, Platform.OS === 'web' && { className: 'thribble-login-button' }]} 
                onPress={() => router.push('/login')}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.registerButton, Platform.OS === 'web' && { className: 'thribble-register-button' }]} 
                onPress={() => router.push('/register')}
              >
                <Text style={styles.registerButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.disclaimer, Platform.OS === 'web' && { className: 'thribble-disclaimer' }]}>
              Only ASU students with .asu.edu email addresses can join
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  landingSection: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#65695A',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
    textShadowColor: 'rgba(101, 105, 90, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    fontFamily: Platform.OS === 'web' ? 'Pacifico' : Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: '#65695A',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 60,
    shadowColor: '#65695A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#65695A',
  },
  featureImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featureText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  authSection: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
  },
  authTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  authButtons: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#65695A',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#65695A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#65695A',
  },
  registerButtonText: {
    color: '#65695A',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});