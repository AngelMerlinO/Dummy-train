import React from 'react';
import { View, Text } from 'react-native';

const Card = ({ content }) => (
  <View className="bg-white p-4 m-2 rounded shadow">
    <Text>{content}</Text>
  </View>
);

export default Card;
