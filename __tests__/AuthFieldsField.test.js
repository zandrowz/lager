import { render } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

// let auth = {};
// const setAuth = (newAuth) => {
//     auth = newAuth;
// };

// const navigation = () => false;

test('tests that the registration field has e-mail and password fields', async () => {
    const { getByTestId } = render(<AuthFields
        // auth={auth}
        // setAuth={setAuth}
        // navigation={navigation}
    />);

    const emailField = await getByTestId("email-field");
    const passwordField = await getByTestId("password-field");

    expect(emailField).toBeDefined();
    expect(passwordField).toBeDefined();
});