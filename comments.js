// Create web server
// 
// 1. Create a web server
// 2. Create a route
// 3. Read the comments.json file
// 4. Respond with the contents of comments.json
// 5. Start the web server
// 6. Test the web server
// 7. Add a new route
// 8. Add a new comment
// 9. Test the new route
// 10. Read the request body
// 11. Add the new comment to the comments array
// 12. Write the comments array to comments.json
// 13. Test the new route

const express = require('express');
const fs = require('fs');
const app = express();

// 2. Create a route
app.get('/comments', (req, res) => {
    // 3. Read the comments.json file
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Sorry, something went wrong');
        } else {
            // 4. Respond with the contents of comments.json
            res.send(data);
        }
    });
});

// 7. Add a new route
app.post('/comments', (req, res) => {
    // 10. Read the request body
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        // 11. Add the new comment to the comments array
        let comments = JSON.parse(body);
        comments.push({
            username: 'billybob',
            comment: 'I am a comment'
        });
        // 12. Write the comments array to comments.json
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Sorry, something went wrong');
            } else {
                res.send('Comment added');
            }
        });
    });
});

// 5. Start the web server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// 6. Test the web server
// 13. Test the new route
// In terminal: curl http://localhost:3000/comments
// In terminal: curl -X POST http://localhost:3000/comments
//
