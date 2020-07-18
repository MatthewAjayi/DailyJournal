const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let postTitle = [];
let post = [];

// Default home paragraph text
let homeParagraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
incididunt ut labore et dolore magna aliqua. Dolor sit amet consectetur adipiscing. Purus in massa 
tempor nec feugiat nisl. Neque egestas congue quisque egestas diam in. Vel facilisis volutpat est 
velit egestas dui id ornare. Cursus turpis massa tincidunt dui. Faucibus pulvinar elementum integer 
enim neque volutpat ac. Morbi non arcu risus quis varius quam quisque id. Erat nam at lectus urna 
duis convallis. Et netus et malesuada fames. Pellentesque id nibh tortor id aliquet lectus. 
Elementum integer enim neque volutpat ac.`;

// Go to requested pages
app.get('/', function (req, res) {
	res.render('homepage', { homeParagraph: homeParagraph, postTitle: postTitle, post: post });
});

app.get('/compose', function (req, res) {
	res.render('compose');
});

app.get('/contact', function (req, res) {
	res.render('contact');
});

app.get('/about', function (req, res) {
	res.render('about');
});

// Route to full post page
app.get('/post/:postTitle', function (req, res) {
	let format = req.params.postTitle;
	let x = postTitle.includes(format);

	if (x === true) {
		let formatPost = req.params.post;
		let n = postTitle.indexOf(format);
		res.render('postPage', { homeParagraph: homeParagraph, postTitle: format, post: post[n] });
	} else {
		res.render('error');
	}
});

// Get information from text boxes
app.post('/', function (req, res) {
	let postTitles = req.body.postTitle;
	let posts = req.body.postVal;
	postTitle.push(postTitles);
	post.push(posts);
	res.redirect('/');
});

app.get('*', function (req, res) {
	res.render('error');
});

app.listen(3000, function () {
	console.log('Server started on port 3000');
});
