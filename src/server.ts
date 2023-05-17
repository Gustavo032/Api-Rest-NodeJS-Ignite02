import fastify from "fastify";

const app = fastify()

//GET,POST, PUT, PATCH, DELETE
app.get('/hello', (req, res) => {

	return 'Hello World'
})

app.listen({
	port:3333,
}).then(()=> {
	console.log('http server listening on port 3333')
})