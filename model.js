Model = {
    BaseURI: 'http://collect.no.de'
}

Model.updateLink = function(id, tags, notes, callbacks) {
    var path = this.BaseURI + '/update';
    var params = 'id=' + id + '&tags=' + tags + '&notes=' + notes;
    this.query(path, params, callbacks, 'POST');
}

Model.saveLink = function(title, uri, tags, notes, callbacks) {
    var path = this.BaseURI + '/save';
    var params = 'title=' + title + '&uri=' + uri + '&tags=' + tags + '&notes=' + notes;
    path = encodeURI(path);
    this.query(path, params, callbacks, 'POST');
}

Model.getURIByKey = function(URI, callbacks) {
    var path = this.BaseURI + '/getURIByKey?URI=' + escape(URI);
    this.query(path, '', callbacks);
}

Model.query = function(path, params, optCallback, optMethod) { 

    var method = optMethod || "GET";
    var req = new XMLHttpRequest();
    req.open(method, path , true);

    if(method === 'POST'){
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }

    req.onreadystatechange = function() {
        if (req.readyState !== 4)  { return; }
        if (req.status === 200)  {
            if(optCallback && optCallback.success){
                optCallback.success(req);
            }
            return;
        }
        else {
            if(optCallback && optCallback.error){
                optCallback.error(req);
            }
        }
    };

    if(method === 'POST' && params){
      req.send(params);
    }
    else {
      req.send(null);
    }    

}

