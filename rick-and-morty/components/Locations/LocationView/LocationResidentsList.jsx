import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        marginBottom: 30,
    }
}));

const LocationResidents = ({ residents = [] }) => {
    const classes = useStyles();

    return (
        <>
            <Typography color="textSecondary">
                <strong>Residents list:</strong>
            </Typography>
            <List className={classes.root}>
                {residents.map(({ id, name, status, species, gender, image }) => (
                    <ListItem key={id}>
                        <ListItemAvatar>
                            <Avatar alt={name} src={image} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={name}
                            secondary={`${status}, ${species}, ${gender}`}
                        />
                    </ListItem>
                ))}
            </List>
        </>
    );
}

export default LocationResidents;
