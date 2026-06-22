import { View } from "react-native";

export const ActivitySkeleton = () => (
  <View className="mx-4 mb-4 bg-white dark:bg-slate-600 p-5 rounded-[32px] border border-[#e8e2d9] dark:border-gray-300 shadow-sm">
    <View className="flex-row items-start">
      {/* 1. Placeholder untuk Avatar (Bentuk Bulat) */}
      <View className="w-14 h-14 rounded-full bg-gray-200 dark:bg-slate-500 animate-pulse" />
      <View className="ml-4 flex-1">
        {/* 2. Placeholder untuk Username & Teks (Bentuk Persegi Panjang) */}
        <View className="flex-row items-center mb-2">
          <View className="w-24 h-5 bg-gray-200 dark:bg-slate-500 rounded-md animate-pulse" />
          <View className="w-32 h-4 bg-gray-100 dark:bg-slate-500 rounded-md animate-pulse ml-2" />
        </View>
        {/* 3. Placeholder untuk Kotak Komentar */}
        <View className="w-full h-16 bg-gray-100 dark:bg-slate-700 rounded-2xl animate-pulse mt-2" />
      </View>
    </View>
  </View>
);

export const AnalyticSkeleton = () => {
  return (
    <View className="mx-4 mb-5 bg-white dark:bg-slate-600 rounded-3xl p-5 shadow-sm border border-[#e8e2d9] dark:border-gray-300">
      {/* 1. Header (Ikon Bulat Kiri Atas & Judul) */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center">
          {/* Placeholder Ikon TrendingUp */}
          <View className="w-10 h-10 bg-gray-200 dark:bg-slate-500 rounded-full animate-pulse" />

          {/* Placeholder Teks "Thread Performance" & "Waktu" */}
          <View className="ml-3">
            <View className="w-32 h-4 bg-gray-200 dark:bg-slate-500 rounded-md animate-pulse mb-2" />
            <View className="w-16 h-3 bg-gray-100 dark:bg-slate-500 rounded-md animate-pulse" />
          </View>
        </View>
      </View>
      {/* 2. Content Paragraf (Kita buat 3 baris abu-abu agar mirip paragraf) */}
      <View className="mb-6">
        <View className="w-full h-4 bg-gray-200 dark:bg-slate-500 rounded-md animate-pulse mb-2" />
        <View className="w-3/4 h-4 bg-gray-100 dark:bg-slate-500 rounded-md animate-pulse mb-2" />
        <View className="w-1/2 h-4 bg-gray-100 dark:bg-slate-500 rounded-md animate-pulse" />
      </View>
      {/* 3. Garis Pembatas (Divider) */}
      <View className="h-[1px] bg-gray-200 dark:bg-slate-500 w-full mb-4 animate-pulse" />
      {/* 4. Stats Bagian Bawah (Ikon Like & Komen) */}
      <View className="flex-row items-center space-x-6 gap-2">
        {/* Placeholder Total Likes */}
        <View className="flex-row items-center">
          <View className="w-5 h-5 bg-gray-200 dark:bg-slate-500 rounded-full animate-pulse" />
          <View className="ml-2 w-8 h-4 bg-gray-200 dark:bg-slate-500 rounded-md animate-pulse" />
        </View>

        {/* Placeholder Total Replies */}
        <View className="flex-row items-center">
          <View className="w-5 h-5 bg-gray-200 dark:bg-slate-500 rounded-full animate-pulse" />
          <View className="ml-2 w-8 h-4 bg-gray-200 dark:bg-slate-500 rounded-md animate-pulse" />
        </View>
      </View>
    </View>
  );
};

export const HomeSkeleton = () => {
  return (
    <>
      <View className="flex-1 basis-0 bg-white dark:bg-slate-600 p-4 shadow-lg rounded-2xl h-32 justify-between">
        <View>
          <View className="w-full h-4 bg-gray-200 dark:bg-slate-500 rounded-md animate-pulse mb-2" />
        </View>
        <View className="w-full h-4 bg-gray-200 dark:bg-slate-500 rounded-md animate-pulse mb-2">
          <View className="w-full h-4 bg-gray-200 dark:bg-slate-500 rounded-md animate-pulse mb-2" />
          <View className="w-full h-4 bg-gray-200 dark:bg-slate-500 rounded-md animate-pulse mb-2" />
        </View>
      </View>
    </>
  );
};
