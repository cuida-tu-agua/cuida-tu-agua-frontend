import React, { useMemo } from "react";
import { View, Text, SafeAreaView, Linking, TouchableOpacity } from "react-native";
import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";
import BackArrowButton from "@components/common/BackArrowButton";
import { createStyles } from "./InitialHome.styles";
import QRCodePlaceholder from "./QRCodePlaceholder";

type InitialHomeProps = {
  onContactUs?: () => void;
  onClose?: () => void;
  contactEmail?: string;
  contactPhone?: string;
};

export default function InitialHome({
  onContactUs,
  onClose,
  contactEmail = "info@cuidatuagua.com",
  contactPhone = "+57 1 234 5678",
}: InitialHomeProps) {
  const { colors } = useTheme();
  const { t } = useTranslation("dashboard");
  const styles = createStyles(colors);

  const qrLink = useMemo(() => {
    const rawCode =
      "CTU-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    return `https://cuidatuagua.com/conectar?codigo=${rawCode}`;
  }, []);

  const handleBackPress = () => {
    onClose?.();
  };

  const handleContactUs = () => {
    if (onContactUs) {
      onContactUs();
    } else {
      Linking.openURL(`mailto:${contactEmail}`).catch(() => {});
    }
  };

  const handleMoreInfo = () => {
    Linking.openURL("https://cuidatuagua.com/devices").catch(() => {});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BackArrowButton onPress={handleBackPress} style={styles.backButton} />

      <View style={styles.contentWrapper}>
        <View style={styles.qrContainer}>
          <QRCodePlaceholder value={qrLink} />
        </View>

        <Text style={styles.titleText}>
          {t("initialHome.title") || "Sin Dispositivo Conectado"}
        </Text>

        <Text style={styles.descriptionText}>
          {t("initialHome.description") ||
            "Para comenzar a monitorear el consumo de agua, necesitas conectar un dispositivo inteligente a tu hogar."}
        </Text>

        <Text style={styles.highlightText}>
          {t("initialHome.highlight") ||
            "Escanea este código QR con nuestro dispositivo para vincular tu hogar"}
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactUs}
            activeOpacity={0.8}
          >
            <Text style={styles.contactButtonText}>
              {t("initialHome.contactButton") || "Contáctanos para Comprar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.moreInfoButton}
            onPress={handleMoreInfo}
            activeOpacity={0.8}
          >
            <Text style={styles.moreInfoButtonText}>
              {t("initialHome.moreInfoButton") || "Más Información"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            {t("initialHome.infoBox") ||
              `Escanea el QR superior para configurar.\nContacta con nosotros para recibir asistencia.`}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}