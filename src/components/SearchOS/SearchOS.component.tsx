import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { FC } from 'react';
import { useApolloClient } from '@apollo/client';
import { SearchOSProps } from './SearchOS';
import { GET_SEARCH_ALL } from '../../services/Apollo/Queries';
import { useSearchOSClient } from '../../hooks/useSearchOSClient';
import { Button } from '../Button';
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
  const [skip, setSkip] = useState(0);
  const [localLimit] = useState(50);
  const {
    setData,
    loading,
    setLoading,
    data: dataStored,
    setFetchMore,
  } = useSearchOSClient();

  // graphql
  const client = useApolloClient();

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFetchMore(() => handleLoadData);
    }
  }, [searchTerm, skip, localLimit, dataStored]);

  // handlers
  const handleOnfocus = () => {
    props.onFocus?.();
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    props.onChange?.(value);
  };

  async function handleLoadData(settings?: FetchMore) {
    const { limit, reset } = settings || {};
    if (searchTerm.length > 0) {
      const currentLimit = limit || localLimit;
      const currentData = reset ? [] : dataStored;
      const currentSkip = reset ? 0 : skip;
      setLoading?.(true);
      //TODO: Review this lazyQuery issue
      //https://stackoverflow.com/questions/57499553/is-it-possible-to-prevent-uselazyquery-queries-from-being-re-fetched-on-compon
      const { data } = await client.query({
        query: GET_SEARCH_ALL,
        variables: {
          searchString: searchTerm,
          skip: currentSkip,
          limit: currentLimit,
        },
      });
      const newSkip = currentSkip + currentLimit;
      const newData = currentData.concat(data.fuzzyChainversePortalSearch);
      setSkip(newSkip);
      setLoading?.(false);
      setData?.([...newData]);
    }
  }
  const handleOnKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLoadData({ reset: true });
    }
  };
  const handleOnSearch = () => {
    handleLoadData({ reset: true });
  };

  return (
    <div className="flex bg-white flex justify-center items-center space-x-2 w-[100%]">
      <div className="flex border rounded items-center p-4 shadow flex-grow shadow-lg">
        <span className="font-bold text-gray-700 text-2xl">Find</span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleOnChange}
          onKeyPress={handleOnKeyPress}
          onFocus={handleOnfocus}
          className="border-none w-[100%]"
          placeholder="Start with a search for any keyword, community name, or user"
        />
        <Button variant="primary" isLoading={loading} onClick={handleOnSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchComponent;
