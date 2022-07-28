export const filterUniqueObjects = (objectArray: any[], key: string) => {
  const tempArray: any[] = [];
  return objectArray?.filter((object) => {
    if (tempArray.includes(object[key])) {
      return false;
    } else {
      tempArray.push(object[key]);
      return true;
    }
  });
};

export const convertToUniqueArray = (objectArray: any[] = [], key: string) => {
  const uniqueValues = new Set(objectArray.map((i: any) => i[key]))
  //@ts-ignore
  return [...uniqueValues];
};
