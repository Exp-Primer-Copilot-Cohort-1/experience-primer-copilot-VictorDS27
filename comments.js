// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Set up the server
app.use(bodyParser.json());

// GET /comments
// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

// POST /comments
// Add a new comment
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send('Comment added!');
                }
            });
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// Path: index.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <div id="comments"></div>
    <form id="commentForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        <br>
        <label for="comment">Comment:</label>
        <textarea id="comment" name="comment"></textarea>
        <br>
        <button type="submit">Submit</button>
    </form>
    <script>
        const commentsDiv = document.getElementById('comments');
        const commentForm = document.getElementById('commentForm');

        // Function to fetch comments from the server
        const fetchComments = async () => {
            const response = await fetch('http://localhost:3000/comments');
            const comments = await response.json();
            commentsDiv.innerHTML = '';
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `<strong>${comment.name}</strong>: ${comment.comment}`;
                commentsDiv.appendChild(commentElement);
            });
        };

        // Function to