import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon'
import styles from './PaperBlock.styles';

function PapperBlock({
  classes,
  title,
  desc,
  children,
  whiteBg,
  overflowX,
  icon
}) {

  // const color = mode => {
  //   switch (mode) {
  //     case 'light':
  //       return classes.colorLight;
  //     case 'dark':
  //       return classes.colorDark;
  //     default:
  //       return classes.none;
  //   }
  // };
  return (
    <div>
      <Paper className={classes.root} style={{backgroundColor:'rgba(101,115,195,0.08)'}}
        elevation={1}
      >
        <div className={classes.descBlock}>
          <span className={classes.iconTitle}>
            <Icon>{icon}</Icon>
          </span>
          <div className={classes.titleText}>
            <Typography variant="h6" component="h2" className={classes.title}>
              {title}
            </Typography>
            <Typography component="p" className={classes.description}>
              {desc}
            </Typography>
          </div>
        </div>
        <section className={classNames(classes.content, whiteBg && classes.whiteBg, overflowX && classes.overflowX)}>
          {children}
        </section>
      </Paper>
    </div>
  );
}

PapperBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  whiteBg: PropTypes.bool,
  overflowX: PropTypes.bool,
};

PapperBlock.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: 'none',
  overflowX: false,
  icon: 'flag'
};

export default compose(withStyles(styles))(PapperBlock);