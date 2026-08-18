import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createStyles } from "./HomeScreen.styles";
import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";
import { useResponsive } from "@hooks/useResponsive";

import FeedbackModal from "@components/common/FeedbackModal";

type Props = {
  onOpenStats?: (homeId?: string) => void;
};

export default function HomeScreen({ onOpenStats }: Props) {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const { t } = useTranslation("dashboard");
  const styles = createStyles(colors);

  const { isMobile } = useResponsive();

  const NUM_COLUMNS = isMobile ? 1 : 3;

  const [modalVisible, setModalVisible] = useState(false);

  const data = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        id: String(i),
        nameHome: `${t("home.home")} ${i + 1}`,
        descriptionHome: `${120 + i * 10} ${t("home.liters")}`,
      })),
    [t]
  );

  const enhancedData = useMemo(() => {
    return [
      ...data,
      {
        id: "add",
        isAddButton: true,
      },
    ];
  }, [data]);

  const handleAddHome = () => {
    // simulación de creación
    setModalVisible(true);
  };

  const renderItem = ({ item, index }: any) => {
    const isAdd = item.isAddButton;

    if (isAdd) {
      return (
        <TouchableOpacity style={styles.card} onPress={handleAddHome}>
          <Text style={styles.addIcon}>+</Text>
          <Text style={styles.cardTitle}>{t("home.addHome")}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => {
          if (onOpenStats) {
            onOpenStats(item.id);
          } else {
            navigation.navigate("stats");
          }
        }}
      >
        <Text style={styles.cardTitle}>{item.nameHome}</Text>
        <Text style={styles.cardValue}>{item.descriptionHome}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.descriptionLogo}>
        {t("main.welcome")}
      </Text>

      <View style={styles.bodyContent}>
        <FlatList
          data={enhancedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={NUM_COLUMNS}
          key={NUM_COLUMNS}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <FeedbackModal
        visible={modalVisible}
        title={t("home.successTitle")}
        message={t("home.successMessage")}
        type="success"
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}