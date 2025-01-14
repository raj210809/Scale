import ProductCard from '@/components/cards/productshowsmall';
import Reviewcard from '@/components/cards/realreviewcard';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Searchbar } from 'react-native-paper';


const App = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (query : string) => {
    setSearchQuery(query);
    console.log('Search Query:', query);
  };
  // State to store the selected filter
  const [selectedFilter, setSelectedFilter] = useState('All');

  const reviewCardData = [
    {
      profileImageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
      profileName: 'John Doe',
      profileDescription: 'Fashion Enthusiast',
      uploaded_items: [{type : "image" , uri : "https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.jpg?s=1024x1024&w=is&k=20&c=obz049FFmlNHxkf-flcFOIpJT0qCHk4TWIeYEmWURsQ="},{type : "image" , uri : "https://media.istockphoto.com/id/1392016982/photo/mixed-group-of-business-people-sitting-around-a-table-and-talking.jpg?s=612x612&w=0&k=20&c=d7mWQhdzKrowHYTWXXcCrNn02uyfLYQYB78M75G8lKg="} , {type : "video" , uri : "https://www.w3schools.com/html/mov_bbb.mp4"}],
      caption: 'Loving the new collection!',
      likesCount: 120,
      commentsCount: 45,
      sharesCount: 30,
      productAvailable: true,
      onProfilePress: () => console.log('Profile pressed for John Doe'),
      onLikePress: () => console.log('Like pressed for John Doe'),
      onCommentPress: () => console.log('Comment pressed for John Doe'),
      onSharePress: () => console.log('Share pressed for John Doe'),
      onViewProductPress: () => console.log('View product pressed for John Doe'),
    },
    {
      profileImageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
      profileName: 'Jane Smith',
      profileDescription: 'Lifestyle Blogger',
      uploaded_items: [{type : "image" , uri : "https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.jpg?s=1024x1024&w=is&k=20&c=obz049FFmlNHxkf-flcFOIpJT0qCHk4TWIeYEmWURsQ="}],
      caption: 'Check out my latest finds!',
      likesCount: 200,
      commentsCount: 60,
      sharesCount: 40,
      productAvailable: false,
      onProfilePress: () => console.log('Profile pressed for Jane Smith'),
      onLikePress: () => console.log('Like pressed for Jane Smith'),
      onCommentPress: () => console.log('Comment pressed for Jane Smith'),
      onSharePress: () => console.log('Share pressed for Jane Smith'),
      onViewProductPress: () => console.log('View product pressed for Jane Smith'),
    },
  ];

  // Mock data for demonstration
  const data = [
    { id: '1', type: 'Post', post : {
      profileImageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
      profileName: 'John Doe',
      profileDescription: 'Fashion Enthusiast',
      uploaded_items: [{type : "image" , uri : "https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.jpg?s=1024x1024&w=is&k=20&c=obz049FFmlNHxkf-flcFOIpJT0qCHk4TWIeYEmWURsQ="},{type : "image" , uri : "https://media.istockphoto.com/id/1392016982/photo/mixed-group-of-business-people-sitting-around-a-table-and-talking.jpg?s=612x612&w=0&k=20&c=d7mWQhdzKrowHYTWXXcCrNn02uyfLYQYB78M75G8lKg="} , {type : "video" , uri : "https://www.w3schools.com/html/mov_bbb.mp4"}],
      caption: 'Loving the new collection!',
      likesCount: 120,
      commentsCount: 45,
      sharesCount: 30,
      productAvailable: true,
      onProfilePress: () => console.log('Profile pressed for John Doe'),
      onLikePress: () => console.log('Like pressed for John Doe'),
      onCommentPress: () => console.log('Comment pressed for John Doe'),
      onSharePress: () => console.log('Share pressed for John Doe'),
      onViewProductPress: () => console.log('View product pressed for John Doe'),
    } },
    { id: '2', type: 'Product', product : {id: 1,
      productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productName: "Wireless Headphones",
      productDescription: "High-quality wireless headphones with noise cancellation.",
      productBrand: "SoundPro",
      productRating: 4.5,
      productReviewCount: 145,
      productPrice: 99,} },
    { id: '3', type: 'Post', post : {
      profileImageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
      profileName: 'Jane Smith',
      profileDescription: 'Lifestyle Blogger',
      uploaded_items: [{type : "image" , uri : "https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.jpg?s=1024x1024&w=is&k=20&c=obz049FFmlNHxkf-flcFOIpJT0qCHk4TWIeYEmWURsQ="}],
      caption: 'Check out my latest finds!',
      likesCount: 200,
      commentsCount: 60,
      sharesCount: 40,
      productAvailable: false,
      onProfilePress: () => console.log('Profile pressed for Jane Smith'),
      onLikePress: () => console.log('Like pressed for Jane Smith'),
      onCommentPress: () => console.log('Comment pressed for Jane Smith'),
      onSharePress: () => console.log('Share pressed for Jane Smith'),
      onViewProductPress: () => console.log('View product pressed for Jane Smith'),
    } },
    { id: '4', type: 'Product', product : {id: 1,
      productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productName: "Wireless Headphones",
      productDescription: "High-quality wireless headphones with noise cancellation.",
      productBrand: "SoundPro",
      productRating: 4.5,
      productReviewCount: 145,
      productPrice: 99,} },
  ];

  // Filter data based on selected state
  const filteredData =
    selectedFilter === 'All'
      ? data
      : data.filter((item) => item.type === selectedFilter);

  return (
    <>
      <View>
      <Searchbar
        placeholder="Search"
        onChangeText={handleChange}
        value={searchQuery}
        style={{marginTop : 5}}
      />
      </View>
      <View style={styles.container}>
        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'All' && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter('All')}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'Product' && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter('Product')}
          >
            <Text style={styles.filterText}>Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === 'Post' && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter('Post')}
          >
            <Text style={styles.filterText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Render Data */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.type === 'Product' ? (
                <ProductCard {...item.product} accessor_name='customer'/>
              ) : (
                <Reviewcard {...item.post}/>
              )}
            </View>
          )}
        />
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    width : "30%",
    justifyContent : "center",
    flexDirection : "row",
    alignItems : "center"
  },
  activeFilter: {
    backgroundColor: '#d9534f',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardDetail: {
    fontSize: 14,
    color: '#6e6e6e',
  },
});
