

import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function continueToProfile() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      Alert.alert('Required', 'Please enter your name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    router.push({
      pathname: '/profile',
      params: {
        name: trimmedName,
        email: trimmedEmail,
      },
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSide} />

          <View style={styles.brandContainer}>
            <Text style={styles.lemonIcon}>🍋</Text>
            <Text style={styles.brandText}>LITTLE LEMON</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/profile')}
            style={styles.avatarButton}
            accessibilityLabel="Open profile"
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Little Lemon</Text>
            <Text style={styles.heroLocation}>Chicago</Text>
            <Text style={styles.heroDescription}>
              We are a family-owned Mediterranean restaurant,
              focused on traditional recipes served with a modern twist.
            </Text>
          </View>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
            }}
            style={styles.heroImage}
          />
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.title}>Let's get to know you</Text>
          <Text style={styles.subtitle}>
            Enter your details to get started.
          </Text>

          <Text style={styles.label}>First and last name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#888888"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
          />

          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
          />

          <TouchableOpacity
            style={styles.nextButton}
            onPress={continueToProfile}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>LITTLE LEMON</Text>
          <Text style={styles.footerText}>Chicago, Illinois</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 42,
    paddingBottom: 18,
  },
  headerSide: {
    width: 40,
  },
  brandContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lemonIcon: {
    fontSize: 20,
    marginRight: 7,
  },
  brandText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '800',
    letterSpacing: 2,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  hero: {
    marginHorizontal: 18,
    backgroundColor: '#495E57',
    borderRadius: 4,
    padding: 16,
    minHeight: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontFamily: 'Georgia',
    fontSize: 28,
    fontWeight: '800',
    color: '#F4CE14',
  },
  heroLocation: {
    fontSize: 21,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  heroDescription: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 17,
  },
  heroImage: {
    width: '38%',
    height: 125,
    borderRadius: 10,
  },
  form: {
    marginHorizontal: 22,
    marginTop: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 7,
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    minHeight: 49,
    borderWidth: 1,
    borderColor: '#C9CECB',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#333333',
    fontSize: 15,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#F4CE14',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 5,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '800',
  },
  homeButton: {
    alignItems: 'center',
    padding: 14,
    marginTop: 8,
  },
  homeButtonText: {
    color: '#495E57',
    fontWeight: '700',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    marginTop: 28,
    paddingTop: 20,
  },
  footerBrand: {
    color: '#495E57',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  footerText: {
    marginTop: 6,
    color: '#777777',
    fontSize: 12,
  },
});
