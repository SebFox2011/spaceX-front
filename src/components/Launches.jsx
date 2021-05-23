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
import { Icon } from '@material-ui/core';
import {formatDate} from '../utils/fomatDate'

function Launches({ classes }) {

  const { isLoading, error, data, isFetching } = useQuery("repoLaunches", () =>
    fetch("https://api.spacexdata.com/v4/Launches").then((res) => res.json())
  )
  if (isLoading || isFetching) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
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
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">rocket</TableCell>
            <TableCell align="right">ships</TableCell>
            <TableCell align="right">telemetry</TableCell>
            <TableCell align="right">site décollage</TableCell>
            <TableCell align="right">Décollage réussi ?</TableCell>
            <TableCell align="right">Liens</TableCell>
            <TableCell align="right">details</TableCell>
            <TableCell align="right">upcoming</TableCell>
            <TableCell align="right">timeline</TableCell>
            <TableCell align="right">Equipage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.flight_number}</TableCell>
              <TableCell align="right">{n.name}</TableCell>
              <TableCell align="right">{formatDate(n.date_utc)}</TableCell>
              <TableCell align="right">{JSON.stringify(n.rocket)}</TableCell>
              <TableCell align="right">{n.ships.map(ship=><p>{ship}</p>)}</TableCell>
              <TableCell align="right">{JSON.stringify(n.telemetry)}</TableCell>
              <TableCell align="right">{JSON.stringify(n.launch_site)}</TableCell>
              <TableCell align="right">{n.success?<Icon>check</Icon>:<Icon>cancel</Icon>}</TableCell>
              <TableCell align="right">{JSON.stringify(n.links)}</TableCell>
              <TableCell align="right">{n.details}</TableCell>
              <TableCell align="right">{n.upcoming?<Icon>check</Icon>:null}</TableCell>
              <TableCell align="right">{JSON.stringify(n.timeline)}</TableCell>
              <TableCell align="right">{n.crew.map(e=><p>{e}</p>)}</TableCell>
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