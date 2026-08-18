import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, spacing, typography } from "@theme/index";
import { useTranslation } from "react-i18next";
import { useResponsive } from "@hooks/useResponsive";

import InputField from "@components/auth/InputField";
import PrimaryButton from "@components/auth/PrimaryButton";
import FeedbackModal from "@components/common/FeedbackModal";

type Props = {
  visible: boolean;
  onClose: () => void;
};

type FeedbackType = "info" | "error" | "success";
type Step = "identifier" | "code" | "newPassword";

const STORAGE_KEY_USERS = "cuidatuagua-users";

export default function ForgotPasswordModal({ visible, onClose }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation("login");
  const { isWeb } = useResponsive();

  const [step, setStep] = useState<Step>("identifier");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("info");

  const [foundUser, setFoundUser] = useState<any>(null);

  const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);
  const isValidDocument = (value: string) => /^[0-9]{8,}$/.test(value);
  const isValidPassword = (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(value);

  const showFeedback = (
    title: string,
    message: string,
    type: FeedbackType = "info",
  ) => {
    setFeedbackTitle(title);
    setFeedbackMessage(message);
    setFeedbackType(type);
    setFeedbackVisible(true);
  };

  const closeFeedback = () => {
    setFeedbackVisible(false);
  };

  const resetModal = () => {
    setStep("identifier");
    setIdentifier("");
    setCode("");
    setNewPassword("");
    setConfirmPassword("");
    setFoundUser(null);
    onClose();
  };

  const handleStep1 = async () => {
    const trimmed = identifier.trim();

    if (!trimmed) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyIdentifier"),
        "error",
      );
    }

    const isEmail = trimmed.includes("@");
    if (isEmail && !isValidEmail(trimmed)) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.invalidIdentifier"),
        "error",
      );
    }

    if (!isEmail && !isValidDocument(trimmed)) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.invalidIdentifier"),
        "error",
      );
    }

    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY_USERS);
      const users = raw ? (JSON.parse(raw) as any[]) : [];

      const user = users.find(u =>
        trimmed.toLowerCase() === (u.email || "").toLowerCase() ||
        trimmed === u.document
      );

      if (!user) {
        return showFeedback(
          t("feedback.errorTitle"),
          "forgotPassword.userNotFound" in t
            ? t("forgotPassword.userNotFound")
            : "Usuario no encontrado",
          "error",
        );
      }

      setFoundUser(user);
      setStep("code");
      showFeedback(
        "forgotPassword.codeSent" in t ? t("forgotPassword.codeSent") : "Código enviado",
        "forgotPassword.codeMessage" in t
          ? t("forgotPassword.codeMessage")
          : "Se ha enviado un código a tu correo electrónico. Ingresa los 6 dígitos.",
        "info",
      );
    } catch (error) {
      showFeedback(t("feedback.errorTitle"), t("feedback.errorMessage"), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = () => {
    if (!code || code.length !== 6) {
      return showFeedback(
        t("feedback.errorTitle"),
        "forgotPassword.invalidCode" in t
          ? t("forgotPassword.invalidCode")
          : "El código debe tener 6 dígitos",
        "error",
      );
    }

    setStep("newPassword");
    showFeedback(
      "forgotPassword.codeValid" in t ? t("forgotPassword.codeValid") : "Código válido",
      "forgotPassword.changePassword" in t
        ? t("forgotPassword.changePassword")
        : "Ahora crea tu nueva contraseña",
      "info",
    );
  };

  const handleStep3 = async () => {
    if (!newPassword.trim()) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyPassword"),
        "error",
      );
    }

    if (!isValidPassword(newPassword.trim())) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.passwordFormat"),
        "error",
      );
    }

    if (newPassword !== confirmPassword) {
      return showFeedback(
        t("feedback.errorTitle"),
        "forgotPassword.passwordMismatch" in t
          ? t("forgotPassword.passwordMismatch")
          : "Las contraseñas no coinciden",
        "error",
      );
    }

    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY_USERS);
      const users = raw ? (JSON.parse(raw) as any[]) : [];

      const index = users.findIndex(
        u => u.document === foundUser.document && u.email === foundUser.email
      );

      if (index !== -1) {
        users[index].password = newPassword.trim();
        await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      }

      showFeedback(
        "forgotPassword.passwordChanged" in t
          ? t("forgotPassword.passwordChanged")
          : "Contraseña actualizada",
        "forgotPassword.passwordSuccess" in t
          ? t("forgotPassword.passwordSuccess")
          : "Tu contraseña ha sido actualizada correctamente",
        "success",
      );

      setTimeout(() => {
        setFeedbackVisible(false);
        resetModal();
      }, 2000);
    } catch (error) {
      showFeedback(t("feedback.errorTitle"), t("feedback.errorMessage"), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === "identifier") handleStep1();
    else if (step === "code") handleStep2();
    else if (step === "newPassword") handleStep3();
  };

  const handleGoBack = () => {
    if (step === "identifier") {
      resetModal();
    } else if (step === "code") {
      setStep("identifier");
    } else {
      setStep("code");
    }
  };

  const getTitle = () => {
    if (step === "identifier") {
      return "forgotPassword.title" in t
        ? t("forgotPassword.title")
        : "Recuperar contraseña";
    } else if (step === "code") {
      return "forgotPassword.codeTitle" in t
        ? t("forgotPassword.codeTitle")
        : "Verificar código";
    } else {
      return "forgotPassword.newPasswordTitle" in t
        ? t("forgotPassword.newPasswordTitle")
        : "Nueva contraseña";
    }
  };

  const currentStep = step === "identifier" ? 0 : step === "code" ? 1 : 2;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={resetModal}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.45)' }]}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.surface },
            isWeb && styles.modalContainerWeb,
          ]}
        >
          {/* HEADER WITH STEPS */}
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: colors.textSecondary }]}>
              {getTitle()}
            </Text>
            
            {/* STEP INDICATORS */}
            <View style={styles.stepsIndicator}>
              {[0, 1, 2].map((index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <View key={index} style={styles.stepIndicatorItem}>
                    <View
                      style={[
                        styles.stepIndicatorDot,
                        isActive && [styles.stepIndicatorDotActive, { backgroundColor: colors.primary }],
                        isCompleted && [styles.stepIndicatorDotCompleted, { backgroundColor: colors.success }],
                      ]}
                    >
                      <Text style={[styles.stepIndicatorText, { color: colors.surface }]}>
                        {isCompleted ? "✓" : index + 1}
                      </Text>
                    </View>
                    <Text style={[styles.stepIndicatorLabel, { color: colors.textPrimary }]}>
                      {index === 0
                        ? t("forgotPassword.stepIndicator.identity")
                        : index === 1
                          ? t("forgotPassword.stepIndicator.code")
                          : t("forgotPassword.stepIndicator.password")}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* CONTENT */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* STEP 1: IDENTIFIER */}
            {step === "identifier" && (
              <>
                <Text style={[styles.section, { color: colors.textPrimary }]}>
                  {"forgotPassword.step1Title" in t
                    ? t("forgotPassword.step1Title")
                    : "Ingresa tu correo o documento"}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                  {"forgotPassword.codeMessage" in t
                    ? t("forgotPassword.codeMessage")
                    : "Te enviaremos un código de 6 dígitos para verificar tu identidad"}
                </Text>
                <View style={styles.inputContainer}>
                  <InputField
                    value={identifier}
                    onChangeText={setIdentifier}
                    placeholder={
                      t("form.mail") || "correo@ejemplo.com o 12345678"
                    }
                    label={t("form.mail") || ""}
                  />
                </View>
              </>
            )}

            {/* STEP 2: CODE */}
            {step === "code" && (
              <>
                <Text style={[styles.section, { color: colors.textPrimary }]}>
                  {"forgotPassword.step2Title" in t
                    ? t("forgotPassword.step2Title")
                    : "Verifica tu código"}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}> 
                  {t("forgotPassword.step2Subtitle")}
                </Text>
                <View style={[styles.infoBox, { backgroundColor: colors.secondary + '15' }]}>
                  <Text style={[styles.infoBoxText, { color: colors.textPrimary }]}>
                    {t("forgotPassword.step2Info")}
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <InputField
                    value={code}
                    onChangeText={(v) => setCode(v.replace(/[^0-9]/g, "").slice(0, 6))}
                    placeholder={t("forgotPassword.codePlaceholder") || "000000"}
                    keyboardType="numeric"
                    maxLength={6}
                    label={"forgotPassword.codeLabel" in t
                      ? t("forgotPassword.codeLabel")
                      : "Código de verificación"}
                  />
                </View>
              </>
            )}

            {/* STEP 3: NEW PASSWORD */}
            {step === "newPassword" && (
              <>
                <Text style={[styles.section, { color: colors.textPrimary }]}>
                  {"forgotPassword.step3Title" in t
                    ? t("forgotPassword.step3Title")
                    : "Crea tu nueva contraseña"}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                  {t("forgotPassword.step3Description")}
                </Text>
                <View style={styles.inputContainer}>
                  <InputField
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder={t("form.password") || "Nueva contraseña"}
                    secureTextEntry
                    label={t("form.password") || "Nueva contraseña"}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <InputField
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder={
                      "forgotPassword.confirmPassword" in t
                        ? t("forgotPassword.confirmPassword")
                        : "Confirmar contraseña"
                    }
                    secureTextEntry
                    label={t("forgotPassword.confirmPassword") || "Confirmar contraseña"}
                  />
                </View>
              </>
            )}
          </ScrollView>

          {/* FOOTER BUTTONS */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.backButtonFooter, { borderColor: colors.border }]}
              onPress={handleGoBack}
            >
              <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>
                {step === "identifier" ? t("forgotPassword.closeButton") : t("forgotPassword.backButton")}
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <PrimaryButton
                title={
                  step === "newPassword"
                    ? "forgotPassword.updateButton" in t
                      ? t("forgotPassword.updateButton")
                      : "Actualizar contraseña"
                    : "forgotPassword.nextButton" in t
                      ? t("forgotPassword.nextButton")
                      : "Siguiente"
                }
                onPress={handleNext}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </View>

      <FeedbackModal
        visible={feedbackVisible}
        title={feedbackTitle}
        message={feedbackMessage}
        type={feedbackType}
        onClose={closeFeedback}
      />
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.xxl,
  },
  modalContainer: {
    width: '100%' as const,
    maxHeight: '80%' as const,
    borderRadius: 14,
    maxWidth: 500,
    padding: spacing.lg,
    overflow: 'hidden' as const,
  },
  modalContainerWeb: {
    maxWidth: 700,
  },
  headerContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.subtitle,
    marginBottom: spacing.md,
    textAlign: 'center' as const,
  },
  stepsIndicator: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
    marginTop: spacing.md,
  },
  stepIndicatorItem: {
    alignItems: 'center' as const,
  },
  stepIndicatorDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.xs,
  },
  stepIndicatorDotActive: {
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  stepIndicatorDotCompleted: {
    borderWidth: 0,
  },
  stepIndicatorText: {
    fontWeight: '600' as const,
    fontSize: 14,
  },
  stepIndicatorLabel: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.lg,
    maxHeight: 300,
  },
  section: {
    ...typography.body,
    fontWeight: '600' as const,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  infoBox: {
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  infoBoxText: {
    ...typography.body,
  },
  footer: {
    flexDirection: 'row' as const,
    gap: spacing.md,
    alignItems: 'center' as const,
  },
  backButtonFooter: {
    borderWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  backButtonText: {
    ...typography.body,
    fontWeight: '600' as const,
  },
};
