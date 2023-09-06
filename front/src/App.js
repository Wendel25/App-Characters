import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddModeratorIcon from '@mui/icons-material/AddModerator';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isListOpen, setIsListOpen] = useState(true);
  const [listWidth, setListWidth] = useState(0); 
  // eslint-disable-next-line no-unused-vars
  const [isListEmpty, setIsListEmpty] = useState(false);
  const inputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('POWERSTATS');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.superheroapi.com/api.php/1340439290217244/search/${searchTerm}`
        );
        const jsonData = await response.json();
  
        if (jsonData.response === "success") {
          const results = jsonData.results;
          setCharacters(results);
          setIsListOpen(true);
          setListWidth(inputRef.current.offsetWidth);
  
          setIsListEmpty(results.length === 0);
        }
      } catch (error) {
        console.error("Erro ao obter dados da API:", error);
      }
    };
  
    if (searchTerm.trim() !== "") {
      fetchData();
    } else {
      setCharacters([]);
      setIsListOpen(false);
      setIsListEmpty(true);
      setSelectedCharacter(null);
    }
  }, [searchTerm]);
  

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsListOpen(false); 
  };

  const selectTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section className="App">
      <div className="background-container">
        <div className="container-full">
          <div className="title-hero">
            <h1>
              Super<span>Hero</span>
            </h1>
            <div className="search" ref={inputRef}>
              <input autoFocus name="search" className="button-search" type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          {characters.length > 0 && isListOpen && (
            <div className="characters-list" style={{ width: listWidth }}>
              <ul>
                {characters.map((character) => (
                  <li key={character.id} onClick={() => handleCharacterClick(character)}>
                    {character.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="container-content">
          {characters.length === 0 && (
            <div className="choose-character">
              <p>Type a character</p>
              <p>No characters found.</p>
            </div>
          )}

          <div className="character-image">
            {selectedCharacter && selectedCharacter.image && (
              <img className="img" src={selectedCharacter.image.url} alt={selectedCharacter.name}/>
            )}
          </div>

          <div className="character-biographical">
            <div className="name">
              {selectedCharacter && (
                <p>{selectedCharacter.name}</p>
              )}
            </div>

            <div className="powerstats">
              {selectedCharacter && (
                <div className="container-caracter">
                  <div className="title">
                    {['POWERSTATS', 'BIOGRAPHY', 'APPEARANCE', 'CONNECTIONS'].map((tabName) => (
                      <div
                        key={tabName}
                        onClick={() => {
                          selectTab(tabName);
                        }}
                        className={`tab-content ${activeTab === tabName ? 'activeTab' : ''}`}
                      >
                        {tabName}
                      </div>
                    ))}
                  </div>
                  <hr />
                  
                  
                  {characters.length === 0 ? (
                    <div>
                      <div className="text-vazio">
                        <p>No characters found.</p>
                        <p>type a character</p>
                      </div>
                    </div>
                  ) : (

                  <div className="content-full-page">
                    <div className="biography">
                      {activeTab === 'POWERSTATS' && (
                        <div className={`biography ${activeTab === 'POWERSTATS' ? 'active' : ''}`}>
                          <div className="details">
                            <AddModeratorIcon className="icon-moderator"/>  intelligence
                            <span className="valor">
                              {selectedCharacter && <p>{selectedCharacter.powerstats.intelligence}</p>}
                            </span>
                          </div>

                          <div className="details">
                            <AddModeratorIcon className="icon-moderator"/> strength
                            <span className="valor">
                              {selectedCharacter && <p>{selectedCharacter.powerstats.strength}</p>}
                            </span>
                          </div>

                          <div className="details">
                            <AddModeratorIcon className="icon-moderator"/>speed
                            <span className="valor">
                              {selectedCharacter && <p>{selectedCharacter.powerstats.speed}</p>}
                            </span>
                          </div>

                          <div className="details">
                            <AddModeratorIcon className="icon-moderator"/>durability
                            <span className="valor">
                              {selectedCharacter && <p>{selectedCharacter.powerstats.durability}</p>}
                            </span>
                          </div>

                          <div className="details">
                            <AddModeratorIcon className="icon-moderator"/>power
                            <span className="valor">
                              {selectedCharacter && <p>{selectedCharacter.powerstats.power}</p>}
                            </span>
                          </div>

                          <div className="details">
                            <AddModeratorIcon className="icon-moderator"/>combat
                            <span className="valor">
                              {selectedCharacter && <p>{selectedCharacter.powerstats.combat}</p>}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {activeTab === 'BIOGRAPHY' && (
                      <div className={`biography ${activeTab === 'BIOGRAPHY' ? 'active' : ''}`}>
                        <div className="bio-content-full">
                          <div className="bio-content">
                            <p className="title-bio"> Full Name </p>
                            <span className="record">
                              {selectedCharacter && <p>{selectedCharacter.biography['full-name']}</p>}
                            </span>
                          </div>

                          <div className="bio-content">
                            <p className="title-bio">Alter Egos </p>
                            <span className="record">
                              {selectedCharacter && <p>{selectedCharacter.biography['alter-egos']}</p>}
                            </span>
                          </div>

                          <div className="bio-content">
                            <p className="title-bio">Place of Birth </p>
                            <span className="record">
                              {selectedCharacter && <p>{selectedCharacter.biography['place-of-birth']}</p>}
                            </span>
                          </div>

                          <div className="bio-content">
                            <p className="title-bio"> First Appearance </p>
                            <span className="record">
                              {selectedCharacter && <p>{selectedCharacter.biography['first-appearance']}</p>}
                            </span>
                          </div>

                          <div className="bio-content">
                            <p className="title-bio"> Publisher </p>
                            <span className="record">
                              {selectedCharacter && <p>{selectedCharacter.biography['publisher']}</p>}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'APPEARANCE' && (
                      <div className={`appearance ${activeTab === 'APPEARANCE' ? 'active' : ''}`}>
                         <div className="app-content-full">
                          <div className="app-content">
                            <p className="title-app"><StarIcon className="star-icon"/> Gender </p>
                            <span className="record-app">
                              {selectedCharacter && <p>{selectedCharacter.appearance.gender}</p>}
                            </span>
                          </div>

                          <div className="app-content">
                            <p className="title-app"><StarIcon className="star-icon"/> Race </p>
                            <span className="record-app">
                              {selectedCharacter && <p>{selectedCharacter.appearance.race}</p>}
                            </span>
                          </div>

                          <div className="app-content">
                            <p className="title-app"><StarIcon className="star-icon"/> Height </p>
                            <span className="record-app">
                              {selectedCharacter && selectedCharacter.appearance.height.length >= 2 && (
                                <p>{selectedCharacter.appearance.height[1]}</p>
                              )}
                            </span>
                          </div>

                          <div className="app-content">
                            <p className="title-app"><StarIcon className="star-icon"/> Weight </p>
                            <span className="record-app">
                              {selectedCharacter && selectedCharacter.appearance.weight.length >= 2 && (
                                <p>{selectedCharacter.appearance.weight[1]}</p>
                              )}
                            </span>
                          </div>

                          <div className="app-content">
                            <p className="title-app"><StarIcon className="star-icon"/> Eye Color </p>
                            <span className="record-app">
                              {selectedCharacter && <p>{selectedCharacter.appearance['eye-color']}</p>}
                            </span>
                          </div>

                          <div className="app-content">
                            <p className="title-app"><StarIcon className="star-icon"/> Hair Color </p>
                            <span className="record-app">
                              {selectedCharacter && <p>{selectedCharacter.appearance['hair-color']}</p>}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'CONNECTIONS' && (
                      <div className={`connections ${activeTab === 'CONNECTIONS' ? 'active' : ''}`}>
                        <div className="conn-content">
                          <div className="conn-content">
                            <p className="title-conn"> <ArrowForwardIosIcon className="icon-arrow"/> Group Affiliation </p>
                            <p className="record-conn">
                              {selectedCharacter && <p>{selectedCharacter.connections['group-affiliation']}</p>}
                            </p>
                          </div>

                          <div className="conn-content">
                            <p className="title-conn"><ArrowForwardIosIcon className="icon-arrow"/> Relatives </p>
                            <p className="record-conn">
                              {selectedCharacter && <p>{selectedCharacter.connections.relatives}</p>}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;