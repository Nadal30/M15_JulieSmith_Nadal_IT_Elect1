import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommentSection from "./CommentSection";

const { width } = Dimensions.get("window");

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

const timeAgo = (timestamp) => {
  if (!timestamp) return "";
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export default function PostList({ posts = [] }) {
  const [reactions, setReactions] = useState({});
  const likeAnim = useRef({});
  const heartAnim = useRef({});
  const [isReady, setIsReady] = useState(false); // ✅ prevents early render

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const newReactions = {};
    posts.forEach((p) => {
      newReactions[p.id] = {
        liked: false,
        hearts: false,
        likesCount: 0,
        heartsCount: 0,
      };

      if (!likeAnim.current[p.id])
        likeAnim.current[p.id] = new Animated.Value(1);
      if (!heartAnim.current[p.id])
        heartAnim.current[p.id] = new Animated.Value(1);
    });

    setReactions(newReactions);
    setIsReady(true); // ✅ only render after anims exist
  }, [posts]);

  const animateIcon = (id, type) => {
    const anim =
      type === "like" ? likeAnim.current[id] : heartAnim.current[id];
    if (!anim) return; // ✅ prevent crash if anim not yet ready

    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1.4,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleLike = (postId) => {
    animateIcon(postId, "like");
    setReactions((prev) => {
      const post = prev[postId];
      if (!post) return prev;
      const newLiked = !post.liked;
      return {
        ...prev,
        [postId]: {
          ...post,
          liked: newLiked,
          likesCount: Math.max(0, post.likesCount + (newLiked ? 1 : -1)),
        },
      };
    });
  };

  const toggleHeart = (postId) => {
    animateIcon(postId, "heart");
    setReactions((prev) => {
      const post = prev[postId];
      if (!post) return prev;
      const newHeart = !post.hearts;
      return {
        ...prev,
        [postId]: {
          ...post,
          hearts: newHeart,
          heartsCount: Math.max(0, post.heartsCount + (newHeart ? 1 : -1)),
        },
      };
    });
  };

  const renderItem = useCallback(
    ({ item }) => {
      if (!isReady) return null; // ✅ do not render until anims ready

      const r =
        reactions[item.id] || {
          liked: false,
          hearts: false,
          likesCount: 0,
          heartsCount: 0,
        };

      return (
        <View style={styles.postCard}>
          {/* 👤 Header */}
          <View style={styles.header}>
            <Image
              source={
                typeof item.avatar === "string"
                  ? { uri: item.avatar }
                  : item.avatar
              }
              style={styles.avatar}
            />
            <View>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.time}>{timeAgo(item.timestamp)}</Text>
            </View>
          </View>

          {/* 🧠 Content */}
          {item.content ? (
            <Text style={styles.content}>{item.content}</Text>
          ) : null}

          {/* 🖼️ Image */}
          {item.image && (
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.postImage}
            />
          )}

          {/* ❤️ Reaction Bar */}
          <View style={styles.reactionRow}>
            <TouchableOpacity onPress={() => toggleLike(item.id)}>
              <Animated.View
                style={{
                  transform: [
                    { scale: likeAnim.current[item.id] || new Animated.Value(1) },
                  ],
                }}
              >
                <Ionicons
                  name={r.liked ? "thumbs-up" : "thumbs-up-outline"}
                  size={22}
                  color={r.liked ? colors.primary : colors.subtext}
                />
              </Animated.View>
              <Text style={styles.reactionCount}>{r.likesCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleHeart(item.id)}>
              <Animated.View
                style={{
                  transform: [
                    { scale: heartAnim.current[item.id] || new Animated.Value(1) },
                  ],
                }}
              >
                <Ionicons
                  name={r.hearts ? "heart" : "heart-outline"}
                  size={22}
                  color={r.hearts ? colors.danger : colors.subtext}
                />
              </Animated.View>
              <Text style={styles.reactionCount}>{r.heartsCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color={colors.subtext}
              />
            </TouchableOpacity>
          </View>

          {/* 💬 Comments */}
          <CommentSection />
        </View>
      );
    },
    [reactions, isReady]
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  postCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    marginBottom: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: { width: 42, height: 42, borderRadius: 21, marginRight: 10 },
  user: { fontWeight: "bold", fontSize: 15, color: colors.text },
  time: { fontSize: 12, color: colors.subtext },
  content: { marginBottom: 10, fontSize: 14, color: colors.text },
  postImage: {
    width: "100%",
    height: width * 0.55,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: "cover",
  },
  reactionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    paddingBottom: 6,
  },
  reactionCount: {
    textAlign: "center",
    fontSize: 12,
    color: colors.subtext,
    marginTop: 3,
  },
});