import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import LocalPhone from "@material-ui/icons/LocalPhone"
import DateRange from "@material-ui/icons/DateRange"
import LocationOn from "@material-ui/icons/LocationOn"
import Divider from "@material-ui/core/Divider"
import Avatar from "@material-ui/core/Avatar"
import PapperBlock from "../components/screen/PaperBlock"
import styles from "../ui/widget-jss"

function ProfileWidget({ classes, profile }) {
  return (
    <PapperBlock
      title={profile.name}
      icon="contacts"
      whiteBg
      noMargin
      desc={profile.summary}
    >
      <Divider className={classes.divider} />
      <div style={{ display: "flex", flexDirection: "row",flexWrap:'wrap' }}>
        <List dense className={classes.profileList}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DateRange />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"CEO & CTO"} secondary={profile.ceo} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocalPhone />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"COO"} secondary= {profile.coo}/>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'Capital'}
              secondary={`${profile.valuation} $`}
            />
          </ListItem>
        </List>
        <List dense className={classes.profileList}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DateRange />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Creation"} secondary={profile.founded} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocalPhone />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Phone"} secondary="(+62)8765432190" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={"Address"}
              secondary={`${profile.headquarters.address} - ${profile.headquarters.city} , ${profile.headquarters.state}`}
            />
          </ListItem>
        </List>
        <div style={{display:'flex',justifyContent:'space-around', width:'1000px',flexWrap:'wrap'}}>
        <img src="https://live.staticflickr.com/65535/50689254612_c87e588159_3k.jpg" width="300" height="200" alt="CRS-21 Mission"/>
        <img src="https://live.staticflickr.com/65535/51171344450_8dce08a2df_3k.jpg" width="300" height="200" alt="Starlink Mission"/>
        <img src="https://live.staticflickr.com/65535/51171019709_20cc0a17e3_3k.jpg" width="300" height="200" alt="Starship SN15 High-Altitude Flight Test"/>
          
          </div>
      </div>
    </PapperBlock>
  )
}

ProfileWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileWidget)
