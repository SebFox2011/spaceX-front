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

function Ships({ classes }) {
  const { isLoading, error, data, isFetching } = useSpaceX("ships")
  if (isLoading ||isFetching) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des Navettes : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Id de la navette</TableCell>
            <TableCell align="right">Nom de la navette</TableCell>
            <TableCell align="right">Modèle</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Roles</TableCell>
            <TableCell align="right">imo</TableCell>
            <TableCell align="right">mmsi</TableCell>
            <TableCell align="right">abs</TableCell>
            <TableCell align="right">Classe</TableCell>
            <TableCell align="right">Poids (kg)</TableCell>
            <TableCell align="right">Année</TableCell>
            <TableCell align="right">Lieu</TableCell>
            <TableCell align="right">position</TableCell>
            <TableCell align="right">attérissages réussis</TableCell>
            <TableCell align="right">tentatives atterrissage</TableCell>
            <TableCell align="right">missions</TableCell>
            <TableCell align="right">url</TableCell>
            <TableCell align="right">image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.ship_id}</TableCell>
              <TableCell align="right">{n.ship_name}</TableCell>
              <TableCell align="right">{n.ship_model}</TableCell>
              <TableCell align="right">{n.ship_type}</TableCell>
              <TableCell align="right">{n.roles}</TableCell>
              <TableCell align="right">{n.imo}</TableCell>
              <TableCell align="right">{n.mmsi}</TableCell>
              <TableCell align="right">{n.abs}</TableCell>
              <TableCell align="right">{n.class}</TableCell>
              <TableCell align="right">{n.weight_kg}</TableCell>
              <TableCell align="right">{n.year_built}</TableCell>
              <TableCell align="right">{n.home_port}</TableCell>
              <TableCell align="right">{JSON.stringify(n.position)}</TableCell>
              <TableCell align="right">{n.successful_landings}</TableCell>
              <TableCell align="right">{n.attempted_landings}</TableCell>
              <TableCell align="right">{JSON.stringify(n.missions)}</TableCell>
              <TableCell align="center">{n.url?<a href={n.url}><WebIcon/></a>:null}</TableCell>
              <TableCell align="center">{n.image?<a href={n.image}><WebIcon/></a>:null}</TableCell>
            </TableRow>
          ]))}
        </TableBody>
      </Table>
    </div>
  );
}

Ships.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ships);