import React, { ChangeEvent, KeyboardEvent, useMemo, useState } from 'react';
import { FC } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  GET_ALL_CREATED,
  GET_ENTITIES_DATA,
  GET_TAGS_AND_ENTITIES,
  GET_TAG_DATA,
} from '../../services/Apollo/Queries';
import { SearchIcon } from '@heroicons/react/solid';
import Fuse from 'fuse.js';
import { filterUniqueObjects } from '../../common/utils';
import {
  useGetBlockTableData,
  useGetEntityTableData,
  useGetTagsTableData,
} from '../../hooks/search';
import { SearchOSProps } from './SearchOS';
import Spinner from '../Spinner/Spinner';
export enum SearchTypes {
  Blocks = 'blocks',
  Tags = 'tags',
  Entities = 'entities',
}

const SearchComponent: FC<SearchOSProps> = (
  props: SearchOSProps
): JSX.Element => {
  // graphql
  const { data: notesData, loading: loadingNotes } = useQuery(GET_ALL_CREATED);
  const { data: tagAndEntitiesData, loading: loadingEntityTag } = useQuery(
    GET_TAGS_AND_ENTITIES
  );
  const [getEntitiesQuery, entityOption] = useLazyQuery(GET_ENTITIES_DATA);
  const [getTagsDataQuery, tagsOption] = useLazyQuery(GET_TAG_DATA);
  const { loading: loadingEntity } = entityOption;
  const { loading: loadingTag } = tagsOption;

  // search state
  const [term, setTerm] = useState('');
  const [searchType, setSearchType] = useState(SearchTypes.Entities);
  const [showTypesFilter, setShowTypeFilter] = useState(false);
  const isEntityFilter = searchType === SearchTypes.Entities;
  const isTagFilter = searchType === SearchTypes.Tags;
  const isBlockFilter = searchType === SearchTypes.Blocks;

  // Tags
  const tags = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.tags, 'tag')?.map(i => i.tag) ||
      [],
    [tagAndEntitiesData?.tags]
  );
  const tagFusSearchResult = useMemo(
    () =>
      tags.length > 0
        ? new Fuse(tags, {
            includeScore: false,
            threshold: 0.3,
          })?.search((term as string) || '')
        : [],
    [tags, term]
  );

  const tagresponse = useGetTagsTableData({
    term,
    tagFusSearchResult,
    getTagsDataQuery,
  });

  // Entities
  const entities = useMemo(
    () =>
      filterUniqueObjects(tagAndEntitiesData?.entities, 'name')?.map(
        i => i.name
      ) || [],
    [tagAndEntitiesData?.entities]
  );
  const entityFuseSearchResult = useMemo(
    () =>
      entities.length > 0
        ? new Fuse(entities, {
            includeScore: false,
            threshold: 0.3,
          })?.search((term as string) || '')
        : [],
    [entities, term]
  );

  const entityResponse = useGetEntityTableData({
    term,
    entityFuseSearchResult,
    getEntitiesQuery,
  });

  // Blocks
  const blocks = useMemo(
    () =>
      filterUniqueObjects(notesData?.wallets[0].blocks, 'text')?.map(i => i) ||
      [],
    [notesData]
  );
  const blocksFuseSearchResult = useMemo(
    () =>
      blocks.length > 0
        ? new Fuse(blocks, {
            includeScore: false,
            threshold: 0.7,
          })?.search((term as string) || '')
        : [],
    [blocks, term]
  );
  const blockResponse = useGetBlockTableData({
    term,
    blocksFuseSearchResult,
  });

  // handlers
  const handleOnfocus = () => {
    props.onFocus()
  }
  const handleOnChangeType = (type: SearchTypes) => {
    setSearchType(type);
    props.onChangeType({
      searchType: type,
      entity: entityResponse,
      tags: tagresponse,
      blocks: blockResponse,
    });
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    //TODO: apply debounce
    const value = e.target.value;    
    setTerm(value);
    props.onChange(value);
  };
  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (term.length > 0) {
        setShowTypeFilter(true);
      }
      props.onEnter({
        searchType,
        entity: entityResponse,
        tags: tagresponse,
        blocks: blockResponse,
      });
    }
  };

  const isLoading = loadingEntityTag || loadingEntity || loadingTag;

  const classActive = 'bg-[#95438d] text-white';
  return (
    <div className="flex bg-white flex justify-center items-center space-x-2 w-[100%]">
      <div className="flex border rounded items-center px-4 shadow flex-grow">
        {isLoading ? (
          <Spinner color="darkBlue"></Spinner>
        ) : (
          <SearchIcon className="w-5 h-5 mr-3" />
        )}
        <input
          type="text"
          value={term}
          onChange={handleOnChange}
          onKeyPress={handleOnKeyPress}
          onFocus={handleOnfocus}
          className="border-none w-[100%]"
          placeholder="Start with a search for any keyword, community name, or user"
        />
      </div>
      {showTypesFilter && (
        <div className="flex items-center space-x-2">
          <span
            className={`p-2 border rounded cursor-pointer ${
              isEntityFilter ? classActive : ''
            }`}
            onClick={() => handleOnChangeType(SearchTypes.Entities)}
          >
            Entities ({entityFuseSearchResult.length})
          </span>
          <span
            className={`p-2 border rounded cursor-pointer ${
              isBlockFilter ? classActive : ''
            }`}
            onClick={() => handleOnChangeType(SearchTypes.Blocks)}
          >
            Blocks ({blocksFuseSearchResult.length})
          </span>
          <span
            className={`p-2 border rounded cursor-pointer ${
              isTagFilter ? classActive : ''
            }`}
            onClick={() => handleOnChangeType(SearchTypes.Tags)}
          >
            Tags ({tagFusSearchResult.length})
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
