import { useEffect, useMemo, useState } from 'react';
export type FetchMoreData = {
  reset: boolean;
};
export const useGetBlockTableData = ({
  term,
  blocksFuseSearchResult,
}: any) => {
  const [blockTableData, setBlockTableData] = useState([]);

  useEffect(() => {
    getnodeDataHandler({ reset: true });
  }, [term, blocksFuseSearchResult]);

  const getnodeDataHandler = async ({ reset = false }: FetchMoreData) => {
    if (blocksFuseSearchResult.length > 0) {
      const notes = blocksFuseSearchResult;
      setBlockTableData(reset ? notes : blockTableData.concat(notes));
    } else {
      setBlockTableData([]);
    }
  };
  const nodeData = useMemo(() => blockTableData, [blockTableData, term]);
  const hasMorenodeData = useMemo(
    () => blockTableData.length < blocksFuseSearchResult.length,
    [blockTableData, blocksFuseSearchResult]
  );

  return { getnodeDataHandler, nodeData, hasMorenodeData };
};

export const useGetEntityTableData = ({
  term,
  entityFuseSearchResult,
  getEntitiesQuery,
}: any) => {
  const [entityTableData, setEntityTableData] = useState([]);

  useEffect(() => {
    getEntityDataHandler({ reset: true });
  }, [term, entityFuseSearchResult]);

  const getEntityDataHandler = async ({ reset = false }: FetchMoreData) => {
    if (entityFuseSearchResult.length > 0) {
      const length = reset ? 0 : entityTableData.length;
      const lengthAdd = reset ? 15 : entityTableData.length + 15;
      const t = entityFuseSearchResult
        .slice(length, lengthAdd)
        .map((i: any) => i.item);
      const data = await getEntitiesQuery({
        variables: {
          where: {
            name_IN: t,
          },
        },
      });
      const entities = (data as any).data.entities;
      setEntityTableData(reset ? entities : entityTableData.concat(entities));
    } else {
      setEntityTableData([]);
    }
  };
  const entityData = useMemo(() => entityTableData, [entityTableData, term]);

  const hasMoreEntityData = useMemo(
    () => entityTableData.length < entityFuseSearchResult.length,
    [entityTableData, entityFuseSearchResult]
  );


  return {
    entityData,
    hasMoreEntityData,
    getEntityDataHandler,
  };
};

export const useGetTagsTableData = ({
  term,
  tagFusSearchResult,
  getTagsDataQuery,
}: any) => {
  const [tagTableData, setTagTableData] = useState([]);

  useEffect(() => {
    getTagDataHandler({ reset: true });
  }, [term, tagFusSearchResult]);

  const getTagDataHandler = async ({ reset = false }: FetchMoreData) => {
    if (tagFusSearchResult.length > 0) {
      const length = reset ? 0 : tagTableData.length;
      const lengthAdd = reset ? 15 : tagTableData.length + 15;
      const t = tagFusSearchResult
        .slice(length, lengthAdd)
        .map((i: any) => i.item);
      const data = await getTagsDataQuery({
        variables: {
          where: {
            tag_IN: t,
          },
        },
      });
      const tags = (data as any).data.tags;
      setTagTableData(reset ? tags : tagTableData.concat(tags));
    } else {
      setTagTableData([]);
    }
  };
  const tagData = useMemo(() => tagTableData, [tagTableData, term]);

  const hasMoreTagData = useMemo(
    () => tagTableData.length < tagFusSearchResult.length,
    [tagTableData, tagFusSearchResult]
  );

  return { tagData, hasMoreTagData, getTagDataHandler };
};
