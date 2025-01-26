import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View , Image } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import * as MediaPicker from 'expo-image-picker';
import axios from 'axios';
import { Cloudfronturl } from '@/constants/contants';

interface UploadFile {
  uri: string;
  type: string;
}

const Postupdate = () => {
  const [uploading, setUploading] = useState(false);
  const [images , setImages] = useState<string[]>([])
  const [data , setData] = useState({
    images : images,
    heading : "",
    descriptioon : "",
    brand : "nike",
    productTagged : []
  })
  const handleChange = (key , text)=>{
    setData({
      ...data ,
      [key] : text
    })
  }

  const pickMedia = async () => {
    try {
      const result = await MediaPicker.launchImageLibraryAsync({
        mediaTypes: MediaPicker.MediaTypeOptions.All, // Allow both images and videos
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const files = result.assets.map((item: any) => ({
          uri: item.uri,
          type: item.mimeType,
        }));

        uploadToAWS(files);
      }
    } catch (error) {
      console.error('Error picking media:', error);
    }
  };

  const uploadToAWS = async (files: UploadFile[]) => {
    try {
      setUploading(true);

      // Step 1: Get pre-signed URLs from the backend
      const response = await axios.post('http://192.168.13.61:3000/products/get-presignedurls', {
        fileTypes: files.map((file) => file.type),
      });

      const { urls } = response.data;

      // Step 2: Upload each file directly to S3 using the pre-signed URLs
      await Promise.all(
        urls.map(async (item: any, index: number) => {
          const file = files[index];

          // Fetch the file content from its URI
          const fileContent = await fetch(file.uri);
          const blob = await fileContent.blob(); // Convert to Blob for S3 upload

          // Perform the PUT request to upload the file to S3
          const uploadResponse = await fetch(item.presignedUrl, {
            method: 'PUT',
            body: blob,
            headers: {
              'Content-Type': file.type,
            },
          });
          if (uploadResponse.status == 200){
            setImages((prevImages) => [...prevImages, `${Cloudfronturl}${item.key}`])
          }
          
        })
      );

      alert('Files uploaded successfully to S3.');
    } catch (error) {
      console.error('Error uploading to S3:', error);
      alert('Failed to upload files to S3.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Add image/video</Text>
        <Text>Related to announcement</Text>
        <View style={styles.mediaContainer}>
          <View style={{height : "100%" , width : "100%"}}>
            { images.length === 0 ? <ImageBackground style={styles.imageBackground}>
              <TouchableOpacity style={styles.overlay} onPress={pickMedia}>
                <Text>Upload Image/Video</Text>
              </TouchableOpacity>
            </ImageBackground> : <ScrollView horizontal pagingEnabled style={{height : "100%" , width : "100%"}}>
              {images.map((item , index)=>{
                return ( 
                  <View key={index} style={{width : 365}}>
                  <Image source={{uri : item}} style={styles.image}/>
                  <TouchableOpacity style={styles.overlay} onPress={pickMedia}>
                    <Text>Change Image/Video</Text>
                  </TouchableOpacity>
                  </View>
                )
              })}
              </ScrollView>}
          </View>
        </View>
      </View>
      <TextInput
        placeholder="Heading in 5 words"
        style={styles.input}
        onChangeText={(text)=> handleChange("heading" , text)}
      />
      <TextInput
        placeholder="Description in 150 words"
        style={styles.input}
        multiline
        onChangeText={(text)=>handleChange("description" , text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('Upload later functionality not implemented yet.')}
        >
          <Text style={styles.buttonText}>Upload Later</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('Release now functionality not implemented yet.')}
          disabled={uploading}
        >
          <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'Release Now'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Postupdate;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  mediaContainer: {
    width: '98%',
    height: 250,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode : "contain"
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf : "center"
  },
  image : {
    height : "100%",
    width : "100%",
    resizeMode : "contain"
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    height: 55,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 45,
  },
  buttonText: {
    color: 'white',
  },
});
