// context
import SearchOSClientProvider from './context/SearchOS.context'
export {SearchOSClientProvider as default}
export * from './context/SearchOS.context'

// components
export * from './components/SearchOS';

// schemas
export * from './services/Apollo/typedefs';
import * as queries from './services/Apollo/Queries';
import * as mutations from './services/Apollo/Mutations';
export { queries, mutations };

// hoks
export * from './hooks/useSearchOSClient'

// enums
export enum SearchTypes {
  Blocks = "blocks",
  Tags = "tags",
  Entities = "entities",
}
