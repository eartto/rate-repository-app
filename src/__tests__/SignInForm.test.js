import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button

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
      const onSubmit = jest.fn();

      render(<SignInForm onSubmit={onSubmit}/>)

      fireEvent.changeText(screen.getByPlaceholderText('username'), 'elina');
      fireEvent.changeText(screen.getByPlaceholderText('password'), 'password');
      fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument

        expect(onSubmit).toHaveBeenCalledTimes(1)

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'elina',
          password: 'password',
        });
      });
    });
  });
});