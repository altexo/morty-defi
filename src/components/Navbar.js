import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import mortycoin from '../static/morty.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
  whiteText: {
    color: 'white'
  }
}));

export default function MenuAppBar(props) {
  let account = props.account;
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar position="static"  color="transparent" elevation={0}>
        <Toolbar>
          <Avatar alt="Remy Sharp" className={classes.menuIcon} src={mortycoin}/>
          <Typography variant="h6" className={classes.title}>
            THE CITADEL
          </Typography>
            <p className={classes.whiteText} >{account}</p>
        </Toolbar>
      </AppBar>
    </div>
  );
}
