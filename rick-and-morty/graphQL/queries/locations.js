import { gql } from "@apollo/client";

export const GET_PAGINATED_LOCATIONS_QUERY = gql `
  query getLocations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        name
        dimension
        type
        residents {
          id
        }
      }
    }
  }
`;

export const GET_LOCATIONS_ID_QUERY = gql `
  query getLocations($page: Int) {
    locations (page: $page) {
      info {
        pages
      }
      results {
        id
      }
    }
  }
`;

export const GET_LOCATION_BY_ID_QUERY = gql `
  query location($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        status
        species
        origin {
          id
        }
        location {
          id
        }
      }
    }
  }
`;