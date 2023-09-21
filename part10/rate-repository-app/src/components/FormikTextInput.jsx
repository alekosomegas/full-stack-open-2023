import { StyleSheet, TextInput, View } from 'react-native';
import { useField } from 'formik';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10
  }
});

const FormikTextInput = ({ name, ...props }) => {
    console.log(name);
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={name === 'password'}
        style={styles.input}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;