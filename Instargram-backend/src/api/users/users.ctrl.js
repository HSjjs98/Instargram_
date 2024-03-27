import User from '../../models/user';

export const getAllUsers = async (ctx) => {
  try{
    const users = await User.find()
    ctx.body = users.slice(0,10).map(user => user._doc.username)
  } catch(e){
    ctx.throw(500, e)
  }
};
