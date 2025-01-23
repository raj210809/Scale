import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatMessage = ({ message }) => {
  return (
    <View style={[
      styles.messageContainer,
      message.isSent ? styles.sent : styles.received,
    ]}>
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.messageTime}>{message.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "75%",
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
    alignSelf: "flex-end",
  },
});

export default ChatMessage;
