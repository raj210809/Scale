import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Commentsection from '../section/commentsection';
import { Ionicons } from '@expo/vector-icons';
import MediaSlider from '../section/medisslider';
import Share from '../buttons/share';
import { useShareButton } from '@/context/sharebutton';

interface ReviewCardProps {
  profileImageUri: string;
  profileName: string;
  profileDescription: string;
  uploaded_items: { type: string; uri: string }[];
  caption: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  productAvailable?: boolean;
  onProfilePress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  onViewProductPress?: () => void;
}

const Reviewcard = (prop : ReviewCardProps) => {
  const [commentopen , setcomment] = useState(false)
  const [liked , setliked] = useState(false)
  const {toggleShared} = useShareButton()
  return (
    <View style={styles.cardContainer}>
      {/* Header Section */}
      <TouchableOpacity style={styles.header} onPress={()=>{router.push({
        pathname : "/profile/[id]",
        params : {id : "1"}
      })}}>
        <Image
          source={{
            uri: prop.profileImageUri,
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.profileInfo}>
          <Text style={styles.profileName}>{prop.profileName}</Text>
          <Text style={styles.profileDescription}>{prop.profileDescription}</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Main Image Section */}
      <MediaSlider media={prop.uploaded_items} />

      {/* Caption Section */}
      <Text style={styles.caption}>
        {prop.caption}
        <Text style={styles.readMore}> read more</Text>
      </Text>

      {/* Interaction Section */}
      <View style={styles.interactionRow}>
        <TouchableOpacity style={styles.interactionButton} onPress={()=>{setliked(!liked)}}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={25} color={liked ? "red" : "black"} />
          <Text style={styles.interactionText}>{prop.likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton} onPress={()=>{setcomment(!commentopen)}}>
          <Ionicons name="chatbubble-outline" size={25} color="black" />
          <Text style={styles.interactionText}>{prop.commentsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Share/>
          <Text style={styles.interactionText}>{prop.sharesCount}</Text>
        </TouchableOpacity>
      </View>
      {prop.productAvailable && <TouchableOpacity onPress={()=>{router.push({
        pathname : "/product/[id]",
        params : {
          id : 1
        }
      })}} style={styles.productButton}>
          <Text style={{color : '#fff'}}>View Product</Text>
        </TouchableOpacity>}
      {commentopen && <Commentsection/>}
    </View>
  );
};

export default Reviewcard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  profileDescription: {
    fontSize: 14,
    color: '#6e6e6e',
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d9534f',
    marginHorizontal: 4,
  },
  caption: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  readMore: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  interactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '70%',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 5,
  },
  interactionText: {
    fontSize: 14,
    color: '#000',
  },
  productButton: {
    backgroundColor: '#ff005c',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});
