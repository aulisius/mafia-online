import pandora from "@faizaanceg/pandora";
import { Field, Form, Formik } from "formik";
import React from "react";
import ReactDOM from "react-dom";
// import io from "socket.io-client";
// import { gameService } from "./services";
import "./styles.css";

// let socket = io("http://localhost:8080/");

function AssignRoles() {
  let roleRef = React.useRef(null);
  let playerRef = React.useRef(null);
  let [roles, updateRoles] = React.useState(
    pandora.get("availableRoles", [
      "villager",
      "mafia",
      "doctor",
      "detective",
      "blocker",
      "psycho"
    ])
  );
  React.useEffect(() => {
    pandora.set("availableRoles", roles);
  }, [roles]);

  let [state, set] = React.useState(pandora.get("players", {}));
  React.useEffect(() => {
    pandora.set("players", state);
  }, [state]);
  // let gameCode = pandora.get("gameCode");
  // socket.on(`User.Register - ${gameCode}`, value => {
  //   if (!state[value]) {
  //     set({ ...state, [value]: "" });
  //   }
  // });

  return (
    <div className="nes-container is-centered">
      <section>
        {/* Game code: {gameCode.toUpperCase()} */}
        <ul style={{ textAlign: "justify" }} className="nes-list">
          {roles.map(role => (
            <li key={role}>{role.toUpperCase()}</li>
          ))}
        </ul>
        <input
          className="nes-input"
          ref={roleRef}
          type="text"
          placeholder="Add new role"
        />
        <button
          className="nes-btn is-primary"
          onClick={() => {
            updateRoles([...roles, roleRef.current.value]);
            roleRef.current.value = "";
          }}
        >
          Add Role
        </button>
      </section>
      <br />
      <section>
        <p>Players</p>
        <Formik
          onReset={() => {
            set(
              Object.entries(state)
                .map(([player, role]) => ({ [player]: "" }))
                .reduce((acc, obj) => ({ ...acc, ...obj }), {})
            );
          }}
          // onReset={() => socket.emit("New.Game", gameCode)}
          onSubmit={(_, props) => {
            // socket.emit("Send.Roles", state);
            props.setSubmitting(false);
          }}
          render={({ submitCount }) => (
            <Form style={{ paddingTop: "20px" }}>
              {Object.entries(state).map(([player, role]) => (
                <div
                  style={{
                    padding: "5px",
                    marginBottom: "5px",
                    border: "1px solid"
                  }}
                  key={player}
                >
                  <p>{player}</p>
                  <select
                    className="nes-select"
                    disabled={submitCount > 0}
                    value={role}
                    required
                    onChange={e => set({ ...state, [player]: e.target.value })}
                  >
                    <option value="" unselectable>
                      Assign role
                    </option>
                    {roles.map(role => (
                      <option key={role} value={role}>
                        {role.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <input ref={playerRef} className="nes-input" type="text" />
              <button
                onClick={() => {
                  if (playerRef.current.value.length > 0) {
                    set({ ...state, [playerRef.current.value]: "" });
                    playerRef.current.value = "";
                  }
                }}
                className="nes-btn is-primary"
              >
                Add player
              </button>
              <hr />
              <button
                type="submit"
                className="nes-btn is-success"
                disabled={submitCount > 0}
              >
                Start game
              </button>

              <button
                style={{ marginTop: "20px" }}
                type="reset"
                className="nes-btn is-warning"
              >
                Restart
              </button>
            </Form>
          )}
        />
      </section>
    </div>
  );
}

// function PlayGame() {
//   let [myRole, setRole] = React.useState(pandora.get("role", null));
//   React.useEffect(() => {
//     pandora.set("role", myRole);
//   }, [myRole]);
//   let myName = pandora.get("username");
//   // socket.on(`Get.Role - ${myName}`, setRole);

//   // socket.on(`New.Game - ${myName}`, () => setRole(null));

//   // socket.on(`Disconnected - ${myName}`, () => {
//   //   pandora.clear();
//   //   window.location.reload();
//   // });

//   return (
//     <div class="nes-container is-centered">
//       {myRole === null ? (
//         "Waiting for role..."
//       ) : (
//         <h1>{myRole.toUpperCase()}</h1>
//       )}
//     </div>
//   );
// }

function StartGame({ setMode }) {
  // let [show, setShow] = React.useState(false);
  return (
    <menu>
      <button
        type="button"
        onClick={() => {
          setMode("run");
          // gameService.create().then(success => {
          //   pandora.set("gameCode", success.code);
          //   setMode("run");
          // });
        }}
        className="nes-btn is-primary"
      >
        Start Game
      </button>
      {/* <button
        type="button"
        onClick={() => setShow(true)}
        className="nes-btn is-success"
      >
        Join Game
      </button> */}
      {/* <dialog open={show} className="nes-dialog is-dark">
        <Formik
          initialValues={{ gameCode: "" }}
          onSubmit={({ gameCode }) =>
            gameService.connect(gameCode).then(success => {
              pandora.set("gameCode", gameCode);
              setMode("play");
            })
          }
          render={() => (
            <Form method="dialog">
              <p className="title">Enter game code</p>
              <Field
                className="nes-input"
                name="gameCode"
                type="text"
                required
              />
              <menu className="dialog-menu">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="nes-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="nes-btn is-primary">
                  Confirm
                </button>
              </menu>
            </Form>
          )}
        />
      </dialog> */}
    </menu>
  );
}

function Header(props) {
  // let [myName, setName] = React.useState(pandora.get("username", null));
  // React.useEffect(() => {
  //   if (myName) {
  //     pandora.set("username", myName, { shouldPersist: true });
  //   }
  // }, [myName]);

  return (
    <header>
      <div className="nes-container is-centered">
        <h1>Play.Mafia</h1>
        <button
          className="nes-btn is-error"
          onClick={() => {
            pandora.clear();
            window.location.reload();
          }}
        >
          Clear Everything
        </button>
        {/* {myName === null ? (
          <Formik
            onSubmit={values => setName(values.username)}
            initialValues={{ username: "" }}
            render={() => (
              <Form>
                <div className="nes-field is-inline">
                  <label htmlFor="username">Enter name</label>
                  <Field
                    name="username"
                    type="text"
                    className="nes-input"
                    required
                  />
                  <button type="submit" className="nes-btn is-primary">
                    OK
                  </button>
                </div>
              </Form>
            )}
          />
        ) : (
          <>
            <p>Your name is</p> <p style={{ color: "tomato" }}>{myName}</p>
            {props.children}
          </>
        )} */}
        {props.children}
      </div>
    </header>
  );
}

function App() {
  let [mode, setMode] = React.useState(pandora.get("mode", "ask"));
  React.useEffect(() => {
    pandora.set("mode", mode);
  }, [mode]);
  return (
    <>
      <Header>
        {mode === "ask" && <StartGame setMode={setMode} />}
        {mode === "run" && <AssignRoles />}
        {/* {mode === "play" && <PlayGame />} */}
      </Header>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
