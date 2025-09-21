import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
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
      <StatusBar style="light" />
      <ScrollView ref={scrollViewRef} style={styles.scrollView} pagingEnabled>
        {/* Landing Section */}
        <View style={styles.landingSection}>
          <View style={styles.hero}>
            <Text style={styles.appName}>Thribble</Text>
            <Text style={styles.title}>Student Marketplace</Text>
            <Text style={styles.subtitle}>
              Buy and sell with verified ASU students
            </Text>
            <Text style={styles.description}>
              The modern way to trade textbooks, electronics, furniture, and more on campus
            </Text>
          </View>
          
          <TouchableOpacity style={styles.getStartedButton} onPress={scrollToAuth}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
          
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=center' }} 
                  style={styles.featureImage}
                />
              </View>
              <Text style={styles.featureText}>Verified Students</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60&h=60&fit=crop&crop=center' }} 
                  style={styles.featureImage}
                />
              </View>
              <Text style={styles.featureText}>Best Prices</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop&crop=center' }} 
                  style={styles.featureImage}
                />
              </View>
              <Text style={styles.featureText}>Safe Trading</Text>
            </View>
          </View>
        </View>

        {/* Auth Section */}
        <View style={styles.authSection}>
          <Text style={styles.authTitle}>Join the Community</Text>
          <Text style={styles.authSubtitle}>
            Sign in or create your account to start trading
          </Text>
          
          <View style={styles.authButtons}>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.disclaimer}>
            Only ASU students with .asu.edu email addresses can join
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  landingSection: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
    textShadowColor: 'rgba(255, 107, 53, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF80',
    textAlign: 'center',
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 60,
    shadowColor: '#FF6B35',
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
    backgroundColor: '#FF6B35',
  },
  featureImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featureText: {
    color: '#FFFFFF',
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
    backgroundColor: '#FF6B35',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#FF6B35',
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
    borderColor: '#000000',
  },
  registerButtonText: {
    color: '#000000',
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