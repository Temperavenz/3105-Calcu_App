import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, SafeAreaView } from 'react-native';
import { ThemeContext } from './src/context/ThemeContext';
import { myColors } from './src/styles/Colors';
import Button from './src/components/Button'
import MyKeyboard from './src/components/MyKeyboard';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [theme, setTheme] = useState('light')

  const toggleSwitch = () => { setIsEnabled(previousState => !previousState) };
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
        <MyKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
