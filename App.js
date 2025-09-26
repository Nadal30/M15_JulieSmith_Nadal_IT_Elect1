// App.js
import React from 'react';
import { ScrollView } from 'react-native';
import Messenger from './Messenger';
import NewsFeed from './NewsFeed';
import styles from './styles';

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <Messenger />
      <NewsFeed />
    </ScrollView>
  );
};

export default App;