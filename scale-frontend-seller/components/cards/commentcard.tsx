import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CommentCardProps {
    id: string;
    name: string;
    comment: string;
    profilepic: string;
}

const CommentCard = (item: CommentCardProps) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.profilepic }} style={styles.profilePicture} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        padding: 10, // Add padding to the card for spacing
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1, // Allows the container to take the remaining width
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    comment: {
        fontSize: 14,
        color: '#555',
        flexWrap: 'wrap', // Ensures text wraps within the container
    },
});

export default CommentCard;
