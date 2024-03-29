import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { FC } from 'react';
// import { useApolloClient } from '@apollo/client';
import { SearchOSProps } from './SearchOS';
// import { GET_SEARCH_ALL } from '../../services/Apollo/Queries';
import { useSearchOSClient } from '../../hooks/useSearchOSClient';
import { Button } from '../Button';
import { useAsync } from '../../hooks/useAsync';
import { getEntitySearch, setBackendUrl } from '../../services/restApi/entity';
export enum SearchTypes {
  Blocks = 'blocks',
  Tags = 'tags',
  Entities = 'entities',
}
export type FetchMore = {
  limit?: number;
  reset?: boolean;
};
const SearchComponent: FC<SearchOSProps> = (
  props: SearchOSProps
): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [skip, setSkip] = useState(0);
  // const localLimit = props.limit || 50;
  const {
    backendURI,
    setData,
    // loading,
    setLoading,
    // data: dataStored,
    // setFetchMore,
  } = useSearchOSClient();
  const { run, isLoading } = useAsync({
    onStart: () => setLoading?.(true),
    onFinish: () => setLoading?.(false),
    onSuccess: result => {
      setData?.([...result.data])
    },
  });

  // graphql
  // const client = useApolloClient();

  useEffect(() => {
    setBackendUrl(backendURI)
  }, [])
  

  // useEffect(() => {
  //   if (searchTerm.length > 0) {
  //     setFetchMore(() => handleLoadData);
  //   }
  // }, [searchTerm, skip, localLimit, dataStored]);

  // handlers
  const handleOnfocus = () => {
    props.onFocus?.();
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    props.onChange?.(value);
  };

  // async function handleLoadData(settings?: FetchMore) {
  //   const { limit, reset } = settings || {};
  //   if (searchTerm.length > 0) {
  //     const currentLimit = limit || localLimit;
  //     const currentData = reset ? [] : dataStored;
  //     const currentSkip = reset ? 0 : skip;
  //     setLoading?.(true);
  //     //TODO: Review this lazyQuery issue
  //     //https://stackoverflow.com/questions/57499553/is-it-possible-to-prevent-uselazyquery-queries-from-being-re-fetched-on-compon
  //     const { data } = await client.query({
  //       query: GET_SEARCH_ALL,
  //       variables: {
  //         searchString: searchTerm,
  //         skip: currentSkip,
  //         limit: currentLimit,
  //       },
  //     });
  //     const newSkip = currentSkip + currentLimit;
  //     const newData = currentData.concat(data.fuzzyChainversePortalSearch);
  //     setSkip(newSkip);
  //     setLoading?.(false);
  //     setData?.([...newData]);
  //   }
  // }
  const handleOnKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // handleLoadData({ reset: true });
      run(getEntitySearch(searchTerm))
      props.onEnter?.(searchTerm);
    }
  };
  const handleOnSearch = () => {
    // handleLoadData({ reset: true });
    run(getEntitySearch(searchTerm))
    props.onEnter?.(searchTerm);
  };

  return (
    <div className="flex border rounded bg-white items-center p-4 w-[100%] shadow shadow-lg space-y-2 lg:space-y-0 lg:space-x-2 flex-col lg:flex-row">
      <div className="flex flex-col md:flex-row items-center w-[100%] md:space-x-2 lg:space-x-2 lg:w-[80%]">
        <span className="font-bold text-gray-600 text-2xl w-[100%] text-left md:w-auto">
          Find
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleOnChange}
          onKeyPress={handleOnKeyPress}
          onFocus={handleOnfocus}
          className="border rounded flex-grow border-gray-200 p-3 w-[100%] md:flex-grow"
          placeholder="Start with a search for any keyword, community name, or user"
        />
      </div>
      <Button
        variant="primary"
        isLoading={isLoading}
        onClick={handleOnSearch}
        className="w-[100%] lg:w-[20%]"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
