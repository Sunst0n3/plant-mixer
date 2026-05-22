import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { C } from '../src/constants/colors';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)');
  }, []);

  return <View style={{ flex: 1, backgroundColor: C.bg }} />;
}
