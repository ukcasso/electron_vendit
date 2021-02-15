const express = require("express");
const bcrypt = require("bcrypt"); // 암호화
const jwt = require("jsonwebtoken"); // 토큰
const { User } = require("../models"); // User 테이블
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { email, password, grade } = req.body;

  // req.body로 email, nick, password를 가지고 옵니다.

  try {
    // 이미 email이 있는 경우를 방지
    const existingUser = await User.findOne({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(400).json({ msg: "이미 등록한 이메일입니다." });
    }
    // bcrypt로 password를 암호화해줍니다.
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      grade: 1,
    });
    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "모든필드를 입력해주세요" });

    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(400).json({ msg: "등록되지 않은 이메일입니다." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "비밀번호가 틀렸습니다." });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        grade: user.grade,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("토큰");
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findOne({ where: { id: verified.id } });
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findOne({ where: { id: req.user } });
  res.json({
    email: user.email,
    id: user.id,
    grade: user.grade,
  });
});

module.exports = router;