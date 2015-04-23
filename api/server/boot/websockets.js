module.exports = function socketEvents(server) {

  var comic = server.models.comic;

  comic.afterRemote('upsert', function(ctx, um, next){
    server.io.emit('upsertUm', um);
    next();
  })

  comic.afterRemote('deleteById', function(ctx, um, next){
    server.io.emit('deleteUm', ctx.args.id);
    next();
  })

};
