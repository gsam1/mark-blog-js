new Vue({
  el: '#blog',
  data: {

  },
  // on Ready
  created: function() {
    console.log(this.getPosts())
  },
  methods: {
    getPosts: function() {
      var self = this;
      $.getJSON('/posts/test.json', function(json) {
        self.data = json;
      })
    }
  }

})
