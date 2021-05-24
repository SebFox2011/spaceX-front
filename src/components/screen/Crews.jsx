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

const renderCell = element => {
  return 
}

function Payloads({ classes }) {

  const { isLoading, error, data, isFetching } = useQuery("repoCrews", () =>
    fetch("https://api.spacexdata.com/v4/crew").then((res) => res.json())
  )
  if (isLoading || isFetching) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />
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
            <TableCell align="center">agency</TableCell>
            <TableCell align="center">image</TableCell>
            <TableCell align="center">wikipedia</TableCell>
            <TableCell align="center">status</TableCell>
            <TableCell align="left">launches</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => ([
            <TableRow key={n.id}>
              <TableCell padding="default">{n.name}</TableCell>
              <TableCell align="center">{n.agency}</TableCell>
              <TableCell align="center"><img src={n.image} className={classes.img} alt={n.name} style={{width:'100px', height:'auto'}} onClick={()=> console.log(n.name)}/></TableCell>
              <TableCell align="center">{<a href={n.wikipedia}><WebIcon/></a>}</TableCell>
              <TableCell align="center">{n.status}</TableCell>
              <TableCell align="center">{JSON.stringify(n.launches)}</TableCell>
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