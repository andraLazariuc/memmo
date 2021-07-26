import { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Locations from "./LocationsList";
import LocationFilters from "./LocationsFilters";
import Pagination from "../../Pagination";

const useStyles = makeStyles({
	description: {
		fontSize: 34,
	},
	pos: {
		margin: 20,
	},
});

export default function Home() {
	const classes = useStyles();

	const [locationFilters, setLocationFilters] = useState({
		type: "",
		dimension: "",
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPageCount, setTotalPageCount] = useState(1);

	useEffect(() => setCurrentPage(1), [locationFilters])

	// TODO: There is no mention in docs about the possible types and dimensions, no queries to fetch them
	// so go through all locations and construct the types and dimensions array
	const locationTypes = [
		"Planet",
		"Cluster",
		"Space station",
		"Microverse",
		"Post-Apocalyptic Earth",
	];
	const locationDimensions = [
		"Dimension C-137",
		"unknown",
		"Post-Apocalyptic Dimension",
	];

	const handleLoationsPageChange = (page) => setCurrentPage(page);

	return (
		<>
			<Typography className={classes.description}>
				Locations available in Rick and Morty's world
			</Typography>

			<Grid container
				direction="column"
				justifyContent="space-around"
				alignItems="center">
				<Grid item xs={12} className={classes.pos}>
					<LocationFilters
						locationActiveFilters={locationFilters}
						types={locationTypes}
						dimensions={locationDimensions}
						onChangeHandler={(newFilters) => setLocationFilters(newFilters)}
					/>
				</Grid>
				<Grid item xs={12} className={classes.pos}>
					<Locations
						page={currentPage}
						filter={locationFilters}
						setTotalPageCount={setTotalPageCount}
					/>
				</Grid>
				<Grid item xs={12} className={classes.pos}>
					<Pagination
						currentPage={currentPage}
						totalPageCount={totalPageCount ?? 10}
						onPageChangeHandler={handleLoationsPageChange}
					/>
				</Grid>
			</Grid>
		</>
	);
}

