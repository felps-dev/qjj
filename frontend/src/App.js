import "./App.css";
import backImage from "./static/background.png";
import gitLogo from "./static/github.png";
import { makeStyles } from "@material-ui/core/styles";
import { Label, Button, TextField, Dialog } from "./components";
import { Grid } from "@material-ui/core";
import { useState } from "react";
import { useDeviceDetect, toDataUrl } from "./utils";
import Collapse from "@material-ui/core/Collapse";
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
    cursor: "pointer",
  },
  gameTitle: {
    marginTop: theme.spacing(2),
  },
}));

function Main(props) {
  const classes = useMainStyles();
  const {
    setDialogJogo,
    dialogJogo,
    dialogFeedback,
    setDialogFeedBack,
    showmessage,
  } = props;
  const defaultDados = {
    link: "",
    titulo: "",
    qt_jogadores: "",
    imagem: "",
    imagem_url: "",
  };

  const defaultFeedback = {
    referencia: "",
    texto: "",
  };

  const [players, setPlayers] = useState(0);
  const [currentGame, setCurrentGame] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const [dados, setDados] = useState(defaultDados);
  const [feedback, setFeedback] = useState(defaultFeedback);
  const [fromSteam, setFromSteam] = useState(false);
  const [loading, setLoading] = useState(false);

  function getRandomGame() {
    setLoaded(false);
    setCanClick(false);
    api()
      .get(`jogos/${players}/rolar/`)
      .then((a) => {
        setTimeout(() => {
          setCurrentGame(a.data);
          setLoaded(true);
          setCanClick(true);
        }, 500);
      });
  }

  function changeEvent(e) {
    setDados((o) => ({
      ...o,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "link") {
      const link = String(e.target.value);
      if (link.split(".")[1] === "steampowered") {
        if (link.split("/")[3] === "app") {
          setLoading(true);
          api()
            .get(`jogos/${link.split("/")[4]}/info/`)
            .then(async (res) => {
              const game = res.data[link.split("/")[4]].data;
              toDataUrl(game.header_image, (w) => {
                setDados((o) => ({
                  ...o,
                  titulo: game.name,
                  imagem_url: game.header_image,
                  imagem: w,
                }));
                setLoading(false);
              });
            })
            .catch(() => {
              setLoading(false);
            });
          setFromSteam(true);
        }
      }
    }
  }

  function changeEventFeedback(e) {
    setFeedback((o) => ({
      ...o,
      [e.target.name]: e.target.value,
    }));
  }

  const closeDialog = () => {
    setDialogJogo(false);
    setDialogFeedBack(false);
    setDados(defaultDados);
    setFeedback(defaultFeedback);
  };

  const sendGame = () => {
    setLoading(true);
    api()
      .post("jogos/", dados)
      .then((r) => {
        closeDialog();
        showmessage(
          "Brrrrrrrrrrrrrrabo",
          "Valeu pela adição maninho! Você está ajudando muitas pessoas :D",
          ["SOU FODA", "EEBA", "TE AMO ❤"]
        );
        setLoading(false);
      })
      .catch(() => {
        showmessage(
          "Taporr deu erro",
          "Vish mano, deu algum erro, vê se tu botou todos os campos.",
          ["TRISTE GAMES", "OK :(", "FLINSTON"]
        );
        setLoading(false);
      });
  };

  const sendFeedback = () => {
    setLoading(true);
    api()
      .post("feedback/", feedback)
      .then((r) => {
        closeDialog();
        showmessage(
          "Valeeeeu!",
          "Você acabou de fazer esse site ficar melhor ainda, cê é foda mano",
          ["SOU FODA", "EEBA", "TE AMO ❤"]
        );
        setLoading(false);
      })
      .catch(() => {
        showmessage(
          "Taporr deu erro",
          "Vish mano, deu algum erro, vê se tu botou todos os campos.",
          ["TRISTE GAMES", "OK :(", "FLINSTON"]
        );
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        loading={loading}
        open={dialogFeedback}
        title="Feedback!"
        width="100%"
        onClose={closeDialog}
        btn1={{
          label: ["VOLTAR"].random(),
          click: closeDialog,
        }}
        btn2={{
          label: ["ENVIAR"].random(),
          click: sendFeedback,
        }}
        style={{
          width: "100%",
        }}
        containerStyle={{
          marginBottom: 50,
        }}
      >
        <TextField
          placeholder="Seu nome ou email! (Só alguma referencia)"
          inverted
          size={24}
          spacing={-2}
          name="referencia"
          value={feedback.referencia}
          onChange={changeEventFeedback}
          w="bold"
        />
        <TextField
          placeholder={
            "Escreva algo bem legal aqui, pode ter certeza que eu vou ver  <3"
          }
          inverted
          size={24}
          spacing={-2}
          name="texto"
          value={feedback.texto}
          onChange={changeEventFeedback}
          multiline
          w="bold"
          disabled={fromSteam}
        />
      </Dialog>
      <Dialog
        loading={loading}
        open={dialogJogo}
        title="Adicione seu jogo :D"
        width="100%"
        onClose={closeDialog}
        btn1={{
          label: ["CANCELAR", "VOLTAR"].random(),
          click: closeDialog,
        }}
        btn2={{
          label: ["CONFIRMAR", "BOTAA 😳", "ADICIONAR"].random(),
          click: sendGame,
        }}
        style={{
          width: "100%",
        }}
        containerStyle={{
          marginBottom: 50,
        }}
      >
        <TextField
          placeholder="Link para o Jogo/Loja"
          inverted
          size={24}
          spacing={-2}
          name="link"
          value={dados.link}
          onChange={changeEvent}
          w="bold"
        />
        <TextField
          placeholder={"Título"}
          inverted
          size={24}
          spacing={-2}
          name="titulo"
          value={dados.titulo}
          onChange={changeEvent}
          w="bold"
          disabled={fromSteam}
        />
        <TextField
          placeholder={"Quantidade de Players"}
          inverted
          size={24}
          spacing={-2}
          name="qt_jogadores"
          value={dados.qt_jogadores}
          onChange={changeEvent}
          type="number"
          w="bold"
        />
        <TextField
          disabled={fromSteam}
          placeholder={"Selecione uma imagem..."}
          inverted
          size={24}
          spacing={-2}
          name="imagem_url"
          value={dados.imagem_url}
          filefield
          filetype="image/*"
          onChange={(f) => {
            setDados((o) => ({ ...o, imagem: f.content, imagem_url: f.name }));
          }}
          w="bold"
        />
        {dados.imagem && (
          <img width="100%" alt="game_image" src={dados.imagem} />
        )}
      </Dialog>
      <Grid className={classes.main} container justify="center">
        <Grid item lg={4} md={6} sm={8} xs={12}>
          <Label color="white" size={37} spacing={-2.25}>
            Descubra qual <b>jogo</b> jogar com seus <b>amigos</b>
          </Label>
          <Label color="white" size={21} style={{ marginTop: 15 }}>
            Digite a quantidade de players
          </Label>
          {currentGame && (
            <Collapse in={loaded}>
              <img
                src={currentGame.imagem}
                className={classes.gameImage}
                alt="game"
                onClick={() => window.open(currentGame.link)}
              />
              <Label color="white" size={13}>
                <b>Clique na imagem do jogo para entrar no site</b>
              </Label>
              <Label color="white" size={29} className={classes.gameTitle}>
                <b>{currentGame.titulo}</b>
              </Label>
            </Collapse>
          )}
          <TextField
            style={{ marginTop: 15 }}
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
            type="number"
            align="center"
            size={35}
          />
          <Button
            onClick={getRandomGame}
            style={{ marginTop: 15 }}
            loading={!canClick}
          >
            <b>
              {!currentGame
                ? ["Me dá um Jogo", "SORTEAR", "Quero jogaaaaar"].random()
                : [
                    "AGORA VAI",
                    "DE NOVO",
                    "ESSE NÃO!",
                    "MAIS UMA VEZ",
                    "NAO",
                    "AAAAAAAAAA",
                    "AINDA NÃO",
                  ].random()}
            </b>
          </Button>
        </Grid>
      </Grid>
    </>
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

function Footer(props) {
  const classes = useFooterStyles();
  const { isMobile } = useDeviceDetect();
  const { setDialogJogo, setDialogFeedBack } = props;
  return (
    <div className={isMobile ? classes.mainMobile : classes.main}>
      <Button
        size={19}
        spacing={-1.25}
        uncase
        pure
        style={{ marginBottom: isMobile ? 5 : 0 }}
        onClick={() => setDialogJogo(true)}
      >
        Quero Adicionar um <b style={{ marginLeft: 5 }}>Jogo</b>
      </Button>
      <Label size={19} spacing={-1.25}>
        Felipe Correa
      </Label>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size={19}
          spacing={-1.25}
          uncase
          pure
          companion={
            <img
              className={classes.githubLogo}
              src={gitLogo}
              alt="Github"
              height={40}
            />
          }
          onClick={() => setDialogFeedBack(true)}
        >
          Dar <b style={{ marginLeft: 5 }}>FeedBack</b>
        </Button>
      </div>
    </div>
  );
}

function App() {
  const [dialogJogo, setDialogJogo] = useState(false);
  const [dialogFeedback, setDialogFeedBack] = useState(false);

  const defaultDialog = {
    open: false,
    title: "",
    message: "",
    btn: ["CONFIRMAR"],
  };
  const [dialog, setDialog] = useState(defaultDialog);

  const showmessage = (titulo, text, btn) => {
    setDialog({
      open: true,
      title: titulo,
      message: text,
      btn: btn || ["CONFIRMAR"],
    });
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          background: `url(${backImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(30px)",
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
        <Dialog
          open={dialog.open}
          title={dialog.title}
          width="100%"
          onClose={() => setDialog((o) => ({ ...o, open: false }))}
          btn2={{
            label: dialog.btn.random(),
            click: () => {
              if (dialog.onClose) {
                dialog.onClose();
              }
              setDialog((o) => ({ ...o, open: false }));
            },
          }}
        >
          <Label size={24} align="left" w="bold" spacing={-2} color="#808080">
            {dialog.message}
          </Label>
        </Dialog>
        <div style={{ marginBottom: 30 }}>
          <Main
            showmessage={showmessage}
            dialogJogo={dialogJogo}
            dialogFeedback={dialogFeedback}
            setDialogJogo={setDialogJogo}
            setDialogFeedBack={setDialogFeedBack}
          />
        </div>
        <div>
          <Footer
            showmessage={showmessage}
            dialogJogo={dialogJogo}
            dialogFeedback={dialogFeedback}
            setDialogJogo={setDialogJogo}
            setDialogFeedBack={setDialogFeedBack}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
