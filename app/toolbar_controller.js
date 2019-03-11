ToolbarController = function(canvasObj) {
    var tc = this
    this.canvasObj = canvasObj;
    document.querySelectorAll("[data-showtoolbar]").forEach(function(button) {
        button.onclick = () => tc.toolbarClick(button);
    });        
    document.querySelectorAll("[data-action]").forEach(function(button) {
        button.onclick = () => tc.actionClick(button);
    });        
    document.querySelectorAll("[data-actionremove]").forEach(function(button) {
        button.onclick = () => tc.removeClick(button);
    });        
}

ToolbarController.prototype.toolbarClick = function(element) {
    this.hideToolbars();
    var to_show = document.getElementById(element.dataset['showtoolbar']);
    if (to_show) {
        to_show.style.display="block";
        this.actionClick(to_show.firstElementChild);
    }
}

ToolbarController.prototype.actionClick = function(element) {
    this.deselectButtons();
    element.className += ' button-selected';
    this.canvasObj[element.dataset['action']]();
}

ToolbarController.prototype.removeClick = function(element) {
    this.hideToolbars();
    this.deselectButtons();
    element.className += ' button-selected';
    this.canvasObj.remove();
}

ToolbarController.prototype.hideToolbars = function() {	
    var elems = document.getElementsByClassName("toolbar-aux");
    for(var tb of elems)
        tb.style.display="none";
}

ToolbarController.prototype.deselectButtons = function() {
    var elems = document.getElementsByClassName("button");
    for(var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("button-selected");
    }
}

module.exports.ToolbarController = ToolbarController;
