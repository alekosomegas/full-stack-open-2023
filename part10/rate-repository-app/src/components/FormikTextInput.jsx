import { StyleSheet, TextInput, View, Dimensions } from 'react-native';
import { useField } from 'formik';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
    paddingLeft: 10
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    width: Dimensions.get('window').width*0.9
  },
  container: {
    paddingHorizontal: 10
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={name === 'password'}
        style={[styles.input, showError && {borderColor: theme.colors.error}]}
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