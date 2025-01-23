import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Reviewcard from '../cards/realreviewcard'

const Realreviews = () => {

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
    <View>
      <Text style={styles.heading}>Real Reviews</Text>
      {reviewCardData.map((reviewCard, index) => (
        <Reviewcard key={index} {...reviewCard} />
      ))} 
    </View>
  )
}

export default Realreviews

const styles = StyleSheet.create({
    heading : {
        fontSize : 20,
        marginLeft : 10
    }
})