const { User } = require('../../models/index');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  Query:  {
    getUserData: async () => {
      const getUsers = await User.findAll();
      return getUsers;
    },
    getAllUser: async (_, args) => {
      await context.User.findOne()
      console.log(args)
      const { id } = args;
      const resultData = await User.findOne( {where: { id: id } });
      return resultData;
    }
  },
  Mutation: {
    createUser: async (_, { email, password, confirmpassword }) => {
      if(password !== confirmpassword) return (console.log("비밀번호 확인 바람"))
      
      const existingUser = await User.findOne( { where: { email: email } });
      if(existingUser) return (console.log("이미 있는계정"));


      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await User.create({ 
        email,
        password: passwordHash
      });
      return newUser;
    },
    loginUser: async (_, { email, password }) => {
        if (!email || !password)
        return console.log("모든필드를 입력해주세요");

        const user = await User.findOne({ where: { email: email } });
        if (!user) return console.log("이메일을 확인해주세요.");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return console.log("비밀번호가 일치하지 않습니다.");

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return {
          ...user.toJSON(),
          token
        }
    },
    updateUser: async (_, { id, email, password }) => {
      console.log(id)
      const oldUser = await User.update({email, password}, {where: { id: id } });
      const user = await User.findOne( { where: { id: id } });
      return user;
    },
    deleteUser: async (_, { id }) => {
      console.log(id)
      const oldUser = await User.destroy({where: { id: id } });
      const user = await User.findOne( { where: { id: id } });
      return user;
    },
  }
}