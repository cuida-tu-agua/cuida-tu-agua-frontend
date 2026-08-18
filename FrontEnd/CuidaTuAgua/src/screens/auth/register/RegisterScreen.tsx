import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageStyle,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResponsive } from "@hooks/useResponsive";
import { useTheme } from "@theme/index";
import { createStyles } from "../register/RegisterScreen.styles";
import { useTranslation } from "react-i18next";

import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "@components/auth/InputField";
import PhoneInputField from "@components/auth/PhoneInputField";
import CountrySelectField from "@components/auth/CountrySelectField";
import StratumSelectField from "@components/auth/StratumSelectField";
import CheckboxField from "@components/auth/CheckboxField";
import PrimaryButton from "@components/auth/PrimaryButton";
import TermsModal from "@components/auth/TermsModal";
import FeedbackModal from "@components/common/FeedbackModal";
import BackArrowButton from "@components/common/BackArrowButton";

type Props = {
  goToLogin: () => void;
};

type FeedbackType = "info" | "error" | "success";

export default function RegisterScreen({ goToLogin }: Props) {
  const { isWeb, isMobile } = useResponsive();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation("register");
  const STORAGE_KEY_USERS = "cuidatuagua-users";
  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [homeName, setHomeName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("Colombia");
  const [countryCode, setCountryCode] = useState("+57");
  const [phone, setPhone] = useState("");
  const [stratum, setStratum] = useState("");

  const getStratumOptions = (selectedCountry: string) => {
    if (selectedCountry === "Ecuador") {
      return ["A", "B", "C+", "C-", "D"];
    }

    return ["1", "2", "3", "4", "5", "6"];
  };
  const [inhabitants, setInhabitants] = useState("");

  const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);
  const isValidDocument = (value: string) => /^[0-9]{8,}$/.test(value);
  const isValidPhone = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  };
  const isValidPassword = (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(value);
  const isPositiveInteger = (value: string) => /^[1-9][0-9]*$/.test(value);

  const [termsVisible, setTermsVisible] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("info");

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

    if (feedbackType === "success") {
      goToLogin();
    }
  };

  const getInlineError = (
    value: string,
    emptyMessage: string,
    invalidMessage: string,
    validator?: (val: string) => boolean,
  ) => {
    const trimmedValue = value.trim();

    if (!submitAttempted && !trimmedValue) {
      return "";
    }

    if (!trimmedValue) {
      return emptyMessage;
    }

    if (validator && !validator(trimmedValue)) {
      return invalidMessage;
    }

    return "";
  };

  const handleRegister = async () => {
    setSubmitAttempted(true);
    if (!fullName.trim())
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyFullName"),
        "error",
      );
    if (!document.trim() || !isValidDocument(document.trim()))
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.invalidDocument"),
        "error",
      );
    if (!email.trim() || !isValidEmail(email.trim()))
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.invalidEmail"),
        "error",
      );
    if (!password.trim())
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyPassword"),
        "error",
      );
    if (!isValidPassword(password.trim()))
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.passwordFormat"),
        "error",
      );
    if (!confirmPassword.trim())
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyConfirmPassword"),
        "error",
      );
    if (password.trim() !== confirmPassword.trim())
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.passwordMismatch"),
        "error",
      );
    if (!homeName.trim())
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyHomeName"),
        "error",
      );
    if (!address.trim())
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.emptyAddress"),
        "error",
      );
    if (!phone.trim() || !isValidPhone(phone.trim()))
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.invalidPhone"),
        "error",
      );
    if (!stratum.trim() || !isPositiveInteger(stratum.trim()))
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.invalidNumber"),
        "error",
      );
    if (!inhabitants.trim() || !isPositiveInteger(inhabitants.trim()))
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.invalidNumber"),
        "error",
      );
    if (!acceptedTerms)
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.termsNotAccepted"),
        "error",
      );

    const userData = {
      fullName: fullName.trim(),
      document: document.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      homeName: homeName.trim(),
      address: address.trim(),
      country: country.trim(),
      countryCode: countryCode.trim(),
      phone: phone.trim(),
      stratum: stratum.trim(),
      inhabitants: inhabitants.trim(),
    };

    try {
      let raw = await AsyncStorage.getItem(STORAGE_KEY_USERS);
      let users = raw ? (JSON.parse(raw) as any[]) : [];

      // Lightweight migration from single-user key if present
      if (!users.length) {
        const old = await AsyncStorage.getItem("cuidatuagua-user");
        if (old) {
          try {
            const oldUser = JSON.parse(old);
            users = [oldUser];
            await AsyncStorage.setItem(
              STORAGE_KEY_USERS,
              JSON.stringify(users),
            );
            await AsyncStorage.removeItem("cuidatuagua-user");
          } catch (e) {
            // ignore malformed old data
          }
        }
      }

      // Check duplicates
      const normalizedEmail = userData.email.toLowerCase();
      const normalizedAddress = userData.address.toLowerCase();
      const normalizedPhone = (userData.countryCode + userData.phone).replace(
        /\s+/g,
        "",
      );

      if (users.some((u) => u.document === userData.document)) {
        return showFeedback(
          t("feedback.errorTitle"),
          t("feedback.duplicateDocument"),
          "error",
        );
      }

      if (
        users.some((u) => (u.email || "").toLowerCase() === normalizedEmail)
      ) {
        return showFeedback(
          t("feedback.errorTitle"),
          t("feedback.duplicateEmail"),
          "error",
        );
      }

      if (
        users.some((u) => (u.address || "").toLowerCase() === normalizedAddress)
      ) {
        return showFeedback(
          t("feedback.errorTitle"),
          t("feedback.duplicateAddress"),
          "error",
        );
      }

      if (
        users.some(
          (u) =>
            ((u.countryCode || "") + (u.phone || "")).replace(/\s+/g, "") ===
            normalizedPhone,
        )
      ) {
        return showFeedback(
          t("feedback.errorTitle"),
          t("feedback.duplicatePhone"),
          "error",
        );
      }

      users.push(userData);
      await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (error) {
      return showFeedback(
        t("feedback.errorTitle"),
        t("feedback.saveError"),
        "error",
      );
    }

    showFeedback(t("success.title"), t("success.message"), "success");
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[styles.safeArea, isMobile && styles.safeAreaMobile]}
    >
      <View style={[styles.header, isWeb && styles.headerWeb]}>
        <BackArrowButton onPress={goToLogin} style={styles.backButton} />
        <Text style={styles.title}>{t("title")}</Text>
      </View>
      
        <View style={styles.wrapper}>
          <View style={[styles.page, isWeb && styles.pageWeb]}>
            <View
              style={[
                styles.container,
                isWeb && styles.containerWeb,
                isMobile && styles.containerMobile,
                isWeb && styles.card,
                isMobile && styles.cardMobile,
              ]}
            >
              {isWeb ? (
                <ScrollView
                  style={styles.cardScrollWrapper}
                  contentContainerStyle={styles.cardScrollContent}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                >
                  <Text style={[styles.section, isWeb && styles.sectionWeb]}>
                    {t("section1.title")}
                  </Text>
                  <InputField
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder={t("section1.input1") ?? ""}
                    label={t("section1.input1") ?? ""}
                    errorMessage={getInlineError(
                      fullName,
                      t("feedback.emptyFullName"),
                      t("feedback.emptyFullName"),
                    )}
                  />
                  <InputField
                    value={document}
                    onChangeText={setDocument}
                    placeholder={t("section1.input2") ?? ""}
                    label={t("section1.input2") ?? ""}
                    errorMessage={getInlineError(
                      document,
                      t("feedback.invalidDocument"),
                      t("feedback.invalidDocument"),
                      isValidDocument,
                    )}
                  />
                  <InputField
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t("section1.input3") ?? ""}
                    label={t("section1.input3") ?? ""}
                    errorMessage={getInlineError(
                      email,
                      t("feedback.invalidEmail"),
                      t("feedback.invalidEmail"),
                      isValidEmail,
                    )}
                  />

                  <CountrySelectField
                    label={t("section2.input6") ?? ""}
                    value={country}
                    onCountryChange={(selectedCountry, selectedCode) => {
                      setCountry(selectedCountry);
                      setCountryCode(selectedCode);
                    }}
                  /> 

                  <InputField
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t("section1.input4") ?? ""}
                    label={t("section1.input4") ?? ""}
                    secureTextEntry
                    errorMessage={getInlineError(
                      password,
                      t("feedback.emptyPassword"),
                      t("feedback.passwordFormat"),
                      isValidPassword,
                    )}
                  />
                  <InputField
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder={t("section1.input5") ?? ""}
                    label={t("section1.input5") ?? ""}
                    secureTextEntry
                    errorMessage={getInlineError(
                      confirmPassword,
                      t("feedback.emptyConfirmPassword"),
                      t("feedback.passwordMismatch"),
                      (value) => value === password,
                    )}
                  />
                </ScrollView>
              ) : (
                <>
                  <Text style={[styles.section, isWeb && styles.sectionWeb]}>
                    {t("section1.title")}
                  </Text>
                  <InputField
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder={t("section1.input1") ?? ""}
                    label={t("section1.input1") ?? ""}
                    errorMessage={getInlineError(
                      fullName,
                      t("feedback.emptyFullName"),
                      t("feedback.emptyFullName"),
                    )}
                  />
                  <InputField
                    value={document}
                    onChangeText={setDocument}
                    placeholder={t("section1.input2") ?? ""}
                    label={t("section1.input2") ?? ""}
                    errorMessage={getInlineError(
                      document,
                      t("feedback.invalidDocument"),
                      t("feedback.invalidDocument"),
                      isValidDocument,
                    )}
                  />
                  <InputField
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t("section1.input3") ?? ""}
                    label={t("section1.input3") ?? ""}
                    errorMessage={getInlineError(
                      email,
                      t("feedback.invalidEmail"),
                      t("feedback.invalidEmail"),
                      isValidEmail,
                    )}
                  />

                  <CountrySelectField
                    label={t("section2.input6") ?? ""}
                    value={country}
                    onCountryChange={(selectedCountry, selectedCode) => {
                      setCountry(selectedCountry);
                      setCountryCode(selectedCode);
                    }}
                  />

                  <InputField
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t("section1.input4") ?? ""}
                    label={t("section1.input4") ?? ""}
                    secureTextEntry
                    errorMessage={getInlineError(
                      password,
                      t("feedback.emptyPassword"),
                      t("feedback.passwordFormat"),
                      isValidPassword,
                    )}
                  />
                  <InputField
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder={t("section1.input5") ?? ""}
                    label={t("section1.input5") ?? ""}
                    secureTextEntry
                    errorMessage={getInlineError(
                      confirmPassword,
                      t("feedback.emptyConfirmPassword"),
                      t("feedback.passwordMismatch"),
                      (value) => value === password,
                    )}
                  />
                </>
              )}
            </View>
            <View
              style={[
                styles.container,
                isWeb && styles.containerWeb,
                isMobile && styles.containerMobile,
                isWeb && styles.card,
                isMobile && styles.cardMobile,
              ]}
            >
              {isWeb ? (
                <ScrollView
                  style={styles.cardScrollWrapper}
                  contentContainerStyle={styles.cardScrollContent}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                >
                  <Text style={[styles.section, isWeb && styles.sectionWeb]}>
                    {t("section2.title")}
                  </Text>
                  <InputField
                    value={homeName}
                    onChangeText={setHomeName}
                    placeholder={t("section2.input1") ?? ""}
                    label={t("section2.input1") ?? ""}
                    errorMessage={getInlineError(
                      homeName,
                      t("feedback.emptyHomeName"),
                      t("feedback.emptyHomeName"),
                    )}
                  />
                  <InputField
                    value={address}
                    onChangeText={setAddress}
                    placeholder={t("section2.input2") ?? ""}
                    label={t("section2.input2") ?? ""}
                    errorMessage={getInlineError(
                      address,
                      t("feedback.emptyAddress"),
                      t("feedback.emptyAddress"),
                    )}
                  />
                  <PhoneInputField
                    label={t("section2.input3") ?? ""}
                    countryCode={countryCode}
                    onCountryCodeChange={setCountryCode}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder={t("section2.input3") ?? ""}
                    errorMessage={
                      phone.length > 0 && !isValidPhone(phone)
                        ? t("feedback.invalidPhone")
                        : ""
                    }
                  />
                  <StratumSelectField
                    label={t("section2.input4") ?? ""}
                    value={stratum}
                    onChange={setStratum}
                    options={getStratumOptions(country)}
                    errorMessage={getInlineError(
                      stratum,
                      t("feedback.invalidNumber"),
                      t("feedback.invalidNumber"),
                      (value) => {
                        if (country === "Ecuador") {
                          return ["A", "B", "C+", "C-", "D"].includes(value);
                        }

                        return (
                          isPositiveInteger(value) &&
                          Number(value) >= 1 &&
                          Number(value) <= 6
                        );
                      },
                    )}
                  />
                  <InputField
                    value={inhabitants}
                    onChangeText={setInhabitants}
                    placeholder={t("section2.input5") ?? ""}
                    label={t("section2.input5") ?? ""}
                    errorMessage={getInlineError(
                      inhabitants,
                      t("feedback.invalidNumber"),
                      t("feedback.invalidNumber"),
                      isPositiveInteger,
                    )}
                  />

                  <View style={styles.cardBottom}>
                    <CheckboxField
                      checked={acceptedTerms}
                      onPress={() => setAcceptedTerms(!acceptedTerms)}
                      label={t("section2.checkbox")}
                      onLabelPress={() => setTermsVisible(true)}
                    />
                  </View>
                  <TermsModal
                    visible={termsVisible}
                    onClose={() => setTermsVisible(false)}
                  />
                </ScrollView>
              ) : (
                <>
                  <Text style={[styles.section, isWeb && styles.sectionWeb]}>
                    {t("section2.title")}
                  </Text>
                  <InputField
                    value={homeName}
                    onChangeText={setHomeName}
                    placeholder={t("section2.input1") ?? ""}
                    label={t("section2.input1") ?? ""}
                    errorMessage={getInlineError(
                      homeName,
                      t("feedback.emptyHomeName"),
                      t("feedback.emptyHomeName"),
                    )}
                  />
                  <InputField
                    value={address}
                    onChangeText={setAddress}
                    placeholder={t("section2.input2") ?? ""}
                    label={t("section2.input2") ?? ""}
                    errorMessage={getInlineError(
                      address,
                      t("feedback.emptyAddress"),
                      t("feedback.emptyAddress"),
                    )}
                  />
                  <PhoneInputField
                    label={t("section2.input3") ?? ""}
                    countryCode={countryCode}
                    onCountryCodeChange={setCountryCode}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder={t("section2.input3") ?? ""}
                    errorMessage={
                      phone.length > 0 && !isValidPhone(phone)
                        ? t("feedback.invalidPhone")
                        : ""
                    }
                  />
                  <StratumSelectField
                    label={t("section2.input4") ?? ""}
                    value={stratum}
                    onChange={setStratum}
                    options={getStratumOptions(country)}
                    errorMessage={getInlineError(
                      stratum,
                      t("feedback.invalidNumber"),
                      t("feedback.invalidNumber"),
                      (value) => {
                        if (country === "Ecuador") {
                          return ["A", "B", "C+", "C-", "D"].includes(value);
                        }

                        return (
                          isPositiveInteger(value) &&
                          Number(value) >= 1 &&
                          Number(value) <= 6
                        );
                      },
                    )}
                  />
                  <InputField
                    value={inhabitants}
                    onChangeText={setInhabitants}
                    placeholder={t("section2.input5") ?? ""}
                    label={t("section2.input5") ?? ""}
                    errorMessage={getInlineError(
                      inhabitants,
                      t("feedback.invalidNumber"),
                      t("feedback.invalidNumber"),
                      isPositiveInteger,
                    )}
                  />

                  <View style={styles.cardBottom}>
                    <CheckboxField
                      checked={acceptedTerms}
                      onPress={() => setAcceptedTerms(!acceptedTerms)}
                      label={t("section2.checkbox")}
                      onLabelPress={() => setTermsVisible(true)}
                    />
                  </View>
                  <TermsModal
                    visible={termsVisible}
                    onClose={() => setTermsVisible(false)}
                  />
                </>
              )}
            </View>
            <FeedbackModal
              visible={feedbackVisible}
              title={feedbackTitle}
              message={feedbackMessage}
              type={feedbackType}
              onClose={closeFeedback}
            />
            <View
              style={[
                styles.footer,
                { paddingBottom: insets.bottom + 16 },
                isWeb && styles.footerWeb,
              ]}
            >
              <PrimaryButton
                title={t("action.register") ?? "Register"}
                onPress={handleRegister}
              />
            </View>
          </View>
        </View>
    </SafeAreaView>
  );
}
