// Highlight.js:
if (window.require) {
  require(["https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"], function() {});
  require(["../assets/js/bootstrap.min.js"], function() {});
  require(["../assets/js/highlight.js"], function() {});
} else {
  document.write('<script src="../assets/js/highlight.js"></script>');
  document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>');
  document.write('<script src="../assets/js/bootstrap.min.js"></script>');
}





var head = document.getElementsByTagName("head")[0];

var link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href = "../assets/css/bootstrap.min.css";
head.appendChild(link);

link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href = "../assets/css/highlight.css";
head.appendChild(link);

link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href = "../assets/css/main.css";
head.appendChild(link);

/* Copyright (C) 1998-2016 by Northwoods Software Corporation. All Rights Reserved. */

// Create a DIV and add it to the document just after the PRE element.
// Evaluate the JavaScript text that is in the PRE element in order to initialize the Diagram.
function goCode(pre, w, h, diagramclass, parentid) {
  if (diagramclass === undefined) diagramclass = go.Diagram;
  if (typeof pre === "string") pre = document.getElementById(pre);
  var div = document.createElement("div");
  div.style.width = w + "px";
  div.style.height = h + "px";
  div.className = "diagramStyling";
  var parent;
  if (parentid === undefined) {
    parent = pre.parentNode;
  } else {
    parent = document.getElementById(parentid);
  }
  parent.appendChild(div);
  // temporarily bind "diagram" to the main Diagram for the DIV, and "$" to go.GraphObject.make
  var f = eval("(function (diagram, $) {" + pre.textContent + "})");
  f(new diagramclass(div), go.GraphObject.make);
}

// Traverse the whole document and replace <a>TYPENAME</a> with:
//    <a href="../api/symbols/TYPENAME.html">TYPENAME</a>
// and <a>TYPENAME.MEMBERNAME</a> with:
//    <a href="../api/symbols/TYPENAME.html#MEMBERNAME">TYPENAME.MEMBERNAME</a>
function goIntro() {
  _traverseDOM(document);

  // add class to main content
  var content = document.getElementById('content');
  content.className = "col-md-10";

  // side navigation
  var navindex = document.createElement('div');
  navindex.id = "navindex";
  navindex.className = "col-md-2";
  navindex.innerHTML = myMenu;
  var container = document.getElementById('container');
  document.body.insertBefore(navindex, container);


  // fixed navbar
  var navbar = document.createElement('div');
  navbar.innerHTML = myNavbar;
  document.body.insertBefore(navbar, navindex);

  // footer
  var footer = document.createElement("div");
  footer.className = "footer";
  var msg = "Copyright &copy; 1998-2016 by Northwoods Software Corporation.";
  if (go && go.version) {
    msg = "GoJS&reg; version " + go.version + ". " + msg;
  }
  footer.innerHTML = msg;
  content.appendChild(footer);


  // When the page loads, change the class of li's to highlight the current page
  var url = window.location.href;
  var lindex = url.lastIndexOf('/');
  url = url.slice(lindex+1).toLowerCase();
  var lis = document.getElementById("sections").getElementsByTagName("li");
  var l = lis.length;
  for (var i = 0; i < l; i++) {
    var lowerhref = lis[i].childNodes[0].href.toLowerCase();
    if (lowerhref.indexOf('intro') === -1) continue;
    if (lowerhref.indexOf('/' + url) !== -1) {
      lis[i].childNodes[0].className = "selected";
      return;
    }
  }

}

