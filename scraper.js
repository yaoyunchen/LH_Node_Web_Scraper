var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');

var url = 'http://substack.net/images/';
var csvRow = "";

request(url, function(error, response, html) {
  if (error) {
    console.error(error);
  } else {
    var filePer, absURL, fileType;
    
    var $ = cheerio.load(html);
    
    $('tr').each(function() {
      var row = $(this);
      
      filePer =row.children().first().text();
      absURL = row.find('td a').attr('href');
      fileType = path.extname(row.children().last().text());
      
      if (fileType != "") {
        csvRow += filePer + "," + absURL + "," + fileType + "\n";
      } else {
        csvRow += filePer + "," + absURL + "\n";
      }

      


      // console.log("Permission:", filePer);
      // console.log("URL:", absURL);
      // console.log("Type:", fileType);
    });

    fs.writeFile('images.csv', csvRow, 'utf8', function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Successfully wrote to file.");
      }
    });
  }
});