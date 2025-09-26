import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';

const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Messenger</Text>
      {messages.map((message, index) => (
        <View key={index} style={styles.messageContainer}>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={newMessage}
        onChangeText={text => setNewMessage(text)}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default Messenger;