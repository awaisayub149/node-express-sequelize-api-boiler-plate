 /**
 *  utils/validator.js
 *
 * 
 * validator can use to check required fields . Further methods can be added.
 * 
 *
 *  @awaisayub149 awaisayub149@gmail.com
 *
 */

 const self = module.exports = {
 	Required: async (paylaod, EntityrequiredParams) => {
	 	let requiredFields = EntityrequiredParams.every(function(val) { return Object.keys(paylaod).indexOf(val) >= 0; });
	 	if(!requiredFields) return false
	 	return true
 	}
};
