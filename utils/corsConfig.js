const corsConfig = {
  origin: [
    "http://localhost:3000",
  ],
  credentials: true,
  maxAge: 30,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
};

module.exports = { corsConfig };
