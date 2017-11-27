var crs_x = 0, crs_y = 0;
var crs_drag, dragged;

var handleScroll = function(evt){
  var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
  if (delta) gesso.zoom(null, delta, crs_x, crs_y);
  return evt.preventDefault() && false;
};

gesso.canvas.addEventListener('mousedown', function(evt) {
  document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
  crs_x = evt.offsetX || (evt.pageX - gesso.canvas.offsetLeft);
  crs_y = evt.offsetY || (evt.pageY - gesso.canvas.offsetTop);
  crs_drag = gesso.ctx.transformedPoint(crs_x, crs_y);
  dragged = false;
}, false);

gesso.canvas.addEventListener('mousemove', function(evt) {
  crs_x = evt.offsetX || (evt.pageX - gesso.canvas.offsetLeft);
  crs_y = evt.offsetY || (evt.pageY - gesso.canvas.offsetTop);
  dragged = true;
  if (crs_drag){
    gesso.pan(null, crs_x, crs_y, crs_drag.x, crs_drag.y);
  }
}, false);
gesso.canvas.addEventListener('mouseup', function(evt) {
  crs_drag = null;
  if (!dragged) gesso.zoom(null, evt.shiftKey ? -1 : 1, crs_x, crs_y );
}, false);
