import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { searchByFilter } from "../../utils/filters/common";

const RESULTS_PER_PAGE = [ 10 , 20 , 40 , 60 ];

const useFilters = (data, filters) => {
    const [results,setResults] = useState([...data]);
    useEffect( () => {
        setResults(data);
    } , [data]);
    useEffect( () => {
        if( Array.isArray(filters) ){
            setResults( () => {
                return data.filter( result => {
                    const isValid = filters.every( ([ value , filter ]) => {
                        return filter(result,{ value });
                    });
                    return isValid;
                });
            });
        }
    } , [setResults, data, ...filters.map( filter => filter[0] ) ]);

    return {
        results
    }
}

const usePagination = ({
    data,
    filters = [],
    resultsPerPageOptions = RESULTS_PER_PAGE,
    searchBy = []
}) => {
    const [ textValue , setValue ] = useState("");

    let allFilters = [
        ...filters,
        [ textValue , searchByFilter(searchBy) ]
    ];

    const onChange = useCallback( (e) => {
        const val = e.target.value;
        setValue(val);
    } , [setValue]);


    const [ resultsPerPage, setResultsPerPage ] = useState( resultsPerPageOptions[0] );
    const [ pageIndex, setPageIndex ] = useState(0);
    const { results } = useFilters(data,allFilters);   

    const totalPages =  useMemo( () => {
        return Math.ceil( data.length / resultsPerPage ); 
    } , [ data, resultsPerPage ] );

    const paginatedData = useMemo( () => {
        let dataArr = [...results];
        const start = pageIndex * resultsPerPage;
        const end = ( pageIndex * resultsPerPage ) + parseInt(resultsPerPage);
        dataArr = dataArr.slice( start , end );
        return dataArr;
    } , [ results, resultsPerPage, pageIndex, totalPages, data ] );

    const gotoPage = useCallback( (page) => {
        setPageIndex(page);
    } , [setPageIndex]);

    const search = useMemo( () => {
        return ({
            textValue,
            onChange
        });
    } , [textValue,onChange])

    const value = useMemo( () => {
        return {
            data: paginatedData,
            pageIndex,
            resultsPerPage,
            setPageIndex,
            setResultsPerPage,
            resultsPerPageOptions,
            totalPages,
            gotoPage,
            search
        }
    } ,
        [            
            paginatedData,
            search,
            pageIndex,
            resultsPerPage,
            setPageIndex,
            setResultsPerPage,
            totalPages,
            gotoPage,
            resultsPerPageOptions
        ]
    );

    return value;
}

export { usePagination };