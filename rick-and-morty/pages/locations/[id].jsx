import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import client from "../../apollo-client";
import {
  GET_LOCATIONS_ID_QUERY,
  GET_LOCATION_BY_ID_QUERY,
} from "../../graphQL/queries";

import LocationResidentsStatistics from "../../components/Locations/LocationView/LocationResidentsStatistics";
import LocationResidentsList from "../../components/Locations/LocationView/LocationResidentsList";

const useStyles = makeStyles({
  name: {
    marginBottom: 30,
  },
  pos: {
    margin: 20,
  },
});

export default function Location({ location }) {
  const classes = useStyles();
  const { dimension, name, residents, type } = location;

  return (
    <>
      <h1 className="title">
        Welcome to <Link href="/">Rick and Morty 's world!</Link>
      </h1>

      <Typography variant="h5" component="h2" className={classes.name}>
        Location - {name}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        <strong>Type:</strong> {type}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        <strong>Dimension:</strong> {dimension}
      </Typography>
      <div className={classes.pos}>
        <LocationResidentsStatistics residents={residents} />
        <LocationResidentsList residents={residents} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Get the paths we want to pre-render based on locations
  let locations = [];
  const {
    data: {
      locations: {
        info: { pages },
        results: locationsFirstPage = [],
      },
    } = {},
  } = await client.query({
    query: GET_LOCATIONS_ID_QUERY,
    variables: { page: 1 },
  });
  locations=locations.concat(locationsFirstPage);

  for (let page = 2; page <= pages; page++) {
    const {
      data: { locations: { results: locationsNextPage = [] } } = {},
    } = await client.query({
      query: GET_LOCATIONS_ID_QUERY,
      variables: { page },
    });
    locations = locations.concat(locationsNextPage);
  }

  const paths = locations.map((location) => ({
    params: { id: location.id },
  }));

  // We'll pre-render only these paths at build time.
  // {fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const {
    data: { location },
  } = await client.query({
    query: GET_LOCATION_BY_ID_QUERY,
    variables: { id: params.id },
  });
  // Pass post data to the page via props
  return { props: { location } };
}
