import { video } from "motion/react-client";
import img1 from "../assets/images/img1.png";

import wagonRaceImg from "../assets/images/wagonrace.png";
import wagonRace from "../assets/videos/wagonrace.mp4";

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
    techStack: ["Ruby on Rails", "PostgreSQL", "Turbo (Hotwire)", "Stimulus.js", "Bootstrap", "TMDB API", "Heroku"],
    images: [img1, img1, img1, img1, img1, img1],
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
    techStack: ["Ruby on Rails", "PostgreSQL", "Stimulus.js", "Bootstrap", "Devise", "TMDB API", "Spotify API", "Google Books API", "Heroku", "Git/GitHub"],
    images: [img1],
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
    techStack: ["Ruby on Rails", "PostgreSQL", "Bootstrap", "Stimulus.js", "Devise", "Mapbox API", "Heroku", "Git/GitHub"],
    images: [img1, img1, img1, img1, img1, img1],
  },
  {
    id: 4,
    name: "Task Manager",
    description: "Create your own shelf showcasing your fav films, books, and music!",
    url: "https://www.selfshelf.me/",
    github: "https://github.com/phyuphyuh/rails-watch-list",
    techStack: ["Rails", "PostgreSQL", "Javascript", "Stimulus.js", "SCSS", "HTML", "GitHub", "Heroku"],
    images: [img1, img1, img1, img1],
  },
  {
    id: 5,
    name: "Developer Portfolio",
    description: {
      before: "Step into my journey as a web developer through this interactive portfolio created with React. Featuring clean aesthetics and thoughtful animations, the site offers an engaging experience that invites exploration.",
    },
    url: "https://watchlist-pp-b1b5f2bf4594.herokuapp.com/lists",
    github: "https://github.com/phyuphyuh/rails-watch-list",
    techStack: ["React", "Motion", "SCSS Modules", "Vite", "Vercel"],
    images: [img1, img1, img1, img1, img1, img1],
  },
  {
    id: 6,
    name: "Wagon Race",
    description: "Create your own shelf showcasing your fav films, books, and music!",
    url: "https://phyuphyuh.github.io/Wagon-Race/",
    github: "https://github.com/phyuphyuh/Wagon-Race",
    techStack: ["Javascript", "HTML", "CSS", "Github Pages"],
    images: [wagonRaceImg],
    video: wagonRace,
  },
  {
    id: 8,
    name: "React Bridge Player",
    description: "Create your own shelf showcasing your fav films, books, and music!",
    url: "https://www.selfshelf.me/",
    github: "https://github.com/phyuphyuh/rails-watch-list",
    techStack: ["Rails", "PostgreSQL", "Javascript", "Stimulus.js", "SCSS", "HTML", "GitHub", "Heroku"],
    images: [img1, img1, img1, img1],
  }
];

export default projects;
