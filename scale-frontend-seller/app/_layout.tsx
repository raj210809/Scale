import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="reel" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerTitle: '',
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
        <Stack.Screen
        name="components/forpost"
        options={{
          headerTitle: '',
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
      </Stack>
    </GestureHandlerRootView>
    
  );
}
