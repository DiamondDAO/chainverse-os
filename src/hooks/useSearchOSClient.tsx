import { useContext } from 'react';
import { SearchOSClientContext } from '../context/SearchOS.context';

export const useSearchOSClient = () => {
  const context = useContext(SearchOSClientContext);
  if (context === undefined) {
    throw new Error(
      'useSearchOSClient must be used within a <SearchOSClientProvider />'
    );
  }
  return context;
};
