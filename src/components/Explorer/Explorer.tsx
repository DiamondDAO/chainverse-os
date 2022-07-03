import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_ALL_NOTES,
  GET_TAGS_AND_ENTITIES,
} from '../../services/Apollo/Queries';
import './Explorer.css';
export type ExplorerProps = {
  value: string;
  placeholder: string;
  onchange: any;
  onKeyPress: any;
  onFocus: any;
};

export const Explorer: FC<ExplorerProps> = () => {
  const { data: notesData } = useQuery(GET_ALL_NOTES);
  const { data: tagAndEntitiesData } = useQuery(GET_TAGS_AND_ENTITIES);
  console.log('notesData::', notesData);
  console.log('tagAndEntitiesData::', tagAndEntitiesData);
  return <div className="explorer">explorer test from github</div>;
};

export default Explorer;

