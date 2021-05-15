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

function Launches(props) {
  const { classes } = props;

  const { isLoading, error, data, isFetching } = useQuery("repoLaunches", () =>
    fetch("https://api.spacexdata.com/v3/Launches").then((res) => res.json())
  )
  if (isLoading) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des Lancements : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Numero</TableCell>
            <TableCell align="right">Nom de la mission</TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Année</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="left">Tentative?</TableCell>
            <TableCell align="right">rocket</TableCell>
            <TableCell align="right">ships</TableCell>
            <TableCell align="right">telemetry</TableCell>
            <TableCell align="right">launch_site</TableCell>
            <TableCell align="right">launch_success</TableCell>
            <TableCell align="right">links</TableCell>
            <TableCell align="right">details</TableCell>
            <TableCell align="right">upcoming</TableCell>
            <TableCell align="right">timeline</TableCell>
            <TableCell align="right">crew</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.flight_number}</TableCell>
              <TableCell align="right">{n.mission_name}</TableCell>
              <TableCell align="right">{n.mission_id}</TableCell>
              <TableCell align="right">{n.launch_year}</TableCell>
              <TableCell align="right">{n.launch_date_utc}</TableCell>
              <TableCell align="left">{n.is_tentative}</TableCell>
              <TableCell align="right">{JSON.stringify(n.rocket)}</TableCell>
              <TableCell align="right">{n.ships}</TableCell>
              <TableCell align="right">{JSON.stringify(n.telemetry)}</TableCell>
              <TableCell align="right">{n.launch_success}</TableCell>
              <TableCell align="right">{JSON.stringify(n.links)}</TableCell>
              <TableCell align="right">{n.details}</TableCell>
              <TableCell align="right">{JSON.stringify(n.timeline)}</TableCell>
              <TableCell align="right">{JSON.stringify(n.timeline)}</TableCell>
            </TableRow>
          ]))}
        </TableBody>
      </Table>
    </div>
  );
}

Launches.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Launches);