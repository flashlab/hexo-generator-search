var pathFn = require('path');
var fs = require('fs');
module.exports = function(locals) {
    var config = this.config;
    var searchConfig = config.search;
    var searchfield = searchConfig.field.trim();
    var searchlimit = searchConfig.limit;
    var content = searchConfig.content;
    var posts, pages, raw;
    searchfield = searchfield.trim();
    if (searchfield != '') {
        if (searchfield == 'post') {
            posts = locals.posts.sort('-date');
        } else if (searchfield == 'page') {
            pages = locals.pages;
        } else {
            posts = locals.posts.sort('-date');
            pages = locals.pages;
        }
    } else {
        posts = locals.posts.sort('-date');
    }
    posts = posts.slice(0, searchlimit);
    var res = new Array()
    var index = 0
    if (posts) {
        posts.each(function(post) {
            if (post.indexing != undefined && !post.indexing) return;
            var temp_post = new Object()
            if (post.title) {
                temp_post.title = post.title
            }
            if (post.path) {
                temp_post.url = encodeURIComponent(config.root + post.path)
            }
            if (content != false && post._content) {
                temp_post.content = post._content
            }
            if (post.tags && post.tags.length > 0) {
                var tags = []
                post.tags.forEach(function(tag) {
                    tags.push(tag.name);
                });
                temp_post.tags = tags
            }
            if (post.categories && post.categories.length > 0) {
                var categories = [];
                post.categories.forEach(function(cate) {
                    categories.push(cate.name);
                });
                temp_post.categories = categories
            }
            res[index] = temp_post;
            index += 1;
        });
    }
    if (pages) {
        pages.each(function(page) {
            if (page.indexing != undefined && !page.indexing) return;
            var temp_page = new Object()
            if (page.title) {
                temp_page.title = page.title
            }
            if (page.path) {
                temp_page.url = encodeURIComponent(config.root + page.path)
            }
            if (content != false && page._content) {
                temp_page.content = page._content
            }
            if (page.tags && page.tags.length > 0) {
                var tags = []
                post.tags.forEach(function(tag) {
                    tags.push(tag.name);
                });
                temp_page.tags = tags
            }
            if (page.categories && page.categories.length > 0) {
                var categories = [];
                post.categories.forEach(function(cate) {
                    categories.push(cate.name);
                });
                temp_page.categories = categories
            }
            res[index] = temp_page;
            index += 1;
        });
    }
    var json = JSON.stringify(res);
    return {
        path: searchConfig.path,
        data: json
    };
};
