import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  User, 
  Settings, 
  Gift, 
  Star, 
  Package, 
  CreditCard, 
  Award,
  ChevronRight,
  LogOut
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [displayedTitle, setDisplayedTitle] = useState('');
  
  const fullTitle = 'Profile';

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

  const handleLogout = () => {
    console.log('HARDCODED LOGOUT - Going to sign in page...');
    // HARDCODED - Always go to login/sign in page immediately
    router.replace('/login');
  };

  const ProfileCard = () => (
    <View style={styles.profileCard}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>👨‍🎓</Text>
        <View style={styles.membershipBadge}>
          <Star size={12} color="#FFFFFF" />
          <Text style={styles.badgeText}>Premium</Text>
        </View>
      </View>
      
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>John Smith</Text>
        <Text style={styles.profileMajor}>Computer Science</Text>
        <Text style={styles.profileDorm}>Barrett Hall • Room 301</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Items Sold</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>850</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const MenuSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View style={styles.menuSection}>
      <Text style={styles.menuSectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const MenuItem = ({ icon: Icon, title, subtitle, onPress, color = '#65695A' }: { 
    icon: any, 
    title: string, 
    subtitle?: string, 
    onPress: () => void, 
    color?: string 
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Icon size={24} color={color} />
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <ChevronRight size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{displayedTitle}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileCard />

        <MenuSection title="Rewards & Membership">
          <MenuItem
            icon={Gift}
            title="Points & Rewards"
            subtitle="850 points • Redeem gift cards"
            onPress={() => router.push('/rewards')}
          />
          <MenuItem
            icon={Award}
            title="Membership"
            subtitle="Premium Plan • Unlimited listings"
            onPress={() => router.push('/membership')}
          />
        </MenuSection>

        <MenuSection title="My Activity">
          <MenuItem
            icon={Package}
            title="My Listings"
            subtitle="Manage your active and sold items"
            onPress={() => {}}
          />
          <MenuItem
            icon={Star}
            title="Reviews & Ratings"
            subtitle="4.8 stars from 15 reviews"
            onPress={() => {}}
          />
          <MenuItem
            icon={User}
            title="Edit Profile"
            subtitle="Update your information"
            onPress={() => {}}
          />
        </MenuSection>

        <MenuSection title="Account">
          <MenuItem
            icon={CreditCard}
            title="Payment Methods"
            subtitle="Manage cards and billing"
            onPress={() => {}}
          />
          <MenuItem
            icon={Settings}
            title="Settings"
            subtitle="Notifications, privacy, and more"
            onPress={() => {}}
          />
          <MenuItem
            icon={LogOut}
            title="Logout"
            subtitle="Sign out of your account"
            onPress={handleLogout}
            color="#FF4444"
          />
        </MenuSection>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>ASU Marketplace v1.0.0</Text>
          <Text style={styles.copyright}>Made with ❤️ for Sun Devils</Text>
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
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 45,
    paddingBottom: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Pacifico',
    letterSpacing: 1,
  },
  settingsButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 30,
    marginTop: -20,
    marginBottom: 25,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#65695A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.1)',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  avatar: {
    fontSize: 60,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#65695A',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  profileMajor: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 3,
  },
  profileDorm: {
    fontSize: 14,
    color: '#65695A',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 15,
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
  menuSection: {
    marginTop: 25,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#65695A',
    marginBottom: 10,
    marginLeft: 5,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#65695A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.05)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemContent: {
    marginLeft: 15,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  appVersion: {
    fontSize: 14,
    color: '#999999',
  },
  copyright: {
    fontSize: 12,
    color: '#999999',
    marginTop: 5,
  },
});