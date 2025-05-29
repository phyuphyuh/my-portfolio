import { video } from "motion/react-client";
import img1 from "../assets/images/img1.png";

import wagonRaceImg from "../assets/images/wagonrace.png";
import wagonRace from "../assets/videos/wagonrace.mp4";

const projects = [
  {
    id: 1,
    name: "Watchlist",
    description: "Share yourself in film with Watchlist, a movie journeling app. Dynamically search for movies using the TMDB API, add films during or after list creation, and write reviews for each title in their collection. Enjoy seamless interactions and instant updates thanks to Stimulus and Turbo.",
    url: "https://watchlist-pp-b1b5f2bf4594.herokuapp.com/",
    github: "https://github.com/phyuphyuh/rails-watch-list",
    techStack: ["Ruby on Rails", "PostgreSQL", "Turbo (Hotwire)", "Stimulus.js", "Bootstrap", "TMDB API", "Heroku"],
    images: [img1, img1, img1, img1, img1, img1],
  },
  {
    id: 2,
    name: "SelfShelf",
    description: "Create your own shelf showcasing your fav films, books, and music!",
    url: "https://www.selfshelf.me/",
    github: "https://github.com/phyuphyuh/SelfShelf",
    techStack: ["Ruby on Rails", "PostgreSQL", "Stimulus.js", "Bootstrap", "Devise", "TMDB API", "Spotify API", "Google Books API", "Heroku", "Git/GitHub"],
    images: [img1],
  },
  {
    id: 3,
    name: "Art Classes",
    description: "Discover and share artistic experiences in Tokyo through this location-based marketplace for art workshops. Art Classes connects creative instructors with students through an interactive platform featuring real-time booking and category filtering for pottery, painting, drawing, and DIY workshops. Developed collaboratively using Git/Github for version control and team workflow.",
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
    name: "Portfolio",
    description: "create lists of your favorite films, write reviews for the movies in them, and share yourself in film!",
    url: "https://watchlist-pp-b1b5f2bf4594.herokuapp.com/lists",
    github: "https://github.com/phyuphyuh/rails-watch-list",
    techStack: ["React", "Motion", "SCSS Modules", "Vite", "Vercel"],
    images: [img1, img1, img1, img1, img1, img1],
  },
  {
    id: 6,
    name: "Slack copycat",
    description: "create lists of your favorite films, write reviews for the movies in them, and share yourself in film!",
    url: "https://watchlist-pp-b1b5f2bf4594.herokuapp.com/lists",
    github: "https://github.com/phyuphyuh/rails-watch-list",
    techStack: ["Ruby on Rails", "PostgreSQL", "Turbo (Hotwire)", "Stimulus.js", "Bootstrap", "Lodash", "Heroku"],
    images: [img1, img1, img1, img1, img1, img1],
  },
  {
    id: 7,
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
