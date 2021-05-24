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

const Starlinks = ({ classes }) => {
  const [isOpenDialog, setOpenDialog] = useState(false)
  const [item, setItem] = useState(0)
  const { isLoading, error, data, isFetching } = useQuery(
    "repoStartlinks",
    () =>
      fetch("https://api.spacexdata.com/v4/starlink").then((res) => res.json())
  )
  if (isLoading || isFetching)
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
          className={classes.paper}
        >
          <Typography variant="h6" id="modal-title">
            {`${item.OBJECT_NAME} - ${item.COMMENT} création: ${item.CREATION_DATE} `}
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            {item.COMMENT}
          </Typography>
          <div style={{display:'flex',flexWrap:'wrap', width:'100%',height:'100%'}}>
           {item.CREATION_DATE}
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
            <TableCell padding="default">id</TableCell>
            <TableCell align="right">version</TableCell>
            <TableCell align="right">launch</TableCell>
            <TableCell align="right">spaceTrack</TableCell>
            <TableCell align="right">longitude</TableCell>
            <TableCell align="right">latitude</TableCell>
            <TableCell align="left">height (km)</TableCell>
            <TableCell align="right">velocity (km)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((n) => [
            <TableRow key={n.id}>
              <TableCell padding="default">{n.id}</TableCell>
              <TableCell align="right">{n.version}</TableCell>
              <TableCell align="right">{n.launch}</TableCell>
              <TableCell align="center">
                <Icon onClick={() => handleModal(n.spaceTrack)}>open_in_new</Icon>
              </TableCell>
              <TableCell align="right">{n.longitude}</TableCell>
              <TableCell align="right">{n.latitude}</TableCell>
              <TableCell align="left">{n.height_km}</TableCell>
              <TableCell align="right">{n.velocity_kms}</TableCell>
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