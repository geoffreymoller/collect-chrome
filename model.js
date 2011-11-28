Model = {
    BaseURI: 'http://collect.no.de'
}

Model.updateLink = function(id, tags, callbacks) {
    var path = this.BaseURI + '/update?id=' + id + '&tags=' + tags;
    this.query(path, callbacks, 'PUT');
}

Model.saveLink = function(title, uri, tags, callbacks) {
    var path = this.BaseURI + '/save?title=' + title + '&uri=' + uri + '&tags=' + tags;
    path = encodeURI(path);
    this.query(path, callbacks);
}

Model.getURIByKey = function(URI, callbacks) {
    var path = this.BaseURI + '/getURIByKey?URI=' + URI; 
    this.query(path, callbacks);
}

Model.query = function(path, optCallback, optMethod) { 

    var method = optMethod || "GET";
    var req = new XMLHttpRequest();
    req.open(method, path , true);

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

    req.send(null);
}

