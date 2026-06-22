import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Heart,
  MessageSquare,
  UserPlus,
  Home,
  BarChart2,
  Image as ImageIcon,
  Bell as BellIcon,
  User as UserIcon,
} from "lucide-react-native";
import { Notif } from "../Type/Notif";
import { getNotification } from "../Services/AnalyticService";
import { formatTimeAgo } from "../Component/FormatTime";
import CustomHeader from "../Component/CustomHeader";
import { useColorScheme } from "nativewind";
import { ActivitySkeleton } from "../Component/SkeletonLoading";

const ActivityScreen = () => {
  const [notip, setNotip] = useState<Notif[] | null>(null);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const response = await getNotification();
        // console.log(response);
        setNotip(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotif();
  }, []);
  const renderItem = ({ item }: { item: Notif }) => (
    <View
      className={`mx-4 mb-4 bg-white dark:bg-slate-600 p-5 rounded-[32px] border border-[#e8e2d9] dark:border-gray-300 shadow-sm`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-row flex-1">
          <View className="relative self-start">
            {item.actor.photo_profile ? (
              <Image
                source={{
                  uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${item.actor.photo_profile}`,
                }}
                className="w-14 h-14 rounded-full bg-stone-100"
              />
            ) : (
              <User size={60} color="#9f4200" />
            )}

            <View className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-700 p-1 rounded-full border border-stone-50 dark:border-slate-600">
              {item.type === "follow" && <UserPlus size={12} color="#ff6d00" />}
              {item.type === "like" && (
                <Heart size={12} color="#d93025" fill="#d93025" />
              )}
              {item.type === "reply" && (
                <MessageSquare
                  size={12}
                  color={isDark ? "#ffffff" : "#8c7867"}
                />
              )}
            </View>
          </View>

          <View className="ml-4 flex-1">
            <View className="flex-row flex-wrap items-center">
              <Text className="text-[#1a1a1a] dark:text-white font-bold text-lg">
                @{item.actor.username}
              </Text>
              <Text className="text-[#4A3728] dark:text-gray-200 text-base ml-1">
                {" "}
                {item.action}
              </Text>
            </View>

            {item.threadId?.content && (
              <Text className="text-[#8c7867] dark:text-gray-300 text-base mt-1 italic">
                {item.threadId.content}
              </Text>
            )}

            {item.content && (
              <View className="mt-3 bg-[#f6f3f2] dark:bg-slate-700 p-3 rounded-2xl border border-[#f0ede9] dark:border-slate-600">
                <Text className="text-[#4A3728] dark:text-gray-200 text-base">
                  {item.content}
                </Text>
                {item.image && (
                  <View className="flex-row items-center gap-1 mt-1">
                    <ImageIcon
                      size={12}
                      color={isDark ? "#ff8f35" : "#9f4200"}
                    />
                    <Text className="text-sm text-[#9f4200] dark:text-[#ff8f35]">
                      Image
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
        <Text className="text-[#a89a8e] dark:text-gray-400 text-[10px] font-bold uppercase tracking-tighter mt-1">
          {formatTimeAgo(item.createdAt)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-[#fcf9f8] dark:bg-slate-800"
      edges={["top", "left", "right"]}
    >
      {/* Header */}
      <CustomHeader />

      <View className="px-6 py-8">
        <Text className="text-3xl font-black text-[#1a1a1a] dark:text-white">
          Recent Activity
        </Text>
      </View>

      {loading ? (
        <>
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
          <ActivitySkeleton />
        </>
      ) : (
        <FlatList
          data={notip}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ActivityScreen;
