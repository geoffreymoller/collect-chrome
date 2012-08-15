function Collect(){ 
    this.tab = null;
    this.main();
}

Collect.prototype.main = function(){
    this.payload = {};
    chrome.tabs.getSelected(null, goog.bindNative_(function(tab) {
        this.tab = tab;
        this.queryLink(tab);
        this.payload.uri = tab.url;
        this.payload.title = tab.title;
    }, this));
}

Collect.prototype.queryLink = function(tab){
    var callback = goog.bindNative_(function(res){
        this.queryLinkCallback.call(this, res);
    }, this);
    var error = goog.bindNative_(function(res){
        this.queryLinkFailure.call(this, res);
    }, this);
    var URI = tab.url; 
    Model.getURIByKey(URI, { 'success': callback, 'error': error });
}

Collect.prototype.queryLinkFailure = function(res){
    var message = 'Error Connecting to server.';
    Collect.prototype.paintError(message);
    throw new Error('Link Query Request error: ' + res.status + '; ' + res.statusText);
}

Collect.prototype.queryLinkCallback = function(res){
    var response = JSON.parse(res.responseText);
    if(response.length > 1){
        throw new Error('Error: more than one link saved for this link!');
    }
    else if(response.length === 1){
        var row = response[0];
        this.paintHTML(row);
    }
    else {
        this.paintHTML(null);
    }  
}

Collect.prototype.paintError = function(message){
    var span = document.createElement('span');
    span.className = 'error';
    span.innerText = message;
    document.body.appendChild(span);
}

Collect.prototype.paintHTML = function(row){

    var title, uri;
    if(row){
      title = row.value.title;
      uri = row.value.uri;
    }
    else {
      title = this.payload.title; 
      uri = this.payload.uri;
    }

    var div = document.createElement('div');
    div.id = 'container';
    document.body.appendChild(div);
    var html = '<table>'; 
    html += '<tr><td>Title: </td><td id="title"><input type="text" value="' + title + '"/></td></tr>'; 
    html += '<tr><td>Location: </td><td><input readonly="readonly" type="text" value="' + uri + '"/></td></tr>'; 
    html += '<tr><td>Tags: </td><td><input id="tags" type="text" /></td></tr>'; 
    html += '<tr><td>Notes: </td><td><textarea id="notes"></textarea></td></tr>'; 
    html += '<tr><td><label for="saveImage">Save Image</label>: </td><td><input type="checkbox" checked="checked" name="saveImage" id="saveImage"></input></td></tr>'; 
    html += '<tr><td></td><td><button id="submit">Save Link</button></td></tr>'; 
    html += '</table>'; 
    document.getElementById('container').innerHTML = html; 
    document.getElementById('tags').focus();
    var submitHandler;
    if(row && row.id){
        this.id = row.id;
        document.getElementById('container').className = 'existing';            
        if(row.value.tags){
            document.getElementById('tags').value = row.value.tags.join(' '); 
        }
        if(row.value.notes){
            document.getElementById('notes').value = row.value.notes;
        }
        submitHandler = goog.bindNative_(this.update, this); 
    }
    else {
        submitHandler = goog.bindNative_(this.save, this); 
    }
    document.getElementById('submit').addEventListener("click", submitHandler, false);

}

Collect.prototype.update = function(id){
    var callback = goog.bindNative_(function(req){
        this.updateCallback.call(this, req);
    }, this);
    var title = document.getElementById('title').getElementsByTagName('input')[0].value;
    var tags = document.getElementById('tags').value.split(' ').join(',');
    var notes = document.getElementById('notes').value;
    Model.updateLink(this.id, title, tags, notes, { 'success': callback });
}

Collect.prototype.updateCallback = function(res){
    var response = JSON.parse(res.responseText);
    window.close();
}

Collect.prototype.updateFailure = function(req){
    throw new Error('Link Update Request error: ' + req.status + '; ' + req.statusText);
}

Collect.prototype.save = function(){
    var callback = goog.bindNative_(function(req){
        this.saveCallback.call(this, req);
    }, this);
    var title = document.getElementById('title').getElementsByTagName('input')[0].value;
    var uri = escape(this.tab.url);
    var tags = document.getElementById('tags').value.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ').split(' ');
    var notes = document.getElementById('notes').value;
    var saveImage = document.getElementById('saveImage').checked;
    Model.saveLink(title, uri, tags, notes, saveImage, { 'success': callback });
}

Collect.prototype.saveCallback = function(res){
    var response = JSON.parse(res.responseText);
    icon.paint(true);
    window.close();
}

Collect.prototype.saveError = function(req){
    throw new Error('Link Save Request error: ' + req.status + '; ' + req.statusText);
}

var goog = {};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return /** @type {!Function} */ (fn.call.apply(fn.bind, arguments));
};

