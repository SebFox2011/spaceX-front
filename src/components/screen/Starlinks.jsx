import React, { useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import classNames from "classnames"
import Modal from "@material-ui/core/Modal"
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
import { Icon } from "@material-ui/core"
import {formatNumber} from "../../utils/formatNumber"
import {formatDate} from "../../utils/fomatDate"

const Starlinks = ({ classes }) => {
  const [isOpenDialog, setOpenDialog] = useState(false)
  const [item, setItem] = useState(0)
  const { isLoading, error, data, isFetching } = useQuery(
    "repoStartlinks",
    () =>
      fetch("https://api.spacexdata.com/v4/starlink").then((res) => res.json())
  )
  if (isFetching)
    return <CircularProgress style={{ color: purple[500] }} thickness={7} />
  if (error) return "An error has occurred: " + error.message

  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleModal = (datas) => {
    setOpenDialog(true)
    setItem(datas)
  }

  const count = () => {
    const result = []
    const versionId = new Set(data.map(e=>e.version))
    versionId.forEach(id => {
      const nbr = data.filter(e => e.version === id)
      result.push({[id]:nbr.length})
    })
    return result
  }
  const versionNumber = count()
  return (
    <div className={classes.rootTable}>
       <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpenDialog}
        onClose={handleClose}
      >
        <div
          style={
            {top:'50%', left: "50%",
            transform: "translate(-50%, -50%)",
            position : "absolute",
            width : '1000px',
            height:'500px',
            background : 'white',
            padding : '15px'}
          }
        >
          <Typography variant="h6" id="modal-title">
            {`${item.OBJECT_NAME} - ${item.COMMENT} création: ${formatDate(item.CREATION_DATE)} `}
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            {`${item.COMMENT} ${item.TLE_LINE0}`}
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            {`${item.TLE_LINE1} ${item.TLE_LINE2}`}
          </Typography>
          <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
          <div style={{display:'flex',flexDirection:'column', flexWrap:'wrap'}}>
           {formatDate(item.CREATION_DATE)}
           <span>{`MEAN_MOTION: ${item.MEAN_MOTION}`}</span>
           <span>{`ECCENTRICITY: ${item.ECCENTRICITY}`}</span>
           <span>{`INCLINATION: ${item.INCLINATION}`}</span>
           <span>{`RA_OF_ASC_NODE: ${item.RA_OF_ASC_NODE}`}</span>
           <span>{`ARG_OF_PERICENTER: ${item.ARG_OF_PERICENTER}`}</span>
           <span>{`MEAN_ANOMALY: ${item.MEAN_ANOMALY}`}</span>
           <span>{`EPHEMERIS_TYPE: ${item.EPHEMERIS_TYPE}`}</span>
           <span>{`CLASSIFICATION_TYPE: ${item.CLASSIFICATION_TYPE}`}</span>
           <span>{`NORAD_CAT_ID: ${item.ELEMENT_SET_NO}`}</span>
           <span>{`REV_AT_EPOCH: ${item.REV_AT_EPOCH}`}</span>
           <span>{`BSTAR: ${item.BSTAR}`}</span>
           <span>{`MEAN_MOTION_DOT: ${item.MEAN_MOTION_DOT}`}</span>
           <span>{`MEAN_MOTION_DDOT: ${item.MEAN_MOTION_DDOT}`}</span>
           <span>{`SEMIMAJOR_AXIS: ${item.SEMIMAJOR_AXIS}`}</span>
          </div>   
          <div style={{display:'flex',flexDirection:'column', flexWrap:'wrap'}}>
           <span>{`PERIOD: ${item.PERIOD}`}</span>
           <span>{`APOAPSIS: ${item.APOAPSIS}`}</span>
           <span>{`PERIAPSIS: ${item.PERIAPSIS}`}</span>
           <span>{`OBJECT_TYPE: ${item.OBJECT_TYPE}`}</span>
           <span>{`RCS_SIZE: ${item.RCS_SIZE}`}</span>
           <span>{`COUNTRY_CODE: ${item.COUNTRY_CODE}`}</span>
           <span>{`SITE: ${item.SITE}`}</span>
           <span>{`DECAY_DATE: ${item.DECAY_DATE}`}</span>
           <span>{`PERIOD: ${item.PERIOD}`}</span>
           <span>{`PERIOD: ${item.PERIOD}`}</span>
           <span>{`PERIOD: ${item.PERIOD}`}</span>
           <span>{`PERIOD: ${item.PERIOD}`}</span>
          </div>   
        </div>
        </div>
      </Modal>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">
            {`Liste des Starlinks : ${data.length}`} 
            {/* {`${Object.entries(versionNumber).forEach(([key,value]) => {return <span> ${key} ${value} </span> })})}`} */}
          </Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Nom</TableCell>
            <TableCell align="right">version</TableCell>
            <TableCell align="right">Date de lancement</TableCell>
            <TableCell align="right">Detail du satellite</TableCell>
            <TableCell align="right">longitude</TableCell>
            <TableCell align="right">latitude</TableCell>
            <TableCell align="left">height (km)</TableCell>
            <TableCell align="right">velocity (km)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((n) => [
            <TableRow key={n.id}>
              <TableCell padding="default">{n.spaceTrack.OBJECT_NAME}</TableCell>
              <TableCell align="right">{n.version}</TableCell>
              <TableCell align="right">{n.spaceTrack.LAUNCH_DATE}</TableCell>
              <TableCell align="center">
                <Icon onClick={() => handleModal(n.spaceTrack)}>open_in_new</Icon>
              </TableCell>
              <TableCell align="right">{formatNumber(n.longitude,2)}</TableCell>
              <TableCell align="right">{formatNumber(n.latitude,2)}</TableCell>
              <TableCell align="left">{formatNumber(n.height_km,2)}</TableCell>
              <TableCell align="right">{formatNumber(n.velocity_kms,2)}</TableCell>
            </TableRow>,
          ])}
        </TableBody>
      </Table>
     
    </div>
  )
}
Starlinks.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Starlinks)
