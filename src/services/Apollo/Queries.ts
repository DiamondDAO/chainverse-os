import { DocumentNode, gql } from "@apollo/client";

export const GET_NOTES: DocumentNode = gql`
  query Notes($where: WalletWhere) {
    wallets(where: $where) {
      blocks {
        ... on Note {
          text
          uuid
          sources {
            source
          }
          tags {
            tag
          }
          createdAt
          wallet {
            address
          }
          entities {
            name
          }
        }
      }
    }
  }
`;

export const GET_ALL_NOTES: DocumentNode = gql`
  query Notes {
    notes {
      text
      sources {
        source
      }
      tags {
        tag
      }
      createdAt
      wallet {
        address
      }
      entities {
        name
      }
    }
  }
`;

export const GET_PARTNERSHIPS: DocumentNode = gql`
  query Partnerships($where: WalletWhere) {
    wallets(where: $where) {
      blocks {
        ... on Partnership {
          text
          type
          uuid
          sources {
            source
          }
          tags {
            tag
          }
          createdAt
          wallet {
            address
          }
          entities {
            name
          }
        }
      }
    }
  }
`;

export const GET_ALL_PARTNERSHIPS: DocumentNode = gql`
  query Partnerships {
    partnerships {
      text
      type
      sources {
        source
      }
      tags {
        tag
      }
      createdAt
      wallet {
        address
      }
      entities {
        name
      }
    }
  }
`;

export const GET_ALL_BLOCKS: DocumentNode = gql`
  query Wallets($where: WalletWhere) {
    wallets(where: $where) {
      blocks {
        ... on Note {
          text
          uuid
          sources {
            source
          }
          tags {
            tag
          }
          createdAt
          wallet {
            address
          }
          entities {
            name
          }
        }
        ... on Partnership {
          text
          type
          uuid
          sources {
            source
          }
          tags {
            tag
          }
          createdAt
          wallet {
            address
          }
          entities {
            name
            uuid
          }
        }
      }
    }
  }
`;


export const GET_BLOCK_DATA: DocumentNode = gql`
  query Notes($where: NoteWhere) {
    notes(where: $where) {
      text
      uuid
      createdAt
      sources {
        source
      }
      tags {
        tag
      }
      wallet {
        address
      }
      entities {
        name
      }
    }
  }
`;

export const GET_TAGS_AND_ENTITIES: DocumentNode = gql`
  query Tags {
    tags {
      tag
    }
    entities {
      name
    }
  }
`;

export const GET_ENTITIES_DATA: DocumentNode = gql`
  query Entities($where: EntityWhere) {
    entities(where: $where) {
      id
      uuid
      name
      avatar
      onChain
      network
      address {
        address
      }
      addressSource {
        source
      }
      twitter {
        profileUrl
      }
      discord
      github
      website
    }
  }
`;

export const GET_TAG_DATA: DocumentNode = gql`
  query Tags($where: TagWhere) {
    tags(where: $where) {
      uuid
      tag
      createdAt
      blocksConnection {
        totalCount
      }
    }
  }
`;

export const GET_ALL_CREATED: DocumentNode = gql`
  query Wallets($where: WalletWhere) {
    wallets(where: $where) {
      blocks {
        ... on Note {
          text
          uuid
          sources {
            source
          }
          tags {
            tag
          }
          createdAt
          wallet {
            address
          }
          entities {
            name
          }
        }
        ... on Partnership {
          text
          type
          uuid
          sources {
            source
          }
          tags {
            tag
          }
          createdAt
          wallet {
            address
          }
          entities {
            name
            uuid
          }
        }
      }
      entities {
        ... on Entity {
          uuid
          name
          onChain
          network
          address {
            address
          }
          addressSource {
            source
          }
          twitter {
            profileUrl
          }
          discord
          github
          website
        }
      }
    }
  }
`;

export const GET_WALLET_COUNT: DocumentNode = gql`
  query Query($where: WalletWhere) {
    walletsCount(where: $where)
  }
`;

export const GET_PROMPT_INFO: DocumentNode = gql`
  query Prompts($promptWhere: PromptWhere, $blockWhere: BlockWhere) {
    prompts(where: $promptWhere) {
      text
      blocks(where: $blockWhere) {
        ... on Response {
          text
          wallet {
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_SANDBOX: DocumentNode = gql`
  query Sandboxes($where: SandboxWhere) {
    sandboxes(where: $where) {
      name
      entities {
        name
        uuid
        address {
          address
        }
        avatar
      }
      blocks {
        ... on Note {
          text
          createdAt
          uuid
          wallet {
            address
          }
          tags {
            tag
          }
          entities {
            name
          }
          sources {
            source
          }
        }
        ... on Partnership {
          text
          type
          uuid
          wallet {
            address
          }
          tags {
            tag
          }
          entities {
            name
          }
          sources {
            source
          }
        }
      }
    }
  }
`;

export const GET_WORKSPACES: DocumentNode = gql`
  query Query {
    workspaces {
      uuid
      name
      blocks {
        ... on Note {
          text
          uuid
        }
        ... on Partnership {
          text
          type
          uuid
        }
      }
      entities {
        name
        uuid
      }
    }
  }
`;

export const GET_WORKSPACE_OWNED = gql`
  query Workspaces($where: WorkspaceWhere) {
    workspaces(where: $where) {
      uuid
      name
      blocks {
        ... on Note {
          text
          uuid
        }
        ... on Partnership {
          text
          type
          uuid
        }
      }
      entities {
        name
        uuid
        address {
          address
        }
        avatar
      }
    }
  }
`;

export const GET_WORKSPACE: DocumentNode = gql`
  query Query($where: WorkspaceWhere) {
    workspaces(where: $where) {
      name
      rfObject
      entities {
        name
        uuid
        avatar
      }
      blocks {
        ... on Note {
          text
          createdAt
          uuid
          wallet {
            address
          }
          tags {
            tag
          }
          entities {
            name
          }
          sources {
            source
          }
        }
        ... on Partnership {
          text
          type
          createdAt
          uuid
          wallet {
            address
          }
          tags {
            tag
          }
          entities {
            name
          }
          sources {
            source
          }
        }
      }
    }
  }
`;

export const GET_SEARCH_ALL: DocumentNode = gql`
query FuzzyChainversePortalSearch($searchString: String, $skip: Int, $limit: Int) {
  fuzzyChainversePortalSearch(searchString: $searchString, skip: $skip, limit: $limit) {
    ... on Entity {
      uuid
      name
      notesAggregate {
        count
      }
      proposalsAggregate {
        count
      }
    }
  }
}
`
