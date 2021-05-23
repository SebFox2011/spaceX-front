import React, { Fragment } from "react"
import { PropTypes } from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Header from "../../components/Header/Header"
import SidebarBig from "../../components/SidebarBig/MainMenuBig"
import dataMenu from "../../ui/menu"
import styles from "../appStyles-jss"

function LeftSidebarBigLayout({
  classes,
  children,
  toggleDrawer,
  sidebarOpen,
  loadTransition,
  mode,
  history,
  changeMode,
  place,
  handleOpenGuide,
}) {

  return (
    <Fragment>
      <Header
        toggleDrawerOpen={toggleDrawer}
        margin={sidebarOpen}
        changeMode={changeMode}
        mode={mode}
        title={place}
        history={history}
        openGuide={handleOpenGuide}
        dense
      />
      
      <SidebarBig
        dataMenu={dataMenu}
        loadTransition={loadTransition}
        open={sidebarOpen}
        toggleDrawerOpen={toggleDrawer}
      />
      <main
        className={classNames(
          classes.content,
          !sidebarOpen ? classes.contentPaddingLeftSm : ""
        )}
        id="mainContent"
      >
        <section
          className={classNames(classes.mainWrap, classes.sidebarLayout)}
        >
          {children}
        </section>
      </main>
    </Fragment>
  )
}

LeftSidebarBigLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
  handleOpenGuide: PropTypes.func.isRequired,
}

LeftSidebarBigLayout.defaultProps = {
  isLogin: false,
}

export default withStyles(styles)(LeftSidebarBigLayout)
