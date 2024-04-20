const verifyAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== process.env.APP_TOKEN) {
    res.status(401).send();
    return;
  }
  next();
};

module.exports = {
  verifyAuth
}