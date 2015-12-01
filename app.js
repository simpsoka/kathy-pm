var harp     = require('harp');
var Github   = require('github');
var fs       = require('fs');
var path     = require('path');
var UglifyJS = require('uglify-js');
var request  = require('request');
var config   = require('./config');
var markdownpdf = require('markdown-pdf');
var sass        = require('node-sass');
var CronJob     = require('cron').CronJob;

var getGithubGists = function(callback) {
	var github = new Github({ // required 
    version: "3.0.0",
    debug: false,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "", // for some GHEs; none for GitHub 
    timeout: 5000,
    headers: {
      "user-agent": "kathy.pm" // GitHub is happy with a unique user agent 
    }
  });
	github.gists.getFromUser({
		user: config.github_user
	}, function (err, res) {
  	if (err) return;
		callback(res);
	}
)};

var ifShouldUpdateGist = function(filename, gist, callback) {
	if (!gist.files[filename]) return;

	var baseName = path.basename(filename, '.md');
	var basePath = path.join(config.section_path, baseName);
	var jsonFilePath = path.join(basePath, '_data.json');

	fs.readFile(jsonFilePath, 'utf8', function (err, data) {
  	if (err) return;
  	saved_gist = JSON.parse(data);
  	if (new Date(saved_gist.updated_at) < new Date(gist.updated_at)) {
  		callback();
  	}
	});
}

var updateGist = function(filename, gist) {
	var fileObj = gist.files[filename];
	var baseName = path.basename(filename, '.md');
	var basePath = path.join(config.section_path, baseName);
	var filePath = path.join(basePath, filename);
	var pdfPath  = path.join(config.files_path, baseName + '.pdf');
	var jsonFilePath = path.join(basePath, '_data.json');

	// write JSON
	fs.writeFile(jsonFilePath, JSON.stringify(gist));

	// write Markdown
	request(fileObj.raw_url).pipe(fs.createWriteStream(filePath)).on('close', function() {

		// sass generation
		sass.render({
		  file: config.scss_path,
		  data: "h1, h2, h3, h4 { margin: 0; } body { padding: 4em; } ul { padding-left: 1.25em; } h3 { margin-top: 1.25em; margin-bottom: 1.25em; } h4:not(:first-child) { margin-top: 1.25em * 2; } h4 + p { margin: 0; }"
		}, function(err, result) {
			fs.writeFile(config.pdf_css_path, result.css);
		});

		// write PDF
		markdownpdf({
			cssPath: config.pdf_css_path,
		}).from(filePath).to(pdfPath, function () {});
	})
}

var fetchGistFiles = function(callback) {
	getGithubGists(function(gists) {
		gists.forEach(function(gist, idx) {
			config.files.forEach(function(file, idx) {
				ifShouldUpdateGist(file, gist, function() {
					console.log('updating: ' + file + " at " + Date.now());
					updateGist(file, gist);
				});
			});
		});
	});
}

var uglify = function(callback) {
	files = fs.readdirSync(config.js_source_path);
	files = files.map(function(filename) {
		return path.join(config.js_source_path, filename);
	});
	fs.writeFile(path.join(config.js_path, 'app.js'), UglifyJS.minify(files).code, 'utf8', function(err) {
		if (callback) callback(err);
	});
}

var server = function(callback) {
	new CronJob('*/5 * * * * ', function(){
		fetchGistFiles();
	}, null, true, "America/Los_Angeles");

	uglify(function() {
		harp.server(config.harp_path, { 
			port: 3000
		}, function() {
			console.log('deployed server');
		});
	});
}

server();

// uglify();