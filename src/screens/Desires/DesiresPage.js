import React, { useEffect, useState, useRef } from 'react';
import './DesiresPage.style.css';
import { getDesires, DeleteDesire } from '../../modals/manageDesires.js';
import ItemsList from '../../components/ItemsList/ItemsList.js';
import { useDesiresContext } from '../../context/desiresContext.js';
import LanguagesShimmer from '../../components/ItemsShimmer/ItemsShimmer.js';


function Desires() {
  const [desireItems, setDesireItems] = useState(()=>{ 
    return sessionStorage.getItem('desires') ? JSON.parse(sessionStorage.getItem('desires')) : []  
  });
  const [page, setPage] = useState(() => {
    return sessionStorage.getItem('desiresPage') ? JSON.parse(sessionStorage.getItem('desiresPage')) : 0
  } );
  const [more, setMore] = useState(true);
  const [isDeletingDesire, setIsDeletingDesire] = useState(false);
  const { SearchDesiresFun, searchDesires, isSearchingDesires, isJustSearching, searchDesireTerm, sortTypeDesire } = useDesiresContext();
  const initSort = useRef(sortTypeDesire);

  /// Cashe Data For The Desires Page
  useEffect(() => {
    sessionStorage.setItem('desires', JSON.stringify(desireItems));
    sessionStorage.setItem('desiresPage', JSON.stringify(page));
  }, [desireItems, page]);

  // Fetch desires DATA from the server 
  const getDesiresFun = async (paginationData) => {
    const response = await getDesires(paginationData);
    setDesireItems(prev=> [...prev, ...response]);
    setPage(prev=> prev + 1);
    setMore(response.length > 0);
  };

  /// Init Data when start the page or Reset Page
  useEffect(() => {
    if (page > 0) return;
    getDesiresFun({ page: 0, isAscending: sortTypeDesire === 'ASCENDING' });
    // eslint-disable-next-line
  }, [page]);

  /// Change Sort When chnage From the init Sort
  useEffect(() => {
    if (initSort.current === sortTypeDesire) return;
    initSort.current = sortTypeDesire;
    sessionStorage.clear();
    setDesireItems(prev=> []);
    setPage(prev=> 0);
  }, [sortTypeDesire]);

  const DeleteDesireFun = async (desireId) => {
    setIsDeletingDesire(true);
    const response = await DeleteDesire(desireId);
    if (response.status) {
      const newDesires = desireItems.filter((item) => item.id !== desireId.DesireID);
      setDesireItems(newDesires);
    }
    setIsDeletingDesire(false);
  };


  ///** The View Props *///
  const desiresData = {
    items: desireItems,
    page: page,
    searchKey: searchDesireTerm,
    displayName: 'name',
    isSearching : isSearchingDesires,
    paginationData: { page: page, isAscending: sortTypeDesire === 'ASCENDING' },
    more: more,
    itemsFun: getDesiresFun,
    dotsProps: id => ({
      urls: {
        addUrl: `/desires/duplicate/${id}`,
        editUrl: `/desires/edit/${id}`,
      },
      deleteData: {
        DesireID: id
      },
      deleteFun: DeleteDesireFun,
      isItem: true,
      deleting: isDeletingDesire
    })
  }

  ///** The Search View Props */
  const searchDesiresData = {
    items: searchDesires,
    page: 0,
    searchKey: searchDesireTerm,
    displayName: 'name',
    isSearching : isSearchingDesires,
    paginationData: {},
    more: false,
    itemsFun: SearchDesiresFun,
    dotsProps: id => ({
      urls: {
        addUrl: `/desires/duplicate/${id}`,
        editUrl: `/desires/edit/${id}`,
      },
      deleteData: {
        DesireID: id
      },
      deleteFun: DeleteDesireFun,
      isItem: true,
      deleting: isDeletingDesire
    })
  };


  return (
    <div dir='rtl' className='body'>
      {!isSearchingDesires ?
        <ItemsList {...desiresData} />
        :
        <>
          {isJustSearching ? 
            <LanguagesShimmer />
          :
            <ItemsList {...searchDesiresData} />
          }
        </>
      }
    </div>
  );
}

export default Desires;