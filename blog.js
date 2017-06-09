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

// Directive for tacking a part of the page
// Vue.directive('tack', {
//   bind(el, binding, vnode) {
//     el.style.position = 'fixed';
//     el.style.top = binding.value + 'px';
//   }
// })

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
    /*
      Here's an artificial way of creating ids
    */
    var id = 0;
    for(key in cache) {
      this.articles.push(
        {
          'id': id,
          'title': key.slice(2,(key.length-3)),
          'post': cache[key]
        }
      )
      id++;
    }
    // simple - new-ones at top
    this.articles.reverse();
    console.log(this.articles);
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
      // window.scrollTo(0, top);
    }
  }
})
