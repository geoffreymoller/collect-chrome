Model = {
    BaseURI: 'http://localhost:3000'
}

Model.updateLink = function(id, title, tags, notes, callbacks) {
    var path = this.BaseURI + '/update';
    var params = 'id=' + id + '&title=' + title + '&tags=' + tags + '&notes=' + notes;
    this.query(path, params, callbacks, 'POST');
}

Model.saveLink = function(title, uri, tags, notes, saveImage, callbacks) {
    var path = this.BaseURI + '/save';
    var params = 'title=' + title + '&uri=' + uri + '&tags=' + tags + '&notes=' + notes + '&saveImage=' + saveImage;
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

