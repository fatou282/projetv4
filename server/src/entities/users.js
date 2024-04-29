class Users {
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
  }

  async create(login, password, lastname, firstname) {
    try {
        const newUser = { login, password, lastname, firstname };
        const result = await this.db.collection('users').insertOne(newUser);
        return result.insertedId; // Retourne l'ID du nouvel utilisateur inséré
    } catch (error) {
        throw new Error("Erreur lors de la création de l'utilisateur : " + error.message);
    }
}


async get(userId) {
  try {
      const user = await this.db.collection('users').findOne({ _id: userId });
      return user; // Retourne l'utilisateur trouvé ou null s'il n'existe pas
  } catch (error) {
      throw new Error("Erreur lors de la récupération de l'utilisateur : " + error.message);
  }
}


async exists(login) {
  try {
      const user = await this.db.collection('users').findOne({ login });
      return user !== null; // Retourne true si l'utilisateur existe, sinon false
  } catch (error) {
      throw new Error("Erreur lors de la vérification de l'existence de l'utilisateur : " + error.message);
  }
}


async checkpassword(login, password) {
  try {
      const user = await this.db.collection('users').findOne({ login, password });
      return user ? user._id : null; // Retourne l'ID de l'utilisateur si les identifiants sont valides, sinon null
  } catch (error) {
      throw new Error("Erreur lors de la vérification du mot de passe de l'utilisateur : " + error.message);
  }
}


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


exports.default = Users;

