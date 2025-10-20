import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import Pic from "../assets/Pic.jpg";

const colors = {
  background: "#f9f9f9",
  card: "#ffffff",
  border: "#e5e5e5",
  text: "#222222",
  subtext: "#888888",
  primary: "#007BFF",
};

export default function CommentSection() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleAddComment = () => {
    if (commentText.trim() === "") return;
    const newComment = {
      id: Date.now().toString(),
      user: "Smith",
      avatar: Pic,
      text: commentText.trim(),
      timestamp: Date.now(),
    };
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const visibleComments = expanded ? comments : comments.slice(0, 2);

  return (
    <View style={styles.container}>
      {/* View all link */}
      {comments.length > 2 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.viewAll}>
            {expanded
              ? "Hide comments"
              : `View all ${comments.length} comments`}
          </Text>
        </TouchableOpacity>
      )}

      {/* Comments list */}
      <FlatList
        data={visibleComments}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.commentBody}>
              <View style={styles.commentHeader}>
                <Text style={styles.user}>{item.user}</Text>
                <Text style={styles.time}>· just now</Text>
              </View>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        )}
      />

      {/* Add comment input */}
      <View style={styles.inputContainer}>
        <Image source={Pic} style={styles.avatar} />
        <TextInput
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Write a comment..."
          style={styles.input}
          placeholderTextColor={colors.subtext}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 8, backgroundColor: "#f8f8f8", borderRadius: 12 },
  viewAll: {
    color: colors.primary,
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 10,
    fontWeight: "500",
  },
  comment: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  commentBody: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 8,
    flex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  commentHeader: { flexDirection: "row", alignItems: "center" },
  user: { fontWeight: "bold", fontSize: 13, color: colors.text, marginRight: 4 },
  time: { fontSize: 12, color: colors.subtext },
  text: { fontSize: 13, color: colors.text },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    color: colors.text,
  },
  button: { paddingHorizontal: 8 },
  buttonText: { color: colors.primary, fontWeight: "bold" },
});