import { screen, render } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import CategoriesBarTestV from "../screens/Home/Body/BodyContainer/CategoriesBar/CategoriesBarTestV";

test('categories bar renders the right number of categories elements correctly', () => {
    const categories = [
        {
            id: 1,
            name: 'cars',
            description: 'dd',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/032ef81d-7d65-4265-bc18-1cf91f5ddc4e',
            sortIndex: 1,
            createdDate: '2023-11-22T20:42:33.000+00:00',
            updatedDate: '2023-11-25T16:12:44.000+00:00',
            imageName: '032ef81d-7d65-4265-bc18-1cf91f5ddc4e'
        },
        {
            id: 2,
            name: 'hotel',
            description: 'jhk',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/edb813b6-7d73-48fc-91f3-20d23e85ffde',
            sortIndex: 2,
            createdDate: '2023-11-25T16:12:58.000+00:00',
            updatedDate: '2023-11-25T16:14:24.000+00:00',
            imageName: 'edb813b6-7d73-48fc-91f3-20d23e85ffde'
        },
        {
            id: 3,
            name: 'test1',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 3,
            createdDate: '2023-11-26T20:04:59.000+00:00',
            updatedDate: '2023-11-26T20:04:59.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 4,
            name: 'test2',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 4,
            createdDate: '2023-11-26T20:05:10.000+00:00',
            updatedDate: '2023-11-26T20:05:10.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 5,
            name: 'test3',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 5,
            createdDate: '2023-11-26T20:05:15.000+00:00',
            updatedDate: '2023-11-26T20:05:15.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 6,
            name: 'test4',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 6,
            createdDate: '2023-11-26T20:05:19.000+00:00',
            updatedDate: '2023-11-26T20:05:19.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 7,
            name: 'test5',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 7,
            createdDate: '2023-11-26T20:05:24.000+00:00',
            updatedDate: '2023-11-26T20:05:24.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 8,
            name: 'test6',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 8,
            createdDate: '2023-11-26T20:05:29.000+00:00',
            updatedDate: '2023-11-26T20:05:29.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 9,
            name: 'test7',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 9,
            createdDate: '2023-11-26T20:05:34.000+00:00',
            updatedDate: '2023-11-26T20:05:34.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 10,
            name: 'test8',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 10,
            createdDate: '2023-11-26T20:05:38.000+00:00',
            updatedDate: '2023-11-26T20:05:38.000+00:00',
            imageName: 'mytest'
        }
    ]
    render(
        <BrowserRouter>
            <CategoriesBarTestV
                categories={categories}
                loadingCategories={false}
                search={false}
                home={true}
            />
        </BrowserRouter>
    )
    // screen.logTestingPlaygroundURL();
    expect(screen.getAllByRole('category')).toHaveLength(10);
});

test('categories bar renders the right number of categories images correctly', () => {
    const categories = [
        {
            id: 1,
            name: 'cars',
            description: 'dd',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/032ef81d-7d65-4265-bc18-1cf91f5ddc4e',
            sortIndex: 1,
            createdDate: '2023-11-22T20:42:33.000+00:00',
            updatedDate: '2023-11-25T16:12:44.000+00:00',
            imageName: '032ef81d-7d65-4265-bc18-1cf91f5ddc4e'
        },
        {
            id: 2,
            name: 'hotel',
            description: 'jhk',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/edb813b6-7d73-48fc-91f3-20d23e85ffde',
            sortIndex: 2,
            createdDate: '2023-11-25T16:12:58.000+00:00',
            updatedDate: '2023-11-25T16:14:24.000+00:00',
            imageName: 'edb813b6-7d73-48fc-91f3-20d23e85ffde'
        },
        {
            id: 3,
            name: 'test1',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 3,
            createdDate: '2023-11-26T20:04:59.000+00:00',
            updatedDate: '2023-11-26T20:04:59.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 4,
            name: 'test2',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 4,
            createdDate: '2023-11-26T20:05:10.000+00:00',
            updatedDate: '2023-11-26T20:05:10.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 5,
            name: 'test3',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 5,
            createdDate: '2023-11-26T20:05:15.000+00:00',
            updatedDate: '2023-11-26T20:05:15.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 6,
            name: 'test4',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 6,
            createdDate: '2023-11-26T20:05:19.000+00:00',
            updatedDate: '2023-11-26T20:05:19.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 7,
            name: 'test5',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 7,
            createdDate: '2023-11-26T20:05:24.000+00:00',
            updatedDate: '2023-11-26T20:05:24.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 8,
            name: 'test6',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 8,
            createdDate: '2023-11-26T20:05:29.000+00:00',
            updatedDate: '2023-11-26T20:05:29.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 9,
            name: 'test7',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 9,
            createdDate: '2023-11-26T20:05:34.000+00:00',
            updatedDate: '2023-11-26T20:05:34.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 10,
            name: 'test8',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 10,
            createdDate: '2023-11-26T20:05:38.000+00:00',
            updatedDate: '2023-11-26T20:05:38.000+00:00',
            imageName: 'mytest'
        }
    ]
    render(
        <BrowserRouter>
            <CategoriesBarTestV
                categories={categories}
                loadingCategories={false}
                search={false}
                home={true}
            />
        </BrowserRouter>
    )
    // screen.logTestingPlaygroundURL();
    expect(screen.getAllByRole('img')).toHaveLength(10);
});

