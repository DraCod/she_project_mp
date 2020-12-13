module.exports = {
  verify(arr) {
    for (const item of arr) {
      if (item.rule) {
        if (!item.rule(item.value)) {
          return `${item.label}验证失败，${item.msg}`;
        }
      } else {
        if (!item.value) {
          return `${item.label}参数丢失`;
        }
      }
    }
  },
  getUserId(ctx) {
    return  ctx.app.jwt.verify(ctx.header.authorization,this.config.jwt.secret)
  }
}
