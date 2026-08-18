import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useTheme } from "@theme/ThemeContext";
import i18n from "@i18n/index";
import { useTranslation } from "react-i18next";

const IDIOMAS = [
  {
    id: "1",
    labelKey: "language.spanish",
    flag: require("../../assets/images/colombia-flag.png"),
    code: "ES",
  },
  {
    id: "2",
    labelKey: "language.english",
    flag: require("../../assets/images/usa-flag.png"),
    code: "EN",
  },
  {
    id: "3",
    labelKey: "language.portuguese",
    flag: require("../../assets/images/brazil-flag.png"),
    code: "PT",
  },
  {
    id: "4",
    labelKey: "language.french",
    flag: require("../../assets/images/france-flag.png"),
    code: "FR",
  },
];

export default function LanguageSelector() {
  const { colors } = useTheme();
  const { t } = useTranslation('settings');

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(IDIOMAS[0]);

  useEffect(() => {
    const current = i18n.language.split("-")[0];
    const found = IDIOMAS.find((i) => i.code.toLowerCase() === current);
    if (found) setSelected(found);
  }, [i18n.language]);

  const handleSelect = (item: any) => {
    setSelected(item);
    i18n.changeLanguage(item.code.toLowerCase());
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* BOTÓN */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Image source={selected.flag} style={styles.flag} />
        <Text style={[styles.code, { color: colors.textPrimary }]}>
          {selected.code}
        </Text>
      </TouchableOpacity>

      {/* DROPDOWN */}
      {open && (
        <>
          {/* BACKDROP invisible pero clicable */}
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setOpen(false)}
          />

          <View style={[styles.dropdown, { backgroundColor: colors.surface }]}>
            {IDIOMAS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Image source={item.flag} style={styles.flag} />
                <Text style={{ color: colors.textPrimary }}>{t(item.labelKey)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  selector: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    zIndex: 10000,
  },

  flag: {
    width: 22,
    height: 22,
    marginRight: 8,
    borderRadius: 3,
  },

  code: {
    fontWeight: "bold",
  },

  backdrop: {
    position: "absolute",
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: 9998,
  },

  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    zIndex: 9999,
    elevation: 10,
    padding: 8,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
});
