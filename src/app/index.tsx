
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const menuItems = [
  {
    id: '1',
    name: 'Greek Salad',
    category: 'Starters',
    price: '$12.99',
    description:
      'Fresh lettuce, tomatoes, cucumbers, olives and feta cheese.',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
  },
  {
    id: '2',
    name: 'Bruschetta',
    category: 'Starters',
    price: '$7.99',
    description:
      'Grilled bread topped with tomatoes, basil and olive oil.',
    image:
      'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
  },
  {
    id: '3',
    name: 'Grilled Fish',
    category: 'Mains',
    price: '$18.99',
    description:
      'Grilled fish served with fresh vegetables and lemon.',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
  },
  {
    id: '4',
    name: 'Pasta',
    category: 'Mains',
    price: '$15.99',
    description:
      'Italian pasta tossed with a rich tomato sauce and herbs.',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400',
  },
  {
    id: '5',
    name: 'Lemon Dessert',
    category: 'Desserts',
    price: '$6.99',
    description:
      'A delicious homemade lemon dessert with a sweet finish.',
    image:
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400',
  },
  {
    id: '6',
    name: 'Fresh Lemonade',
    category: 'Drinks',
    price: '$4.99',
    description:
      'Refreshing lemonade made with freshly squeezed lemons.',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=400',
  },
];

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export default function HomeScreen() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category === selectedCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchText]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSide} />

        <View style={styles.brandContainer}>
          <Text style={styles.lemonIcon}>🍋</Text>
          <Text style={styles.brandText}>LITTLE LEMON</Text>
        </View>

        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => router.push('/profile')}
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

      {/* Restaurant banner */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroLocation}>Chicago</Text>

          <Text style={styles.heroDescription}>
            We are a family-owned Mediterranean restaurant,
            focused on traditional recipes served with a modern twist.
          </Text>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setSearchVisible((visible) => !visible)}
            accessibilityLabel="Toggle food search"
          >
            <Text style={styles.searchButtonText}>⌕</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500',
          }}
          style={styles.heroImage}
        />
      </View>

      {/* Search */}
      {searchVisible && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a dish..."
            placeholderTextColor="#777777"
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Categories */}
      <Text style={styles.sectionHeading}>ORDER FOR DELIVERY!</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => {
          const active = selectedCategory === category;

          return (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                active && styles.activeCategoryButton,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  active && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Menu */}
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>MENU</Text>
        <Text style={styles.itemCount}>
          {filteredItems.length} items
        </Text>
      </View>

      {filteredItems.length === 0 ? (
        <Text style={styles.emptyText}>
          No dishes found. Try another search.
        </Text>
      ) : (
        filteredItems.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>
                {item.description}
              </Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>

            <Image
              source={{ uri: item.image }}
              style={styles.foodImage}
            />
          </View>
        ))
      )}

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>LITTLE LEMON</Text>
        <Text style={styles.footerText}>Chicago, Illinois</Text>

        <TouchableOpacity
          onPress={() => router.push('/onboarding')}
          style={styles.onboardingLink}
        >
          <Text style={styles.onboardingLinkText}>
            Open onboarding
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  lemonIcon: {
    fontSize: 20,
    marginRight: 7,
  },
  brandText: {
    color: '#333333',
    fontSize: 14,
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
    backgroundColor: '#495E57',
    marginHorizontal: 18,
    borderRadius: 4,
    padding: 16,
    minHeight: 220,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#F4CE14',
    fontFamily: 'Georgia',
  },
  heroLocation: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  heroDescription: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 17,
  },
  heroImage: {
    width: '40%',
    height: 130,
    borderRadius: 12,
  },
  searchButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EDEFEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  searchButtonText: {
    color: '#333333',
    fontSize: 28,
    lineHeight: 32,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: '#333333',
  },
  clearText: {
    color: '#495E57',
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333333',
    marginTop: 26,
    marginHorizontal: 20,
    marginBottom: 13,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: '#EDEFEE',
  },
  activeCategoryButton: {
    backgroundColor: '#F4CE14',
  },
  categoryText: {
    color: '#495E57',
    fontSize: 13,
    fontWeight: '700',
  },
  activeCategoryText: {
    color: '#333333',
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333333',
  },
  itemCount: {
    fontSize: 12,
    color: '#777777',
  },
  menuItem: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    gap: 14,
    alignItems: 'center',
  },
  menuItemContent: {
    flex: 1,
  },
  itemName: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  itemDescription: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 7,
  },
  itemPrice: {
    color: '#495E57',
    fontWeight: '700',
    fontSize: 13,
  },
  foodImage: {
    width: 88,
    height: 88,
    borderRadius: 6,
  },
  emptyText: {
    color: '#666666',
    textAlign: 'center',
    margin: 25,
  },
  footer: {
    backgroundColor: '#EDEFEE',
    alignItems: 'center',
    marginTop: 25,
    padding: 25,
  },
  footerBrand: {
    color: '#495E57',
    fontWeight: '800',
    letterSpacing: 2,
    fontSize: 16,
  },
  footerText: {
    marginTop: 6,
    color: '#666666',
    fontSize: 12,
  },
  onboardingLink: {
    marginTop: 15,
    padding: 10,
  },
  onboardingLinkText: {
    color: '#495E57',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

