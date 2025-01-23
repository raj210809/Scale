import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";

interface MediaSliderProps {
  media: { type: string; uri: string }[];
}

const MediaSlider = (prop: MediaSliderProps) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {prop.media?.map((item, index) => (
        <View key={index} style={styles.mediaContainer}>
          {item.type === "image" ? (
            <Image source={{ uri: item.uri }} style={styles.image} />
          ) : item.type === "video" ? (
            <VideoPlayer uri={item.uri} />
          ) : (
            <Text style={styles.errorText}>Unsupported media type</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const VideoPlayer = ({ uri }: { uri: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = React.useRef<Video>(null);

  const handlePlayPause = async () => {
    if (videoRef.current) {
      setIsLoading(true); // Show loader while video loads
      try {
        if (isPlaying) {
          await videoRef.current.pauseAsync();
        } else {
          // If not playing, start playback from the beginning
          await videoRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error playing video: ", error);
      }
      setIsLoading(false); // Hide loader when video is ready
    }
  };

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        resizeMode="contain"
        isLooping={false}
        shouldPlay={false}
        onPlaybackStatusUpdate={async (status) => {
          if (status.didJustFinish) {
            await videoRef.current?.setPositionAsync(0);
            await videoRef.current?.pauseAsync();
            setIsPlaying(false);

          }
        }}
      />
      <TouchableOpacity
        style={styles.playButtonContainer}
        onPress={handlePlayPause}
        activeOpacity={0.7}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text style={styles.playButtonText}>{isPlaying ? "||" : "▶"}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : 365,
  },
  mediaContainer: {
    width: 365, // Full width of the screen
    height: 250, // Adjusted to a fixed height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  videoContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playButtonContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default MediaSlider;
