const app = require('./app-config.js')
const client = require('./app-client-config.js')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT

app.use(async (req, res, next) => {
	const [meta] = await Promise.all([client.getSingle('metadata')])
	res.locals.defaults = { meta }
	next()
})

app.get('/', async (req, res) => {
	res.render('base.pug', { ...res.locals.defaults })
})

app.listen(port, () => {
	console.log(`--------> App listening at http://localhost:${port}`)
})
