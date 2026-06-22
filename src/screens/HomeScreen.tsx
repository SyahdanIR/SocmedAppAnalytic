import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentUser } from "../Services/AuthService";
import { User } from "../Type/User";
import { Ionicons } from "@expo/vector-icons";
import HomeCard from "../Component/HomeCard";
import { countData } from "../Type/CountData";
import { getCountData } from "../Services/AnalyticService";
import { User as Usericon } from "lucide-react-native";
import { HomeSkeleton } from "../Component/SkeletonLoading";

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>();
  const [count, setCount] = useState<countData | null>();
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    const data = await getCurrentUser();
    setUser(data);
  };
  const fetchCount = async () => {
    const data = await getCountData();
    setCount(data);
  };
  useEffect(() => {
    try {
      fetchUser();
      fetchCount();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });
  return (
    <SafeAreaView className="flex-1 bg-[#fcf9f8] dark:bg-slate-800">
      {/* Header */}
      <View className="flex-row justify-between items-between mx-2 px-4 pb-6 mt-10">
        <View>
          <Text className="text-gray-700 dark:text-white font-bold text-3xl">
            Hello, @{user?.username}!
          </Text>
          <Text className="text-gray-500 dark:text-gray-200 ext-md">
            Here is your performance overview
          </Text>
        </View>
        <View className="w-11 h-11 rounded-full shadow-sm overflow-hidden">
          {user?.photo_profile ? (
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${user.photo_profile}`,
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <Usericon size={60} color="#9f4200" />
          )}
        </View>
      </View>
      {/* Kotak kotak */}
      {loading ? (
        <>
          <View className="flex-row gap-3 mx-3 mb-4">
            <HomeSkeleton />
            <HomeSkeleton />
          </View>
          <View className="flex-row gap-3 mx-3 mb-4">
            <HomeSkeleton />
            <HomeSkeleton />
          </View>
        </>
      ) : (
        <>
          <View className="flex-row gap-3 mx-3 mb-4">
            <HomeCard
              icon="person-add-outline"
              count={count?.followerCount || 0}
              title="Followers"
            />
            <HomeCard
              icon="chatbox-outline"
              count={count?.threadCount || 0}
              title="Threads"
            />
          </View>
          <View className="flex-row gap-3 mx-3">
            <HomeCard
              icon="heart-outline"
              count={count?.likeCount || 0}
              title="Total Likes"
            />
            <HomeCard
              icon="arrow-undo-outline"
              count={count?.replyCount || 0}
              title="Replies"
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
