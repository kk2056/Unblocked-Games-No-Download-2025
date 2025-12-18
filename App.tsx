
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Search, Gamepad2, Play, ExternalLink, Info, AlertCircle, Home as HomeIcon, Star, TrendingUp, Zap } from 'lucide-react';

/**
 * DATA: Unblocked Games Registry
 */
interface Game {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  embedUrl: string;
  rating: number;
}

const GAMES: Game[] = [
  {
    id: "slope",
    name: "Slope",
    description: "Navigate a ball down a 3D neon course with increasing speed and difficulty.",
    category: "Action",
    thumbnail: "https://picsum.photos/seed/slope/400/250",
    embedUrl: "https://kdata1.com/2020/05/slope/",
    rating: 4.8
  },
  {
    id: "1v1-lol",
    name: "1v1.LOL",
    description: "Build and fight in this competitive third-person shooter and building simulator.",
    category: "Shooter",
    thumbnail: "https://picsum.photos/seed/1v1/400/250",
    embedUrl: "https://1v1.lol/",
    rating: 4.7
  },
  {
    id: "tunnel-rush",
    name: "Tunnel Rush",
    description: "Fast-paced dodging game inside a kaleidoscopic tunnel. Test your reflexes!",
    category: "Action",
    thumbnail: "https://picsum.photos/seed/tunnel/400/250",
    embedUrl: "https://kdata1.com/2020/05/tunnel-rush/",
    rating: 4.5
  },
  {
    id: "drift-hunters",
    name: "Drift Hunters",
    description: "The ultimate car drifting simulator with realistic physics and car customization.",
    category: "Racing",
    thumbnail: "https://picsum.photos/seed/drift/400/250",
    embedUrl: "https://www.drift-hunters.com/",
    rating: 4.9
  },
  {
    id: "minecraft-classic",
    name: "Minecraft Classic",
    description: "The original building game directly in your browser. Build anything you can imagine.",
    category: "Sandbox",
    thumbnail: "https://picsum.photos/seed/minecraft/400/250",
    embedUrl: "https://classic.minecraft.net/",
    rating: 4.6
  },
  {
    id: "bitlife",
    name: "BitLife",
    description: "The official text-based life simulator where you make all the choices.",
    category: "Simulation",
    thumbnail: "https://picsum.photos/seed/bitlife/400/250",
    embedUrl: "https://bitlifegame.com/",
    rating: 4.4
  },
  {
    id: "run-3",
    name: "Run 3",
    description: "Gravity-defying runner game set in space. Keep running or fall into the abyss!",
    category: "Action",
    thumbnail: "https://picsum.photos/seed/run3/400/250",
    embedUrl: "https://www.coolmathgames.com/0-run-3",
    rating: 4.8
  },
  {
    id: "retro-bowl",
    name: "Retro Bowl",
    description: "The perfect game for the armchair quarterback. Managed and play your team!",
    category: "Sports",
    thumbnail: "https://picsum.photos/seed/retrobowl/400/250",
    embedUrl: "https://retrobowl.me/",
    rating: 4.9
  },
  {
    id: "shell-shockers",
    name: "Shell Shockers",
    description: "The world's most advanced egg-based multiplayer first-person shooter.",
    category: "Shooter",
    thumbnail: "https://picsum.photos/seed/eggs/400/250",
    embedUrl: "https://shellshock.io/",
    rating: 4.5
  },
  {
    id: "paper-io-2",
    name: "Paper.io 2",
    description: "Conquer as much territory as possible and defeat other players in this arena game.",
    category: "Strategy",
    thumbnail: "https://picsum.photos/seed/paper/400/250",
    embedUrl: "https://paper-io.com/",
    rating: 4.3
  },
  {
    id: "subway-surfers",
    name: "Subway Surfers",
    description: "Dash as fast as you can! Dodge the oncoming trains and surfers!",
    category: "Arcade",
    thumbnail: "https://picsum.photos/seed/subway/400/250",
    embedUrl: "https://subwaysurfers.com/",
    rating: 4.7
  },
  {
    id: "happy-wheels",
    name: "Happy Wheels",
    description: "The side-scrolling, physics-based, obstacle course game with dark humor.",
    category: "Arcade",
    thumbnail: "https://picsum.photos/seed/wheels/400/250",
    embedUrl: "https://totaljerkface.com/happy_wheels.tjf",
    rating: 4.4
  }
];

