import React,{useState} from "react";
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import ChatItem from "@/components/cards/chatitemcard";
import { Searchbar } from "react-native-paper";
import { router } from "expo-router";

const ChatList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
    const handleChange = (query: string) => {
      setSearchQuery(query);
      console.log('Search Query:', query);
    };

    const dummyChats = [
      {
        id: 1,
        name: "Abhinav Gulati",
        lastMessage: "Sure! This looks good. Let's buy...",
        time: "15 min",
        unreadCount: 2,
        profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        id: 2,
        name: "Akriti",
        lastMessage: "This shoe doesn't look good :(",
        time: "15 min",
        unreadCount: 1,
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        id: 3,
        name: "Aditya Mishra",
        lastMessage: "Let's buy the face pack",
        time: "12 hours",
        unreadCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        id: 4,
        name: "Harshit",
        lastMessage: "Thik h",
        time: "1 day",
        unreadCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      {
        id: 5,
        name: "Ashneer",
        lastMessage: "Done",
        time: "2 weeks",
        unreadCount: 0,
        profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    ];
    
  return (
    <View>
      <View style={{flexDirection : 'row' , justifyContent : 'center' , alignItems : 'center' , height : 30 , width : '100%' , margin : 5}}>
        <Text style={{fontSize : 24}}>Messages</Text>
      </View>
      <View style={{marginTop : 20 , flexDirection : 'row' , alignItems : 'center' , justifyContent : 'center'}}>
        <Searchbar
        placeholder="Search"
        onChangeText={handleChange}
        value={searchQuery}
        style={{width : '95%'}}
      />
      </View>
      <FlatList
        data={dummyChats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChatItem
            id={item.id}
            name={item.name}
            message={item.lastMessage}
            time={item.time}
            unreadCount={item.unreadCount}
            profileImage={item.profileImage}
          />
      )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatList: {
    flex: 1,
  },
});

export default ChatList;