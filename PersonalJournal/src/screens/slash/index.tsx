import React from 'react';
import { View, Text,Image } from 'react-native';
import backgroundImage from '@assets/background.png';
import styles from './styles';

const Slash=()=> {

  return (
    <View style={styles.SlashContainer}>
    <Image source={backgroundImage} style={styles.backgroundImage} />
      <Text style={styles.SlashLoading}>Loading ...</Text>
    </View>
  );
}

export default Slash;