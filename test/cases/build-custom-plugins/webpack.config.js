module.exports = async function (context, next) {
  context.output.filename = '[name].js'
}
