// import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  filterContaniers: {
    margin: 30
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
  select: {
    minWidth: 120,
  },
}));

export default function LocationFilters({
  locationActiveFilters = {},
  types,
  dimensions,
  onChangeHandler,
}) {
  const classes = useStyles();

  const { type, dimension } = locationActiveFilters;

  const handleTypeChange = (event) => onChangeHandler({ ...locationActiveFilters, type: event.target.value });
  const handleDimensionChange = (event) => onChangeHandler({ ...locationActiveFilters, dimension: event.target.value });

  return (
    <Grid container spacing={6} className={classes.filterContaniers}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-type-label">Type</InputLabel>
        <Select
          labelId="outlined-type-label"
          id="outlined-type"
          value={type}
          onChange={handleTypeChange}
          label="Type"
        >
          <MenuItem key="all" value=""><em>All</em></MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-dimension-label">Dimension</InputLabel>
        <Select
          labelId="outlined-dimension-label"
          id="outlined-dimension"
          value={dimension}
          onChange={handleDimensionChange}
          label="Dimension"
        >
          <MenuItem key="all" value=""><em>All</em></MenuItem>
          {dimensions.map((dimension) => (
            <MenuItem key={dimension} value={dimension}>{dimension}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
