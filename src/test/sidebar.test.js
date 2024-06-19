import { screen, render } from '@testing-library/react';
import SidebarTestV from "../components/Sidebar/SidebarTestV";
import {BrowserRouter} from "react-router-dom";

test('sidebar renders image correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
test('sidebar renders 6 rows correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getAllByRole('sidebar__link')).toHaveLength(6);
});
test('sidebar renders conditions correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getByRole('conditions')).toBeInTheDocument();
});

test('sidebar renders join takeme correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getByRole('join__takeme')).toBeInTheDocument();
});

test('sidebar renders filter correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getByRole('filter')).toBeInTheDocument();
});

test('sidebar renders filters form correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getByRole('filter__form')).toBeInTheDocument();
});

test('sidebar renders 4 filters correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getAllByRole('filter__item')).toHaveLength(4);
});


test('sidebar renders language correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getByRole('language')).toBeInTheDocument();
});


test('sidebar renders language form correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getByRole('language__form')).toBeInTheDocument();
});


test('sidebar renders 4 filters correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getAllByRole('filter__item')).toHaveLength(4);
});


test('sidebar renders 2 languages correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getAllByRole('language__item')).toHaveLength(2);
});


test('sidebar renders about link correctly', () => {
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
            <SidebarTestV
                assets={assets}
                isAuthenticated={false}
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
    expect(screen.getByRole('about')).toBeInTheDocument();
});