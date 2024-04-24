class Messages {
    constructor(db) {
      this.db = db
      // Suite à venir avec la base de données
    }
  
    // Fonction pour afficher un message
    getMessage(messageId) {
      return new Promise((resolve, reject) => {
          this.db.collection("messages").findOne({ _id: messageId }, (err, message) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(message);
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
  