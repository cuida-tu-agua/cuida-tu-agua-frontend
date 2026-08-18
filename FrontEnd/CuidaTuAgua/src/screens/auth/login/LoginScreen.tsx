import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ImageSourcePropType,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { createStyles } from "./LoginScreen.styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";

import InputField from "@components/auth/InputField";
import AuthLink from "@components/auth/AuthLink";
import PrimaryButton from "@components/auth/PrimaryButton";
import TermsModal from "@components/auth/TermsModal";
import ForgotPasswordModal from "@components/auth/ForgotPasswordModal";
import FeedbackModal from "@components/common/FeedbackModal";
import BackArrowButton from "@components/common/BackArrowButton";
import Logo from "@components/common/Logo";
import { useResponsive } from "@hooks/useResponsive";

type Props = {
  goToRegister: () => void;
  onLoginSuccess: () => void;
  goBack: () => void;
};

type FeedbackType = "info" | "error" | "success";

type CarouselItem = {
  image: ImageSourcePropType;
  title: string;
  description: string;
};

export default function LoginScreen({
  goToRegister,
  onLoginSuccess,
  goBack,
}: Props) {
  const { isWeb, isMobile, width } = useResponsive();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { t } = useTranslation("login");
  const STORAGE_KEY_USERS = "cuidatuagua-users";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [termsVisible, setTermsVisible] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("info");

  const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);
  const isValidDocument = (value: string) => /^[0-9]{8,}$/.test(value);

  const [activeSlide, setActiveSlide] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const carouselItems: CarouselItem[] = [
    {
      image: require("@assets/images/Imagen1.jpg"),
      title: t("carousel.0.title"),
      description: t("carousel.0.description"),
    },
    {
      image: require("@assets/images/Imagen2.jpg"),
      title: t("carousel.1.title"),
      description: t("carousel.1.description"),
    },
    {
      image: require("@assets/images/Imagen3.jpg"),
      title: t("carousel.2.title"),
      description: t("carousel.2.description"),
    },
  ];

  const carouselWidth = Math.min(420, width * 0.25);

  const animateSlide = (newIndex: number) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: newIndex > activeSlide ? -50 : 50,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveSlide(newIndex);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const goToNextSlide = () => {
    const nextIndex = (activeSlide + 1) % carouselItems.length;
    animateSlide(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex =
      activeSlide === 0 ? carouselItems.length - 1 : activeSlide - 1;
    animateSlide(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [activeSlide]);

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

  const handleLogin = async () => {
    const trimmedIdentifier = identifier.trim();
    const trimmedPassword = password.trim();

    if (!trimmedIdentifier) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyIdentifier"),
        "error",
      );
    }

    if (!trimmedPassword) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyPassword"),
        "error",
      );
    }

    const identifierIsEmail = trimmedIdentifier.includes("@");

    if (identifierIsEmail) {
      if (!isValidEmail(trimmedIdentifier)) {
        return showFeedback(
          t("feedback.errorTitle"),
          t("feedback.invalidIdentifier"),
          "error",
        );
      }
    } else {
      if (!isValidDocument(trimmedIdentifier)) {
        return showFeedback(
          t("feedback.errorTitle"),
          t("feedback.invalidIdentifier"),
          "error",
        );
      }
    }

    setLoading(true);

    try {
      let raw = await AsyncStorage.getItem(STORAGE_KEY_USERS);
      let users = raw ? (JSON.parse(raw) as any[]) : [];

      // Lightweight migration from old single-user key if present
      if (!users.length) {
        const old = await AsyncStorage.getItem("cuidatuagua-user");
        if (old) {
          try {
            const oldUser = JSON.parse(old);
            users = [oldUser];
            await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
            await AsyncStorage.removeItem("cuidatuagua-user");
          } catch (e) {
            // ignore malformed old data
          }
        }
      }

      if (!users.length) {
        return showFeedback(
          t("feedback.errorTitle"),
          t("feedback.noAccount"),
          "error",
        );
      }

      const user = users.find(u =>
        trimmedIdentifier.toLowerCase() === (u.email || "").toLowerCase() ||
        trimmedIdentifier === u.document
      );

      if (!user || trimmedPassword !== user.password) {
        return showFeedback(
          t("feedback.errorTitle"),
          t("feedback.errorMessage"),
          "error",
        );
      }

      onLoginSuccess();
    } catch (error) {
      showFeedback(
        t("feedback.errorTitle"),
        t("feedback.errorMessage"),
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, isMobile && styles.safeAreaMobile]} edges={["top", "bottom"]}>
        {isWeb && (
          <View style={[styles.header, isWeb && styles.headerWeb]}>
            <BackArrowButton onPress={goBack} style={styles.backButton} />
            <Text style={styles.title}>{t("title")}</Text>
          </View>
        )}

      <View style={[styles.container, isWeb && styles.webContainer]}>
        {/* FORM */}
        <View
          style={[
            styles.formSection,
            isWeb && styles.webForm,
            isMobile && styles.mobileForm,
          ]}
        >
          <View>
            <View style={styles.logoContainer}>
              <Logo width={150} height={150} />
              <Text style={styles.logoTitle}>CuidaTuAgua</Text>
            </View>

            <View style={isMobile && styles.mobileFormFields}>
              <InputField
                value={identifier}
                onChangeText={setIdentifier}
                placeholder={t("form.mail") || ""}
                label={t("form.mail") || ""}
              />

              <InputField
                value={password}
                onChangeText={setPassword}
                placeholder={t("form.password") || ""}
                secureTextEntry
                label={t("form.password") || ""}
              />

              <View style={[isWeb && styles.webAuthLink]}>
                <AuthLink
                  text={t("form.forgot")}
                  onPress={() => setForgotPasswordVisible(true)}
                />

                <AuthLink text={t("form.register")} onPress={goToRegister} />
              </View>
            </View>
          </View>

          <View >
            <PrimaryButton
            title={t("form.access")}
            onPress={handleLogin}
            loading={loading}
          />
          </View>
        </View>
        {/* CAROUSEL WEB */}
        {isWeb && (
          <View style={styles.rightPanel}>
            <View style={styles.carouselRow}>
              <TouchableOpacity
                style={styles.leftArrow}
                onPress={goToPrevSlide}
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>

              <View style={[styles.carouselItem, { width: carouselWidth }]}>
                <Animated.Image
                  source={carouselItems[activeSlide].image}
                  style={[
                    styles.carouselImage,
                    {
                      transform: [{ translateX: slideAnim }],
                      opacity: fadeAnim,
                    },
                  ]}
                />

                <Animated.Text
                  style={[styles.carouselTitle, { opacity: fadeAnim }]}
                >
                  {carouselItems[activeSlide].title}
                </Animated.Text>

                <Animated.Text
                  style={[styles.carouselDescription, { opacity: fadeAnim }]}
                >
                  {carouselItems[activeSlide].description}
                </Animated.Text>
              </View>

              <TouchableOpacity
                style={styles.rightArrow}
                onPress={goToNextSlide}
              >
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <TermsModal
        visible={termsVisible}
        onClose={() => setTermsVisible(false)}
      />

      <ForgotPasswordModal
        visible={forgotPasswordVisible}
        onClose={() => setForgotPasswordVisible(false)}
      />

      <FeedbackModal
        visible={feedbackVisible}
        title={feedbackTitle}
        message={feedbackMessage}
        type={feedbackType}
        onClose={closeFeedback}
      />
    </SafeAreaView>
  );
}
