module.exports = function(Comic) {
  Comic.validatesPresenceOf('name');

  var papercut = require('papercut');
  var path = require('path');
  var fs = require('fs');
  var util = require('util');

  papercut.configure(function() {
    papercut.set('storage', 'file');
    papercut.set('directory', path.resolve(__dirname, '../../server/storage/comics'));
    papercut.set('url', '/comics');
  });

  var AgregadoPhoto = papercut.Schema(function(schema) {
    schema.version({
      name: 'standard',
      size: '40x40',
      process: 'crop'
    });

    schema.version({
      name: 'large',
      size: '56x56',
      process: 'crop'
    });

    schema.version({
      name: 'cover',
      size: '360x202',
      process: 'crop'
    });

  });

  var movePhoto = new AgregadoPhoto();

  Comic.photo = function(id, type, cb) {
    cb(null, id + '-' + type);
  }

  Comic.remoteMethod('photo', {
    accepts: [
      {arg: 'id', type: 'string', required: true},
      {arg: 'type', type: 'string'}
    ],
    returns: {arg: 'photo', type: 'string', root: true},
    description: 'Get photo of agregado',
    http: {path: '/:id/photo/:type', verb: 'get'}
  });

  Comic.beforeRemote('upsert', function(ctx, agregado, next) {

    var data = ctx.req.body;
    var ext = data.photo.substring(data.photo.lastIndexOf('.'));
    var tempImg = path.resolve(__dirname, '../../server/storage/temp', data.photo);

    if (fs.existsSync(tempImg)) {
      var photoName = (/ /.test(data.name)) ? data.name.replace(/ /g, '-') : data.name;
      movePhoto.process(photoName, tempImg, function(err, images) {
        console.log(err, images);
        fs.unlinkSync(tempImg);
      });
      data.photo = photoName + ext;
    }
    next();
  });

};
