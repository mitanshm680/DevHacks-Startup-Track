import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Gift, Star, Trophy, CreditCard } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const giftCards = [
  { id: 1, name: 'Amazon', points: 500, value: 5, logo: '🛒' },
  { id: 2, name: 'Starbucks', points: 500, value: 5, logo: '☕' },
  { id: 3, name: 'Target', points: 1000, value: 10, logo: '🎯' },
  { id: 4, name: 'Spotify', points: 1000, value: 10, logo: '🎵' },
  { id: 5, name: 'Netflix', points: 1500, value: 15, logo: '🎬' },
  { id: 6, name: 'Apple Store', points: 2000, value: 20, logo: '🍎' },
];

const recentActivity = [
  { id: 1, action: 'Item Sold', points: '+50', item: 'MacBook Pro M1', date: '2 days ago' },
  { id: 2, action: 'Review Received', points: '+10', item: 'Chemistry Textbook', date: '1 week ago' },
  { id: 3, action: 'First Sale Bonus', points: '+100', item: 'Welcome Bonus', date: '2 weeks ago' },
  { id: 4, action: 'Item Sold', points: '+25', item: 'Desk Chair', date: '3 weeks ago' },
];

export default function RewardsScreen() {
  const [currentPoints, setCurrentPoints] = useState(850);
  const [displayedTitle, setDisplayedTitle] = useState('');
  
  const fullTitle = 'Points & Rewards';

  useEffect(() => {
    let titleIndex = 0;
    
    const titleTimer = setInterval(() => {
      if (titleIndex < fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTimer);
      }
    }, 70);

    return () => clearInterval(titleTimer);
  }, []);

  const handleRedeem = (giftCard: any) => {
    if (currentPoints < giftCard.points) {
      Alert.alert('Not Enough Points', `You need ${giftCard.points} points to redeem this gift card. You currently have ${currentPoints} points.`);
      return;
    }

    Alert.alert(
      'Confirm Redemption',
      `Redeem ${giftCard.points} points for a $${giftCard.value} ${giftCard.name} gift card?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => {
            setCurrentPoints(prev => prev - giftCard.points);
            Alert.alert('Success!', `Your $${giftCard.value} ${giftCard.name} gift card has been sent to your email!`);
          }
        }
      ]
    );
  };

  const PointsHeader = () => (
    <View style={styles.pointsHeader}>
      <View style={styles.pointsCard}>
        <Trophy size={32} color="#FFC627" />
        <Text style={styles.pointsTitle}>Your Points</Text>
        <Text style={styles.pointsValue}>{currentPoints}</Text>
        <Text style={styles.pointsSubtitle}>Keep selling to earn more!</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentPoints % 1000) / 10}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {1000 - (currentPoints % 1000)} points to next tier
        </Text>
      </View>
    </View>
  );

  const GiftCardItem = ({ giftCard }: { giftCard: any }) => (
    <TouchableOpacity 
      style={[
        styles.giftCardItem,
        currentPoints < giftCard.points && styles.giftCardDisabled
      ]}
      onPress={() => handleRedeem(giftCard)}
      disabled={currentPoints < giftCard.points}
    >
      <View style={styles.giftCardLeft}>
        <Text style={styles.giftCardLogo}>{giftCard.logo}</Text>
        <View style={styles.giftCardInfo}>
          <Text style={styles.giftCardName}>{giftCard.name}</Text>
          <Text style={styles.giftCardValue}>${giftCard.value} Gift Card</Text>
        </View>
      </View>
      
      <View style={styles.giftCardRight}>
        <Text style={[
          styles.giftCardPoints,
          currentPoints < giftCard.points && styles.giftCardPointsDisabled
        ]}>
          {giftCard.points} pts
        </Text>
        <View style={[
          styles.redeemButton,
          currentPoints < giftCard.points && styles.redeemButtonDisabled
        ]}>
          <Text style={[
            styles.redeemButtonText,
            currentPoints < giftCard.points && styles.redeemButtonTextDisabled
          ]}>
            Redeem
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ActivityItem = ({ activity }: { activity: any }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityLeft}>
        <View style={styles.activityIcon}>
          {activity.action === 'Item Sold' && <Gift size={16} color="#4CAF50" />}
          {activity.action === 'Review Received' && <Star size={16} color="#FFC627" />}
          {activity.action === 'First Sale Bonus' && <Trophy size={16} color="#FF9800" />}
        </View>
        <View>
          <Text style={styles.activityAction}>{activity.action}</Text>
          <Text style={styles.activityItem}>{activity.item}</Text>
          <Text style={styles.activityDate}>{activity.date}</Text>
        </View>
      </View>
      
      <Text style={styles.activityPoints}>{activity.points}</Text>
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{displayedTitle}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <PointsHeader />

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Earn Points</Text>
          <View style={styles.howItWorksContainer}>
            <View style={styles.howItWorksItem}>
              <Gift size={24} color="#4CAF50" />
              <Text style={styles.howItWorksTitle}>Sell Items</Text>
              <Text style={styles.howItWorksDesc}>+25-50 pts per sale</Text>
            </View>
            <View style={styles.howItWorksItem}>
              <Star size={24} color="#FFC627" />
              <Text style={styles.howItWorksTitle}>Get Reviews</Text>
              <Text style={styles.howItWorksDesc}>+10 pts per review</Text>
            </View>
            <View style={styles.howItWorksItem}>
              <Trophy size={24} color="#FF9800" />
              <Text style={styles.howItWorksTitle}>Complete Milestones</Text>
              <Text style={styles.howItWorksDesc}>Bonus rewards</Text>
            </View>
          </View>
        </View>

        {/* Gift Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redeem Gift Cards</Text>
          <View style={styles.giftCardsContainer}>
            {giftCards.map((giftCard) => (
              <GiftCardItem key={giftCard.id} giftCard={giftCard} />
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </View>
        </View>

        <View style={styles.bottomPadding} />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 15,
    fontFamily: 'Pacifico_400Regular',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  headerRight: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pointsHeader: {
    marginTop: 20,
    marginBottom: 30,
  },
  pointsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 30,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.1)',
  },
  pointsTitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  pointsSubtitle: {
    fontSize: 14,
    color: '#999999',
  },
  progressContainer: {
    marginTop: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFC627',
  },
  progressText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  howItWorksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 2,
    borderColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  howItWorksItem: {
    alignItems: 'center',
    flex: 1,
  },
  howItWorksTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  howItWorksDesc: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },
  giftCardsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.05)',
  },
  giftCardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  giftCardDisabled: {
    opacity: 0.5,
  },
  giftCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  giftCardLogo: {
    fontSize: 32,
    marginRight: 15,
  },
  giftCardInfo: {
    flex: 1,
  },
  giftCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  giftCardValue: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  giftCardRight: {
    alignItems: 'flex-end',
  },
  giftCardPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  giftCardPointsDisabled: {
    color: '#CCCCCC',
  },
  redeemButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  redeemButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  redeemButtonTextDisabled: {
    color: '#999999',
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    borderColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  activityItemText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  activityDate: {
    fontSize: 11,
    color: '#999999',
    marginTop: 2,
  },
  activityPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bottomPadding: {
    height: 20,
  },
});