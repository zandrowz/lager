import { render } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

// let auth = {};
// const setAuth = (newAuth) => {
//     auth = newAuth;
// };

// const mockSubmit = jest.fn();
const navigation = () => false;

test('tests that AuthFields title is "registrera"', async () => {
    const title = "Registrera";
    const { getAllByText } = render(<AuthFields
        // auth={auth}
        // setAuth={setAuth}
        // submit={mockSubmit}
        title={title}
        // navigation={navigation}
    />);
    const titleElements = await getAllByText(title);

    expect(titleElements.length).toBe(2);
});