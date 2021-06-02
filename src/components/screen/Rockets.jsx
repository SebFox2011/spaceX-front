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
import WebIcon from '@material-ui/icons/Web';
import useSpaceX from "../../apiHooks/useSpaceX"

function Rockets ({ classes }) {
  const { isLoading, error, data, isFetching } = useSpaceX("rockets")
  if (isLoading || isFetching) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des Rockets : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Nom</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Active?</TableCell>
            <TableCell align="right">Etages</TableCell>
            <TableCell align="right">Boosters</TableCell>
            <TableCell align="left">Premier vol</TableCell>
            <TableCell align="left">Pays</TableCell>
            <TableCell align="left">Companie</TableCell>
            <TableCell align="right" width="25%">description</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.name}</TableCell>
              <TableCell align="right">{n.type}</TableCell>
              <TableCell align="right">{n.active}</TableCell>
              <TableCell align="center">{n.stages}</TableCell>
              <TableCell align="center">{n.boosters}</TableCell>
              <TableCell align="center">{n.first_flight}</TableCell>
              <TableCell align="center">{n.country}</TableCell>
              <TableCell align="center">{n.company}</TableCell>
              <TableCell align="right" width="25%">{n.description}</TableCell>
            </TableRow>
          ]))}
        </TableBody>
      </Table>
    </div>
  );
}

Rockets .propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rockets );