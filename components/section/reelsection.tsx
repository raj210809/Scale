import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Text, PanResponder } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Productbottomsheet from '../bottomsheet/products';
import Reelcommentsheet from '../bottomsheet/reelcomment';

const { height, width } = Dimensions.get('window');

const dummyData = [
  {
    id: '1',
    uri: 'https://dl6941jkqyou0.cloudfront.net/products/1737329080911-79de7',
    products: [
      {
        id: 1,
        productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        productName: 'Wireless Headphones',
        productDescription: 'High-quality wireless headphones with noise cancellation.',
        productBrand: 'SoundPro',
        productRating: 4.5,
        productReviewCount: 145,
        productPrice: 99,
      },
    ],
  },
  {
    id: '2',
    uri: 'https://www.w3schools.com/html/movie.mp4',
    products: [
      {
        id: 1,
        productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        productName: 'Wireless Headphones',
        productDescription: 'High-quality wireless headphones with noise cancellation.',
        productBrand: 'SoundPro',
        productRating: 4.5,
        productReviewCount: 145,
        productPrice: 99,
      },
      {
        id: 2,
        productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        productName: 'Wireless Headphones',
        productDescription: 'High-quality wireless headphones with noise cancellation.',
        productBrand: 'SoundPro',
        productRating: 4.5,
        productReviewCount: 145,
        productPrice: 99,
      }
    ],
  },
];

const ReelSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState([false, false]);
  const videoRef = useRef(null);
  const flatListRef = useRef(null);
  const { id, type } = useLocalSearchParams();
  const [drawer, setDrawer] = useState(false);

  const toggleLike = (index) => {
    setLikes((prevLikes) => {
      const updatedLikes = [...prevLikes];
      updatedLikes[index] = !updatedLikes[index];
      return updatedLikes;
    });
  };

  const handleSwipeLeft = (item) => {
    if (item.products.length === 1) {
      router.push({
        pathname: '/product/[id]',
        params: {
          id: item.products[0].id,
          accessor: "customer",
        },
      })
    }
    else {
      router.push("/components/reelleftswipe")
    }
  };

  const handleSwipeUp = (item, index) => {
    if (index < dummyData.length - 1) {
      const nextIndex = index + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    }
  };

  const handleSwipeDown = (item, index) => {
    if (index > 0) {
      const prevIndex = index - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex });
      setCurrentIndex(prevIndex);
    }
  };

  const renderItem = ({ item, index }) => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) ||
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < -100) {
          handleSwipeLeft(item);
        } else if (gestureState.dy < -100) {
          handleSwipeUp(item, index);
        } else if (gestureState.dy > 100) {
          handleSwipeDown(item, index);
        }
      },
    });

    return (
      <View style={styles.videoContainer} {...panResponder.panHandlers}>
        <Video
          ref={videoRef}
          source={{ uri: item.uri }}
          style={styles.video}
          resizeMode="contain"
          shouldPlay={currentIndex === index}
          isLooping
        />
        <View style={styles.overlay}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => toggleLike(index)} style={styles.button}>
            <Ionicons
              name={likes[index] ? 'heart' : 'heart-outline'}
              size={30}
              color={likes[index] ? 'red' : 'white'}
            />
            <Text style={styles.buttonText}>{likes[index] ? '1' : '0'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>setDrawer(true)}>
            <Ionicons name="chatbubble-outline" size={30} color="white" />
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="share-outline" size={30} color="white" />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.details}>rating (no. of rating)</Text>
        <Text style={styles.brand}>Brand</Text>
        <Text style={styles.description}>Description</Text>
      </View>
      <View style={styles.actionContainer}>
        {type === 'launchingsoon' ? (
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.fullWidthButton}>
              <Text>Prebook</Text>
            </TouchableOpacity>
            <Text style={{ color: '#fff', marginTop: 5 }}>Only 25 item left</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.halfWidthButton}>
              <Text>Add items to bag</Text>
            </TouchableOpacity>
            <View style={styles.scrollHint}>
              <Text style={{ color: '#000' }}>Scroll left to view product</Text>
            </View>
          </>
        )}
      </View>
      </View>
    );
  };

  return (
    <View>
    <FlatList
      ref={flatListRef}
      data={dummyData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      horizontal={false}
      showsVerticalScrollIndicator={false}
    />
    {drawer && <Reelcommentsheet onClose={()=> setDrawer(false)} studentid='12345'/>}
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: '10%',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  textContainer: {
    position: 'absolute',
    bottom: 100,
    right: 50,
    width: '80%',
    height: 160,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  details: {
    color: '#fff',
    marginBottom: 10,
  },
  brand: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    marginBottom: 10,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 35,
    width: '90%',
    borderRadius: 10,
  },
  halfWidthButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    width: '48%',
    borderRadius: 10,
    margin: 2.5,
  },
  scrollHint: {
    backgroundColor: 'grey',
    width: '48%',
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    margin: 2.5,
  },
});

export default ReelSection;
