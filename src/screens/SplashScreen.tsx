import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { isAuthenticated } from '../utils/storage';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));

        const authenticated = await isAuthenticated();

        if (authenticated) {
          navigation.replace('MainTabs');
        } else {
          navigation.replace('Registration');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigation.replace('Registration');
      }
    };

    checkAuthStatus();
  }, [navigation]);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>News App</Text>
      <Text style={styles.subtitle}>Stay Updated with Latest News</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
