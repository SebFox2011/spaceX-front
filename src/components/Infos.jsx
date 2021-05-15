import React,{useContext} from "react";
import { useQuery } from "react-query";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { AppContext } from '../ThemeWrapper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PeopleIcon from '@material-ui/icons/People';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Edit from '@material-ui/icons/Edit';
import CounterWidget from './Counter/CounterWidget';
import ProfileWidget from './ProfileWidget'
import styles from '../ui/widget-jss'
import Roadster from "./Roadster";
import Divider from "@material-ui/core/Divider"

const Infos = ({ classes,history }) => {
  const changeMode = useContext(AppContext);
    const { isLoading, error, data, isFetching } = useQuery("repoInfos", () =>
      fetch(
        "https://api.spacexdata.com/v4/company"
      ).then((res) => res.json())
    );
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div>
        <div>{isFetching ? <CircularProgress  style={{ color: purple[500] }} thickness={7} />: null}</div>
        <div className={classes.rootCounterFull}>
        <ProfileWidget profile={data} />
        <Grid container spacing={2}>
          <Grid item xs={6} md={2}>
            <CounterWidget
              color="primary-main"
              start={0}
              end={data.founded}
              duration={1}
              title="Création"
            >
              <EventAvailableIcon className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={2}>
            <CounterWidget
              color="secondary-main"
              start={0}
              end={data.employees}
              duration={3}
              title="Employés"
            >
              <PeopleIcon className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={2}>
            <CounterWidget
              color="primary-dark"
              start={0}
              end={data.vehicles}
              duration={3}
              title="Véhicules"
            >
              <Edit className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={2}>
            <CounterWidget
              color="secondary-light"
              start={0}
              end={data.launch_sites}
              duration={3}
              title="Sites"
            >
              <FlightTakeoffIcon className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Roadster/>
      </div>
      </div>
    );
    
  }

Infos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Infos);

