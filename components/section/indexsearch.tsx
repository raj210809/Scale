import { StyleSheet, Text, View , TouchableOpacity , BackHandler, Keyboard } from 'react-native'
import React,{useState , useEffect , useRef} from 'react'
import { Searchbar } from 'react-native-paper';
import CategoryGrid from './searchclicksection';
import { Dimensions } from 'react-native';
import Searchresult from './searchresult';
import { router } from 'expo-router';

const { width, height } = Dimensions.get("window");

interface search {
    modalVisible : (value : boolean)=>void;
}

const Indexsearch = (values : search) => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [suggestions, setSuggestions] =useState<string[]>([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [search ,setsearch] = useState(false)
    const searchBarRef = useRef(null);

  const data = [
    "shoes for women",
    "shoes for men",
    "shoes sports",
    "sports shoes for kids",
    "women's sandals",
    "men's boots",
  ]; // Example data for suggestions

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

  useEffect(() => {
    const backAction = () => {
      if (isModalVisible) {
        setModalVisible(false); // Close the modal if it's open
        values.modalVisible(false)
        searchBarRef.current?.blur(); // Remove focus from the search bar
        return true; // Prevent the default back button action
      }
      return false; // Allow the default action (exit app or go back)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Cleanup the event listener on unmount
    return () => backHandler.remove();
  }, [isModalVisible]);
  return (
    <View>
      <View style={styles.searchContainer}>
          <Searchbar
            ref={searchBarRef}
            placeholder="Search"
            onChangeText={handleChange}
            value={searchQuery}
            onSubmitEditing={() => {
              router.push({
                pathname : "/components/searchcomponent",
                params : {searchfor : searchQuery}
              })
              Keyboard.dismiss(); // Dismiss the keyboard
            }}
            onIconPress={()=>{
              router.push({
                pathname : "/components/searchcomponent",
                params : {searchfor : searchQuery}
              });
            }}
            onFocus={() => {setModalVisible(true)
              values.modalVisible(true)
              }
            }
          />
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {handleSuggestionPress(item)
                    setModalVisible(false)
                    setsearch(true)
                    values.modalVisible(false)
                    router.push({
                      pathname : "/components/searchcomponent",
                      params : {searchfor : item}
                    })
                    }
                  }
                  style={styles.suggestionItem}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {isModalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.categoryGridContainer}>
            <CategoryGrid />
          </View>
        </View>
      )}
    </View>
  )
}

export default Indexsearch

const styles = StyleSheet.create({
    maincontainer: {
      zIndex: -1,
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
      top : 60,
      flex: 1,
      height: height,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 5, // Lower the zIndex of the modal to ensure it's below the suggestions
    },
    categoryGridContainer: {
      padding: 10,
    },
  });