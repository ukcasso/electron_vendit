const express = require('express');
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 3030;
const auth = require('./middleware/auth');
const { User } = require('./models/index');
const { sequelize } = require("./models");
const authRouter = require("./routes/auth")
const cors = require("cors");
app.set("port", process.env.PORT || 3030);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });



// CORS란 Cross Origin Resource Sharing의 약자로, 현재 도메인과 다른 도메인으로 리소스가 요청될 경우를 말한다.
// 보안상의 이유로 cors를 제한하고 있는데, rest api 사용 시 cors제한에 걸릴 수 있다.
app.use(cors());
app.use(morgan("dev"));
app.use("/api/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("dotenv").config();


app.use("/api/auth", authRouter);

// The `listen` method launches a web server.
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
