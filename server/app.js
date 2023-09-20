const movies = require('./movies.json')
const crypto = require('node:crypto')
const express = require('express')
const { validateMovie, validateParcialMovie } = require('./Schemas/movies')
const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.get('/movies', (req, res) => {
  const { genre } = req.query

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
  const validatedMovie = validateMovie(req.body)

  if (validatedMovie.error) {
    return res.status(400).json({ error: JSON.parse(validatedMovie.error.message) })
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...validatedMovie.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const movieParcialValidated = validateParcialMovie(req.body)
  if (movieParcialValidated.error) {
    return res.status(400).json({ message: JSON.parse(movieParcialValidated.error.message) })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...movieParcialValidated.data
  }

  movies[movieIndex] = updatedMovie
  return res.json(updatedMovie)
})

const PORT = 1234
app.listen(PORT, () => {
  console.log(`🌎SERVER LISTENING ON http://localhost:${PORT}`)
})
