import React, { useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import ButtonBase from "@material-ui/core/ButtonBase"
import Icon from "@material-ui/core/Icon"
import { openMenuAction, closeMenuAction } from "../../redux/actions/uiActions"

import styles from "./sidebarBig-jss"

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  return <NavLink to={props.to} {...props} innerRef={ref} /> // eslint-disable-line
})

function MainMenuBig({ classes, open, dataMenu }) {
  const [selectedMenu, setSelectedMenu] = useState(dataMenu[0])

  const activeMenu = (key, child) => {
    console.log(selectedMenu, key, child)
    if (selectedMenu.length < 1) {
      if (open.indexOf(key) > -1) {
        console.log("open.indexOf(key) > -1")
        return true
      }
      return false
    }
    if (child === selectedMenu) {
      console.log("child === selectedMenu")
      return true
    }
    if (key === selectedMenu.key) {
      console.log("key === selectedMenu", key, selectedMenu.key)
      return true
    }
    return false
  }

  const setMenus = (menu) =>
    menu.map((item, index) => {
      if (item) {
        return (
          <ButtonBase
            key={index.toString()}
            focusRipple
            component={LinkBtn}
            to={item.link}
            onClick={() => setSelectedMenu(item)}
            className={classNames(
              classes.menuHead,
              activeMenu(item.key) ? classes.active : ""
            )}
          >
            <Icon className={classes.icon}>{item.icon}</Icon>
            <span className={classes.text}>{item.name}</span>
          </ButtonBase>
        )
      }
    })

  return (
    <aside className={classes.bigSidebar}>
      <nav className={classes.category}>
        <div className={classes.fixedWrap}>{setMenus(dataMenu)}</div>
      </nav>
    </aside>
  )
}

MainMenuBig.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  dataMenu: PropTypes.array.isRequired,
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
