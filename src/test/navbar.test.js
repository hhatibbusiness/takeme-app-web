import { screen, render } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import NavbarTestV from "../components/HOC/NavbarWebsite/NavbarTestV";

test('navbar renders correctly', () => {
    const assets = {
        id: 2,
        sortIndex: 2,
        name: "TakeMes",
        phoneCountryCode: "972",
        phone: "0509648144",
        email: "takeme.center@gmail.com",
        languageId: 1,
        logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
        coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
        footerText: "TakeMes",
        copyRightYear: 2022,
        facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
        instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
        whatsappLink: "https://wa.me/9720509648444",
        tiktokLink: "https://wa.me/9720509648444",
        backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
    }
    render(
        <BrowserRouter>
            <NavbarTestV
                assets={assets}
                logout={() => {}}
                changeFilter={() => {}}
                filter={'NONE'}
                lan={'ar'}
                changeLan={() => {}}
                categories={[]}
            />
        </BrowserRouter>
    )
    // screen.logTestingPlaygroundURL();
    expect(screen.getByRole('img')).toBeInTheDocument();
});

test('navbar renders searchbox correctly', () => {
    const assets = {
        id: 2,
        sortIndex: 2,
        name: "TakeMes",
        phoneCountryCode: "972",
        phone: "0509648144",
        email: "takeme.center@gmail.com",
        languageId: 1,
        logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
        coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
        footerText: "TakeMes",
        copyRightYear: 2022,
        facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
        instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
        whatsappLink: "https://wa.me/9720509648444",
        tiktokLink: "https://wa.me/9720509648444",
        backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
    }
    render(
        <BrowserRouter>
            <NavbarTestV
                assets={assets}
                search={true}
                midText={true}
                backBtn={true}

            />
        </BrowserRouter>
    )
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
});

test('navbar renders search form correctly', () => {
    const assets = {
        id: 2,
        sortIndex: 2,
        name: "TakeMes",
        phoneCountryCode: "972",
        phone: "0509648144",
        email: "takeme.center@gmail.com",
        languageId: 1,
        logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
        coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
        footerText: "TakeMes",
        copyRightYear: 2022,
        facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
        instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
        whatsappLink: "https://wa.me/9720509648444",
        tiktokLink: "https://wa.me/9720509648444",
        backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
    }
    render(
        <BrowserRouter>
            <NavbarTestV
                assets={assets}
                search={true}
                midText={true}
                backBtn={true}

            />
        </BrowserRouter>
    )
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole('search__form')).toBeInTheDocument();
});

test('navbar renders searchbox input correctly', () => {
    const assets = {
        id: 2,
        sortIndex: 2,
        name: "TakeMes",
        phoneCountryCode: "972",
        phone: "0509648144",
        email: "takeme.center@gmail.com",
        languageId: 1,
        logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
        coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
        footerText: "TakeMes",
        copyRightYear: 2022,
        facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
        instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
        whatsappLink: "https://wa.me/9720509648444",
        tiktokLink: "https://wa.me/9720509648444",
        backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
    }
    render(
        <BrowserRouter>
            <NavbarTestV
                assets={assets}
                search={true}
                midText={true}
                backBtn={true}

            />
        </BrowserRouter>
    )
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole('search__form--input')).toBeInTheDocument();
});

test('navbar renders search btn correctly', () => {
    const assets = {
        id: 2,
        sortIndex: 2,
        name: "TakeMes",
        phoneCountryCode: "972",
        phone: "0509648144",
        email: "takeme.center@gmail.com",
        languageId: 1,
        logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
        coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
        footerText: "TakeMes",
        copyRightYear: 2022,
        facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
        instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
        whatsappLink: "https://wa.me/9720509648444",
        tiktokLink: "https://wa.me/9720509648444",
        backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
    }
    render(
        <BrowserRouter>
            <NavbarTestV
                assets={assets}
                search={true}
                midText={true}
                backBtn={true}

            />
        </BrowserRouter>
    )
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole('search__btn')).toBeInTheDocument();
});

test('navbar renders navbar heading correctly', () => {
    const assets = {
        id: 2,
        sortIndex: 2,
        name: "TakeMes",
        phoneCountryCode: "972",
        phone: "0509648144",
        email: "takeme.center@gmail.com",
        languageId: 1,
        logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
        coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
        footerText: "TakeMes",
        copyRightYear: 2022,
        facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
        instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
        whatsappLink: "https://wa.me/9720509648444",
        tiktokLink: "https://wa.me/9720509648444",
        backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
    }
    render(
        <BrowserRouter>
            <NavbarTestV
                assets={assets}
                search={true}
                midText={true}
                backBtn={true}

            />
        </BrowserRouter>
    )
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole('heading')).toBeInTheDocument();
});

test('navbar renders backbtn correctly', () => {
    const assets = {
        id: 2,
        sortIndex: 2,
        name: "TakeMes",
        phoneCountryCode: "972",
        phone: "0509648144",
        email: "takeme.center@gmail.com",
        languageId: 1,
        logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
        coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
        footerText: "TakeMes",
        copyRightYear: 2022,
        facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
        instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
        whatsappLink: "https://wa.me/9720509648444",
        tiktokLink: "https://wa.me/9720509648444",
        backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
    }
    render(
        <BrowserRouter>
            <NavbarTestV
                assets={assets}
                search={true}
                midText={true}
                backBtn={true}

            />
        </BrowserRouter>
    )
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole('navbar__back')).toBeInTheDocument();
});

test('navbar renders burger correctly', () => {
    const assets = {
        id: 2,
        sortIndex: 2,
        name: "TakeMes",
        phoneCountryCode: "972",
        phone: "0509648144",
        email: "takeme.center@gmail.com",
        languageId: 1,
        logoPath: "http://191.96.1.25:8080/app/resources/images/profile/logo.png",
        coverPath: "http://191.96.1.25:8080/app/resources/images/categories/52bf060f-2b27-4c9d-b1a6-28ad8d29b2f6",
        footerText: "TakeMes",
        copyRightYear: 2022,
        facebookLink: "https://www.facebook.com/ghajar.takeme.hebrew",
        instagramLink: "https://www.instagram.com/ghajar.takeme.hebrew",
        whatsappLink: "https://wa.me/9720509648444",
        tiktokLink: "https://wa.me/9720509648444",
        backendApiPrefix: "http://191.96.1.25:8080/app/endpoints"
    }
    render(
        <BrowserRouter>
            <NavbarTestV
                assets={assets}
                search={true}
                midText={true}
                backBtn={false}
            />
        </BrowserRouter>
    )
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole('burger')).toBeInTheDocument();
});

