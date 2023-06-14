// textract = require('textract'),
// mime = require('mime'),

import _ from 'underscore';
import fs from 'fs';
import path from 'path';

/**
 *
 * @param file
 * @param cbAfterProcessing
 */
function processFile(file, cbAfterProcessing) {
  extractTextFile(file, function (PreparedFile, error) {
    if (_.isFunction(cbAfterProcessing)) {
      if (error) {
        return cbAfterProcessing(null, error);
      }
      cbAfterProcessing(PreparedFile);
    } else {
      console.error('cbAfterProcessing should be a function');
      cbAfterProcessing(null, 'cbAfterProcessing should be a function');
    }
  });
}

function processUrl(url, cbAfterProcessing) {
  extractTextUrl(url, function (data, error) {
    if (_.isFunction(cbAfterProcessing)) {
      if (error) {
        return cbAfterProcessing(null, error);
      }
      cbAfterProcessing(data);
    } else {
      console.error('cbAfterProcessing should be a function');
      cbAfterProcessing(null, 'cbAfterProcessing should be a function');
    }
  });
}

/**
 *
 * @param data
 * @returns {string}
 */
function cleanTextByRows(data) {
  var rows,
    clearRow,
    clearRows = [];

  rows = data.split('\n');
  for (var i = 0; i < rows.length; i++) {
    clearRow = cleanStr(rows[i]);
    if (clearRow) {
      clearRows.push(clearRow);
    }
  }

  return clearRows.join('\n') + '\n{end}';
}

/**
 *
 * @param file
 * @param cbAfterExtract
 */
function extractTextFile(file, cbAfterExtract) {
  console.log(file);
  textract.fromFileWithPath(file, { preserveLineBreaks: true }, function (err, data) {
    if (err) {
      console.error(err);
      return cbAfterExtract(null, err);
    }
    if (_.isFunction(cbAfterExtract)) {
      data = cleanTextByRows(data);
      var File = new PreparedFile(file, data.replace(/^\s/gm, ''));
      cbAfterExtract(File);
    } else {
      console.error('cbAfterExtract should be a function');
      return cbAfterExtract(null, 'cbAfterExtract should be a function');
    }
  });
}

function extractTextUrl(url, cbAfterExtract) {
  console.log(url);
  textract.fromUrl(url, { preserveLineBreaks: true }, function (err, data) {
    if (err) {
      console.error(err);
      return cbAfterExtract(null, err);
    }
    if (_.isFunction(cbAfterExtract)) {
      data = cleanTextByRows(data);
      cbAfterExtract(data);
    } else {
      console.error('cbAfterExtract should be a function');
      return cbAfterExtract(null, 'cbAfterExtract should be a function');
    }
  });
}

/**
 *
 * @param str
 * @returns {string}
 */
function cleanStr(str) {
  return str.replace(/\r?\n|\r|\t|\n/g, '').trim();
}

function PreparedFile(file, raw) {
  this.path = file;
  this.mime = mime.getType(file);
  this.ext = mime.getExtension(this.mime);
  this.raw = raw;
  this.name = path.basename(file);
}

/**
 *
 * @param Resume
 */
PreparedFile.prototype.addResume = function (Resume) {
  this.resume = Resume;
};

PreparedFile.prototype.saveResume = function (path, cbSavedResume) {
  path = path || __dirname;

  if (!_.isFunction(cbSavedResume)) {
    return console.error('cbSavedResume should be a function');
  }

  if (fs.statSync(path).isDirectory() && this.resume) {
    fs.writeFile(path + '/' + this.name + '.json', this.resume.jsoned(), cbSavedResume);
  }
};

module.exports.runFile = processFile;
module.exports.runUrl = processUrl;
module.exports.PreparedFile = PreparedFile;
