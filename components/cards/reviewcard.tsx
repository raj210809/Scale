import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

interface ReviewCardProps {
    _id: string;
    name: string;
    images: string[];
    rating: string;
    comments: string;
    date: string;
}

const Reviewcard = (prop : ReviewCardProps) => {
  return (
    <View style={{marginTop : 5}}>
        <ScrollView  horizontal showsHorizontalScrollIndicator={false} style={{flexDirection : "row" , marginBottom : 10}}>
            {
                prop.images.map((item)=>{
                    return (
                        <Image source={{uri : item}} style={styles.reviewsImage} key={item}/>
                    )
                })
            }
        </ScrollView>
        <View style={styles.review}>
        <View style={styles.reviewContent}>
        <View style={{flexDirection : "row" , justifyContent : "flex-start" , width : 200 , alignItems : "center"}}>
        <Text style={styles.reviewRating}>⭐ {prop.rating}</Text>
        <Text style={styles.reviewName}>{prop.name}</Text>
        </View>
        <Text style={styles.reviewComment}>{prop.comments}</Text>
        <Text style={styles.reviewDate}>{prop.date}</Text>
        </View>
        </View>
    </View>
  )
}

export default Reviewcard

const styles = StyleSheet.create({
    review: { flexDirection: 'row', marginBottom: 20 },
  reviewImage: { width: 50, height: 50, marginRight: 10, borderRadius: 25 },
  reviewContent: { flex: 1 },
  reviewName: { fontSize: 14, fontWeight: 'bold' , marginLeft : 10},
  reviewRating: { fontSize: 12, color: '#666' },
  reviewComment: { fontSize: 12, color: '#666', marginVertical: 5 },
  reviewDate: { fontSize: 12, color: '#999' },
  reviewsImage :{
        width : 75,
        height : 75,
        borderRadius : 10,
        marginRight : 10
  }
})