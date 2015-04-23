module.exports = function(Picture) {

  var fs = require('fs');
  var path = require('path');

  Picture.afterRemote('upload', function(ctx, picture, next) {

    var pictureOriginal = picture.result.files.file[0];

    var ext = pictureOriginal.name
      .substring(pictureOriginal.name.lastIndexOf('.'));

    var storage = path.resolve(__dirname, '../../server/storage/temp');
    var originalPath = path.join(storage, pictureOriginal.name);
    var nameFormalizedPath = path.join(storage,
      (picture.result.fields.storage || Date.now().toString()) + ext);

    fs.renameSync(originalPath, nameFormalizedPath);
    picture.result.files.file[0].name = picture.result.fields.storage + ext;
    next();
  });

};
