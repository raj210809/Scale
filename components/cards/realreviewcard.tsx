import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MediaSlider from '../section/medisslider';
import Share from '../buttons/share';
import Commentsection from '../section/commentsection';
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
  isSent: boolean;
  time: string;
  onViewProductPress?: () => void;
}

const Reviewcard: React.FC<ReviewCardProps> = (props) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const { toggleShared } = useShareButton();

  const handleProfilePress = () => {
    router.push({
      pathname: "/profile/[id]",
      params: { id: "1" } // Replace with actual profile ID
    });
  };

  const handleProductPress = () => {
    if (props.onViewProductPress) {
      props.onViewProductPress();
    } else {
      router.push({
        pathname: "/product/[id]",
        params: { id: "1" } // Replace with actual product ID
      });
    }
  };

  return (
    <View style={[
      styles.cardContainer,
      props.isSent ? styles.sentContainer : styles.receivedContainer
    ]}>
      {/* Header Section */}
      <TouchableOpacity style={styles.header} onPress={handleProfilePress}>
        <Image
          source={{ uri: props.profileImageUri }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{props.profileName}</Text>
          <Text style={styles.profileDescription}>{props.profileDescription}</Text>
        </View>
        <Text style={styles.timeText}>{props.time}</Text>
      </TouchableOpacity>

      {/* Media Section */}
      <MediaSlider media={props.uploaded_items} />

      {/* Caption Section */}
      <Text style={styles.caption}>
        {props.caption}
        {props.caption.length > 100 && (
          <Text style={styles.readMore}> read more</Text>
        )}
      </Text>

      {/* Interaction Section */}
      <View style={styles.interactionRow}>
        <TouchableOpacity 
          style={styles.interactionButton} 
          onPress={() => setLiked(!liked)}
        >
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={25} 
            color={liked ? "red" : "black"} 
          />
          <Text style={styles.interactionText}>
            {props.likesCount + (liked ? 1 : 0)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.interactionButton} 
          onPress={() => setCommentOpen(!commentOpen)}
        >
          <Ionicons name="chatbubble-outline" size={25} color="black" />
          <Text style={styles.interactionText}>{props.commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.interactionButton} 
          onPress={toggleShared}
        >
          <Share />
          <Text style={styles.interactionText}>{props.sharesCount}</Text>
        </TouchableOpacity>
      </View>

      {/* Product Button */}
      {props.productAvailable && (
        <TouchableOpacity 
          style={styles.productButton}
          onPress={handleProductPress}
        >
          <Text style={styles.productButtonText}>View Product</Text>
        </TouchableOpacity>
      )}

      {/* Comment Section */}
      {commentOpen && <Commentsection id={''} type={''} />}
    </View>
  );
};

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
    maxWidth: '80%',
  },
  sentContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  receivedContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
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
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  caption: {
    fontSize: 14,
    color: '#000',
    marginVertical: 10,
  },
  readMore: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  interactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  interactionText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 5,
  },
  productButton: {
    backgroundColor: '#ff005c',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  productButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Reviewcard;