import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery } from "react-query"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import MobileStepper from "@material-ui/core/MobileStepper"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import SwipeableViews from "react-swipeable-views"
import CardMedia from '@material-ui/core/CardMedia';
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import styles from "../ui/widget-jss"



function Roadster({ classes, theme }) {
  const [activeStepSwipe, setActiveStepSwipe] = useState(0)

  const { isLoading, error, data, isFetching } = useQuery("repoRoadster", () =>
      fetch(
        "https://api.spacexdata.com/v4/roadster"
      ).then((res) => res.json())
    );
    if (isLoading || isFetching) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

  

  const handleNextSwipe = () => {
    setActiveStepSwipe((step) => step + 1)
  }

  const handleBackSwipe = () => {
    setActiveStepSwipe((step) => step - 1)
  }

  const handleStepChangeSwipe = (step) => {
    setActiveStepSwipe(step)
  }

  const maxStepsSwipe = data.flickr_images.length
  return (
    <Paper>
      <Typography
        gutterBottom
        className={classes.title}
        variant="h6"
        component="h2"
      >
        {data.name}
      </Typography>
      <Typography
        gutterBottom
        className={classes.title}
        variant="subtitle1"
        component="h2"
      >
        {data.details}
      </Typography>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStepSwipe}
        onChangeIndex={handleStepChangeSwipe}
        enableMouseEvents
        className={classes.sliderWrap}
      >
        {data?.flickr_images.map((slide, index) => (
          <CardMedia key={index} className={classes.media} image={slide} title={slide.label} />
        ))}
      </SwipeableViews>
      <MobileStepper
        variant="dots"
        steps={maxStepsSwipe}
        position="static"
        activeStep={activeStepSwipe}
        className={classes.mobileStepper}
        nextButton={
          <Button
            size="small"
            onClick={handleNextSwipe}
            disabled={activeStepSwipe === maxStepsSwipe - 1}
          >
            next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBackSwipe}
            disabled={activeStepSwipe === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            back
          </Button>
        }
      />
    </Paper>
  )
}

Roadster.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Roadster)
