/* eslint-disable indent */
'use strict';
module.exports = options => {
	return async function jwt(ctx, next) {
		const token = ctx.request.header.authorization;
		let decode = '';
		if (token) {
			try {
				// 解码token
				// decode = ctx.app.jwt.verify(token, options.secret);
				// const cha = new Date(decode.exp)-new Date();
				// delete decode.iat;
				// delete decode.exp;
				// if(cha<0){
				// 	ctx.header.token = ctx.app.jwt.sign({
				// 		...decode
				// 	},ctx.app.config.jwt.secret,{
				// 		expiresIn:'60s'
				// 	})
				// }
				// if(cha<-60*1000){
				// 	ctx.status = 401;
				// 	ctx.body = {
				// 		message:'登录过期，请重新登录',
				// 	};
				// 	return
				// }
				await next();
				// console.log(decode);
			} catch (error) {
				ctx.status = 401;
				ctx.body = {
					status :401,
					message: error.message,
				};
				return;
			}
		} else {
			ctx.status = 401;
			ctx.body = {
				status:401,
				message: '没有token',
			};
			return;
		}
	};
};
