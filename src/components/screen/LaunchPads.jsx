import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import classNames from "classnames"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import styles from "./tableStyle-jss"
import { useQuery } from "react-query"
import CircularProgress from "@material-ui/core/CircularProgress"
import purple from "@material-ui/core/colors/purple"
import WebIcon from "@material-ui/icons/Web"
import useSpaceX from "../../apiHooks/useSpaceX"

function LaunchPads({ classes }) {
  const { isLoading, error, data, isFetching } = useSpaceX("launchpads")
  if (isLoading || isFetching)
    return <CircularProgress style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des sites de lancement : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">name</TableCell>
            <TableCell align="right">Full name</TableCell>
            <TableCell align="right">localité</TableCell>
            <TableCell align="right">region</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">vehicles lancés</TableCell>
            <TableCell align="left">tentatives</TableCell>
            <TableCell align="right">réussis</TableCell>
            <TableCell align="right">details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((n) => [
            <TableRow key={n.id}>
              <TableCell padding="default">{n.name}</TableCell>
              <TableCell align="right">{n.full_name}</TableCell>
              <TableCell align="right">{JSON.stringify(n.locality)}</TableCell>
              <TableCell align="center">{n.region}</TableCell>
              <TableCell align="right">{n.status}</TableCell>
              <TableCell align="right">
                {
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {n.launches.map((e) => (
                      <span>{e}</span>
                    ))}
                  </div>
                }
              </TableCell>
              <TableCell align="left">{n.launch_attempts}</TableCell>
              <TableCell align="right">{n.launch_successes}</TableCell>
              <TableCell align="right">{n.details}</TableCell>
            </TableRow>,
          ])}
        </TableBody>
      </Table>
    </div>
  )
}

LaunchPads.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LaunchPads)
