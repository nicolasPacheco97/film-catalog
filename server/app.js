const movies = require('./movies.json')
const crypto = require('node:crypto')
const express = require('express')
const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.get('/movies', (req, res) => {
  const { genre } = req.query
  console.log(genre)

  if (genre) {
    const movieFiltered = movies.filter(movie => movie.genre.some(item => item.toLocaleLowerCase() === genre.toLocaleLowerCase()))
    return res.json(movieFiltered)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieId = movies.find(movie => movie.id === id)

  if (movieId) return res.json(movieId)

  res.status(404).json({ message: 'Missing movie' })
})

app.post('/movies', (req, res) => {
  const {
    title,
    year,
    director,
    duration,
    poster,
    genre,
    rate
  } = req.body
  const newMovie = {
    id: crypto.randomUUID(),
    title,
    year,
    director,
    duration,
    poster,
    genre,
    rate
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

const PORT = 1234
app.listen(PORT, () => {
  console.log(`🌎SERVER LISTENING ON http://localhost:${PORT}`)
})
