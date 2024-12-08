var http = require("http");
var fs = require("fs");
var path = require("path");
const mysql = require('mysql');

var server = http.createServer(function(request, response) {
    console.log('Request ', request.url);

    // Déterminer le chemin du fichier à servir
    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './Inscription1.html';
    }

    // Déterminer le type de contenu basé sur l'extension du fichier
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

});

//ecouter sur l'IP local et port
var hostname = '127.0.0.1';
var port = 3000;
server.listen(port, hostname, function() {
    console.log(`serveur HTTP demarre sur ${hostname}:${port}`);
});