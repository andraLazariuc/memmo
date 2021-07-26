import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getResidentsByStatus, getResidentsBySpecies, getLocationGuests } from "./utils";

const useStyles = makeStyles({
    statisticsContainer: {
        fontSize: 12,
        margin: "10px 20px",
    }
});

const LocationResidentsStatistics = ({ residents = [] }) => {
    const classes= useStyles();
    const { alive, dead } = getResidentsByStatus(residents);
    const { robots, aliens, humans } = getResidentsBySpecies(residents);
    const guests = getLocationGuests(residents);

    return (
        <>
            <Typography color="textSecondary">
                <strong>Residents statistics:</strong>
            </Typography>
            <div className={classes.statisticsContainer}>
                <Typography color="textSecondary">
                    <strong>Alive residents:</strong> {alive}
                </Typography>
                <Typography color="textSecondary">
                    <strong>Dead residents:</strong> {dead}
                </Typography>
                <Typography color="textSecondary">
                    <strong>Guests:</strong> {guests}
                </Typography>
                <Typography color="textSecondary">
                    <strong>Robots vs. Aliens vs. Humans:</strong> {`${robots} vs. ${aliens} vs. ${humans}`}
                </Typography>
            </div>
        </>
    );
}

export default LocationResidentsStatistics;