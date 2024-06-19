import { screen, render } from '@testing-library/react';
import Intro from "../components/Intro/Intro";
import IntroTestedVersion from "../components/Intro/IntroTestedVersion";
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
configure({adapter: new Adapter()});
// test('has image and text', () => {
//     const assets =
//         {
//             id: 2,
//             sortIndex: 2,
//             name: "TakeMes",
//             phoneCountryCode: "972",
//             phone: "0509648144",
//             email: "takeme.center@gmail.com",
//             languageId: 1,
//             logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
//             coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
//             footerText: "TakeMes",
//             copyRightYear: 2022,
//             facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
//             instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
//             whatsappLink: "https://wa.me/9720509648444",
//             tiktokLink: "https://wa.me/9720509648444",
//             backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
//         }
//
//     render(<IntroTestedVersion />);
//
//     // screen.logTestingPlaygroundURL();
//     const img = screen.getByRole('img');
//     const text = screen.getByText(/for your needs/i);
//     expect(img).toBeInTheDocument();
//     expect(text).toBeInTheDocument();
// });
test('has image and text', () => {
    // const assets =
    //     {
    //         id: 2,
    //         sortIndex: 2,
    //         name: "TakeMes",
    //         phoneCountryCode: "972",
    //         phone: "0509648144",
    //         email: "takeme.center@gmail.com",
    //         languageId: 1,
    //         logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
    //         coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
    //         footerText: "TakeMes",
    //         copyRightYear: 2022,
    //         facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
    //         instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
    //         whatsappLink: "https://wa.me/9720509648444",
    //         tiktokLink: "https://wa.me/9720509648444",
    //         backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
    //     }

    render(
            <Provider store={store} >
                <Intro />
            </Provider>
    );

    // screen.logTestingPlaygroundURL();
    const img = screen.getByRole('img');
    const text = screen.getByText(/for your needs/i);

    expect(img).toBeInTheDocument();
    expect(text).toBeInTheDocument();
});