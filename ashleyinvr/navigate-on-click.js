window.addEventListener('load', function () {
  AFRAME.registerComponent("navigate-on-click", {
    schema: {
      url: { type: 'string' }
    },
    init: function () {
      var data = this.data;
      this.el.addEventListener('click', function () {
        window.location.href = data.url;
      });
    }
  });
});