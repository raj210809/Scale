import { StyleSheet, Text, TouchableOpacity, View ,Image } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const Mostviewedseller = () => {
    const dummyData = [
        {
            video_id: '1',
            video_cover_image: "https://via.placeholder.com/50",
            views_count: "100k",
        },
        {
            video_id: '2',
            video_cover_image: "https://via.placeholder.com/50",
            views_count: "200k",
        },
        {
            video_id: '3',
            video_cover_image: "https://via.placeholder.com/50",
            views_count: "300k",
        },
        {
            video_id: '4',
            video_cover_image: "https://via.placeholder.com/50",
            views_count: "400k",
        },
        {
            video_id: '5',
            video_cover_image: "https://via.placeholder.com/50",
            views_count: "500k",
        },
        {
            video_id: '6',
            video_cover_image: "https://via.placeholder.com/50",
            views_count: "600k",
        },
    ];

    const renderitems = ({item}) => {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={()=>{}} key={item.video_id}>
                <View style={styles.imagecont}>
                    <Image source={{uri: item.video_cover_image}} style={styles.image}/>
                </View>
                <Text>{item.views_count}</Text>
            </TouchableOpacity>
        );
    }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dummyData.map((item) => {
            return renderitems({item});
        })}
    </ScrollView>
  );
}

export default Mostviewedseller;

const styles = StyleSheet.create({
    itemContainer : {
        flexDirection: 'column',
        alignItems: 'center',
    },
    imagecont : {
        height: 70,
        width: 70,
        borderRadius: 35, // Fixed the issue by using a numeric value for borderRadius
        borderWidth : 1,
        marginLeft : 9,
        marginRight : 9,
        overflow: 'hidden', // Ensures the image does not overflow the container
    },
    image : {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
});
