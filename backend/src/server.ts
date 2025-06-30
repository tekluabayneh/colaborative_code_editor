import experts, { Response, Request } from 'express';
const app = experts();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World and teklu how are you is ts is working for you !');
});


app.listen(5000, (err) => {
    if (err) {
        return console.error('Error starting server:', err);
    }
    console.log('Server is running on http://localhost:5000');
})
