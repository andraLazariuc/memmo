import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

const LocationCard = ({ id, dimension, name, residents, type }) => {
	const classes = useStyles();

	return (
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
	);
}

export default LocationCard;