import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import VisibilitySelectionScreen from './visibilityselectionscreen';

const ReplyInputScreen = () => {
  const {productId , productName , query , id} = useLocalSearchParams()
  const [reply, setReply] = useState('');
  const maxWords = 80;
  const [isModalVisible , setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>[{productName}] ({productId})</Text>
      <Text style={styles.queryText}>{query}</Text>
      <TextInput
        style={styles.textInput}
        value={reply}
        onChangeText={setReply}
        placeholder="Write your reply here..."
        multiline
        maxLength={maxWords}
      />
      <Text style={styles.wordCount}>{`${reply.split(' ').filter(Boolean).length}/${maxWords} words done.`}</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={()=>{setModalVisible(true)}}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <VisibilitySelectionScreen reply={reply} id={id as string}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReplyInputScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  productName: { fontWeight: 'bold', marginBottom: 8 },
  queryText: { marginBottom: 12 },
  textInput: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, minHeight: 100, textAlignVertical: 'top' },
  wordCount: { marginTop: 8, color: '#888' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  backButton: { backgroundColor: '#ccc', padding: 10, borderRadius: 5 , height : 50 , width : "48%" , justifyContent : "center" , alignItems : "center" , borderColor : "#d9534f" , borderWidth : 1},
  sendButton: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5 , height : 50 , width : "48%" , justifyContent : "center" , alignItems : "center"},
  buttonText: { color: '#fff', fontWeight: 'bold' },
  babuttonText: { color: '#d9534f', fontWeight: 'bold' },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    height: '30%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
