module.exports = function (server) {
  var remotes = server.remotes();
  // modify all returned values
  remotes.after("**", function (ctx, next) {
    if (ctx.result && !ctx.result.errors.length) {
      var status = "Success";
      ctx.result = {
        status: status,
        results: ctx.result,
      };
    } else {
      var status = "Fail";
      ctx.result = {
        status: status,
        error: ctx.result.errors[0],
      };
    }

    next();
  });
};
