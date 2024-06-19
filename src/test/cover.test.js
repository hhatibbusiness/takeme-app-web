import { screen, render } from '@testing-library/react';
import Cover from "../screens/Home/Body/BodyContainer/Cover/Cover";
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Img from "../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";

const mockStore = configureMockStore();
const store = mockStore({
    categories: {
        value: 100
    }
});
configure({adapter: new Adapter()});

test('cover renders image', () => {
    render(
        <Provider store={store} >
            <Img
                setImgLoaded={() => {}}
                setError={() => {}}
                setHidden={() => {}}
                setLoaded={() => {}}
            />
        </Provider>
    );

    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
})