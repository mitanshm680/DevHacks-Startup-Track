import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera, ImageIcon, Sparkles, DollarSign } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  'Textbooks', 'Electronics', 'Furniture', 'Clothing', 'Appliances', 'Sports', 'Other'
];

const conditions = [
  'Like New', 'Excellent', 'Good', 'Fair', 'Poor'
];

export default function SellScreen() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    courseCode: '',
  });
  const [showAIPricing, setShowAIPricing] = useState(false);
  const [aiPrice, setAiPrice] = useState<number | null>(null);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  
  const fullTitle = 'Sell Your Item';
  const fullSubtitle = 'List items for your fellow Sun Devils';

  useEffect(() => {
    let titleIndex = 0;
    let subtitleIndex = 0;
    
    const titleTimer = setInterval(() => {
      if (titleIndex < fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTimer);
        const subtitleTimer = setInterval(() => {
          if (subtitleIndex < fullSubtitle.length) {
            setDisplayedSubtitle(fullSubtitle.slice(0, subtitleIndex + 1));
            subtitleIndex++;
          } else {
            clearInterval(subtitleTimer);
          }
        }, 60);
      }
    }, 100);

    return () => clearInterval(titleTimer);
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAIPricing = () => {
    // Simulate AI pricing
    const suggestedPrice = Math.floor(Math.random() * 200) + 20;
    setAiPrice(suggestedPrice);
    setShowAIPricing(true);
  };

  const useAIPrice = () => {
    if (aiPrice !== null) {
      updateField('price', aiPrice.toString());
      setShowAIPricing(false);
    }
  };

  const handleSubmit = () => {
    const { title, description, price, category, condition } = formData;
    
    if (!title || !description || !price || !category || !condition) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert('Success', 'Your item has been listed successfully!', [
      { text: 'OK', onPress: () => {
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          category: '',
          condition: '',
          courseCode: '',
        });
      }}
    ]);
  };

  return (
    <LinearGradient
      colors={['#0d1335', '#6ecded']}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, Platform.OS === 'web' && { fontFamily: 'Pacifico, cursive' }]}>{displayedTitle}</Text>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Photos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.photoButton}>
              <Camera size={30} color="#65695A" />
              <Text style={styles.photoButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButton}>
              <ImageIcon size={30} color="#65695A" />
              <Text style={styles.photoButtonText}>From Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Item Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Item Details</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Item Title *"
            value={formData.title}
            onChangeText={(value) => updateField('title', value)}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description (condition, age, why selling, etc.) *"
            value={formData.description}
            onChangeText={(value) => updateField('description', value)}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryButton,
                    formData.category === category && styles.categoryButtonActive
                  ]}
                  onPress={() => updateField('category', category)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    formData.category === category && styles.categoryButtonTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Course Code (for textbooks) */}
        {formData.category === 'Textbooks' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Course Code (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., MAT 270, CHM 113"
              value={formData.courseCode}
              onChangeText={(value) => updateField('courseCode', value)}
              autoCapitalize="characters"
            />
          </View>
        )}

        {/* Condition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condition *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {conditions.map((condition, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryButton,
                    formData.condition === condition && styles.categoryButtonActive
                  ]}
                  onPress={() => updateField('condition', condition)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    formData.condition === condition && styles.categoryButtonTextActive
                  ]}>
                    {condition}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Price */}
        <View style={styles.section}>
          <View style={styles.priceHeader}>
            <Text style={styles.sectionTitle}>Price *</Text>
            <TouchableOpacity style={styles.aiButton} onPress={handleAIPricing}>
              <Sparkles size={16} color="#FFFFFF" />
              <Text style={styles.aiButtonText}>AI Pricing</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.priceInputContainer}>
            <DollarSign size={20} color="#666666" style={styles.priceIcon} />
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              value={formData.price}
              onChangeText={(value) => updateField('price', value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>List Item</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* AI Pricing Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAIPricing}
        onRequestClose={() => setShowAIPricing(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Sparkles size={24} color="#65695A" />
              <Text style={styles.modalTitle}>AI Price Suggestion</Text>
            </View>
            
            <Text style={styles.modalDescription}>
              Based on similar items and market trends, we suggest:
            </Text>
            
            <Text style={styles.suggestedPrice}>${aiPrice}</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={useAIPrice}>
                <Text style={styles.modalButtonText}>Use This Price</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]} 
                onPress={() => setShowAIPricing(false)}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextSecondary]}>
                  I'll Set My Own
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 45,
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  photoButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '45%',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  photoButtonText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
    fontFamily: 'serif',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  categoryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryButtonActive: {
    backgroundColor: '#65695A',
    borderColor: '#65695A',
  },
  categoryButtonText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#65695A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  aiButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
  },
  priceIcon: {
    marginRight: 10,
  },
  priceInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#65695A',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 30,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#65695A',
    marginLeft: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  suggestedPrice: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#65695A',
    marginBottom: 30,
  },
  modalButtons: {
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#65695A',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 10,
  },
  modalButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#65695A',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalButtonTextSecondary: {
    color: '#65695A',
  },
});