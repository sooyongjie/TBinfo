const express = require('express');
const app = express();
const path = require('path');

// app.get('/', (req, res) => {
//     // res.send('<h1>h e l l o  w o r l d</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

app.get(express.static(path.join(__dirname, 'public')))

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => console.log(`Server started on port ${PORT}`));