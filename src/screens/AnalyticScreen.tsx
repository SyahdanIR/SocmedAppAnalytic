import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
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
import { formatTimeAgo } from "../Component/FormatTime";
import CustomHeader from "../Component/CustomHeader";
import { useColorScheme } from "nativewind";
import AnalyticFilter from "../Component/AnalyticFilter";
import { AnalyticSkeleton } from "../Component/SkeletonLoading";

export default function AnalyticScreen() {
  const [threads, setThreads] = useState<thread[]>([]);
  const [loading, setLoading] = useState(true);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedFilter, setSelectedFilter] = useState("all_threads");
  const [isModalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const fetchThread = async (currentPage = page) => {
    try {
      const response = await getPopularThread(selectedFilter, currentPage);
      if (currentPage === 1) {
        setThreads(response.data);
      } else {
        setThreads((prev) => [...prev, ...response.data]);
      }
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  useEffect(() => {
    fetchThread(page);
  }, [page, selectedFilter]);

  const onRefresh = async () => {
    setRefresh(true);
    if (page === 1) {
      fetchThread(1);
    } else {
      setPage(1);
    }
  };

  const renderThreadItem = ({ item }: { item: thread }) => (
    <View className="mx-4 mb-5 bg-white dark:bg-slate-600 rounded-3xl p-5 shadow-sm border border-[#e8e2d9] dark:border-gray-300">
      {/* Thread Header */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-[#fff5ed] dark:bg-[#ff8f35] rounded-full items-center justify-center border border-[#ffe4d1]">
            <TrendingUp size={20} color={isDark ? "#c15504" : "#ff6d00"} />
          </View>
          <View className="ml-3">
            <Text className="text-[#1a1a1a] dark:text-white font-bold text-base">
              Thread Performance
            </Text>
            <Text className="text-[#8c7867] dark:text-gray-200 text-xs">
              {formatTimeAgo(item.createdAt)}
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <Text className="text-[#4A3728] dark:text-gray-300 text-base leading-6 mb-2 italic">
        "{item.content}"
      </Text>
      {item.threadImg && (
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${item.threadImg}`,
          }}
          className="w-32 h-32 rounded-2xl mb-6"
        />
      )}

      {/* Divider */}
      <View className="h-[1px] bg-[#f0ede9] w-full mb-4" />

      {/* Stats */}
      <View className="flex-row items-center space-x-6 gap-2">
        <View className="flex-row items-center">
          <Heart
            size={18}
            color={isDark ? "#ffffff" : "#ff6d00"}
            //fill={item.likeCount > 0 ? "#ff6d00" : "transparent"}
          />
          <Text className="ml-2 text-[#4A3728] dark:text-white font-semibold">
            {item.likeCount}
          </Text>
        </View>
        <View className="flex-row items-center">
          <MessageSquare size={18} color={isDark ? "#ffffff" : "#8c7867"} />
          <Text className="ml-2 text-[#4A3728] dark:text-white font-semibold">
            {item.replyCount}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-[#fcf9f8] dark:bg-slate-800"
      edges={["top", "left", "right"]}
    >
      {/* Custom Header */}
      <CustomHeader />
      {/* Title & Filter */}
      <View className="px-6 pt-8 pb-4 flex-row justify-between items-end">
        <View>
          <Text className="text-3xl font-black text-[#1a1a1a] dark:text-white">
            Popular Threads
          </Text>
          <Text className="text-[#8c7867] dark:text-gray-200 text-sm mt-1">
            Insights based on engagement
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center bg-white dark:bg-slate-600 px-3 py-2 rounded-xl border border-[#e8e2d9] dark:border-slate-700"
        >
          <Calendar size={14} color={isDark ? "white" : "#8c7867"} />
          <Text className="mx-2 text-[#4A3728] dark:text-gray-200 text-xs font-bold">
            {selectedFilter === "7_days"
              ? "Last 7 Days"
              : selectedFilter === "14_days"
                ? "Last 14 Days"
                : "All Threads"}
          </Text>
          <ChevronDown size={14} color={isDark ? "white" : "#8c7867"} />
        </TouchableOpacity>
      </View>
      <Text className="px-6 mb-4 mt-2 font-bold text-[#8c7867] dark:text-[#ed9041] text-[10px] tracking-widest uppercase">
        Recent Activity
      </Text>
      {loading ? (
        <>
          <AnalyticSkeleton />
          <AnalyticSkeleton />
          <AnalyticSkeleton />
          <AnalyticSkeleton />
        </>
      ) : (
        <FlatList
          data={threads}
          renderItem={renderThreadItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              colors={["orange"]}
              tintColor={"orange"}
            />
          }
          onEndReached={() => {
            setPage((prevPage) => prevPage + 1);
          }}
          ListEmptyComponent={
            <View className="items-center justify-center mt-20 px-10">
              <Text className="text-[#8c7867] text-center">
                No threads found in this period.
              </Text>
            </View>
          }
        />
      )}
      <AnalyticFilter
        visible={isModalVisible}
        currentFilter={selectedFilter}
        onClose={() => setModalVisible(false)}
        onSelect={(filterData) => {
          setSelectedFilter(filterData);
          setPage(1);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
