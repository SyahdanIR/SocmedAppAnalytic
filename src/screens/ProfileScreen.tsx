import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronRight,
  User,
  Settings,
  Lock,
  LogOut,
  ArrowLeft,
} from "lucide-react-native";
import { AuthContext } from "../Context/AuthContext";
import { getCurrentUser } from "../Services/AuthService";
import { User as Unsur } from "../Type/User";
import { useColorScheme } from "nativewind";

const ProfileScreen = () => {
  const [user, setUser] = useState<Unsur | null>();
  const { signOut } = useContext(AuthContext);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const handleLogout = () => {
    signOut();
  };
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      setUser(data);
    };
    fetchUser();
  }, []);
  const profileItems = [
    { id: "1", label: "Edit Profile", icon: User, color: "#FF6D00" },
    { id: "2", label: "Preferences", icon: Settings, color: "#4A3728" },
    { id: "3", label: "Privacy", icon: Lock, color: "#8C7867" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#fcf9f8] dark:bg-slate-800" edges={['top', 'left', 'right']}>
      {/* Top App Bar */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white dark:bg-slate-800 border-b border-[#f0ede9] dark:border-slate-700">
        <TouchableOpacity className="p-2 bg-[#f6f3f2] dark:bg-slate-700 rounded-full">
          <ArrowLeft size={20} color={isDark ? "#ffffff" : "#4A3728"} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#4A3728] dark:text-white">Profile</Text>
        <TouchableOpacity className="p-2 bg-[#f6f3f2] dark:bg-slate-700 rounded-full">
          <Settings size={20} color={isDark ? "#ffffff" : "#4A3728"} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="items-center py-10">
          <View className="relative">
            <View className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-stone-200 dark:bg-slate-700">
              {/* Placeholder for Profile Image */}
              <View className="w-full h-full bg-[#fff5ed] dark:bg-slate-700 items-center justify-center">
                {user?.photo_profile ? (
                  <Image
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${user.photo_profile}`,
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <User size={60} color={isDark ? "#ff8f35" : "#9f4200"} />
                )}
              </View>
            </View>
            <TouchableOpacity className="absolute bottom-1 right-1 bg-[#9f4200] dark:bg-[#ff8f35] p-2 rounded-full border-2 border-white dark:border-slate-800">
              <Settings size={16} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-black text-[#1a1a1a] dark:text-white mt-4 capitalize">
            {user?.full_name}
          </Text>
          <Text className="text-[#8c7867] dark:text-gray-300 text-sm font-medium">
            @{user?.username}
          </Text>
          <Text className="text-[#4A3728] dark:text-gray-200 text-base mt-2 text-center px-10">
            {user?.bio ? user.bio : "This user hasn't set biodata yet"}
          </Text>
        </View>

        {/* Action List */}
        <View className="px-6 space-y-4">
          {profileItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              className="flex-row items-center bg-white dark:bg-slate-600 p-4 rounded-3xl border border-[#e8e2d9] dark:border-slate-500 shadow-sm mb-5"
            >
              <View className="w-12 h-12 bg-[#fff5ed] dark:bg-slate-700 rounded-2xl items-center justify-center mr-4">
                <item.icon size={24} color={isDark ? "#ff8f35" : "#9f4200"} />
              </View>
              <Text className="flex-1 text-lg font-bold text-[#4A3728] dark:text-white">
                {item.label}
              </Text>
              <ChevronRight size={20} color={isDark ? "#d1d5db" : "#a89a8e"} />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            className="flex-row items-center justify-center bg-[#fff0f0] dark:bg-red-950 p-5 rounded-3xl border border-[#ffdada] dark:border-red-900 mt-4"
          >
            <LogOut size={20} color={isDark ? "#fca5a5" : "#d93025"} />
            <Text className="ml-3 text-lg font-black text-[#d93025] dark:text-red-300 tracking-widest">
              LOGOUT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
