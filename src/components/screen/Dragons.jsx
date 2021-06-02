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
import useSpaceX from "../../apiHooks/useSpaceX"

const Dragons = ({classes}) => {
  const { isLoading, error, data, isFetching } = useSpaceX("dragons")
    if (isLoading || isFetching) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des Dragons : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">type</TableCell>
            <TableCell align="right">active</TableCell>
            <TableCell align="right">Taille équipe</TableCell>
            <TableCell align="left">angle sidewall</TableCell>
            <TableCell align="right">Masse</TableCell>
            <TableCell align="right">Premier vol</TableCell>
            <TableCell align="right" width="15%">Bouclier thermique</TableCell>
            <TableCell align="right" width="15%">thrusters</TableCell>
            <TableCell align="right">Masse charge au lancement (kg)</TableCell>
            <TableCell align="right">Volume charge au lancement (m3)</TableCell>
            <TableCell align="right">Masse charge au retour (kg)</TableCell>
            <TableCell align="right">Volume charge au retour (m3)</TableCell>
            <TableCell align="right">Capsule pressurisée (m3)</TableCell>
            <TableCell align="right">trunk</TableCell>
            <TableCell align="right">Hauteur</TableCell>
            <TableCell align="right">Diamètre</TableCell>
            <TableCell align="right">Images Flickr</TableCell>
            <TableCell align="right">Wikipedia</TableCell>
            <TableCell align="right" width="25%">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell align="right">{n.name}</TableCell>
              <TableCell align="right">{n.type}</TableCell>
              <TableCell align="right">{n.active?<Icon>check</Icon>:null}</TableCell>
              <TableCell align="right">{n.crew_capacity}</TableCell>
              <TableCell align="left">{n.sidewall_angle_deg}</TableCell>
              <TableCell align="right">{n.dry_mass_kg}</TableCell>
              <TableCell align="right">{n.first_flight}</TableCell>
              <TableCell align="right" width="15%">{JSON.stringify(n.heat_shield)}</TableCell>
              <TableCell align="right" width="15%">{JSON.stringify(n.thrusters)}</TableCell>
              <TableCell align="right">{n.launch_payload_mass.kg}</TableCell>
              <TableCell align="right">{n.launch_payload_vol.cubic_meters}</TableCell>
              <TableCell align="right">{n.return_payload_mass.kg}</TableCell>
              <TableCell align="right">{n.return_payload_vol.cubic_meters}</TableCell>
              <TableCell align="right">{n.pressurized_capsule.payload_volume.cubic_meters}</TableCell>
              <TableCell align="right">{JSON.stringify(n.trunk)}</TableCell>
              <TableCell align="right">{n.height_w_trunk.meters}</TableCell>
              <TableCell align="right">{n.diameter.meters}</TableCell>
              <TableCell align="right">{n.flickr_images.map(image=> <p>{image}</p>)}</TableCell>
              <TableCell align="right">{n.wikipedia}</TableCell>
              <TableCell align="right" width="25%">{n.description}</TableCell>
            </TableRow>
          ]))}
        </TableBody>
      </Table>
    </div>
    );
    
  }
  Dragons.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Dragons);