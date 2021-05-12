import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useQuery } from "react-query"
import styles from './tableStyle-jss';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

function Capsules(props) {
  const { classes } = props;

  const { isLoading, error, data, isFetching } = useQuery("repoCapsules", () =>
    fetch("https://api.spacexdata.com/v3/capsules").then((res) => res.json())
  )
  if (isLoading) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Liste des capsules</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Nom de la capsule</TableCell>
            <TableCell align="right">Capsule ID</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Date de lancement</TableCell>
            <TableCell align="right">Missions</TableCell>
            <TableCell align="left">Details</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Atterissages</TableCell>
            <TableCell align="right">Nombre de réutilisations</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.capsule_serial}</TableCell>
              <TableCell align="right">{n.capsule_id}</TableCell>
              <TableCell align="right">{renderStatusCell(n.status)}</TableCell>
              <TableCell align="right">{n.original_launch}</TableCell>
              <TableCell align="right">{`Nom: ${n.missions.name} - Vol: ${n.missions.flight}`}</TableCell>
              <TableCell align="left">{n.details}</TableCell>
              <TableCell align="right">{n.type}</TableCell>
              <TableCell align="right">{n.landings}</TableCell>
              <TableCell align="right">{n.reuse_count}</TableCell>
              
            </TableRow>
          ]))}
        </TableBody>
      </Table>
    </div>
  );
}

Capsules.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Capsules);

export const Capsule = ({ id }) => {
    console.log(id)
    const { isLoading, error, data, isFetching } = useQuery("capsule-${id}", () =>
      fetch(`https://api.spacexdata.com/v3/capsules/${id}/`).then((res) =>
        res.json()
      )
    )
    if (isLoading) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
    if (error) return "An error has occurred: " + error.message
  
    return (
      <div>
        <div>{isFetching ? "Updating..." : "Dragon: "}</div>
        <div key={id}>{JSON.stringify(data)}</div>
      </div>
    )
  }
  
  const getStatus = status => {
    switch (status) {
      case 'destroyed': return 'secondary';
      case 'unknown': return 'disabled';
      case 'retired': return 'action';
      case 'active': return 'primary';
      default: return 'defaut'
    }
  }
  const renderStatusCell = (status) => <Chip label={status} color={getStatus(status)} />