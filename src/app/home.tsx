import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Home() {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.logo}>🍋</Text>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.location}>Chicago</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Little Lemon
        </Text>

        <Text style={styles.heroText}>
          We are a family-owned Mediterranean restaurant,
          focused on traditional recipes served with a modern twist.
        </Text>

        <TextInput
          style={styles.search}
          placeholder="Search menu..."
        />
      </View>

      <View style={styles.content}>

        <Text style={styles.sectionTitle}>
          ORDER FOR DELIVERY!
        </Text>

        <View style={styles.categories}>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Starters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Mains</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Desserts</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.menuTitle}>
          Popular Dishes
        </Text>

        <View style={styles.foodCard}>
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>
              Pasta
            </Text>

            <Text style={styles.foodDescription}>
              Penne pasta with vegetables and herbs.
            </Text>

            <Text style={styles.price}>
              $18.99
            </Text>
          </View>

          <Text style={styles.foodEmoji}>
            🍝
          </Text>
        </View>

        <View style={styles.foodCard}>
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>
              Lemon Dessert
            </Text>

            <Text style={styles.foodDescription}>
              Delicious homemade lemon dessert.
            </Text>

            <Text style={styles.price}>
              $6.99
            </Text>
          </View>

          <Text style={styles.foodEmoji}>
            🍋
          </Text>
        </View>

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
    backgroundColor: '#495E57',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 20,
  },

  logo: {
    fontSize: 42,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F4CE14',
  },

  location: {
    color: '#FFFFFF',
    fontSize: 17,
  },

  hero: {
    backgroundColor: '#495E57',
    padding: 20,
    paddingBottom: 30,
  },

  heroTitle: {
    color: '#F4CE14',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  heroText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 20,
  },

  search: {
    backgroundColor: '#FFFFFF',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  content: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },

  categories: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },

  category: {
    backgroundColor: '#EDEFEE',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },

  categoryText: {
    fontWeight: 'bold',
    color: '#495E57',
  },

  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  foodCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },

  foodInfo: {
    flex: 1,
  },

  foodName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  foodDescription: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EE9972',
  },

  foodEmoji: {
    fontSize: 50,
    marginLeft: 10,
  },
});