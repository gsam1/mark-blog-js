// Dependencies
var Vue = require('./node_modules/vue/dist/vue.js');

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
    articles: [],
    titles: [],
    posts: []
  },
  // on Ready
  created: function() {
    for(key in cache) {
      this.articles.push(
        {
          'title': key,
          'post': cache[key]
        }
      )
      this.posts.push(cache[key])
      this.titles.push(key);
    }
    // simple - new-ones at top
    this.articles.reverse();
    this.posts.reverse();
    this.titles.reverse();
  },
  // scrollto stuff
  methods: {
    scrollMeTo(ref) {
      console.log(ref);
      console.log(this.$refs[ref]);
      // var element = this.$refs[ref];
      // var top = element.offsetTop;
      //
      // window.scrollTo(0, top);
    }
  }
})
