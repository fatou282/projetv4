class Messages {
    constructor(db) {
      this.db = db
      // Suite à venir avec la base de données
    }
  
    // Fonction pour afficher un message
    getMessage(messageId) {

      return new Promise((resolve, reject) => { //promesse : objet représentant l'achèvement/échec d'une opérat* async.
          this.db.collection("messages").findOne({ _id: messageId }, (err, message) => { //ici, l'opérat* async. est une requête à la bdd pour rechercher un message spécifique par son ID ; la méthode findOne de la collect* msg est en charge de cela
              if (err) {
                  reject(err); // si une erreur se produit lors de la recherche dans la bd, la promesse est rejetée 
              } else {
                  resolve(message); // si la recherche est réussie et qu'un msg correspondant est trouvé, la promesse est résolue : le message est retourné
              }
          });
      });
  }
  
  
    // Fonction pour créer un nouveau message
    createMessage(messageData) {

      return new Promise((resolve, reject) => {
          this.db.collection("messages").insertOne(messageData, (err, result) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(result.ops[0]);
              }
          });
      });
  }
  
  
    // Fonction pour supprimer un message
    deleteMessage(messageId) {
      return new Promise((resolve, reject) => {
          this.db.collection("messages").deleteOne({ _id: messageId }, (err, result) => {
              if (err) {
                  reject(err);
              } else {
                  resolve();
              }
          });
      });
  }
  
    // Autres méthodes à ajouter selon les besoins
  }
  
  exports.default = Messages;
  