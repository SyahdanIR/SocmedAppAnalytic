import { View, Text, TouchableOpacity, Modal } from "react-native";

interface AnalyticFilterProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (filter: string) => void;
  currentFilter: string;
}

export default function AnalyticFilter({
  visible,
  onClose,
  onSelect,
  currentFilter,
}: AnalyticFilterProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableOpacity
        className="flex-1 bg-black/50 justify-center items-center"
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="bg-white dark:bg-slate-800 w-[80%] rounded-2xl p-4">
          <Text className="text-lg font-bold mb-4 dark:text-white">
            Select Period
          </Text>
          {/* 7 days */}
          <TouchableOpacity
            className="py-3 border-b border-gray-200"
            onPress={() => {
              onSelect("7_days");
            }}
          >
            <Text
              className={`dark:text-white ${currentFilter === "7_days" ? "font-bold text-[#ff6d00]" : ""}`}
            >
              Last 7 Days
            </Text>
          </TouchableOpacity>
          {/* 14 days */}
          <TouchableOpacity
            className="py-3 border-b border-gray-200"
            onPress={() => {
              onSelect("14_days");
            }}
          >
            <Text
              className={`dark:text-white ${currentFilter === "14_days" ? "font-bold text-[#ff6d00]" : ""}`}
            >
              Last 14 Days
            </Text>
          </TouchableOpacity>
          {/* All Threads */}
          <TouchableOpacity
            className="py-3"
            onPress={() => {
              onSelect("all_threads");
            }}
          >
            <Text
              className={`dark:text-white ${currentFilter === "all_threads" ? "font-bold text-[#ff6d00]" : ""}`}
            >
              All Threads
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
