import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from './tableStyle-jss';
import { useQuery } from "react-query"
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

function LaunchPads(props) {
  const { classes } = props;

  const { isLoading, error, data, isFetching } = useQuery("repoLaunchPads", () =>
    fetch("https://api.spacexdata.com/v3/launchpads").then((res) => res.json())
  )
  if (isLoading) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des sites de lancement : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">id</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">location</TableCell>
            <TableCell align="right">vehicles_launched</TableCell>
            <TableCell align="left">attempted_launches</TableCell>
            <TableCell align="right">successful_launches</TableCell>
            <TableCell align="right">wikipedia</TableCell>
            <TableCell align="right">details</TableCell>
            <TableCell align="right">site_id</TableCell>
            <TableCell align="right">site_name_long</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.id}</TableCell>
              <TableCell align="right">{n.name}</TableCell>
              <TableCell align="right">{n.status}</TableCell>
              <TableCell align="right">{JSON.stringify(n.location)}</TableCell>
              <TableCell align="right">{n.vehicles_launched}</TableCell>
              <TableCell align="left">{n.attempted_launches}</TableCell>
              <TableCell align="right">{n.successful_launches}</TableCell>
              <TableCell align="right">{n.wikipedia}</TableCell>
              <TableCell align="right">{n.details}</TableCell>
              <TableCell align="right">{n.site_id}</TableCell>
              <TableCell align="right">{n.site_name_long}</TableCell>
            </TableRow>
          ]))}
        </TableBody>
      </Table>
    </div>
  );
}

LaunchPads.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LaunchPads);