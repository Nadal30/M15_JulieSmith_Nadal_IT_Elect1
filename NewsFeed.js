import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';

const NewsFeed = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.newsFeedContainer}>
      <Text style={styles.sectionTitle}>NewsFeed</Text>
      <View>
        <Text style={styles.postTitle}>Breaking News</Text>
        <Text style={styles.postContent}>
          Tinuod ba nga gwapo c Rex Felicio!
        </Text>
      </View>
      {comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={text => setNewComment(text)}
      />
      <Button title="Add Comment" onPress={addComment} />
    </View>
  );
};

export default NewsFeed;