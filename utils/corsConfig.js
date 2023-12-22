const corsConfig = {
  origin: [
    "http://localhost:3000",
    "http://api.movies.project.nomoredomainsmonster.ru/",
    "https://api.movies.project.nomoredomainsmonster.ru/"
  ],
  credentials: true,
  maxAge: 30,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
};

module.exports = { corsConfig };
