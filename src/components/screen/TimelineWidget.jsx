import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import PapperBlock from "./PaperBlock"
import styles from "./TimelineWidget.styles"
import { useQuery } from "react-query"
import CircularProgress from "@material-ui/core/CircularProgress"
import purple from "@material-ui/core/colors/purple"
import { formatDate } from "../../utils/fomatDate"
import useSpaceX from "../../apiHooks/useSpaceX"

function TimelineWidget({ classes }) {
  const { isLoading, error, data, isFetching } = useSpaceX("history")
  if (isLoading || isFetching)
    return <CircularProgress style={{ color: purple[500] }} thickness={7} />
  if (error) return "Erreur"

  return (
    <PapperBlock
      whiteBg
      noMargin
      title={`Histoire: ${data.length} événements`}
      icon="av_timer"
      desc=""
    >
      <div className={classes.activityWrap}>
        <List>
          {data.map((item, index) => (
            <ListItem key={index.toString()} className={classes.activityList}>
              <ListItemIcon>
                <div className={classes.timeDot}>
                  <time>{formatDate(item.event_date_utc)}</time>
                  <span />
                </div>
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                className={classes.activityText}
                secondary={item.details}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </PapperBlock>
  )
}

TimelineWidget.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TimelineWidget)
