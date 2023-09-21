import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup'

const initialValues = {
    username: '',
    password: '',
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        alignItems: 'center',
        paddingTop: 40,
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

const validationSchema = yup.object().shape({
    username: yup.string().min(3, "Must be at least 3 characters long").required('username required'),
    password: yup.string().min(3, "Must be at least 3 characters long").required('password required'),
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

const SignIn = () => {

    const onSubmit = (values) => {
        console.log(values);

    }
    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            >
            
            {({handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    )
};

export default SignIn;