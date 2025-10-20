import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import PostList from "../components/PostList";

// 🖼️ Local Images
import Pic from "../assets/Pic.jpg";
import Pic1 from "../assets/Pic1.jpg";
import Pic2 from "../assets/Pic2.jpg";
import Pic4 from "../assets/Pic4.jpg";
import Pic5 from "../assets/Pic5.jpg";
import Pic6 from "../assets/Pic6.jpg";

// 🎨 Color Palette
const colors = {
  background: "#f9f9f9",
  card: "#ffffff",
  border: "#e5e5e5",
  text: "#222222",
  subtext: "#888888",
  primary: "#007BFF",
  success: "#28A745",
  danger: "#FF3B3B",
};

export default function NewsFeedScreen() {
  const [search, setSearch] = useState("");
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: "1",
      user: "Smith",
      avatar: Pic,
      content: "Feeling grateful today! 🌟 Here's a photo from my recent trip!",
      image: Pic4,
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: "2",
      user: "Ryan",
      avatar: Pic1,
      content: "Nothing beats a warm cup of coffee ☕ to start the day right.",
      image: Pic5,
      timestamp: Date.now() - 1000 * 60 * 60 * 5,
    },
    {
      id: "3",
      user: "Jonathan",
      avatar: Pic2,
      content: "Enjoying the beauty of the sunset 🌅 — a perfect way to unwind.",
      image: Pic6,
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
    },
  ]);

  const filteredPosts = posts.filter(
    (p) =>
      p.user.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your camera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!postText.trim() && !selectedImage) return;

    const newPost = {
      id: Date.now().toString(),
      user: "Smith",
      avatar: Pic,
      content: postText.trim(),
      image: selectedImage ? { uri: selectedImage } : null,
      timestamp: Date.now(),
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setSelectedImage(null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.container}>
        {/* 🧭 Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>NewsFeed</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color={colors.subtext} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={colors.subtext}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* 🧠 Post Box */}
        <View style={styles.postBox}>
          <Image source={Pic} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.postInput}
              placeholder="What's on your mind?"
              placeholderTextColor={colors.subtext}
              value={postText}
              onChangeText={setPostText}
              multiline
            />

            {selectedImage && (
              <View style={styles.previewContainer}>
                <Image source={{ uri: selectedImage }} style={styles.preview} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <Ionicons name="close-circle" size={22} color={colors.danger} />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Ionicons name="image" size={20} color={colors.primary} />
                <Text style={[styles.imageButtonText, { color: colors.primary }]}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
                <Ionicons name="camera" size={20} color={colors.success} />
                <Text style={[styles.imageButtonText, { color: colors.success }]}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handlePost}
                style={[
                  styles.postButton,
                  (!postText.trim() && !selectedImage) && { opacity: 0.5 },
                ]}
                disabled={!postText.trim() && !selectedImage}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 📰 Post List */}
        <View style={styles.postListWrapper}>
          <PostList posts={filteredPosts} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: colors.text },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 25,
    paddingHorizontal: 10,
    width: "50%",
    height: 38,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 6,
    fontSize: 14,
    color: colors.text,
  },
  postBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    margin: 10,
    backgroundColor: colors.card,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postInput: {
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.text,
    minHeight: 40,
    textAlignVertical: "top",
  },
  previewContainer: { marginTop: 8, position: "relative" },
  preview: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  removeImageButton: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  imageButton: { flexDirection: "row", alignItems: "center" },
  imageButtonText: { marginLeft: 6, fontWeight: "500" },
  postButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  postButtonText: { color: "#fff", fontWeight: "bold" },
  postListWrapper: { flex: 1 },
});