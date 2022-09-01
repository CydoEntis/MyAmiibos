const notFoundMiddleware = (req, res) => {
  // TODO Switch out status code for constant.
  res.status(404).send("Route does not exist")
}

export default notFoundMiddleware;