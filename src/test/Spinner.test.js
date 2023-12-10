import { screen, render } from '@testing-library/react';
import SpinnerComponent from "../components/Spinner/Spinner.Component";

test('spinner renders', () => {
    render(
        <SpinnerComponent />
    );

    const spinnerDiv = screen.getByRole('Spinner');
    // screen.logTestingPlaygroundURL();
    expect(spinnerDiv).toBeInTheDocument();
});