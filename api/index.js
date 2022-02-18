let express = require("express")
let cors = require("cors")
let axios = require("axios")
let episodes = require("./episodes")

let port = process.env.PORT || 9999
let app = express()

let client = axios.default.create({ baseURL: "https://api.tvmaze.com" })

app.get("/v1/shows", cors(), function (req, res) {
  res.json(episodes)
})

app.get("/v2/shows", cors(), async function (req, res) {
  try {
    let params = new URLSearchParams({ q: req.query.q })
    let showsResponse = await client.get("/search/shows/", {
      params,
    })
    res.json(showsResponse.data.map((item) => item.show).filter((show) => Boolean(show.image)))
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unexpected error" })
  }
})

async function fetchShows(req, res) {
  try {
    let { query, q } = req.query
    if (q) {
      res
        .status(400)
        .json({ message: "Invalid request! Parameter 'q' has been deprecated. Please use 'query' instead." })
      return
    }
    if (!query) {
      res.status(400).json({ message: "Invalid request! Missing 'query' parameter" })
      return
    }

    let params = new URLSearchParams({ q: query })
    let showsResponse = await client.get("/search/shows/", {
      params,
    })
    res.json(showsResponse.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unexpected error" })
  }
}

app.get("/v3/shows", cors(), fetchShows)
app.get("/v4/shows", fetchShows)

app.listen(port, function () {
  console.log("API server started on: http://localhost:" + port)
})
