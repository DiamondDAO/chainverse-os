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
