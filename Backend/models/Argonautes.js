module.exports = (_db) => {
  db = _db;
  return ArgonautesModel;
};
class ArgonautesModel {
  // avoir toutes les annonces
  static async getArgonautes() {
    let argonautes = await db.query("SELECT * FROM argonautes");
    return argonautes;
  }

  //enregistrement d'un argonaute
  static saveOneArgo(req) {
    return db
      .query("INSERT INTO argonautes (argoname) VALUES (?)", [req.body.argo])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  //EFFACER

  // static deleteArgo(id) {
  //   return db
  //     .query("DELETE FROM argonautes WHERE id= ?", [id])
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // }
}
