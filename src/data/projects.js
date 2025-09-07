import img1 from "../assets/images/img1.png";
import watchlist1 from "../assets/images/watchlist1.png";
import watchlist2 from "../assets/images/watchlist2.png";
import watchlist3 from "../assets/images/watchlist3.png";
import watchlist4 from "../assets/images/watchlist4.png";
import watchlist5 from "../assets/images/watchlist5.png";

import weather1 from "../assets/images/weather1.png";
import weather2 from "../assets/images/weather2.png";
import weather3 from "../assets/images/weather3.png";

import wagonRaceImg from "../assets/images/wagonrace.png";
import wagonRace from "../assets/videos/wagonrace.mp4";

import aiPlaylist1 from "../assets/images/ai-playlist-1.png";
import aiPlaylist2 from "../assets/images/ai-playlist-2.png";
import aiPlaylist3 from "../assets/images/ai-playlist-3.png";
import aiPlaylist4 from "../assets/images/ai-playlist-4.png";


const projects = [
  {
    id: 1,
    name: "Watchlist",
    description: {
      before: "Share yourself in film with ",
      highlight: "Watchlist",
      after: ", a movie journeling app. Dynamically search for movies using the TMDB API, add films during or after list creation, and write reviews for each title in their collection. Built with Rails and enhanced through custom Stimulus and Turbo integrations for seamless interactions and instant updates."
    },
    url: "https://watchlist-pp-b1b5f2bf4594.herokuapp.com/",
    github: "https://github.com/phyuphyuh/rails-watch-list",
    techStack: ["Ruby on Rails", "PostgreSQL", "Turbo (Hotwire)", "Stimulus", "Bootstrap", "TMDB API", "Heroku"],
    images: [watchlist1, watchlist2, watchlist3, watchlist4, watchlist5],
  },
  {
    id: 2,
    name: "SelfShelf",
    description: {
      before: "Express your cultural identity through ",
      highlight: "SelfShelf",
      after: ", a social discovery platform where you can curate and share personalized digital shelves showcasing films, books, and music you enjoy, while discovering recommendations from users with similar tastes. Seamlessly search and add items using integrated APIs, follow other users' collections, and build your cultural footprint in one unified platform. Built collaboratively as the final project of Le Wagon's intensive web development program."
    },
    url: "https://www.selfshelf.me/",
    github: "https://github.com/phyuphyuh/SelfShelf",
    techStack: ["Ruby on Rails", "PostgreSQL", "Stimulus", "Bootstrap", "Devise", "TMDB API", "Spotify API", "Google Books API", "Heroku", "Git/GitHub"],
    images: [img1, img1, img1],
  },
  {
    id: 3,
    name: "Art Classes",
    description: {
      before: "Discover and share artistic experiences in Tokyo through this marketplace app for art workshops. ",
      highlight: "Art Classes",
      after: " connects creative instructors with students through an interactive platform featuring real-time booking and category filtering for pottery, painting, drawing, and DIY workshops. Developed collaboratively using Git/Github for version control and team workflow."
    },
    url: "https://art-classes-22f38858df0a.herokuapp.com/",
    github: "https://github.com/phyuphyuh/art_classes",
    techStack: ["Ruby on Rails", "PostgreSQL", "Bootstrap", "Stimulus", "Devise", "Mapbox API", "Heroku", "Git/GitHub"],
    images: [img1, img1, img1],
  },
  {
    id: 4,
    name: "Wagon Race",
    description: {
      before: "Race to the finish in this two-player game built with vanilla JavaScript. ",
      highlight: "Wagon Race",
      after: " highlights core DOM manipulation and keyboard event handling for real-time player interaction."
    },
    url: "https://phyuphyuh.github.io/Wagon-Race/",
    github: "https://github.com/phyuphyuh/Wagon-Race",
    techStack: ["JavaScript", "HTML", "CSS", "Github Pages"],
    images: [wagonRaceImg],
    video: wagonRace,
  },
  {
    id: 5,
    name: "Developer Portfolio",
    description: {
      before: "Step into my journey as a web developer through this interactive portfolio created with React. Featuring clean aesthetics and thoughtful animations, the site offers an engaging experience that invites exploration.",
    },
    url: "https://phyuphyuh.me/",
    github: "https://github.com/phyuphyuh/my-portfolio",
    techStack: ["React", "Vite", "SCSS Modules", "Motion", "Vercel"],
    images: [img1, img1, img1, img1, img1, img1],
  },
  {
    id: 6,
    name: "Weather App",
    description: {
      before: "Get real-time forecasts instantly with this responsive weather app built using React and powered by the OpenWeatherMap API. Search for any city or allow location access for local weather updates, switch between metric and imperial units, and enjoy automatic theme changes based on time of day. Weather data is temporarily cached in local storage to optimize performance and reduce API calls.",
    },
    url: "https://phyuphyuh.github.io/react-weather-app/",
    github: "https://github.com/phyuphyuh/react-weather-app",
    techStack: ["React", "Vite", "Tailwind CSS", "OpenWeatherMap API", "GitHub Pages"],
    images: [weather1, weather2, weather3],
  },
  {
    id: 7,
    name: "AI Playlist Generator",
    description: {
      before: "Create personalized music playlists with AI in seconds using ",
      highlight: "AI Playlist Generator",
      after: ". Powered by OpenAI's GPT-4o-mini, the app generates tailored song lists from any niche or broad request, then fetches corresponding YouTube videos via the YouTube Data API v3. The results are compiled into an interactive, instantly playable playlist with a custom media player featuring playback controls and progress tracking. Built with Vercel serverless functions for secure API key handling.",
    },
    url: "https://ai-playlist-xi.vercel.app",
    github: "https://github.com/phyuphyuh/ai-playlist",
    techStack: ["React", "Typescript", "Vite", "Tailwind CSS", "react-youtube", "OpenAI API", "Youtube Data API v3", "Vercel (Serverless Functions + Hosting)"],
    images: [aiPlaylist1, aiPlaylist2, aiPlaylist3, aiPlaylist4],
  }
];

export default projects;
