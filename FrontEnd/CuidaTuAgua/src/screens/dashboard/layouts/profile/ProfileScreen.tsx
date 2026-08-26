import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";
import { createStyles } from "./ProfileScreen.styles";
import FeedbackModal from "@components/common/FeedbackModal";


type User = {
  name: string;
  document: string;
  email: string;
  password: string;
};

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation("profile");
  const styles = createStyles(colors);

  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState<User>({
    name: "Diego Pérez",
    document: "1001234567",
    email: "diego@email.com",
    password: "123456",
  });

  const handleChange = (key: keyof User, value: string) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setModalVisible(true);
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <SafeAreaView style={styles.container}>

      {/* Header perfil */}
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* Info card */}
      <View style={styles.infoCard}>

        <Text style={styles.sectionTitle}>{t("personalInfo.title")}</Text>

        <Text style={styles.label}>{t("personalInfo.name")}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={(v) => handleChange("name", v)}
          />
        ) : (
          <Text style={styles.value}>{user.name}</Text>
        )}

        <Text style={styles.label}>{t("personalInfo.document")}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={user.document}
            onChangeText={(v) => handleChange("document", v)}
          />
        ) : (
          <Text style={styles.value}>{user.document}</Text>
        )}

        <Text style={styles.label}>{t("personalInfo.email")}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={(v) => handleChange("email", v)}
          />
        ) : (
          <Text style={styles.value}>{user.email}</Text>
        )}

        <Text style={styles.label}>{t("personalInfo.password")}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={user.password}
            secureTextEntry
            onChangeText={(v) => handleChange("password", v)}
          />
        ) : (
          <Text style={styles.value}>••••••••</Text>
        )}
      </View>

      {/* Botón inline removido; se usa botón fijo */}

      <FeedbackModal
        visible={modalVisible}
        title={t("profileUpdated")}
        message={t("changesSaved")}
        type="success"
        onClose={() => setModalVisible(false)}
      />

      {/* Fixed bottom button */}
      <View style={styles.fixedButton} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fixedButtonInner}
          onPress={() => {
            if (!isEditing) setIsEditing(true);
            else handleSave();
          }}
        >
          <Text style={styles.fixedButtonText}>{isEditing ? t("saveChanges") : t("editProfile")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}