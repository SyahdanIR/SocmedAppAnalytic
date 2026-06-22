import { Bell, Sun, User, Moon } from "lucide-react-native";
import { View, TouchableOpacity, Text } from "react-native";
import { useColorScheme } from "nativewind";

export default function CustomHeader() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="px-6 py-4 flex-row justify-between items-center bg-white dark:bg-slate-800 border-b border-[#f0ede9] dark:border-slate-700">
      <View>
        <Text className="text-[#ff6d00] font-black dark:text-white text-xl tracking-tight">
          Antisocial{" "}
          <Text className="text-[#4A3728] dark:text-[#b76626]">Analytics</Text>
        </Text>
      </View>
      <View className="flex-row space-x-4">
        <TouchableOpacity
          className="p-2 bg-[#f6f3f2] dark:bg-slate-600 rounded-full"
          onPress={toggleColorScheme}
        >
          {colorScheme == "dark" && <Sun size={20} color="#b76626" />}
          {colorScheme == "light" && <Moon size={20} color="#4A3728" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}
