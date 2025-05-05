import img1 from "../assets/images/img1.png";

const projects = [
  {
    id: 1,
    name: "Watchlist",
    description: "create lists of your favorite films, write reviews for the movies in them, and share yourself in film!",
    url: "https://watchlist-pp-b1b5f2bf4594.herokuapp.com/lists",
    github: "https://github.com/phyuphyuh/rails-watch-list",
    techStack: ["Ruby on Rails", "PostgreSQL", "Turbo (Hotwire)", "Stimulus.js", "Bootstrap", "Lodash", "Heroku"],
    images: [img1, img1, img1, img1],
  },
  {
    id: 2,
    name: "SelfShelf",
    description: "Create your own shelf showcasing your fav films, books, and music!",
    url: "https://watchlist-pp-b1b5f2bf4594.herokuapp.com/lists",
    github: "https://github.com/phyuphyuh/rails-watch-list",
    techStack: ["Rails", "PostgreSQL"],
    images: ["/img1.png", "/img2.png"],
  }
];

export default projects;
