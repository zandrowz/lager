import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

const navigation = () => false;

test('tests if DeliveriesList have a "new delivery button".', async () => {
    const { getByA11yLabel } = render(<DeliveriesList
    route = {false}
    navigation = {navigation}
    />);

    const a11yLabel = 'Skapa inleverans genom att trycka';
    const submitButton = getByA11yLabel(a11yLabel);

    expect(submitButton).toBeDefined();
});