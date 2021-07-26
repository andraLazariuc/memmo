import Link from "next/link";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { GET_PAGINATED_LOCATIONS_QUERY } from "../../../graphQL/queries";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
  },
  name: {
    fontSize: 18,
    color: "blue",
    cursor: "pointer",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    margin: 6,
  },
});

export default function Locations({ page, filter, setTotalPageCount }) {
  const classes = useStyles();

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
      {locations.map(({ id, dimension, name, residents, type }) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={id} >
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Link
                href={{
                  pathname: "/locations/[id]",
                  query: { id },
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.name}
                  gutterBottom
                >
                  {name}
                </Typography>
              </Link>
              <Typography className={classes.pos} color="textSecondary">
                <strong>Type:</strong> {type}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <strong>Dimension:</strong> {dimension}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <strong>Residents:</strong> {residents?.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
