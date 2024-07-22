import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from '../../components/icon';
import { white } from '../../utilities/color';
import styles from './styles';

const TextInputWithIcon = ({ iconName, iconType, secureTextEntry, onIconPress, placeholder, value, onChangeText }) => (
  <View style={styles.textInput}>
    <Icon
      name={iconName}
      type={iconType}
      size={20}
      color={white}
      style={styles.icons}
    />
    <TextInput
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
      style={styles.TextItems}
      placeholder={placeholder}
      placeholderTextColor={white}
    />
    {onIconPress && (
      <TouchableOpacity onPress={onIconPress} style={styles.eyeIcon}>
        <Icon
          name={secureTextEntry ? 'eye-with-line' : 'eye'}
          type={'Entypo'}
          size={20}
          color={white}
        />
      </TouchableOpacity>
    )}
  </View>
);

export default TextInputWithIcon;
