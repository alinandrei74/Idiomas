import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const App = () => {
  const [classes, setClasses] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [jsonInput, setJsonInput] = useState('');

  useEffect(() => {
    const savedClasses = JSON.parse(sessionStorage.getItem('russianClasses')) || [];
    setClasses(savedClasses);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('russianClasses', JSON.stringify(classes));
  }, [classes]);

  const addClass = () => {
    setClasses([...classes, { name: `Clase ${classes.length + 1}`, words: [] }]);
  };

  const addWord = () => {
    if (newWord && newTranslation) {
      const updatedClasses = [...classes];
      updatedClasses[activeTab].words.push({ russian: newWord, spanish: newTranslation, visible: false });
      setClasses(updatedClasses);
      setNewWord('');
      setNewTranslation('');
    }
  };

  const toggleVisibility = (classIndex, wordIndex) => {
    const updatedClasses = [...classes];
    updatedClasses[classIndex].words[wordIndex].visible = !updatedClasses[classIndex].words[wordIndex].visible;
    setClasses(updatedClasses);
  };

  const handleJsonSubmit = () => {
    try {
      const wordsObject = JSON.parse(jsonInput);
      const newWords = Object.entries(wordsObject).map(([russian, spanish]) => ({
        russian,
        spanish,
        visible: false
      }));
      
      const updatedClasses = [...classes];
      updatedClasses[activeTab].words = [...updatedClasses[activeTab].words, ...newWords];
      setClasses(updatedClasses);
      setJsonInput('');
    } catch (error) {
      alert('Error al procesar el JSON. Por favor, verifica el formato.');
    }
  };

  const clearClass = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar esta clase?')) {
      const updatedClasses = [...classes];
      updatedClasses[activeTab].words = [];
      setClasses(updatedClasses);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Aprendizaje de Ruso</h1>
        <button onClick={addClass} className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-full">
          Añadir nueva clase
        </button>
        <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)} className="bg-gray-800 rounded-lg shadow-lg p-6">
          <TabList className="flex mb-4 border-b border-gray-700">
            {classes.map((classe, index) => (
              <Tab key={index} className="mr-2 py-2 px-4 text-blue-300 hover:text-blue-100 focus:outline-none cursor-pointer">
                {classe.name}
              </Tab>
            ))}
          </TabList>

          {classes.map((classe, classIndex) => (
            <TabPanel key={classIndex}>
              <h2 className="text-2xl font-semibold mb-4">{classe.name}</h2>
              <div className="mb-4 flex flex-wrap">
                <input
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="Palabra en ruso"
                  className="bg-gray-700 text-white border border-gray-600 rounded p-2 mr-2 mb-2 flex-grow"
                />
                <input
                  type="text"
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  placeholder="Traducción al español"
                  className="bg-gray-700 text-white border border-gray-600 rounded p-2 mr-2 mb-2 flex-grow"
                />
                <button onClick={addWord} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Añadir palabra
                </button>
              </div>
              <div className="mb-4">
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Pega aquí tu JSON de palabras"
                  className="bg-gray-700 text-white border border-gray-600 rounded p-2 w-full h-32 mb-2"
                />
                <div className="flex justify-between">
                  <button onClick={handleJsonSubmit} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Cargar palabras desde JSON
                  </button>
                  <button onClick={clearClass} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Vaciar clase
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {classe.words.map((word, wordIndex) => (
                  <div key={wordIndex} className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer" onClick={() => toggleVisibility(classIndex, wordIndex)}>
                    <p className="font-bold text-lg mb-2">{word.russian}</p>
                    <p className={`text-sm ${word.visible ? 'text-gray-300' : 'text-gray-500'}`}>
                      {word.visible ? word.spanish : word.spanish.replace(/./g, '*')}
                    </p>
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default App;