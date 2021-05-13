import React, { useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import List from "@material-ui/core/List"
import ListSubheader from "@material-ui/core/ListSubheader"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ButtonBase from "@material-ui/core/ButtonBase"
import Icon from "@material-ui/core/Icon"
import { openMenuAction, closeMenuAction } from "../../redux/actions/uiActions"
import messages from "../../ui/menuMessages"

import styles from "./sidebarBig-jss"

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} /> // eslint-disable-line
})

function MainMenuBig(props) {
  // eslint-disable-line
  const {
    classes,
    open,
    dataMenu,
    drawerPaper,
    userAttr,
    closeDrawer,
    openDrawer,
    mobile,
    loadTransition,
    toggleDrawerOpen,
  } = props
  const [selectedMenu, setSelectedMenu] = useState([])
  const [menuLoaded, setMenuLoaded] = useState(true)

  const handleLoadMenu = (menu) => {
    setSelectedMenu(menu)
    setMenuLoaded(false)
    setTimeout(() => {
      setMenuLoaded(true) // load transtion menu
    }, 100)
    // Unecessary in mobile, because toggle menu already handled
    if (!mobile) {
      openDrawer()
    }
  }

  const handleLoadPage = () => {
    toggleDrawerOpen()
    loadTransition(false)
  }

  const currentMenu = dataMenu.filter((item) => item.key === open.get(0))
  const activeMenu = (key, child) => {
    if (selectedMenu.length < 1) {
      if (open.indexOf(key) > -1) {
        return true
      }
      return false
    }
    if (child === selectedMenu) {
      return true
    }
    return false
  }
  const getMenus = (menuArray) =>
    menuArray.map((item, index) => {
      if (item.key === "menu_levels") {
        return false
      }
      if (item.child) {
        return (
          <ButtonBase
            key={index.toString()}
            focusRipple
            onClick={() => handleLoadMenu(item.child)}
            className={classNames(
              classes.menuHead,
              activeMenu(item.key, item.child) ? classes.active : ""
            )}
          >
            <Icon className={classes.icon}>{item.icon}</Icon>
            <span className={classes.text}>
              {messages[item.key] !== undefined ? item.name : item.name}
            </span>
          </ButtonBase>
        )
      }
      return (
        <ButtonBase
          key={index.toString()}
          focusRipple
          className={classNames(
            classes.menuHead,
            open.indexOf(item.key) > -1 ? classes.active : ""
          )}
          component={LinkBtn}
          to={item.link}
          onClick={() => handleLoadPage()}
        >
          <Icon className={classes.icon}>{item.icon}</Icon>
          <span className={classes.text}>
            {item.name}
          </span>
        </ButtonBase>
      )
    })

  const getChildMenu = (menuArray) =>
    menuArray.map((item, index) => {
      if (item.title) {
        return (
          <ListSubheader
            key={index.toString()}
            disableSticky
            className={classes.title}
          >
            {item.name}
          </ListSubheader>
        )
      }
      return (
        <ListItem
          key={index.toString()}
          button
          exact
          className={classes.item}
          activeClassName={classes.active}
          component={LinkBtn}
          to={item.link}
          onClick={() => handleLoadPage()}
        >
          <ListItemText className={classes.text} primary={item.name} />
        </ListItem>
      )
    })

  const renderChildMenu = () => {
    if (selectedMenu.length < 1) {
      return (
        <List dense className={classes.fixedWrap}>
          {currentMenu.length > 0 ? getChildMenu(currentMenu[0].child) : ""}
        </List>
      )
    }
    return (
      <List
        dense
        className={classNames(
          classes.fixedWrap,
          classes.childMenuWrap,
          menuLoaded && classes.menuLoaded
        )}
      >
        {getChildMenu(selectedMenu)}
      </List>
    )
  }

  return (
    <aside className={classes.bigSidebar}>
      <nav className={classes.category}>
        <div className={classes.fixedWrap}>
          {getMenus(dataMenu)}
          {renderChildMenu()}
        </div>
      </nav>
    </aside>
  )
}

MainMenuBig.propTypes = {
  classes: PropTypes.object.isRequired,
  userAttr: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  dataMenu: PropTypes.array.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  mobile: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
}

MainMenuBig.defaultProps = {
  toggleDrawerOpen: () => {},
  mobile: false,
}

const reducer = "ui"

const mapStateToProps = (state) => ({
  open: state.getIn([reducer, "subMenuOpen"]),
  ...state,
})

const mapDispatchToProps = (dispatch) => ({
  openDrawer: () => dispatch(openMenuAction),
  closeDrawer: () => dispatch(closeMenuAction),
})

const MainMenuBigMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenuBig)

export default withStyles(styles)(MainMenuBigMapped)
