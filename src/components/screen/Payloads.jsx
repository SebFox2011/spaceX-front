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

function Payloads({ classes }) {
  const { isLoading, error, data, isFetching } = useSpaceX("payloads")
  if (isLoading || isFetching) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des Charges : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Id charge</TableCell>
            <TableCell align="right">Id norad</TableCell>
            <TableCell align="right">Réutilisé ?</TableCell>
            <TableCell align="right">customers</TableCell>
            <TableCell align="right">Nationalité</TableCell>
            <TableCell align="left">Fabricant</TableCell>
            <TableCell align="right">type charge</TableCell>
            <TableCell align="right">masse charge kg</TableCell>
            <TableCell align="right">orbit</TableCell>
            <TableCell align="left">paramètres d'orbit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.id}</TableCell>
              <TableCell align="right"><div style={{display:'flex',flexDirection:'column'}}>{n.norad_ids?.map(e => <span>{e}</span>)}</div> </TableCell>
              <TableCell align="right">{n.reused?<Icon>check</Icon>:null}</TableCell>
              <TableCell align="right">{n.customers.map(customer=><p>{customer}</p>)}</TableCell>
              <TableCell align="right">{n.nationalities.map(nationality=><p>{nationality}</p>)}</TableCell>
              <TableCell align="right">{n.manufacturers.map(manufacturer=><p>{manufacturer}</p>)}</TableCell>
              <TableCell align="right">{n.type}</TableCell>
              <TableCell align="right">{n.mass_kg}</TableCell>
              <TableCell align="right">{n.orbit}</TableCell>
              <TableCell align="right">{JSON.stringify(n.orbit_params)}</TableCell>
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