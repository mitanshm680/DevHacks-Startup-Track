import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Edit3, Trash2, Eye } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const myListings = [
  { 
    id: 1, 
    title: 'MacBook Pro 2021', 
    price: 1200, 
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    category: 'Electronics', 
    status: 'Active',
    views: 24,
    likes: 8,
    datePosted: '2 days ago'
  },
  { 
    id: 2, 
    title: 'Organic Chemistry Textbook', 
    price: 95, 
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    category: 'Textbooks', 
    status: 'Active',
    views: 12,
    likes: 3,
    datePosted: '5 days ago'
  },
  { 
    id: 3, 
    title: 'Ergonomic Desk Chair', 
    price: 180, 
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    category: 'Furniture', 
    status: 'Sold',
    views: 45,
    likes: 12,
    datePosted: '1 week ago'
  },
  { 
    id: 4, 
    title: 'Nike Air Max Sneakers', 
    price: 85, 
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    category: 'Clothing', 
    status: 'Active',
    views: 18,
    likes: 6,
    datePosted: '3 days ago'
  },
];

export default function MyListingsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');

  const fullTitle = 'My Listings';
  const fullSubtitle = 'Manage your items on Thribble';

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
    }, 120);

    return () => clearInterval(titleTimer);
  }, []);

  const filteredListings = myListings.filter(item => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return item.status === 'Active';
    if (selectedFilter === 'sold') return item.status === 'Sold';
    return true;
  });

  const renderListingItem = ({ item }: { item: any }) => (
    <View style={styles.listingCard}>
      <Image source={{ uri: item.image }} style={styles.listingImage} />
      <View style={styles.listingInfo}>
        <View style={styles.listingHeader}>
          <Text style={styles.listingTitle}>{item.title}</Text>
          <View style={[styles.statusBadge, item.status === 'Sold' && styles.soldBadge]}>
            <Text style={[styles.statusText, item.status === 'Sold' && styles.soldText]}>
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={styles.listingPrice}>${item.price}</Text>
        <Text style={styles.listingCategory}>{item.category}</Text>
        <View style={styles.listingStats}>
          <View style={styles.statItem}>
            <Eye size={16} color="#666" />
            <Text style={styles.statText}>{item.views} views</Text>
          </View>
          <Text style={styles.listingDate}>{item.datePosted}</Text>
        </View>
        <View style={styles.listingActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit3 size={18} color="#000000" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Trash2 size={18} color="#666" />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#0d1335', '#6ecded']}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, Platform.OS === 'web' && { fontFamily: 'Pacifico, cursive' }]}>{displayedTitle}</Text>
        <Text style={styles.headerSubtitle}>{displayedSubtitle}</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterTab, selectedFilter === 'all' && styles.activeFilterTab]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={[styles.filterText, selectedFilter === 'all' && styles.activeFilterText]}>
            All ({myListings.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterTab, selectedFilter === 'active' && styles.activeFilterTab]}
          onPress={() => setSelectedFilter('active')}
        >
          <Text style={[styles.filterText, selectedFilter === 'active' && styles.activeFilterText]}>
            Active ({myListings.filter(item => item.status === 'Active').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterTab, selectedFilter === 'sold' && styles.activeFilterTab]}
          onPress={() => setSelectedFilter('sold')}
        >
          <Text style={[styles.filterText, selectedFilter === 'sold' && styles.activeFilterText]}>
            Sold ({myListings.filter(item => item.status === 'Sold').length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Listings */}
      <FlatList
        data={filteredListings}
        renderItem={renderListingItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.listingsContainer, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      />
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
  headerSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 20,
    fontFamily: 'Pacifico',
    letterSpacing: 0.5,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  activeFilterTab: {
    backgroundColor: '#000000',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  listingsContainer: {
    padding: 20,
  },
  listingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.1)',
  },
  listingImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  listingInfo: {
    padding: 16,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  soldBadge: {
    backgroundColor: '#FFE8E8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4CAF50',
  },
  soldText: {
    color: '#F44336',
  },
  listingPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  listingCategory: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  listingStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  listingDate: {
    fontSize: 14,
    color: '#666666',
  },
  listingActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginLeft: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  filterButton: {
    marginLeft: 10,
  },
  categoriesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    minWidth: 80,
  },
  categoryItemActive: {
    backgroundColor: '#8C1538',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  controlsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  resultsText: {
    fontSize: 16,
    color: '#666666',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 2,
  },
  viewButton: {
    padding: 8,
    borderRadius: 6,
  },
  viewButtonActive: {
    backgroundColor: '#8C1538',
  },
  filtersSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterChip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterChipText: {
    fontSize: 14,
    color: '#666666',
  },
  resultsList: {
    padding: 15,
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    margin: 5,
    flex: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    fontSize: 40,
    marginBottom: 10,
  },
  itemContent: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8C1538',
    marginBottom: 3,
  },
  itemCategory: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  itemSeller: {
    fontSize: 12,
    color: '#8C1538',
    fontWeight: '500',
    marginBottom: 8,
  },
  conditionBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  conditionText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '500',
  },
});