import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useAppStore } from "@/store/store";

interface chatitem {
    id : number,
    name  :string,
    message : string,
    time : string,
    unreadCount : number,
    profileImage : string
}

const ChatItem = (item : chatitem) => {
  const {setSelectedChatData} = useAppStore();
  const handleChatPress = (item : chatitem) => {
          router.push({
            pathname: "/personalchat",
            params: {
              name: item.name,
              chatId: item.id,
              lastMessage: item.message,
              time: item.time,
              unreadCount: item.unreadCount,
              profileImage: item.profileImage,
            },
          });
          setSelectedChatData(item);
        };
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{handleChatPress(item)}}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{item.message}</Text>
          {item.unreadCount > 0 && <Text style={styles.unreadCount}>{item.unreadCount}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    color: "gray",
    fontSize: 12,
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  message: {
    color: "gray",
  },
  unreadCount: {
    backgroundColor: "red",
    color: "white",
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});

export default ChatItem;