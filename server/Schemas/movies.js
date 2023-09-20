const z = require('zod')
const genreEnum = ['Action', 'Aventure', 'Drama', 'Comedy', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1900).max(2030),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url(),
  genre: z.enum(genreEnum).array(),
  rate: z.number().min(0).max(10).default(5.5)
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validateParcialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validateParcialMovie
}
