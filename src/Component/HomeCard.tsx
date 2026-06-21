import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HomeCardProps {
  icon: any;
  count: number;
  title: string;
}
export default function homeCard({ icon, count, title }: HomeCardProps) {
  return (
    <View className="flex-1 basis-0 bg-white p-4 shadow-lg rounded-2xl h-32 justify-between">
      <View>
        <Ionicons name={icon} size={20} color="black" />
      </View>
      <View className="text-gray-700 ">
        <Text className="text-3xl font-bold">{count}</Text>
        <Text className="uppercase">{title}</Text>
      </View>
    </View>
  );
}
