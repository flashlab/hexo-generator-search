# hexo-generator-searchdb

[![npm](https://img.shields.io/badge/npmjs-1.1.0-brightgreen.svg)](https://www.npmjs.com/package/hexo-generator-searchdb)
[![npm](https://img.shields.io/npm/v/hexo-generator-searchdb.svg)](https://www.npmjs.com/package/hexo-generator-searchdb)
[![npm](https://img.shields.io/npm/dm/hexo-generator-searchdb.svg)](https://www.npmjs.com/package/hexo-generator-searchdb)

Generate search data for Hexo 3.0. This plugin is used for generating a search index file, which contains all the neccessary data of your articles that you can use to write a local search engine for your blog. Supports both XML and JSON format output.

## Install

``` bash
$ npm install hexo-generator-searchdb --save
```

## Options

You can configure this plugin in your root `_config.yml`. All the arguments are optional.

``` yaml
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
  content: true
```

- **path** - file path. By default is `search.xml` . If the file extension is `.json`, the output format will be JSON. Otherwise XML format file will be exported.
- **field** - the search scope you want to search, you can chose:
  * **post** (Default) - will only covers all the posts of your blog.
  * **page** - will only covers all the pages of your blog.
  * **all** - will covers all the posts and pages of your blog.
- **format** - the form of the page contents, works with xml mode, options are:
  * **html** (Default) - original html string being minified.
  * **raw** - markdown text of each posts or pages.
  * **excerpt** - only collect excerpt.
  * **more** - act as you think.
- **limit** - define the maximum number of posts being indexed, always prefer the newest.
- **content** - whether contains the whole content of each article. If `false`, the generated results only cover title and other meta info without mainbody. By default is `true`.

## Notice

For node.js version < 4.2.2, please use v0.X.X.

## Exclude indexing

To exclude a certain post or page from being indexed, you can simply insert `indexing: false` setting at the top of its front-matter, *e.g.*:

```
title: "Code Highlight"
date: "2014-03-15 20:17:16"
tags: highlight
categories: Demo
description: "A collection of Hello World applications from helloworld.org."
toc: true
indexing: false
---
```

Then the generated result will not contain this post or page.

## FAQ

### What's this plugin supposed to do? 

This plugin is used for generating a xml / json file from your Hexo blog that provides data for searching.

### Where's this file saved to?

After executing `hexo g` you will get the generated result at your public folder.
