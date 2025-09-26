import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  messageContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  newsFeedContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  commentContainer: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
});

export default styles;