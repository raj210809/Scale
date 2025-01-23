import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {openPicker} from 'react-native-image-crop-picker';
import axios from 'axios';

interface Media {
  path : string;
  mime : string;
  name : string | undefined;
}

const PostUpdate = () => {
  const [media, setMedia] = useState({
    path : "",
    mime : "",
    name : "",
  });
  const [heading, setHeading] = useState<Media[]>([]);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Media picker function
  const pickMedia = async () => {
    try {
      const selectedMedia = await openPicker({
        mediaType: 'any',
        multiple: false,
      })

      setMedia({
        path: selectedMedia.path,
        mime: selectedMedia.mime,
        name: selectedMedia.path.split('/').pop(), // Extract the file name from the path
      });

      Alert.alert('Media Selected', `Selected: ${selectedMedia.path}`);
    } catch (err) {
      Alert.alert('Error', 'Failed to pick media.');
    }
  };

  // Upload media to AWS using presigned URL
  const uploadToAWS = async () => {
    if (!media) {
      Alert.alert('Error', 'Please select media to upload.');
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Request presigned URL from the backend
      const backendResponse = await axios.post('http://your-backend-url.com/get-presigned-url', {
        fileName: media.name,
        fileType: media.mime,
      });

      const { presignedUrl, fileUrl } = backendResponse.data;

      // Step 2: Upload media to S3 using the presigned URL
      const uploadResponse = await axios.put(presignedUrl, {
        uri: media.path,
        type: media.mime,
        name: media.name,
      }, {
        headers: {
          'Content-Type': media.mime,
        },
      });

      if (uploadResponse.status === 200) {
        Alert.alert('Success', 'Media uploaded successfully.');
        console.log('File URL:', fileUrl);
      } else {
        throw new Error('Failed to upload to AWS S3.');
      }
    } catch (error) {
      console.error('Error uploading media:', error);
      Alert.alert('Error', 'Failed to upload media.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Add image/video</Text>
        <Text style={styles.subtitle}>related to announcement</Text>

        <View style={styles.mediaPicker}>
          <TouchableOpacity onPress={pickMedia}>
            <ImageBackground
              style={styles.imageBackground}
              source={media ? { uri: media.path } : null}
              imageStyle={{ borderRadius: 10 }}
            >
              {!media && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>Upload Image/Video</Text>
                </View>
              )}
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Heading in 5 words"
          value={heading}
          onChangeText={setHeading}
          style={styles.input}
        />
        <TextInput
          placeholder="Description in 150 words"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 100 }]}
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Upload Later', 'Media will be uploaded later.')}
          >
            <Text style={styles.buttonText}>Upload Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isUploading && styles.disabledButton]}
            onPress={uploadToAWS}
            disabled={isUploading}
          >
            <Text style={styles.buttonText}>{isUploading ? 'Uploading...' : 'Release Now'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
  subtitle: {
    marginBottom: 20,
  },
  mediaPicker: {
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
    flexDirection: 'row',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: 'white',
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
    alignSelf: 'center',
    marginTop: 20,
    height: 45,
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
  },
});

export default PostUpdate;
