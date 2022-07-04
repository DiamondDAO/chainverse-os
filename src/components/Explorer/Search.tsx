import React from 'react';
import { FC } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_ALL_NOTES,
  GET_TAGS_AND_ENTITIES,
} from '../../services/Apollo/Queries';

interface SearchProps {
}

const Search: FC<SearchProps> = () => {
  const { data: notesData } = useQuery(GET_ALL_NOTES);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  console.log('notesData::', notesData);
  console.log('tagAndEntitiesData::', tagAndEntitiesData);
  return ( <div className="flex bg-gray-400 flex">explorer test from github 2</div> );
}
 
export default Search;