/**
 * SHARED COMPONENTS
 */

const Header = ({ onSearch }: { onSearch: (val: string) => void }) => (
  <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-xl">
    <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="p-2 bg-yellow-500 rounded-lg group-hover:rotate-12 transition-transform duration-300">
          <Gamepad2 className="text-black w-6 h-6" />
        </div>
        <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
          Unblocked<span className="text-yellow-500">2025</span>
        </span>
      </Link>

      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input 
          type="text"
          placeholder="Search unblocked games..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-500 transition-all placeholder:text-gray-600"
        />
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-1 font-bold uppercase text-sm tracking-widest">
          <HomeIcon className="w-4 h-4" /> Home
        </Link>
        <button className="text-gray-400 hover:text-white flex items-center gap-1 font-bold uppercase text-sm tracking-widest">
          <TrendingUp className="w-4 h-4" /> Trending
        </button>
      </nav>
    </div>
  </header>
);

const AdBanner = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      // Simulate ad network initialization
      console.log("Loading ad units...");
    } catch (e) {
      console.error("Ad loading failed", e);
      setError(true);
    }
  }, []);

  if (error) return null;

  return (
    <div className="w-full py-4 flex justify-center overflow-hidden">
      <div className="bg-gray-800 border border-dashed border-gray-700 rounded-lg w-full max-w-4xl h-32 flex flex-col items-center justify-center relative group">
        <span className="absolute top-2 left-2 text-[10px] text-gray-600 uppercase font-bold tracking-widest">Sponsored Placement</span>
        <div className="text-gray-500 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 animate-pulse text-yellow-600" />
          <span className="font-mono text-sm">PROMOTIONAL_CONTENT_FRAME_ID: 2025_UG</span>
        </div>
        <div className="mt-2 flex gap-4 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
          <div className="w-24 h-4 bg-gray-700 rounded animate-shimmer" />
          <div className="w-32 h-4 bg-gray-700 rounded animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

// Fix: Add optional key to props type to satisfy strict JSX compiler checks during mapping
const GameCard = ({ game }: { game: Game; key?: string | number }) => (
  <Link 
    to={`/game/${game.id}`}
    className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all hover:-translate-y-2 hover:shadow-2xl group"
  >
    <div className="relative aspect-video">
      <img 
        src={game.thumbnail} 
        alt={game.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-yellow-500">
          <Star className="w-3 h-3 fill-yellow-500" /> {game.rating}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
        <div className="bg-yellow-500 p-3 rounded-full shadow-lg">
          <Play className="text-black w-6 h-6 fill-black" />
        </div>
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-white font-black uppercase text-lg tracking-tighter leading-none">{game.name}</h3>
        <span className="text-[10px] bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
          {game.category}
        </span>
      </div>
      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-medium">{game.description}</p>
    </div>
  </Link>
);

const Footer = () => (
  <footer className="bg-gray-950 border-t border-gray-800 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="text-yellow-500 w-8 h-8" />
            <span className="text-3xl font-black text-white tracking-tighter italic">UNBLOCKED<span className="text-yellow-500 underline">2025</span></span>
          </div>
          <p className="text-gray-500 max-w-md leading-relaxed">
            The world's most trusted source for high-quality unblocked games. We bypass filters safely and provide a clean gaming experience for schools, universities, and workplaces worldwide. No downloads required.
          </p>
        </div>
        <div>
          <h4 className="text-white font-black uppercase mb-4 tracking-widest text-sm">Categories</h4>
          <ul className="space-y-2 text-gray-500 font-bold uppercase text-xs tracking-widest">
            <li className="hover:text-yellow-500 cursor-pointer">Action</li>
            <li className="hover:text-yellow-500 cursor-pointer">Racing</li>
            <li className="hover:text-yellow-500 cursor-pointer">Sports</li>
            <li className="hover:text-yellow-500 cursor-pointer">Multiplayer</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-black uppercase mb-4 tracking-widest text-sm">Support</h4>
          <ul className="space-y-2 text-gray-500 font-bold uppercase text-xs tracking-widest">
            <li className="hover:text-yellow-500 cursor-pointer">Report Bug</li>
            <li className="hover:text-yellow-500 cursor-pointer">Request Game</li>
            <li className="hover:text-yellow-500 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-yellow-500 cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-900 flex flex-wrap justify-between items-center gap-4">
        <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">© 2025 UNBLOCKED GAMES HUB. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-4">
          <div className="p-2 bg-gray-900 rounded hover:bg-yellow-500 hover:text-black transition-all cursor-pointer">
            <Zap className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  </footer>
);

/**
 * PAGE COMPONENTS
 */

const Home = ({ searchTerm }: { searchTerm: string }) => {
  const filteredGames = useMemo(() => {
    return GAMES.filter(game => 
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <main className="container mx-auto px-4 py-8">
      <AdBanner />
      
      <div className="flex items-center gap-3 mb-8">
        <Zap className="text-yellow-500 w-6 h-6 fill-yellow-500" />
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
          {searchTerm ? `Results for "${searchTerm}"` : 'Top Unblocked Games 2025'}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-20">
          <Info className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h3 className="text-2xl text-gray-500 font-bold italic uppercase">No games found...</h3>
          <p className="text-gray-600 mt-2 tracking-widest">Try searching for "Action" or "Slope"</p>
        </div>
      )}

      <div className="mt-16 bg-gray-800/50 p-8 rounded-3xl border border-gray-800">
        <div className="max-w-3xl">
          <h3 className="text-white text-2xl font-black mb-4 uppercase italic tracking-tighter">Why play on Unblocked 2025?</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Our platform utilizes advanced bypass technologies and secure CDN delivery to ensure you can access your favorite games even behind restricted networks. We monitor and update our links daily to provide the most reliable "No Download" experience online.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Zap className="text-yellow-500 w-5 h-5" />
              </div>
              <span className="text-white text-xs font-bold uppercase tracking-widest">Ultra Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                <Play className="text-green-500 w-5 h-5 fill-green-500" />
              </div>
              <span className="text-white text-xs font-bold uppercase tracking-widest">No Lag</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Info className="text-blue-500 w-5 h-5" />
              </div>
              <span className="text-white text-xs font-bold uppercase tracking-widest">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const GamePlayer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = useMemo(() => GAMES.find(g => g.id === id), [id]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Error: Game Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-8 px-10 py-4 bg-yellow-500 text-black font-black rounded-xl uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
            <HomeIcon className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex gap-4">
             <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="px-4 py-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all"
            >
              {isFullscreen ? 'Exit Theater' : 'Theater Mode'}
            </button>
            <a 
              href={game.embedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-yellow-400 transition-all"
            >
              <ExternalLink className="w-4 h-4" /> Pop-out
            </a>
          </div>
        </div>

        <div className={`relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${isFullscreen ? 'max-w-none' : 'max-w-5xl mx-auto aspect-video'}`} style={isFullscreen ? { height: '85vh' } : {}}>
          <iframe 
            src={game.embedUrl}
            title={game.name}
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>

        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 pb-20">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 italic">
              {game.name} <span className="text-yellow-500 ml-2">UNBLOCKED</span>
            </h1>
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 bg-gray-800 text-yellow-500 rounded font-black text-[10px] uppercase tracking-widest">{game.category}</span>
              <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded font-black text-[10px] uppercase tracking-widest flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> {game.rating}</span>
              <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded font-black text-[10px] uppercase tracking-widest">Play Count: 1.2M+</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 font-medium italic">
              {game.description}
            </p>
            <div className="p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <h3 className="text-white font-black uppercase mb-4 text-sm tracking-widest">How to Play</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Click inside the game window to activate controls. Use arrow keys or WASD for movement. This game is optimized for browser play and does not require Flash player. If the game doesn't load, try the "Pop-out" button to open it in a dedicated window.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <AdBanner />
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-white font-black uppercase mb-4 text-sm tracking-widest">Other Trending Games</h3>
              <div className="space-y-4">
                {GAMES.filter(g => g.id !== id).slice(0, 4).map(other => (
                  <Link key={other.id} to={`/game/${other.id}`} className="flex gap-3 group">
                    <img src={other.thumbnail} alt={other.name} className="w-20 h-14 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                    <div>
                      <h4 className="text-white text-xs font-black uppercase tracking-tighter group-hover:text-yellow-500 transition-colors">{other.name}</h4>
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{other.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN APP
 */

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 selection:bg-yellow-500 selection:text-black">
      <Header onSearch={setSearchTerm} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/game/:id" element={<GamePlayer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