function _traverseDOM(node) {
  if (node.nodeType === 1 && node.nodeName === "A" && !node.getAttribute("href")) {
    var text = node.innerHTML.split(".");
    if (text.length === 1) {
      node.setAttribute("href", "../api/symbols/" + text[0] + ".html");
      node.setAttribute("target", "api");
    } else if (text.length === 2) {
      node.setAttribute("href", "../api/symbols/" + text[0] + ".html" + "#" + text[1]);
      node.setAttribute("target", "api");
    } else {
      alert("Unknown API reference: " + node.innerHTML);
    }
  }
  for (var i = 0; i < node.childNodes.length; i++) {
    _traverseDOM(node.childNodes[i]);
  }
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-1506307-5', 'gojs.net');
ga('send', 'pageview');


//<![CDATA[
var myMenu = '\
  <div class="sidebar-nav">\
  <div class="navbar navbar-default" role="navigation">\
    <div class="navbar-header" data-toggle="collapse" data-target="#DiagramNavbar">\
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#DiagramNavbar">\
        <span class="sr-only">Toggle navigation</span>\
        <span class="icon-bar"></span>\
        <span class="icon-bar"></span>\
        <span class="icon-bar"></span>\
      </button>\
      <span class="navbar-brand">GoJS Introduction</span>\
    </div>\
    <div id="DiagramNavbar" class="navbar-collapse collapse sidebar-navbar-collapse">\
    <ul id="sections" class="classList nav navbar-nav">\
      <li><a href="index.html">Introduction</a></li>\
      <li><a href="buildingObjects.html">Building Parts</a></li>\
      <li><a href="textBlocks.html">TextBlocks</a></li>\
      <li><a href="shapes.html">Shapes</a></li>\
      <li><a href="pictures.html">Pictures</a></li>\
      <li><a href="panels.html">Panels</a></li>\
      <li><a href="tablePanels.html">Table Panels</a></li>\
      <li><a href="brush.html">Brushes</a></li>\
      <li><a href="sizing.html">Sizing Objects</a></li>\
      <li><a href="usingModels.html">Using Models</a></li>\
      <li><a href="dataBinding.html">Data Binding</a></li>\
      <li><a href="itemArrays.html">Item Arrays</a></li>\
      <li><a href="changedEvents.html">Changed Events</a></li>\
      <li><a href="transactions.html">Transactions</a></li>\
      <li><a href="viewport.html">Coordinates</a></li>\
      <li><a href="initialView.html">Initial View</a></li>\
      <li><a href="collections.html">Collections</a></li>\
      <li><a href="links.html">Links</a></li>\
      <li><a href="linkLabels.html">Link Labels</a></li>\
      <li><a href="connectionPoints.html">Link Points</a></li>\
      <li><a href="ports.html">Ports</a></li>\
      <li><a href="nodes.html">Nodes</a></li>\
      <li><a href="layouts.html">Layouts</a></li>\
      <li><a href="trees.html">Trees</a></li>\
      <li><a href="subtrees.html">SubTrees</a></li>\
      <li><a href="groups.html">Groups</a></li>\
      <li><a href="subgraphs.html">SubGraphs</a></li>\
      <li><a href="sizedGroups.html">Sized Groups</a></li>\
      <li><a href="selection.html">Selection</a></li>\
      <li><a href="highlighting.html">Highlighting</a></li>\
      <li><a href="toolTips.html">ToolTips</a></li>\
      <li><a href="contextmenus.html">Context Menus</a></li>\
      <li><a href="events.html">Diagram Events</a></li>\
      <li><a href="tools.html">Tools</a></li>\
      <li><a href="commands.html">Commands</a></li>\
      <li><a href="permissions.html">Permissions</a></li>\
      <li><a href="validation.html">Validation</a></li>\
      <li><a href="layers.html">Layers &amp; Z-ordering</a></li>\
      <li><a href="palette.html">Palette</a></li>\
      <li><a href="overview.html">Overview</a></li>\
      <li><a href="resizing.html">Resizing Diagrams</a></li>\
      <li><a href="buttons.html">Buttons</a></li>\
      <li><a href="templateMaps.html">Template Maps</a></li>\
      <li><a href="legends.html">Legends and Titles</a></li>\
      <li><a href="extensions.html">Extensions</a></li>\
      <li><a href="geometry.html">Geometry Strings</a></li>\
      <li><a href="grids.html">Grid Patterns</a></li>\
      <li><a href="makingImages.html">Diagram Images</a></li>\
      <li><a href="makingSVG.html">Diagram SVG</a></li>\
      <li><a href="printing.html">Printing</a></li>\
      <li><a href="serverSideImages.html">Server-side Images</a></li>\
      <li><a href="performance.html">Performance</a></li>\
      <li><a href="deployment.html">Deployment</a></li>\
    </ul>\
    </div>\
  </div>\
  </div>';
//]]>


//<![CDATA[
var myNavbar = '\
  <!-- non-fixed navbar -->\
  <nav id="api-nav" class="navbar navbar-inverse navbar-top">\
    <div class="container">\
      <div class="navbar-header" data-toggle="collapse" data-target="#navbar">\
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\
          <span class="sr-only">Toggle navigation</span>\
          <span class="icon-bar"></span>\
          <span class="icon-bar"></span>\
          <span class="icon-bar"></span>\
        </button>\
        <!--<a class="navbar-brand" href="#">GoJS</a>-->\
      </div>\
      <div id="navbar" class="navbar-collapse collapse">\
        <ul class="nav navbar-nav navbar-right">\
          <li class="active"><a href="../index.html">Home</a></li>\
          <li><a href="../learn/index.html">Learn</a></li>\
          <li><a href="../samples/index.html">Samples</a></li>\
          <li><a href="../intro/index.html">Intro</a></li>\
          <li><a href="../api/index.html">API</a></li>\
          <li><a href="http://www.nwoods.com/components/evalform.htm">Register</a></li>\
          <li><a href="../doc/download.html">Download</a></li>\
          <li><a href="http://forum.nwoods.com/c/gojs">Forum</a></li>\
          <li><a href="http://www.nwoods.com/support/query.htm">Contact</a></li>\
          <li class="buy"><a href="http://www.nwoods.com/sales/ordering.htm">Buy</a></li>\
          <li class="activate"><a href="http://www.nwoods.com/app/activate.aspx?sku=gojs">Activate</a></li>\
        </ul>\
      </div><!--/.nav-collapse -->\
    </div>\
  </nav>';
//]]>