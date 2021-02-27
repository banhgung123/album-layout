import { Box, IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Close } from '@material-ui/icons';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import giphyApi from 'api/giphyApi';
import React, { useEffect, useState } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        My Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[600],
    zIndex: 1
  }
}));

export default function Album() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [chosenCard, setChosenCard] = useState({});
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchGiphys = async () => {
      const params = {
        api_key: process.env.REACT_APP_API_KEY,
        limit: 24,
        offset: offset
      };
      const giphys = await giphyApi.get(params);
      setCards(giphys.data);
    };
    fetchGiphys();
  }, [offset]);

  const handleClickOpen = (card) => {
    setOpen(true);
    setChosenCard(card);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFetchGiphys = () => {
    setOffset(x => x + 24);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton style={{color: 'white'}} onClick={handleFetchGiphys}>
            <PhotoCameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              New Album
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={6} sm={4} md={4} lg={3} xl={3}>
                <Box mb={2}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.images.original.url}
                    title={card.title}
                    onClick={() => handleClickOpen(card)}
                />
                </Box>
                <Typography align="center" noWrap variant="subtitle2" style={{fontSize: '0.7rem'}}>
                  { card.title }
                </Typography>                
              </Grid>
            ))}
          </Grid>
        </Container>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <Close fontSize="large" />
          </IconButton>
          <img
            style={{ height: '100%', width: '100%' }}
            src={chosenCard.images?.original.url}
            alt={chosenCard.title || ''}
          />
        
        </Dialog>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}