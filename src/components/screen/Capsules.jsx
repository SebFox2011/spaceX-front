import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import classNames from "classnames"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { useQuery } from "react-query"
import styles from "./tableStyle-jss"
import CircularProgress from "@material-ui/core/CircularProgress"
import purple from "@material-ui/core/colors/purple"
import useSpaceX from "../../apiHooks/useSpaceX"

function Capsules({ classes }) {
  const { isLoading, error, data, isFetching } = useSpaceX("capsules")
  if (isLoading || isFetching)
    return <CircularProgress style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">{`Liste des Capsules : ${data.length}`}</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Nom de la capsule</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Lancement</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="left">Derniere maj</TableCell>
            <TableCell align="right">Amerrisages</TableCell>
            <TableCell align="right">Atterissages</TableCell>
            <TableCell align="right">Nombre de rĂ©utilisations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((n) => [
            <TableRow key={n.id}>
              <TableCell padding="default">{n.serial}</TableCell>
              <TableCell align="right">{renderStatusCell(n.status)}</TableCell>
              <TableCell align="right">{JSON.stringify(n.launches)}</TableCell>
              <TableCell align="right">{n.type}</TableCell>
              <TableCell align="left">{n.last_update}</TableCell>
              <TableCell align="right">{n.water_landings}</TableCell>
              <TableCell align="right">{n.land_landings}</TableCell>
              <TableCell align="right">{n.reuse_count}</TableCell>
            </TableRow>,
          ])}
        </TableBody>
      </Table>
    </div>
  )
}

Capsules.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Capsules)

export const Capsule = ({ id }) => {
  const { isLoading, error, data, isFetching } = useQuery("capsule-${id}", () =>
    fetch(`https://api.spacexdata.com/v4/data/${id}/`).then((res) => res.json())
  )
  if (isLoading)
    return <CircularProgress style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  return (
    <div>
      <div>{isFetching ? "Updating..." : "Dragon: "}</div>
      <div key={id}>{JSON.stringify(data)}</div>
    </div>
  )
}

const getStatus = (status) => {
  switch (status) {
    case "destroyed":
      return "secondary"
    case "unknown":
      return "disabled"
    case "retired":
      return "action"
    case "active":
      return "primary"
    default:
      return "defaut"
  }
}
const renderStatusCell = (status) => (
  <Chip label={status} color={getStatus(status)} />
)
