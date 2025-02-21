import './App.css'
import { useEffect, useRef, useState } from 'react'
import HaikuList from './components/HaikuList';
import HaikuForm from './components/HaikuForm';

function App() {
  const [haikus, setHaikus] = useState([]);
  const [canInstall, setCanInstall] = useState(false);
  const deferredPrompt = useRef(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt.current)
    {
      return;
    }

    const result = await deferredPrompt.current.prompt();
    console.log(`Installation ${result.outcome}`);

    deferredPrompt.current = null;
    setCanInstall(false);
  };

  // Charger les haïkus depuis localStorage au démarrage
  useEffect(() => {
    const savedHaikus = localStorage.getItem('haikus');
    if (savedHaikus) {
      setHaikus(JSON.parse(savedHaikus)); // Convertir le JSON en tableau
    }
  }, []);

 // Sauvegarder les haïkus dans localStorage chaque fois qu'ils changent
  useEffect(() => {
    if (haikus.length > 0) {
      localStorage.setItem('haikus', JSON.stringify(haikus)); // Sauvegarder en JSON
    }
  }, [haikus]);

  const addHaiku = (text) => {
    const newHaiku = {
      text,
      favorite: false,
    };
    setHaikus([...haikus, newHaiku]);
  };

  const toggleFavorite = (index) => {
    const newHaikus = [...haikus];
    newHaikus[index].favorite = !newHaikus[index].favorite;
    setHaikus(newHaikus);
  };

  const deleteHaiku = (index) => {
    const newHaikus = haikus.filter((_, i) => i !== index);
    setHaikus(newHaikus);
  };

  return (
    <>
      {canInstall && (
        <div className='bg-gray-300 shadow-gray-700 p-4 flex items-center'>
          <div className='flex-grow text-center'>
            Voulez-vous installer l'application sur votre appareil ?
          </div>
          <button
            className='px-4 py-2 rounded text-white bg-teal-600'
            onClick={handleInstallClick}
          >
            Installer
          </button>
        </div>
      )}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Haikool</h1>
        <HaikuForm addHaiku={addHaiku} />
        <h2 className='text-2xl font-semibold'>Mes Haïku</h2>
        <HaikuList
          haikus={haikus}
          toggleFavorite={toggleFavorite}
          deleteHaiku={deleteHaiku}
        />

        {/* Ligne expliquant les icônes sous toute la liste */}
        <div className="text-sm text-gray-500 mt-4">
          <p>💖 = Favoris  [×] = Supprimer</p>
        </div>
      </div>
    </>
  )
}

export default App
