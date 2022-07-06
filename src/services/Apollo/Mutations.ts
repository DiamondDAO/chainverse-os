import { DocumentNode, gql } from "@apollo/client";

// Create
export const CREATE_NOTES: DocumentNode = gql`
  mutation CreateNotes($input: [NoteCreateInput!]!) {
    createNotes(input: $input) {
      notes {
        uuid
        wallet {
          address
        }
        entities {
          name
        }
        tags {
          tag
        }
        sources {
          source
        }
      }
    }
  }
`;

export const CREATE_PARTNERSHIPS: DocumentNode = gql`
  mutation CreatePartnerships($input: [PartnershipCreateInput!]!) {
    createPartnerships(input: $input) {
      partnerships {
        uuid
        text
        entities {
          uuid
          name
        }
        sources {
          source
        }
      }
    }
  }
`;

export const CREATE_RESPONSES: DocumentNode = gql`
  mutation CreateResponses($input: [ResponseCreateInput!]!) {
    createResponses(input: $input) {
      responses {
        text
        wallet {
          address
        }
        prompt {
          text
        }
      }
    }
  }
`;

export const CREATE_WALLETS: DocumentNode = gql`
  mutation CreateWallets($input: [WalletCreateInput!]!) {
    createWallets(input: $input) {
      wallets {
        address
      }
    }
  }
`;

export const CREATE_WORKSPACES: DocumentNode = gql`
  mutation CreateWorkspaces($input: [WorkspaceCreateInput!]!) {
    createWorkspaces(input: $input) {
      workspaces {
        name
        wallet {
          address
        }
      }
    }
  }
`;

export const CREATE_ENTITIES: DocumentNode = gql`
  mutation CreateEntities($input: [EntityCreateInput!]!) {
    createEntities(input: $input) {
      entities {
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
        wallet {
          address
        }
      }
    }
  }
`;

export const ADD_SANDBOX_TO_WALLET: DocumentNode = gql`
  mutation UpdateWallets(
    $where: WalletWhere
    $connectOrCreate: WalletConnectOrCreateInput
  ) {
    updateWallets(where: $where, connectOrCreate: $connectOrCreate) {
      wallets {
        sandbox {
          blocks {
            ... on Note {
              tags {
                tag
              }
              text
              entities {
                name
              }
            }
            ... on Partnership {
              tags {
                tag
              }
              text
              entities {
                name
              }
            }
          }
        }
      }
    }
  }
`;

// UPDATE
export const UPDATE_SANDBOX: DocumentNode = gql`
  mutation UpdateSandboxes(
    $where: SandboxWhere
    $connect: SandboxConnectInput
  ) {
    updateSandboxes(where: $where, connect: $connect) {
      info {
        relationshipsCreated
      }
    }
  }
`;

export const UPDATE_NOTES: DocumentNode = gql`
  mutation UpdateNotes(
    $update: NoteUpdateInput
    $where: NoteWhere
    $disconnect: NoteDisconnectInput
  ) {
    updateNotes(update: $update, where: $where, disconnect: $disconnect) {
      notes {
        uuid
        wallet {
          address
        }
        entities {
          name
        }
        tags {
          tag
        }
        sources {
          source
        }
      }
    }
  }
`;

export const UPDATE_PARTNERSHIPS: DocumentNode = gql`
mutation UpdatePartnerships(
  $update: PartnershipUpdateInput
  $where: PartnershipWhere
  $disconnect: PartnershipDisconnectInput
) {
  updatePartnerships(update: $update, where: $where, disconnect: $disconnect) {
    partnerships {
      uuid
      text
      entities {
        uuid
        name
      }
      sources {
        uuid
        source
        sourceType
      }
    }
  }
}
`;

export const UPDATE_ENTITIES: DocumentNode = gql`
mutation UpdateEntities(
  $update: EntitypUpdateInput
  $where: EntityWhere
  $disconnect: EntityDisconnectInput
) {
  updateEntities(update: $update, where: $where, disconnect: $disconnect) {
    entities {
      uuid
      name
      id
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
}
`;


export const UPDATE_WORKSPACE: DocumentNode = gql`
  mutation Mutation(
    $where: WorkspaceWhere
    $update: WorkspaceUpdateInput
    $connect: WorkspaceConnectInput
  ) {
    updateWorkspaces(where: $where, update: $update, connect: $connect) {
      info {
        relationshipsCreated
      }
    }
  }
`;
// DELETE
export const DELETE_NOTES: DocumentNode = gql`
  mutation DeleteNotes($where: NoteWhere) {
    deleteNotes(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`;

export const DELETE_PARTNERSHIPS: DocumentNode = gql`
  mutation DeletePartnerships($where: PartnershipWhere) {
    deletePartnerships(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`;

export const DELETE_WORKSPACE: DocumentNode = gql`
  mutation DeleteWorkspaces($where: WorkspaceWhere) {
    deleteWorkspaces(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`;

export const DELETE_ENTITIES: DocumentNode = gql`
  mutation DeleteEntities($where: EntityWhere) {
    deleteEntities(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`;

export const RESET_SANDBOX: DocumentNode = gql`
  mutation UpdateSandboxes($disconnect: SandboxDisconnectInput) {
    updateSandboxes(disconnect: $disconnect) {
      info {
        relationshipsDeleted
      }
    }
  }
`;
