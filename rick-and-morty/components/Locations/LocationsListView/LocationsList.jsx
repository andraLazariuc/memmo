import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";

import { GET_PAGINATED_LOCATIONS_QUERY } from "../../../graphQL/queries";
import LocationCard from "./LocationCard";

export default function Locations({ page, filter, setTotalPageCount }) {
  const [
    loadLocations,
    { called, loading, data = {} },
  ] = useLazyQuery(GET_PAGINATED_LOCATIONS_QUERY, {
    variables: { page, filter },
  });

  const { locations: { info: { pages } = {}, results: locations } = {} } = data;

  useEffect(() => loadLocations(), [page, filter]);

  useEffect(() => setTotalPageCount(pages), [pages]);

  if (called && loading) return <p>Loading ...</p>;

  if (!locations) return <p>No data...</p>;

  return (
    <Grid container spacing={4}>
      {locations.map((location) => (
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <LocationCard {...location} />
        </Grid>
      ))}
    </Grid>
  );
}
