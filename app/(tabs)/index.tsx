import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const topListings = [
  { 
    id: 1, 
    title: 'MacBook Pro M1', 
    price: 800, 
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=center',
    category: 'Electronics', 
    seller: 'Barrett Hall',
    condition: 'Like New'
  },
  { 
    id: 2, 
    title: 'Organic Chemistry Textbook', 
    price: 45, 
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
    category: 'Textbooks', 
    seller: 'Hassayampa',
    condition: 'Good'
  },
  { 
    id: 3, 
    title: 'Ergonomic Office Chair', 
    price: 120, 
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center',
    category: 'Furniture', 
    seller: 'Tooker House',
    condition: 'Excellent'
  },
  { 
    id: 4, 
    title: 'iPhone 14 Pro', 
    price: 650, 
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center',
    category: 'Electronics', 
    seller: 'Vista del Sol',
    condition: 'Like New'
  },
];

const featuredItems = [
  { 
    id: 1, 
    title: 'Gaming Setup Bundle', 
    price: 850, 
    originalPrice: 1200, 
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop&crop=center',
    discount: '29% OFF',
    category: 'Electronics'
  },
  { 
    id: 2, 
    title: 'Dorm Room Essentials', 
    price: 180, 
    originalPrice: 250, 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&crop=center',
    discount: '28% OFF',
    category: 'Furniture'
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  
  const fullTitle = 'Thribble';

  useEffect(() => {
    let titleIndex = 0;
    
    const titleTimer = setInterval(() => {
      if (titleIndex < fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTimer);
      }
    }, 120);

    return () => {
      clearInterval(titleTimer);
    };
  }, []);

  const renderListingCard = ({ item, isFeatured = false }: { item: any, isFeatured?: boolean }) => (
    <TouchableOpacity style={[styles.card, isFeatured && styles.featuredCard]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={18} color="#65695A" fill="none" />
        </TouchableOpacity>
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          )}
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.category}>{item.category}</Text>
          {item.condition && (
            <Text style={styles.condition}>{item.condition}</Text>
          )}
        </View>
        
        {item.seller && (
          <Text style={styles.seller}>{item.seller}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#0d1335', '#6ecded']}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>{displayedTitle}</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="rgba(0, 0, 0, 0.6)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Promotional Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>🎒 BACK TO SCHOOL SALE</Text>
            <Text style={styles.promoDiscount}>40% OFF</Text>
            <Text style={styles.promoSubtitle}>All textbooks & supplies</Text>
            <Text style={styles.promoCode}>Use code: SCHOOL40</Text>
          </View>
          <View style={styles.promoDecoration}>
            <Text style={styles.promoEmoji}>📚</Text>
          </View>
        </View>

        {/* Top Listings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Listings</Text>
          <FlatList
            data={topListings}
            renderItem={({ item }) => renderListingCard({ item })}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Featured Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Deals</Text>
          <FlatList
            data={featuredItems}
            renderItem={({ item }) => renderListingCard({ item, isFeatured: true })}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Campus Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Campus Activity</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1,247</Text>
              <Text style={styles.statLabel}>Active Listings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3,891</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$12,450</Text>
              <Text style={styles.statLabel}>Saved This Week</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Pacifico_400Regular',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  horizontalList: {
    paddingRight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    marginRight: 20,
    width: 220,
    shadowColor: '#65695A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 12,
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  featuredCard: {
    width: 220,
    borderWidth: 2,
    borderColor: '#65695A',
  },
  imageContainer: {
    position: 'relative',
    height: 140,
    backgroundColor: '#F8F8F8',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#65695A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    lineHeight: 22,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#65695A',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999999',
    textDecorationLine: 'line-through',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  condition: {
    fontSize: 12,
    color: '#65695A',
    fontWeight: '500',
  },
  seller: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
  specialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  specialText: {
    fontSize: 10,
    color: '#FFC627',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  statsSection: {
    margin: 20,
    marginBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#65695A',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  promoBanner: {
    backgroundColor: '#000000',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  promoDiscount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  promoSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 6,
  },
  promoCode: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  promoDecoration: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  promoEmoji: {
    fontSize: 40,
  },
});