test('categories bar renders the right number of categories names correctly', () => {
    const categories = [
        {
            id: 1,
            name: 'cars',
            description: 'dd',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/032ef81d-7d65-4265-bc18-1cf91f5ddc4e',
            sortIndex: 1,
            createdDate: '2023-11-22T20:42:33.000+00:00',
            updatedDate: '2023-11-25T16:12:44.000+00:00',
            imageName: '032ef81d-7d65-4265-bc18-1cf91f5ddc4e'
        },
        {
            id: 2,
            name: 'hotel',
            description: 'jhk',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/edb813b6-7d73-48fc-91f3-20d23e85ffde',
            sortIndex: 2,
            createdDate: '2023-11-25T16:12:58.000+00:00',
            updatedDate: '2023-11-25T16:14:24.000+00:00',
            imageName: 'edb813b6-7d73-48fc-91f3-20d23e85ffde'
        },
        {
            id: 3,
            name: 'test1',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 3,
            createdDate: '2023-11-26T20:04:59.000+00:00',
            updatedDate: '2023-11-26T20:04:59.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 4,
            name: 'test2',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 4,
            createdDate: '2023-11-26T20:05:10.000+00:00',
            updatedDate: '2023-11-26T20:05:10.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 5,
            name: 'test3',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 5,
            createdDate: '2023-11-26T20:05:15.000+00:00',
            updatedDate: '2023-11-26T20:05:15.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 6,
            name: 'test4',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 6,
            createdDate: '2023-11-26T20:05:19.000+00:00',
            updatedDate: '2023-11-26T20:05:19.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 7,
            name: 'test5',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 7,
            createdDate: '2023-11-26T20:05:24.000+00:00',
            updatedDate: '2023-11-26T20:05:24.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 8,
            name: 'test6',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 8,
            createdDate: '2023-11-26T20:05:29.000+00:00',
            updatedDate: '2023-11-26T20:05:29.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 9,
            name: 'test7',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 9,
            createdDate: '2023-11-26T20:05:34.000+00:00',
            updatedDate: '2023-11-26T20:05:34.000+00:00',
            imageName: 'mytest'
        },
        {
            id: 10,
            name: 'test8',
            description: 'desc of test',
            imagePath: 'http://191.96.1.25:8080/app/resources/images/categories/mytest',
            sortIndex: 10,
            createdDate: '2023-11-26T20:05:38.000+00:00',
            updatedDate: '2023-11-26T20:05:38.000+00:00',
            imageName: 'mytest'
        }
    ]
    render(
        <BrowserRouter>
            <CategoriesBarTestV
                categories={categories}
                loadingCategories={false}
                search={false}
                home={true}
            />
        </BrowserRouter>
    )
    // screen.logTestingPlaygroundURL();
    expect(screen.getAllByRole('name')).toHaveLength(10);
});