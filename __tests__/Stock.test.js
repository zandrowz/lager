import { render } from '@testing-library/react-native';
import Stock from '../components/Stock';

jest.mock("../components/StockList", () => "StockList");

test('header should exist containing text Lagerförteckning', async () => {
    const { getByText } = render(<Stock />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});