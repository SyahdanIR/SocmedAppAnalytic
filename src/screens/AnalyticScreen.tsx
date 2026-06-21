import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Heart,
  MessageSquare,
  TrendingUp,
  Calendar,
  ChevronDown,
  Bell,
  User,
} from "lucide-react-native";
import { getPopularThread } from "../Services/AnalyticService";
import { thread } from "../Type/Thread";

export default function AnalyticScreen() {
  const [threads, setThreads] = useState<thread[] | null>(null);
  const [loading, setLoading] = useState(true);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) {
      return "Posted Recently";
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `Posted ${minutes} minutes${minutes > 1 ? "s" : ""} ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `Posted ${hours} hours${hours > 1 ? "s" : ""} ago`;
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `Posted ${days} day${days > 1 ? "s" : ""} ago`;
    }
    const months = Math.floor(days / 30);
    if (months < 12) {
      return `Posted ${months} day${months > 1 ? "s" : ""} ago`;
    }
    const years = Math.floor(months / 12);
    return `Posted ${years} year${years > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const data = await getPopularThread();
        setThreads(data);
      } catch (error) {
        console.error("Failed to fetch threads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, []);

  const renderThreadItem = ({ item }: { item: thread }) => (
    <View className="mx-4 mb-5 bg-white rounded-3xl p-5 shadow-sm border border-[#e8e2d9]">
      {/* Thread Header */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-[#fff5ed] rounded-full items-center justify-center border border-[#ffe4d1]">
            <TrendingUp size={20} color="#ff6d00" />
          </View>
          <View className="ml-3">
            <Text className="text-[#1a1a1a] font-bold text-base">
              Thread Performance
            </Text>
            <Text className="text-[#8c7867] text-xs">
              {formatTimeAgo(item.createdAt)}
            </Text>
          </View>
        </View>
        <View className="bg-[#e6f4ea] px-3 py-1 rounded-full">
          <Text className="text-[#1e7e34] text-[10px] font-bold uppercase tracking-wider">
            High Reach
          </Text>
        </View>
      </View>

      {/* Content */}
      <Text className="text-[#4A3728] text-base leading-6 mb-6 italic">
        "{item.content}"
      </Text>

      {/* Divider */}
      <View className="h-[1px] bg-[#f0ede9] w-full mb-4" />

      {/* Stats */}
      <View className="flex-row items-center space-x-6 gap-2">
        <View className="flex-row items-center">
          <Heart
            size={18}
            color="#ff6d00"
            //fill={item.likeCount > 0 ? "#ff6d00" : "transparent"}
          />
          <Text className="ml-2 text-[#4A3728] font-semibold">
            {item.likeCount}
          </Text>
        </View>
        <View className="flex-row items-center">
          <MessageSquare size={18} color="#8c7867" />
          <Text className="ml-2 text-[#8c7867] font-semibold">
            {item.replyCount}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#fcf9f8]">
      {/* Custom Header */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-[#f0ede9]">
        <View>
          <Text className="text-[#ff6d00] font-black text-xl tracking-tight">
            Antisocial <Text className="text-[#4A3728]">Analytics</Text>
          </Text>
        </View>
        <View className="flex-row space-x-4">
          <TouchableOpacity className="p-2 bg-[#f6f3f2] rounded-full">
            <Bell size={20} color="#4A3728" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-[#f6f3f2] rounded-full">
            <User size={20} color="#4A3728" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title & Filter */}
      <View className="px-6 pt-8 pb-4 flex-row justify-between items-end">
        <View>
          <Text className="text-3xl font-black text-[#1a1a1a]">
            Popular Threads
          </Text>
          <Text className="text-[#8c7867] text-sm mt-1">
            Insights based on engagement
          </Text>
        </View>
        <TouchableOpacity className="flex-row items-center bg-white px-3 py-2 rounded-xl border border-[#e8e2d9]">
          <Calendar size={14} color="#8c7867" />
          <Text className="mx-2 text-[#4A3728] text-xs font-bold">
            Last 7 Days
          </Text>
          <ChevronDown size={14} color="#8c7867" />
        </TouchableOpacity>
      </View>

      <Text className="px-6 mb-4 mt-2 font-bold text-[#8c7867] text-[10px] tracking-widest uppercase">
        Recent Activity
      </Text>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ff6d00" />
        </View>
      ) : (
        <FlatList
          data={threads}
          renderItem={renderThreadItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center mt-20 px-10">
              <Text className="text-[#8c7867] text-center">
                No threads found in this period.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
