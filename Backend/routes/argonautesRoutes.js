if (!process.env.HOST_DB) {
  var config = require("../config");
} else {
  var config = require("../config_exemple");
}
module.exports = (app, db) => {
  const argonautesModel = require("../models/Argonautes")(db);

  //route de récupération de toutes les annonces
  app.get("/api/v1/argos", async (req, res, next) => {
    let argonautes = await argonautesModel.getArgonautes();
    console.log(argonautes);
    res.json({
      status: 200,
      argonautes: argonautes,
      msg: "voici les argonautes",
    });
  });

  //route d'ajout d'un argonaute
  app.post("/api/v1/argo/add", async (req, res, next) => {
    //sauvegarde d'un argonaute
    let result = await argonautesModel.saveOneArgo(req);

    res.json({ status: 200, result: result, msg: "Argonaute enregistrée" });
  });
};
