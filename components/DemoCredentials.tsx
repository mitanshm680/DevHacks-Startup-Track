import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getDemoEmails } from '../data/demoUsers';

interface DemoCredentialsProps {
  onSelectCredentials?: (email: string, password: string) => void;
}

export default function DemoCredentials({ onSelectCredentials }: DemoCredentialsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const demoEmails = getDemoEmails();

  const handleSelectDemo = (email: string) => {
    if (onSelectCredentials) {
      onSelectCredentials(email, '1234');
    }
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.toggleText}>
          {isVisible ? 'Hide' : 'Show'} Demo Credentials
        </Text>
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.credentialsContainer}>
          <Text style={styles.title}>Demo Accounts (Password: 1234)</Text>
          {demoEmails.slice(0, 4).map((email, index) => (
            <TouchableOpacity
              key={index}
              style={styles.credentialItem}
              onPress={() => handleSelectDemo(email)}
            >
              <Text style={styles.emailText}>{email}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.note}>
            Tap any email to auto-fill credentials
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  toggleText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '500',
  },
  credentialsContainer: {
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 12,
    textAlign: 'center',
  },
  credentialItem: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  emailText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'monospace',
  },
  note: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
