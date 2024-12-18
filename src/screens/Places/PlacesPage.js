import React, { useEffect, useState, useRef } from 'react';
import './PlacesPage.style.css';
import { getPlaces, DeletePlace } from '../../screens/Places/model/managePlaces.js';
import ItemsList from '../../components/ItemsList/ItemsList.js';
import { usePlacesContext } from '../../context/placesContext.js';
import LanguagesShimmer from '../../components/ItemsShimmer/ItemsShimmer.js';


export default function Places({ setBackBtn, setAdmin }) {
    const [placeItems, setPlaceItems] = useState(()=>{
        return sessionStorage.getItem('places') ? JSON.parse(sessionStorage.getItem('places')) : []  
    });
    const [page, setPage] = useState(() => {
        return sessionStorage.getItem('placesPage') ? JSON.parse(sessionStorage.getItem('placesPage')) : 0
    } );
    const [more, setMore] = useState(true);
    const [isDeletingPlace, setIsDeletingPlace] = useState(false);
    const { SearchPlacesFun, searchPlaces, isSearchingPlaces, isJustSearching, searchPlaceTerm, sortTypePlace } = usePlacesContext();
    const initSort = useRef(sortTypePlace);
    const parentRef = useRef(null);

    useEffect(() => {
        setAdmin(true);
        setBackBtn(true);
        return () => {
            setAdmin(false);
            setBackBtn(false);
        }
    }, []);

    /// Cashe Data For The places Page
    useEffect(() => {
        sessionStorage.setItem('places', JSON.stringify(placeItems));
        sessionStorage.setItem('placesPage', JSON.stringify(page));
    }, [placeItems, page]);


    // Fetch places DATA from the server 
    const getPlacesFun = async (paginationData) => {
        console.log('FETCHING PLACES', paginationData);
        const response = await getPlaces(paginationData);
        if (response.status) {
            setPlaceItems(prev=> [...prev, ...response.output]);
            setPage(prev=> prev + 1);
            setMore(prev=> response.output.length >= 10);
        }
    };

    /// Init Data when start the page or Reset Page
    useEffect(() => {
        if (page > 0) return;
        getPlacesFun({ page: 0, isAscending: sortTypePlace === 'ASCENDING' });
        // eslint-disable-next-line
    }, [page]);


    /// Change Sort When chnage From the init Sort
    useEffect(() => {
        if (initSort.current === sortTypePlace) return;
        console.log('SORTTYPE', initSort.current, sortTypePlace)
        initSort.current = sortTypePlace;
        sessionStorage.clear();
        setPlaceItems(prev=> []);
        setPage(prev=> 0);
    }, [sortTypePlace]);

    const DeletePlaceFun = async (placeId) => {
        setIsDeletingPlace(true);
        const response = await DeletePlace(placeId);
        if (response?.status || true) {
            const newPlaces = placeItems.filter((item) => item.id !== placeId.PlaceID);
            setPlaceItems(newPlaces);
        }
        setIsDeletingPlace(false);
    };


    ///** The View Props *///
    const placesData = {
        itemsFun: getPlacesFun,
        items: placeItems,
        page: page,
        searchKey: searchPlaceTerm,
        displayName: 'translations.fields.value',
        isSearching : isSearchingPlaces,
        paginationData: { page: page, isAscending: sortTypePlace === 'ASCENDING' },
        more: more,
        dots: true,
        dotsProps: id => ({
        urls: {
            addUrl: `/places/duplicate/${id}`,
            editUrl: `/places/edit/${id}`,
        },
        deleteData: {
            PlaceID: id
        },
        deleteFun: DeletePlaceFun,
        isItem: true,
        deleting: isDeletingPlace
        }),
        window: false,
        parentScroller: parentRef.current
    }

    ///** The Search View Props */
    const searchPlacesData = {
        items: searchPlaces,
        page: 0,
        searchKey: searchPlaceTerm,
        displayName: 'translations.fields.value',
        isSearching : isSearchingPlaces,
        paginationData: {},
        more: false,
        itemsFun: SearchPlacesFun,
        dotsProps: id => ({
            urls: {
                addUrl: `/places/duplicate/${id}`,
                editUrl: `/places/edit/${id}`,
            },
            deleteData: {
                PlaceID: id
            },
            deleteFun: DeletePlaceFun,
            isItem: true,
            deleting: isDeletingPlace
        }),
        window: false,
        parentScroller: parentRef.current
    };


    return (
        <div dir='rtl' ref={parentRef} className='Places_body' style={{ paddingTop: `${115}px`, position: 'fixed', top: 0, left: 0}}>
        {!isSearchingPlaces ?
            <ItemsList {...placesData} />
            :
            <>
            {isJustSearching ? 
                <LanguagesShimmer />
            :
                <ItemsList {...placesData} />
            }
            </>
        }
        </div>
    );
}