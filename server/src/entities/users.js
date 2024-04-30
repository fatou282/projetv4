class Users {
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
  }

  // Retourne l'ID du nouvel utilisateur inséré
  async create(username, email, password, lastname, firstname) {
    try {
        const newUser = { username, email, password, lastname, firstname };
        const result = await this.db.collection('users').insertOne(newUser);
        return result.insertedId; 
    } catch (error) {
        throw new Error("Erreur lors de la création de l'utilisateur : " + error.message);
    }
}


// Retourne l'utilisateur trouvé ou null s'il n'existe pas
async get(userId) {
  try {
      const user = await this.db.collection('users').findOne({ _id: userId });
      return user; 
  } catch (error) {
      throw new Error("Erreur lors de la récupération de l'utilisateur : " + error.message);
  }
}


// Retourne true si l'utilisateur existe, sinon false
async exists(login) {
  try {
      const user = await this.db.collection('users').findOne({ login });
      return user !== null; 
  } catch (error) {
      throw new Error("Erreur lors de la vérification de l'existence de l'utilisateur : " + error.message);
  }
}


// Retourne l'ID de l'utilisateur si les identifiants sont valides, sinon null
async checkPassword(login, password) {
  try {
      const user = await this.db.collection('users').findOne({ login, password });
      return user ? user._id : null; 
  } catch (error) {
      throw new Error("Erreur lors de la vérification du mot de passe de l'utilisateur : " + error.message);
  }
}

// Supprime un utilisateur
async deleteUser(userId) {
  try {
      const result = await this.db.collection('users').deleteOne({ _id: userId });
      if (result.deletedCount === 0) {
          throw new Error("Utilisateur non trouvé");
      }
  } catch (error) {
      throw new Error("Erreur lors de la suppression de l'utilisateur : " + error.message);
  }
}


  // Méthode pour récupérer la liste de tous les utilisateurs
  async getAllUsers() {
    try {
        const users = await this.db.collection('users').find().toArray();
        return users; // Retourne la liste de tous les utilisateurs
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la liste des utilisateurs : " + error.message);
    }
}

}


module.exports = Users;

