import React, { useState } from 'react';

const SearchMessages = ({ messages }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Logique de recherche à implémenter
    const results = messages.filter((message) =>
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <h2>Rechercher des Messages</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>

      {/* Afficher les résultats de la recherche */}
      {searchResults.map((result, index) => (
        <div key={index}>
          <p>Contenu du message: {result.content}</p>
          <p>Date de création: {result.creationDate}</p>
          <p>Propriétaire: {result.owner}</p>
          {/* Ajoutez d'autres détails du message si nécessaire */}
        </div>
      ))}
    </div>
  );
};

export default SearchMessages;
