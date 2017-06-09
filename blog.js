// Dependencies
var Vue = require('./node_modules/vue/dist/vue.min.js');

/*
  Since I have to load the whole folder /posts into Webpack
  I will be using request.context to push all the posts to a cache.
  The whole solution is taken straigth from the webpack docs.
*/
var cache = {};
// The function goes through the keys and pushes them to the cache
function importAll(r) {
  r.keys().forEach(function(key) {
    cache[key] = r(key);
  })
}
// Calling the function with the request.context
importAll(require.context('./posts/', false, /\.md$/));

/*
For simplicity I will put most of the needed JS in this file.
Some refactoring will be done at a later point
*/


// Main articles loop
var app = new Vue({
  el: '#content',
  data: {
    articles: []
  },
  // on Ready
  created: function() {
    /*
      Here's an artificial way of creating ids
    */
    for(key in cache) {
      // some date construct
      var year = key.slice(2,6);
      var month = key.slice(6,8);
      var day = key.slice(8,10);
      // building the date string with time 00:00:00
      var date = new Date(year+"-"+month+"-"+day+"T00:00:00");
      // pushing to a common object
      this.articles.push(
        {
          'date' : date,
          'title': key.slice(11,(key.length-3)),
          'post': cache[key]
        }
      )
    }
    // simple - new-ones at top
    this.articles.sort(function(d1, d2) {
      return d2.date - d1.date;
    });
  },
  // scrollto stuff
  methods: {
    scrollMeTo(ref) {
      var posts = this.$refs.articles;
      posts.forEach(function(post) {
        if(post.innerText == ref) {
          window.scrollTo(0, post.offsetTop);
        }
      })
    },
    gotoTop() {
      window.scrollTo(0, this.$refs['top'].offsetTop);
    }
  }
})
