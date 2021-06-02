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

function MissionsTable({ classes }) {
  const { isLoading, error, data, isFetching } = useQuery("repoMissions", () =>
    fetch("https://api.spacexdata.com/v3/missions").then((res) => res.json())
  )
  if (isLoading || isFetching) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des Missions : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Nom de la mission</TableCell>
            <TableCell align="right">Mission ID</TableCell>
            <TableCell align="right">Fabriquants</TableCell>
            <TableCell align="right">Wikipedia</TableCell>
            <TableCell align="right">Site internet</TableCell>
            <TableCell align="left">Twitter</TableCell>
            <TableCell align="right">description</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.mission_name}</TableCell>
              <TableCell align="right">{n.mission_id}</TableCell>
              <TableCell align="right">{n.manufacturers}</TableCell>
              <TableCell align="center">{n.wikipedia?<a href={n.wikipedia}><WebIcon/></a>:null}</TableCell>
              <TableCell align="center">{n.website?<a href={n.website}><WebIcon/></a>:null}</TableCell>
              <TableCell align="center">{n.twitter?<a href={n.twitter}><WebIcon/></a>:null}</TableCell>
              <TableCell align="right">{n.description}</TableCell>
            </TableRow>
          ]))}
        </TableBody>
      </Table>
    </div>
  );
}

MissionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MissionsTable);