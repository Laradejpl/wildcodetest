import argo from "./argo.png";
import React, { useState, useEffect } from "react";
import { getAllArgo, saveOneArgo } from "./api/argonautes";
import io from "socket.io-client";

import "./argo.css";

function App() {
  const [personnes, setPersonnes] = useState([]);
  const [argonaute, setArgonaute] = useState("");
  const socket = io("https://iodotio.alwaysdata.net");
  useEffect(() => {
    getAllArgo()
      .then((res) => {
        //console.log(res);
        setPersonnes(res.argonautes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [personnes]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connecter au serveur");
    });
  }, [socket]);

  const onSubmitForm = () => {
    let datas = {
      argo: argonaute,
    };

    saveOneArgo(datas)
      .then((res) => {
        if (res.status === 200) {
          alert("un argonaute enregistré");

          console.log(personnes);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    socket.emit("message", argonaute);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="argoH1">LES ARGONAUTES</h1>

        <img src={argo} alt="logo" />
      </header>
      <main>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitForm();
          }}
          className="c-form"
        >
          <input
            type="text"
            required
            placeholder="entrez un argonaute"
            onChange={(e) => {
              setArgonaute(e.currentTarget.value);
              //console.log(argonaute);
            }}
          />
          <input type="submit" name="Enregister" className="buttonsbmt" />
        </form>
        <div className="grid-container">
          {personnes.map((personne, index) => (
            <div key={index} style={{ gridColumn: (index % 3) + 1 }}>
              {personne.argoname}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
