
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const STORAGE_KEY = 'littleLemonProfile';

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orderStatuses: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsletter: boolean;
};

const defaultProfile: ProfileData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  orderStatuses: true,
  passwordChanges: true,
  specialOffers: false,
  newsletter: false,
};

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    name?: string;
    email?: string;
  }>();

  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [savedProfile, setSavedProfile] =
    useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [avatarVisible, setAvatarVisible] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);

        let data: ProfileData;

        if (stored) {
          data = {
            ...defaultProfile,
            ...JSON.parse(stored),
          };
        } else {
          const fullName = (params.name ?? '').trim();
          const nameParts = fullName.split(/\s+/).filter(Boolean);

          data = {
            ...defaultProfile,
            firstName: nameParts[0] ?? '',
            lastName: nameParts.slice(1).join(' '),
            email: params.email ?? '',
          };
        }

        if (active) {
          setProfile(data);
          setSavedProfile(data);
        }
      } catch {
        if (active) {
          Alert.alert('Error', 'Could not load your profile.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [params.name, params.email]);

  function updateField<K extends keyof ProfileData>(
    field: K,
    value: ProfileData[K]
  ) {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function saveChanges() {
    const updated: ProfileData = {
      ...profile,
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
    };

    if (!updated.firstName) {
      Alert.alert('Required', 'Please enter your first name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updated.email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setProfile(updated);
      setSavedProfile(updated);
      Alert.alert('Saved', 'Your profile has been saved successfully.');
    } catch {
      Alert.alert('Error', 'Could not save your profile.');
    }
  }

  function discardChanges() {
    setProfile({ ...savedProfile });
    Alert.alert('Discarded', 'Your unsaved changes have been discarded.');
  }

  function changeAvatar() {
    Alert.alert(
      'Change picture',
      'An image picker can be added here to choose a new profile picture.'
    );
  }

  function logOut() {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setProfile(defaultProfile);
            setSavedProfile(defaultProfile);
            router.replace('/onboarding');
          } catch {
            Alert.alert('Error', 'Could not log out. Please try again.');
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#495E57" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
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
          <TouchableOpacity
            onPress={() => router.replace('/')}
            style={styles.backButton}
            accessibilityLabel="Back to Home"
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.brandContainer}>
            <Text style={styles.lemonIcon}>🍋</Text>
            <Text style={styles.brandText}>LITTLE LEMON</Text>
          </View>

          {avatarVisible ? (
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
              }}
              style={styles.headerAvatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {profile.firstName.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <Text style={styles.pageTitle}>Personal information</Text>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          {avatarVisible ? (
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces',
              }}
              style={styles.largeAvatar}
            />
          ) : (
            <View style={styles.largeAvatarPlaceholder}>
              <Text style={styles.largeAvatarInitial}>
                {profile.firstName.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>
          )}

          <View style={styles.avatarActions}>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={changeAvatar}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setAvatarVisible(false)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Details */}
        <Text style={styles.sectionTitle}>Personal details</Text>

        <View style={styles.field}>
          <Text style={styles.label}>First name *</Text>
          <TextInput
            style={styles.input}
            value={profile.firstName}
            onChangeText={(value) => updateField('firstName', value)}
            placeholder="Enter first name"
            placeholderTextColor="#888888"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={styles.input}
            value={profile.lastName}
            onChangeText={(value) => updateField('lastName', value)}
            placeholder="Enter last name"
            placeholderTextColor="#888888"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profile.email}
            onChangeText={(value) => updateField('email', value)}
            placeholder="Enter email"
            placeholderTextColor="#888888"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            value={profile.phone}
            onChangeText={(value) => updateField('phone', value)}
            placeholder="Enter phone number"
            placeholderTextColor="#888888"
            keyboardType="phone-pad"
          />
        </View>

        {/* Notification preferences */}
        <Text style={styles.sectionTitle}>Email notifications</Text>

        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>Order statuses</Text>
          <Switch
            value={profile.orderStatuses}
            onValueChange={(value) => updateField('orderStatuses', value)}
            trackColor={{ false: '#D0D0D0', true: '#495E57' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>Password changes</Text>
          <Switch
            value={profile.passwordChanges}
            onValueChange={(value) => updateField('passwordChanges', value)}
            trackColor={{ false: '#D0D0D0', true: '#495E57' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>Special offers</Text>
          <Switch
            value={profile.specialOffers}
            onValueChange={(value) => updateField('specialOffers', value)}
            trackColor={{ false: '#D0D0D0', true: '#495E57' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>Newsletter</Text>
          <Switch
            value={profile.newsletter}
            onValueChange={(value) => updateField('newsletter', value)}
            trackColor={{ false: '#D0D0D0', true: '#495E57' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.discardButton}
            onPress={discardChanges}
          >
            <Text style={styles.discardButtonText}>Discard changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveChanges}
          >
            <Text style={styles.saveButtonText}>Save changes</Text>
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
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    color: '#495E57',
    marginTop: 12,
  },
  header: {
    minHeight: 85,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 38,
    lineHeight: 42,
    color: '#333333',
  },
  brandContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lemonIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  brandText: {
    color: '#495E57',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EDEFEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#495E57',
    fontWeight: '700',
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginHorizontal: 22,
    marginBottom: 22,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginBottom: 28,
  },
  largeAvatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  largeAvatarPlaceholder: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#EDEFEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeAvatarInitial: {
    fontSize: 32,
    fontWeight: '700',
    color: '#495E57',
  },
  avatarActions: {
    marginLeft: 20,
    gap: 12,
  },
  changeButton: {
    backgroundColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    borderWidth: 1,
    borderColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#495E57',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginHorizontal: 22,
    marginBottom: 15,
    marginTop: 5,
  },
  field: {
    marginHorizontal: 22,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 7,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#C9CECB',
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  notificationRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  notificationText: {
    fontSize: 15,
    color: '#333333',
  },
  logoutButton: {
    backgroundColor: '#EDEFEE',
    borderRadius: 8,
    marginHorizontal: 22,
    marginTop: 28,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#333333',
    fontWeight: '700',
    fontSize: 15,
  },
  bottomButtons: {
    flexDirection: 'row',
    marginHorizontal: 22,
    marginTop: 18,
    gap: 12,
  },
  discardButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discardButtonText: {
    color: '#495E57',
    fontWeight: '600',
    fontSize: 13,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#495E57',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  footer: {
    marginTop: 35,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignItems: 'center',
  },
  footerBrand: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#495E57',
  },
  footerText: {
    marginTop: 6,
    fontSize: 12,
    color: '#777777',
  },
});

