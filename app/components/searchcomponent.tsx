import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Searchbar } from 'react-native-paper';
import { Dimensions } from 'react-native';
import Searchresult from '@/components/section/searchresult';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Filterbottomsheet from '@/components/bottomsheet/filterbottomsheet';

const { width, height } = Dimensions.get('window');

const IndexSearch = () => {
  const { searchfor } = useLocalSearchParams();
  const initialQuery = searchfor?.toString() || ''; // Handle cases where searchfor might be undefined
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [drawer , setdrawer] = useState(false);
  const searchBarRef = useRef(null);

  // Example data for suggestions
  const data = [
    'shoes for women',
    'shoes for men',
    'shoes sports',
    'sports shoes for kids',
    'women\'s sandals',
    'men\'s boots',
  ];

  useEffect(() => {
    // Perform search when route is accessed with a query
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleChange = (query: string) => {
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSuggestions([]);// Trigger the search results to display
  };

  const handleSuggestionPress = (suggestion: string) => {
    handleSearch(suggestion);
  };

  return (
    <View style={{flex:1}}>
      <View style={styles.searchContainer}>
        <Searchbar
          ref={searchBarRef}
          placeholder="Search"
          onChangeText={handleChange}
          value={searchQuery}
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSuggestionPress(item)}
                style={styles.suggestionItem}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Searchresult searchfor={searchQuery} />
      <TouchableOpacity style={{position: 'absolute', right: 10, bottom: 10 , height : 50 , width : 50 , borderRadius : 25 , backgroundColor : "#f8f9fa" , justifyContent : "center" , alignItems : "center"}} onPress={()=> setdrawer(true)}>
        <FontAwesome name="filter" size={35} />
      </TouchableOpacity>
      {drawer && <Filterbottomsheet onClose={() => setdrawer(false)} studentid='56457'/>}
    </View>
  );
};

export default IndexSearch;

const styles = StyleSheet.create({
  maincontainer: {
    zIndex: -1,
  },
  searchContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    position: 'relative',
    zIndex: 10,
  },
  suggestionsContainer: {
    top: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginTop: 5,
    maxHeight: 150,
    overflow: 'hidden',
    zIndex: 11,
    position: 'absolute',
    width: '100%',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 50,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});
