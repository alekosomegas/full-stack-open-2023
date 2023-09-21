import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.secondary,
  },
  colorWhite: {
    color: theme.colors.white,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },

  header: {
    fontSize: theme.fontSizes.heading,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  }
});

const Text = ({ color, fontSize, fontWeight, style, type, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'secondary' && styles.colorTextSecondary,
    color === 'white' && styles.colorWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    type === 'header' && styles.header,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;