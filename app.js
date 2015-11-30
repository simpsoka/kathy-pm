var harp     = require('harp');
var Github   = require('github');
var fs       = require('fs');
var path     = require('path');
var UglifyJS = require('uglify-js');
var request  = require('request');
var config   = require('./config');
var markdownpdf = require('markdown-pdf');
var sass        = require('node-sass');

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
		if (!err) {
			callback(res);
		}
	}
)};

var fetchGistFiles = function(callback) {
	getGithubGists(function(gists) {
		gists.forEach(function(gist, idx) {
			config.files.forEach(function(file, idx) {
				var fileObj = gist.files[file];
				var baseName = path.basename(file, '.md');
				var basePath = path.join(config.section_path, baseName);
				var filePath = path.join(basePath, file);
				var dest = path.join(config.files_path, baseName + '.pdf');

				if (fileObj) {
					fs.writeFile(path.join(basePath, '_data.json'), JSON.stringify(gist));
					request(fileObj.raw_url).pipe(fs.createWriteStream(filePath)).on('close', function() {
						sass.render({
						  file: config.scss_path,
						  data: "h1, h2, h3, h4 { margin: 0; } body { padding: 4em; } ul { padding-left: 1.25em; } h3 { margin-top: 1.25em; margin-bottom: 1.25em; } h4:not(:first-child) { margin-top: 1.25em * 2; } h4 + p { margin: 0; }"
						}, function(err, result) {
							fs.writeFile(config.pdf_css_path, result.css);
						});
						markdownpdf({
							cssPath: config.pdf_css_path,
						}).from(filePath).to(dest, function () {});
					})
				}
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
	uglify();
	fetchGistFiles();
}

server();

// uglify();