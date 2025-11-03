AFRAME.registerComponent("target-marker", {
  init: function() {
    let el = this.el;
    
    this.addMarker = function(e) {
      let p = e.detail.intersection.point;
      let scene = document.querySelector("a-scene");
      
      // Create a new entity for the AshleyVR model
      let newMark = document.createElement("a-entity");
      newMark.setAttribute("gltf-model", "#ashleyVR");
      newMark.setAttribute("scale", ".1 .1 .1"); // Adjust the scale as needed
      newMark.setAttribute("position", AFRAME.utils.coordinates.stringify(p));
      scene.appendChild(newMark);
    };
    
    el.addEventListener("click", this.addMarker);
  },
  remove: function() {
    this.el.removeEventListener("click", this.addMarker);
  }
});