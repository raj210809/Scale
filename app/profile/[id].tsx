import InfluencerProductsCard from '@/components/cards/influencerproductscard';
import Reviewcard from '@/components/cards/realreviewcard';
import { useLocalSearchParams } from 'expo-router';
import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = () => {
    const {id} = useLocalSearchParams()

    const [selectedFilter, setSelectedFilter] = useState('Posts');
    const products = [
      {
        id : '1',
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'Brand A',
        description: 'This is a description for product A.',
      },
      {
        id : '2',
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'Brand B',
        description: 'This is a description for product B.',
      },
      {
        id : '3',
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'Brand C',
        description: 'This is a description for product C.',
      },
      {
        id : "4",
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'Brand D',
        description: 'This is a description for product D.',
      },
    ];
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image URL
          style={styles.coverImage}
        />
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with your profile picture URL
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Amina</Text>
        <Text style={styles.verifiedIcon}>✔</Text>
        <Text style={styles.profileBio}>
          I'm Amina, your fashion and cosmetics guru. Sharing tips, hacks, and favorite products daily. Follow for
          inspiration!
        </Text>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Fashion & Lifestyle</Text>
        </TouchableOpacity>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>50k</Text>
            <Text style={styles.statLabel}>Items Sold</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>250k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Brands</Text>
          </View>
        </View>
        <View style={styles.brandLogos}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.brandLogo} />
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.brandLogo} />
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.brandLogo} />
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonFollow}>
            <Text style={styles.actionButtonFollowText}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={()=>{setSelectedFilter('Posts')}} style={[
              styles.filterButton,
            ]}>
            <Text style={[styles.tab , selectedFilter === 'Posts' && styles.activeFilter]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setSelectedFilter('Products')}} style={[styles.filterButton]}>
            <Text style={[styles.tab , selectedFilter === 'Products' && styles.activeFilter]}>Products</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexWrap : 'wrap' , flexDirection : 'row'}}>
      {selectedFilter === 'Products' && products.map((item)=>{
        return (
          <InfluencerProductsCard key={item.id} {...item}/>
        )
      })}
      </View>
      {selectedFilter === 'Posts' && reviewCardData.map((item)=>{
        return (
          <Reviewcard key={item.profileName} {...item}/>
      )})}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -40,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  verifiedIcon: {
    fontSize: 16,
    color: '#0095f6',
  },
  profileBio: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  categoryButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginVertical: 10,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  brandLogos: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  brandLogo: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  actionButtonText: {
    color: '#666',
  },
  actionButtonFollow: {
    backgroundColor: '#6c63ff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  actionButtonFollowText: {
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    color : '#e0e0e0'
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    //backgroundColor: '#e0e0e0',
  },
  activeFilter: {
    color : ''
  },
});

export default ProfileScreen;
