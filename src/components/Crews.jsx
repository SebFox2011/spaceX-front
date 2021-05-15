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

const renderCell = element => {
  return 
}

function Payloads(props) {
  const { classes } = props;

  const { isLoading, error, data, isFetching } = useQuery("repoPayloads", () =>
    fetch("https://api.spacexdata.com/v4/crew").then((res) => res.json())
  )
  if (isLoading) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des Equipages : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">name</TableCell>
            <TableCell align="right">agency</TableCell>
            <TableCell align="right">image</TableCell>
            <TableCell align="right">wikipedia</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="left">launches</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.name}</TableCell>
              <TableCell align="right">{n.agency}</TableCell>
              <TableCell align="right">{n.image}</TableCell>
              <TableCell align="right">{n.wikipedia}</TableCell>
              <TableCell align="right">{n.status}</TableCell>
              <TableCell align="right">{JSON.stringify(n.launches)}</TableCell>
            </TableRow>
          ]))}
        </TableBody>
      </Table>
    </div>
  );
}

Payloads.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Payloads);