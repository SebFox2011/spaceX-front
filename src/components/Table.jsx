import React from 'react';
import PropTypes from 'prop-types';

const Table = ({classes,header,body,title, length}) => {

    return (
        <div className={classes.rootTable}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h6">{`Liste des ${title} : ${length}`}</Typography>
          </div>
        </Toolbar>
        <Table className={classNames(classes.table, classes.bordered)}>
          <TableHead>
            <TableRow>
                {header.map((item,id) => <TableCell key={id} align="center">{item}</TableCell> )}
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
                <TableCell align="right">{JSON.stringify(n.heat_shield)}</TableCell>
                <TableCell align="right">{JSON.stringify(n.thrusters)}</TableCell>
                <TableCell align="right">{n.launch_payload_mass.kg}</TableCell>
                <TableCell align="right">{n.launch_payload_vol.cubic_meters}</TableCell>
                <TableCell align="right">{n.return_payload_mass.kg}</TableCell>
                <TableCell align="right">{n.return_payload_vol.cubic_meters}</TableCell>
                <TableCell align="right">{n.pressurized_capsule.payload_volume.cubic_meters}</TableCell>
                <TableCell align="right">{JSON.stringify(n.trunk)}</TableCell>
                <TableCell align="right">{n.height_w_trunk.meters}</TableCell>
                <TableCell align="right">{n.diameter.meters}</TableCell>
                <TableCell align="right">{JSON.stringify(n.flickr_images)}</TableCell>
                <TableCell align="right">{n.wikipedia}</TableCell>
                <TableCell align="right">{n.description}</TableCell>
              </TableRow>
            ]))}
          </TableBody>
        </Table>
      </div>
      );
}

Table.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Table);