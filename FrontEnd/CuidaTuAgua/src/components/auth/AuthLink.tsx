import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { useTheme, spacing, typography } from '@theme/index';


type Props = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  center?: boolean;
};

export default function AuthLink({
  text,
  onPress,
  center = false,
}: Props) {

  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          styles.link,
          { color: colors.textSecondary },
          center && styles.center,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    ...typography.body,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },

  center: {
    textAlign: 'center',
    marginLeft: 0,
  },
});