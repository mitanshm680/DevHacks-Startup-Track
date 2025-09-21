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
import { ArrowLeft, Check, Star, Zap, Crown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const membershipPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '',
    icon: '',
    color: '#666666',
    features: [
      'List up to 3 items per day',
      'Basic search and filters',
      'Standard listing visibility',
      'Basic customer support',
    ],
    current: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 5.99,
    period: '/month',
    icon: '',
    color: '#2196F3',
    features: [
      'List up to 30 items per day',
      'Priority search ranking',
      'Advanced filters and categories',
      'Email customer support',
      'Listing analytics',
    ],
    current: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    period: '/month',
    icon: '',
    color: '#FFC627',
    features: [
      'Unlimited listings',
      'Featured listing highlights',
      'Advanced seller analytics',
      'Priority customer support',
      'Early access to new features',
      'Seller verification badge',
    ],
    current: true,
  },
];

export default function MembershipScreen() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [displayedTitle, setDisplayedTitle] = useState('');

  const fullTitle = 'Membership Plans';

  useEffect(() => {
    let titleIndex = 0;

    const titleTimer = setInterval(() => {
      if (titleIndex < fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTimer);
      }
    }, 80);

    return () => clearInterval(titleTimer);
  }, []);

  const handleUpgrade = (planId: string) => {
    if (planId === 'premium') {
      Alert.alert('Already Premium', 'You are already on the Premium plan!');
      return;
    }

    const plan = membershipPlans.find(p => p.id === planId);
    if (!plan) return;
    Alert.alert(
      'Confirm Upgrade',
      `Upgrade to ${plan.name} for $${plan.price}${plan.period}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Upgrade',
          onPress: () => Alert.alert('Success!', `You've been upgraded to ${plan.name}!`)
        }
      ]
    );
  };

  const PlanCard = ({ plan }: { plan: any }) => (
    <TouchableOpacity
      style={[
        styles.planCard,
        plan.current && styles.currentPlan,
        selectedPlan === plan.id && styles.selectedPlan,
      ]}
      onPress={() => setSelectedPlan(plan.id)}
    >
      <View style={styles.planHeader}>
        <Text style={styles.planIcon}>{plan.icon}</Text>
        <View style={styles.planInfo}>
          <Text style={styles.planName}>{plan.name}</Text>
          {plan.current && (
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>Current Plan</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.priceContainer}>
        {plan.price > 0 ? (
          <>
            <Text style={styles.price}>${plan.price}</Text>
            <Text style={styles.period}>{plan.period}</Text>
          </>
        ) : (
          <Text style={styles.freeText}>Free Forever</Text>
        )}
      </View>

      <View style={styles.featuresContainer}>
        {plan.features.map((feature: string, index: number) => (
          <View key={index} style={styles.featureItem}>
            <Check size={16} color={plan.color} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {!plan.current && (
        <TouchableOpacity
          style={[styles.upgradeButton, { backgroundColor: plan.color }]}
          onPress={() => handleUpgrade(plan.id)}
        >
          <Text style={styles.upgradeButtonText}>
            {plan.price > 0 ? 'Upgrade' : 'Downgrade'}
          </Text>
        </TouchableOpacity>
      )}

      {plan.current && (
        <View style={styles.currentButton}>
          <Text style={styles.currentButtonText}>Current Plan</Text>
        </View>
      )}
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{displayedTitle}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Benefits Overview */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Why Upgrade?</Text>
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Zap size={24} color="#FFC627" />
              <Text style={styles.benefitTitle}>More Visibility</Text>
              <Text style={styles.benefitDesc}>Get your items seen by more buyers</Text>
            </View>
            <View style={styles.benefitItem}>
              <Star size={24} color="#FFC627" />
              <Text style={styles.benefitTitle}>Priority Support</Text>
              <Text style={styles.benefitDesc}>Get help faster when you need it</Text>
            </View>
            <View style={styles.benefitItem}>
              <Crown size={24} color="#FFC627" />
              <Text style={styles.benefitTitle}>Advanced Tools</Text>
              <Text style={styles.benefitDesc}>Access powerful seller features</Text>
            </View>
          </View>
        </View>

        {/* Membership Plans */}
        <View style={styles.plansSection}>
          <Text style={styles.plansTitle}>Choose Your Plan</Text>
          {membershipPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </View>

        {/* FAQ */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I cancel anytime?</Text>
            <Text style={styles.faqAnswer}>
              Yes, you can cancel your subscription at any time. Your benefits will continue until the end of your billing period.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What payment methods do you accept?</Text>
            <Text style={styles.faqAnswer}>
              We accept all major credit cards, debit cards, and PayPal for your convenience.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Do you offer student discounts?</Text>
            <Text style={styles.faqAnswer}>
              Our pricing is already student-friendly! All ASU students get access to these special rates.
            </Text>
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
  benefitsSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  benefitItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  benefitTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  benefitDesc: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 14,
  },
  plansSection: {
    marginBottom: 30,
  },
  plansTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 25,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  currentPlan: {
    borderColor: '#FFC627',
    backgroundColor: '#FFFEF0',
  },
  selectedPlan: {
    borderColor: '#000000',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  planIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  currentBadge: {
    backgroundColor: '#FFC627',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  period: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 4,
  },
  freeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 10,
    flex: 1,
  },
  upgradeButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  currentButton: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  currentButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  faqSection: {
    marginBottom: 30,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
});