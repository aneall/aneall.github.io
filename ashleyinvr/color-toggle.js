AFRAME.registerComponent("color-toggle", {
  init: function() {
    let el = this.el;
    this.toggleColor = function() {
      el.setAttribute("color", "pink");
    }
    this.el.addEventListener("click", this.toggleColor);
    // ^ this is where we are adding the event-listener
  },
  remove: function() {
    this.el.removeEventListener("click", this.toggleColor);
  }
})

// for making a CUSTOM a-frame component! --> now we can attach this to objects that have a color component!
// init and remove are LIFECYCLE functions
// we must include these javascripts IN the html file!
// if a component gets attached AFTER a-frame started running, init will start running once the entity becomes attached

// an event-lister is a standard web-development function; el is a standard convention for an entity in JavaScript