import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';

const initialValues = {
    mass: '',
    height: '',
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30,
        backgroundColor: theme.bgColors.item
    },
    primaryBtn: {
        backgroundColor: theme.bgColors.tag,
        padding: 10,
        borderRadius: 5,
        flexGrow: 1,
    },
    primaryBtnText: {
        color: theme.colors.white,
        fontSize: theme.fontSizes.subheading,
        textAlign: 'center'
    }
    
})

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <Text>Please Sign in </Text>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" />
            <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                <Pressable style={styles.primaryBtn} onPress={onSubmit}>
                    <Text style={styles.primaryBtnText}>Sign in</Text>
                </Pressable>
            </View>
        </View>

    )
}

const SignIn = (values) => {
    const onSubmit = () => {
        console.log(values);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    )
};

export default SignIn;