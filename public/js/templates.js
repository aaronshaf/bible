Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "book", "book", options) : helperMissing.call(depth0, "link-to", "book", "book", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program2(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "book.names.english", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

  data.buffer.push("<layout class=\"flex flex-row\">\n  <nav id=\"books-menu\" class=\"flex flex-column\">\n    <div style=\"text-align: center;\">\n      ");
  hashContexts = {'type': depth0,'value': depth0,'placeholder': depth0,'autofocus': depth0};
  hashTypes = {'type': "STRING",'value': "ID",'placeholder': "STRING",'autofocus': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SearchFieldView", {hash:{
    'type': ("search"),
    'value': ("searchQuery"),
    'placeholder': ("John 3:16"),
    'autofocus': ("autofocus")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n    <books class=\"flex-1\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "book", "in", "model", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </books>\n  </nav>\n\n  <article class=\"flex flex-column flex-1\">\n    <div class=\"chapter flex-1\">\n      ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n  </article>\n</layout>");
  return buffer;
  
});

Ember.TEMPLATES["chapter/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <p>\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unbound.call(depth0, "each", "verse", "in", "paragraph", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </p>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unbound.call(depth0, "each", "word", "in", "verse", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n          <a href-not-yet=\"");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "word.raw", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "word.raw", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a>\n        ");
  return buffer;
  }

  data.buffer.push("<div class=\"go-previous-button\">\n  <img src=\"../img/arrow-up.svg\" style=\"width: 32px;height:32px;opacity: 0.1\" />\n</div>\n\n<div class=\"paragraphs\">\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unbound.call(depth0, "each", "paragraph", "in", "paragraphs", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n<div class=\"go-next-button\">\n  <img src=\"../img/arrow-down.svg\" style=\"width: 32px;height:32px;opacity: 0.1\" />\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["chapter/loading"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"paragraphs\">\n  <div style=\"text-align: center;opacity: 0.5;position: absolute;top: 45%;left: 55%\" class=\"spinner\">\n    <svg width=\"32\" height=\"32\" xmlns=\"http://www.w3.org/2000/svg\">\n      <g>\n        <title>Layer 1</title>\n        <g><rect height=\"8\" width=\"1.5\" fill=\"#231F20\" x=\"14.75\"/></g>\n        <g><rect height=\"1.5\" width=\"8\" fill=\"#414042\" transform=\"matrix(0.5,0.866,-0.866,0.5,9.8564,-5.8564) \" y=\"4.358\" x=\"6\"/></g>\n        <g><rect height=\"1.5\" width=\"8\" fill=\"#58595B\" transform=\"matrix(0.866,0.5,-0.5,0.866,5.7517,-1.4644) \" y=\"8.75\" x=\"1.609\"/></g>\n        <g><rect height=\"1.5\" width=\"8\" fill=\"#6D6E71\" y=\"14.75\"/></g>\n        <g><rect height=\"8\" width=\"1.5\" fill=\"#808285\" transform=\"matrix(0.4998,0.8661,-0.8661,0.4998,21.8598,6.145) \" y=\"18\" x=\"4.359\"/></g>\n        <g><rect height=\"8\" width=\"1.5\" fill=\"#939598\" transform=\"matrix(0.866,0.5,-0.5,0.866,14.5359,-1.4651) \" y=\"22.392\" x=\"8.752\"/></g>\n        <g><rect height=\"8\" width=\"1.5\" fill=\"#A7A9AC\" y=\"24\" x=\"14.752\"/></g>\n        <g><rect height=\"1.5\" width=\"8\" fill=\"#BCBEC0\" transform=\"matrix(0.5001,0.866,-0.866,0.5001,33.8526,-5.8603) \" y=\"25.141\" x=\"18.003\"/></g>\n        <g><rect height=\"1.5\" width=\"8\" fill=\"#D1D3D4\" transform=\"matrix(0.8661,0.4998,-0.4998,0.8661,14.5287,-10.2476) \" y=\"20.747\" x=\"22.394\"/></g>\n        <g><rect height=\"1.5\" width=\"8\" fill=\"#E6E7E8\" y=\"14.747\" x=\"24.001\"/></g>\n        <g><rect height=\"8\" width=\"1.5\" fill=\"#E6E7E8\" transform=\"matrix(0.5,0.866,-0.866,0.5,21.8536,-17.8577) \" y=\"5.997\" x=\"25.142\"/></g>\n        <g><rect height=\"8\" width=\"1.5\" fill=\"#E6E7E8\" transform=\"matrix(0.8663,0.4995,-0.4995,0.8663,5.7417,-10.2399) \" y=\"1.606\" x=\"20.749\"/></g>\n        <animateTransform attributeName=\"transform\" attributeType=\"XML\" type=\"rotate\" from=\"0 16 16\" to=\"360 16 16\" begin=\"0s\" dur=\"1s\" repeatCount=\"indefinite\"/>\n      </g>\n    </svg>\n  </div>\n</div>");
  
});

Ember.TEMPLATES["greek_word"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("[Greek word template]");
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div>\n	<img src=\"../img/book.svg\" style=\"margin: 16px;width:36px;height:36px;opacity: 0.05\" />\n</div>\n\n<div>\n	<img src=\"../img/play.svg\" style=\"margin: 16px;margin-top:0;width:36px;height:36px;opacity: 0.05\" />\n</div>");
  
});

Ember.TEMPLATES["verse"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
/**/) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div>\n	[Verse template]\n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "verse", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  \n  ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>");
  return buffer;
  
});