import { Tabs } from 'expo-router';
import { C } from '../../src/constants/colors';
import { LeafIcon } from '../../src/components/icons/LeafIcon';
import { FlowerIcon } from '../../src/components/icons/FlowerIcon';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.primary,
        tabBarInactiveTintColor: C.mutedFg,
        tabBarStyle: {
          backgroundColor: C.card,
          borderTopColor: C.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: 'Nunito_700Bold',
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <LeafIcon size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="palettes"
        options={{
          title: 'Palettes',
          tabBarIcon: ({ color }) => <FlowerIcon size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
