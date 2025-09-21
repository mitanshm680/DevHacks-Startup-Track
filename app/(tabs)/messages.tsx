import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, MoveVertical as MoreVertical } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const messages = [
  {
    id: 1,
    name: 'Sarah Johnson',
    dorm: 'Barrett Hall',
    lastMessage: 'Is the MacBook still available?',
    timestamp: '2m ago',
    unread: 2,
    item: 'MacBook Pro M1',
    price: '$800',
    avatar: '👩‍🎓',
  },
  {
    id: 2,
    name: 'Mike Chen',
    dorm: 'Vista del Sol',
    lastMessage: 'Can we meet tomorrow at 3pm?',
    timestamp: '15m ago',
    unread: 0,
    item: 'Chemistry Textbook',
    price: '$45',
    avatar: '👨‍🎓',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    dorm: 'Tooker House',
    lastMessage: 'Thanks! The chair is perfect 😊',
    timestamp: '1h ago',
    unread: 0,
    item: 'Desk Chair',
    price: '$60',
    avatar: '👩‍🎓',
  },
  {
    id: 4,
    name: 'Alex Thompson',
    dorm: 'Hassayampa',
    lastMessage: 'Would you take $20 for the jacket?',
    timestamp: '3h ago',
    unread: 1,
    item: 'Winter Jacket',
    price: '$40',
    avatar: '👨‍🎓',
  },
  {
    id: 5,
    name: 'Jessica Park',
    dorm: 'Barrett Hall',
    lastMessage: 'Great! I\'ll take it',
    timestamp: 'Yesterday',
    unread: 0,
    item: 'Coffee Maker',
    price: '$35',
    avatar: '👩‍🎓',
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');

  const fullTitle = 'Messages';

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

    return () => clearInterval(titleTimer);
  }, []);

  const renderMessageItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.messageCard}
      onPress={() => console.log('Navigate to chat:', item.id)}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>

      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userDorm}>{item.dorm}</Text>
          </View>
          <View style={styles.messageRight}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={16} color="#666666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.item}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>

        <Text
          style={[
            styles.lastMessage,
            item.unread > 0 && styles.unreadMessage,
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
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
        <Text style={styles.title}>
          {displayedTitle}
        </Text>

        <View style={styles.searchContainer}>
          <Search size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.messagesContent, { paddingBottom: 120 }]}
      />

      {/* Empty State */}
      {messages.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>💬</Text>
          <Text style={styles.emptyStateTitle}>No messages yet</Text>
          <Text style={styles.emptyStateText}>
            Start buying or selling items to connect with other students
          </Text>
        </View>
      )}
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
    marginBottom: 20,
    fontFamily: 'Pacifico_400Regular',
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
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 10,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#65695A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.05)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    fontSize: 40,
    textAlign: 'center',
    width: 50,
    height: 50,
    lineHeight: 50,
  },
  unreadBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  userDorm: {
    fontSize: 12,
    color: '#65695A',
    marginTop: 2,
  },
  messageRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginRight: 8,
  },
  moreButton: {
    padding: 2,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#65695A',
  },
  lastMessage: {
    fontSize: 14,
    color: '#999999',
  },
  unreadMessage: {
    color: '#333333',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#65695A',
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});