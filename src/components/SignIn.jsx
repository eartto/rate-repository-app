import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    textField: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
        borderWidth: 1,
        borderRadius: 3,
    },
    textFieldErrror: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: theme.colors.error,
    },
    flexContainerColumn: {
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 14,
        gap: 12,
    },
    button: {
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        padding: 14,
        borderRadius: 3,
    }
});

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
})

const initialValues = {
    username: '',
    password: '',
}

const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <View style={styles.flexContainerColumn}>
            <TextInput style={formik.touched.username && formik.errors.username ? styles.textFieldErrror : styles.textField}
                placeholder='username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
            )}
            <TextInput style={formik.touched.password && formik.errors.password ? styles.textFieldErrror : styles.textField}
                placeholder='password'
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={{ color: theme.colors.white, fontWeight: theme.fontWeights.bold }}>Sign in</Text>
            </Pressable>
        </View>
    )
}

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
        } catch (e) {
            console.log(e);
        }
        navigate(-1)
    }

    return <SignInForm onSubmit={onSubmit} />

};

export default SignIn;