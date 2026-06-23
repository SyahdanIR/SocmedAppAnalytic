import React from "react";
import { Dimensions, ScrollView, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useColorScheme } from "nativewind";

interface FollowerData {
  date: string;
  newFollowers: number;
}

interface Props {
  data: FollowerData[];
}

const screenWidth = Dimensions.get("window").width;

export default function FollowerChart({ data }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  if (!data?.length) return null;

  return (
    <View
      className={`mx-3 mt-5 rounded-3xl p-4 shadow-sm ${
        isDark ? "bg-slate-700" : "bg-white"
      }`}
    >
      <Text
        className={`text-lg font-bold mb-4 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        Followers Growth
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LineChart
          data={{
            labels: data.map((item) =>
              new Date(item.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              }),
            ),
            datasets: [
              {
                data: data.map((item) => item.newFollowers),
                strokeWidth: 3,
              },
            ],
          }}
          width={Math.max(screenWidth - 60, data.length * 55)}
          height={220}
          yAxisInterval={1}
          withShadow={false}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLines={false}
          chartConfig={{
            backgroundColor: isDark ? "#334155" : "#ffffff",
            backgroundGradientFrom: isDark ? "#334155" : "#ffffff",
            backgroundGradientTo: isDark ? "#334155" : "#ffffff",

            decimalPlaces: 0,

            color: (opacity = 1) =>
              isDark
                ? `rgba(96, 165, 250, ${opacity})`
                : `rgba(59, 130, 246, ${opacity})`,

            labelColor: (opacity = 1) =>
              isDark
                ? `rgba(255,255,255,${opacity})`
                : `rgba(0,0,0,${opacity})`,

            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: isDark ? "#60a5fa" : "#3b82f6",
            },

            propsForBackgroundLines: {
              strokeDasharray: "",
              stroke: isDark ? "#475569" : "#e5e7eb",
            },
          }}
          style={{
            borderRadius: 20,
          }}
          bezier
        />
      </ScrollView>
    </View>
  );
}
