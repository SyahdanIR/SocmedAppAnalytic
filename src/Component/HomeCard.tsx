import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface HomeCardProps {
  icon: any;
  count: number;
  title: string;
}
export default function homeCard({ icon, count, title }: HomeCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <View className="flex-1 basis-0 bg-white dark:bg-slate-600 p-4 shadow-lg rounded-2xl h-32 justify-between">
      <View>
        <Ionicons name={icon} size={20} color={isDark ? "white" : "black"} />
      </View>
      <View className="text-gray-700 dark:text-gray-100">
        <Text className="text-3xl font-bold dark:text-gray-100">{count}</Text>
        <Text className="uppercase dark:text-gray-100">{title}</Text>
      </View>
    </View>
  );
}
