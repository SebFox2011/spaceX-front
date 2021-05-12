import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PapperBlock from './PaperBlock';
import styles from './TimelineWidget.styles';
import { useQuery } from "react-query";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

function TimelineWidget(props) {
  
const { isLoading, error, data, isFetching } = useQuery("repoHistories", () =>
fetch(
  "https://api.spacexdata.com/v3/history"
).then((res) => res.json())
);
if (isLoading) return <CircularProgress  style={{ color: purple[500] }} thickness={7} />


  const { classes, intl } = props;
  return (
    <PapperBlock whiteBg noMargin title={'Histoire'} icon="av_timer" desc="">
      <div className={classes.activityWrap}>
        <List>
          {data.map((item, index) => (
            <ListItem key={index.toString()} className={classes.activityList}>
              <ListItemIcon>
                <div className={classes.timeDot}>
                  <time>{item.event_date_utc}</time>
                  <span />
                </div>
              </ListItemIcon>
              <ListItemText primary={item.title} className={classes.activityText} secondary={item.details} />
            </ListItem>
          ))}
        </List>
      </div>
    </PapperBlock>
  );
}

TimelineWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimelineWidget)
