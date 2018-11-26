'use strict';
var nunjucks = require('nunjucks');
var env = new nunjucks.Environment();
var pathFn = require('path');
var fs = require('fs');

env.addFilter('noControlChars', function(str) {
	return str && str.replace(/[\x00-\x1F\x7F]/g, '');
});

env.addFilter('cdata', function(str){
  return str ? '<![CDATA[' + str.trim().replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ') + ']]>' : '';
});

var searchTmplSrc = pathFn.join(__dirname, '../templates/search.xml');
var searchTmpl = nunjucks.compile(fs.readFileSync(searchTmplSrc, 'utf8'), env);

module.exports = function(locals){
  var config = this.config;
  var searchConfig = config.search;
  var template = searchTmpl;
  var searchfield = searchConfig.field.trim();
  var searchformat = searchConfig.format.trim();
  var searchlimit = searchConfig.limit;
  var posts, pages, raw;

  if(searchfield != ''){
    if(searchfield == 'post'){
      posts = locals.posts.sort('-date');
    }else if(searchfield == 'page'){
      pages = locals.pages;
    }else{
      posts = locals.posts.sort('-date');
      pages = locals.pages;
    }
  }else{
    posts = locals.posts.sort('-date');
  }
  if(searchformat != ''){
    if(['raw', 'excerpt', 'more'].indexOf(searchformat) > -1){
      raw = searchformat;
    }
  }

  var xml = template.render({
    config: config,
    posts: posts,
    pages: pages,
    raw: raw,
    limit: searchlimit,
    feed_url: config.root + searchConfig.path
  });

  return {
    path: searchConfig.path,
    data: xml
  };
};
