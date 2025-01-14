import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';
import CategoryGrid from '@/components/section/searchclicksection';
import Optionsection from '@/components/section/optionsection';
import Launchingsoon from '@/components/section/launchingsoon';
import Excitingoffers from '@/components/section/excitingoffers';
import Realreviews from '@/components/section/realreviews';
import WelcomeScreen from '../onboarding/Welcomescreen';
import Postupdate from '@/components/section/postupdate';
import Updatedrafts from '@/components/cards/updatedrafts';
import OrderCard from '@/components/cards/ordershowingcard';
import FilterMenu from '../components/filtermenu';
import Indexsearch from '@/components/section/indexsearch';
import { ShareButtonProvider, useShareButton } from '@/context/sharebutton';
import SharePage from '@/components/bottomsheet/sharepage';
import WelcomeScreenSeller from '../onboardingseller/WelcomeScreen';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [suggestions, setSuggestions] =useState<string[]>([]);
  const [searchResults, setSearchResults] = useState([]);

  const {isShared , toggleShared} = useShareButton()


  const data = [
    "shoes for women",
    "shoes for men",
    "shoes sports",
    "sports shoes for kids",
    "women's sandals",
    "men's boots",
  ];

  const handleChange = (query) => {
    setSearchQuery(query);

    // Filter suggestions based on query
    if (query.length > 0) {
      const filteredSuggestions = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      console.log(filteredSuggestions)
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]); // Clear suggestions after selection
    console.log("Search for:", suggestion);
    // Add logic to handle search functionality here
  };

  const token = false;
  const login = "seller"

  return <ShareButtonProvider>{
    token ? (
      <GestureHandlerRootView>
        <ScrollView style={styles.maincontainer} scrollEnabled={!isModalVisible}>
          {/* Top Bar */}
          <View style={styles.topbar}>
            <Text style={styles.heading}>Scale</Text>
            <View style={styles.innerbox}>
              <TouchableOpacity onPress={() => router.push('/seller/(tabs)')}>
                <FontAwesome name="bell" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/Bookmark')}>
                <FontAwesome name="bookmark" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/product')}>
                <FontAwesome name="shopping-bag" size={20} />
              </TouchableOpacity>
            </View>
          </View>
  
          <Indexsearch modalVisible={setModalVisible}/>
  
          <View>
          <Optionsection />
          <Launchingsoon type="launchingsoon" />
          <Excitingoffers />
          <Launchingsoon type="trending" />
          <Realreviews/>
          </View>
        </ScrollView>
        {isShared && <SharePage onClose={toggleShared}  studentid="24y62"/>}
      </GestureHandlerRootView>
    ) : (
      login === "seller" ? <WelcomeScreenSeller/> : <WelcomeScreen />
    )}</ShareButtonProvider>
}

const styles = StyleSheet.create({
  maincontainer: {
    zIndex: -1,
    flex : 1
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'red',
  },
  innerbox: {
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'space-around',
    marginRight : 10
  },
  topbar: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'beige',
    marginTop: 2,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    position: 'relative', // Ensure suggestions are positioned correctly
    zIndex: 10, // Ensure the search container is above other elements
  },
  suggestionsContainer: {
    top : 50,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 10, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginTop: 5,
    maxHeight: 150, // Limit height for suggestions
    overflow: 'hidden',
    zIndex: 11, // Ensure suggestions are displayed above the modal
    position: 'absolute', // Keep the suggestions floating
    width: '100%', // Match the width of the search bar
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height : 50
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    position: 'absolute',
    top: 95,
    flex: 1,
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 5, // Lower the zIndex of the modal to ensure it's below the suggestions
  },
  categoryGridContainer: {
    padding: 10,
  },
});

