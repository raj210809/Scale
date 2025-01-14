import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import Share from '@/components/buttons/share';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Bookmark from '@/components/buttons/bookmark';

import { ShareButtonProvider, useShareButton } from '@/context/sharebutton';
import SharePage from '@/components/bottomsheet/sharepage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const [drawer, setDrawer] = useState(false);
  const colorScheme = useColorScheme();
  const { isShared, toggleShared } = useShareButton(); // Access the context

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log('isShared state:', isShared); // Use the context value here
  }, [isShared]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Stack>
        {/* Customer screen */}
        <Stack.Screen name="(customer)" options={{ headerShown: false }} />

        {/* Personal chat screen */}
        <Stack.Screen
          name="personalchat"
          options={({ route }) => ({
            headerTitle: route.params?.name,
            headerRight: () => (
              <Image
                source={{ uri: route.params?.profileImage }}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
              />
            ),
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          })}
        />

        {/* Product screen */}
        <Stack.Screen
          name="product/[id]"
          options={{
            headerTitle: '',
            headerRight: () => (
              <>
                <Bookmark drawerfunc={setDrawer} />
                <Share />
              </>
            ),
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        />

        {/* Other screens */}
        <Stack.Screen name="components/reelleftswipe" options={{ headerShown: false }} />
        <Stack.Screen
          name="components/searchcomponent"
          options={{
            headerTitle: '',
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  width: 90,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity onPress={() => router.push('/seller/(tabs)')}>
                  <FontAwesome name="bell" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/Bookmark')}>
                  <FontAwesome name="bookmark" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/product')}>
                  <FontAwesome name="shopping-bag" size={20} />
                </TouchableOpacity>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        />
        <Stack.Screen name="reel" options={{ headerShown: false }} />
        <Stack.Screen name="seller/(tabs)" options={{ headerShown: false }} />
      </Stack>
      {isShared && <SharePage onClose={toggleShared} studentid="54767"/>}
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ShareButtonProvider>
      <RootLayoutContent />
    </ShareButtonProvider>
  );
}
