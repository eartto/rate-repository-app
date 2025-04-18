import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import useReview from '../hooks/useReview';
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
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .required('Rating is required'),
    text: yup
        .string()
})

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
}

const ReviewForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <View style={styles.flexContainerColumn}>
            <TextInput style={formik.touched.ownerName && formik.errors.ownerName ? styles.textFieldErrror : styles.textField}
                placeholder='Repository owner name'
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
            )}
            <TextInput style={formik.touched.repositoryName && formik.errors.repositoryName ? styles.textFieldErrror : styles.textField}
                placeholder='Repository name'
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
            )}
            <TextInput style={formik.touched.rating && formik.errors.rating ? styles.textFieldErrror : styles.textField}
                placeholder='rating between 0 and 100'
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
            )}
            <TextInput style={formik.touched.text && formik.errors.text ? styles.textFieldErrror : styles.textField}
                placeholder='Review'
                value={formik.values.text}
                multiline={true}
                onChangeText={formik.handleChange('text')}
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={{ color: 'red' }}>{formik.errors.text}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={{ color: theme.colors.white, fontWeight: theme.fontWeights.bold }}>Create a review</Text>
            </Pressable>
        </View>
    )
}

const CreateReview = () => {
    const [createReview] = useReview();
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const { text, repositoryName, rating, ownerName } = values;
        try {
            const { data } = await createReview({ text, repositoryName, rating, ownerName });
        } catch (e) {
            console.log(e);
        }
        navigate(`/repository/${ownerName}.${repositoryName}`)
    }

    return <ReviewForm onSubmit={onSubmit} />

};

export default CreateReview;