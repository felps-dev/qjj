import "./App.css";
import backImage from "./static/background.png";
import gitLogo from "./static/github.png";
import { makeStyles } from "@material-ui/core/styles";
import { Label, Button, TextField } from "./components";
import { Grid } from "@material-ui/core";
import { useState } from "react";
import { useDeviceDetect } from "./utils";
import api from "./api";

const useMainStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  gameImage: {
    width: "100%",
    borderRadius: 8,
    marginTop: theme.spacing(2),
  },
  gameTitle: {
    marginTop: theme.spacing(2),
  },
}));

function Main() {
  const classes = useMainStyles();

  const [players, setPlayers] = useState(0);
  const [currentGame, setCurrentGame] = useState(undefined);

  function getRandomGame() {
    api()
      .get(`jogos/${players}/rolar/`)
      .then((a) => {
        setCurrentGame(a.data);
      });
  }

  return (
    <Grid className={classes.main} container justify="center">
      <Grid item lg={4} md={6} sm={8} xs={12}>
        <Label color="white" size={37} spacing={-2.25}>
          Descubra qual <b>jogo</b> jogar com seus <b>amigos</b>
        </Label>
        <Label color="white" size={21} style={{ marginTop: 15 }}>
          Digite a quantidade de players
        </Label>
        {currentGame && (
          <div>
            <img
              src={currentGame.imagem}
              className={classes.gameImage}
              alt="game"
            />
            <Label color="white" size={13}>
              <b>Clique na imagem do jogo para entrar no site</b>
            </Label>
            <Label color="white" size={29} className={classes.gameTitle}>
              <b>{currentGame.titulo}</b>
            </Label>
          </div>
        )}
        <TextField
          style={{ marginTop: 15 }}
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
          type="number"
          align="center"
          size={35}
        />
        <Button onClick={getRandomGame} style={{ marginTop: 15 }}>
          Me dá <b style={{ marginLeft: 5 }}>um Jogo</b>
        </Button>
      </Grid>
    </Grid>
  );
}

const useFooterStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "white",
    minHeight: 60,
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  mainMobile: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  githubLogo: {
    alignSelf: "center",
    marginLeft: theme.spacing(2),
  },
}));

function Footer() {
  const classes = useFooterStyles();
  const { isMobile } = useDeviceDetect();
  return (
    <div className={isMobile ? classes.mainMobile : classes.main}>
      <Button
        size={19}
        spacing={-1.25}
        uncase
        pure
        style={{ marginBottom: isMobile ? 5 : 0 }}
      >
        Quero Adicionar um <b style={{ marginLeft: 5 }}>Jogo</b>
      </Button>
      <Label size={19} spacing={-1.25}>
        Felipe Correa
      </Label>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size={19} spacing={-1.25} uncase pure>
          Dar <b style={{ marginLeft: 5 }}>FeedBack</b>
          <img
            className={classes.githubLogo}
            src={gitLogo}
            alt="Github"
            height={40}
          />
        </Button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          background: `url(${backImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          height: "100%",
          width: "100%",
          position: "fixed",
          zIndex: -1,
          transform: "scale(1.1)",
        }}
      />
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Main />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
