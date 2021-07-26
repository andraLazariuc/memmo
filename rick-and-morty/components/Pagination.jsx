import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function PaginationControlled({ currentPage, totalPageCount, onPageChangeHandler }) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        if (onPageChangeHandler) {
            onPageChangeHandler(value);
        }
    };

    return (
        <div className={classes.root}>
            <Typography>Page: {currentPage}</Typography>
            <Pagination count={totalPageCount ?? 10} page={currentPage} onChange={handleChange} />
        </div>
    );
}