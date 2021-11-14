//필요한 것들 import
import express from "express";
import logger from "morgan";
import path from "path";

import homeRouter from "../routes/home";    //홈 기능
import updateRouter from "../routes/update";    //수정 기능
import selectRouter from "../routes/select";    //조회 기능

const PORT = 3000;  //포트번호 설정

const app = express();  //http 매핑

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views',path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

app.use(logger("dev"));

//기본 라우터 주소 설정
app.use('/', homeRouter);   //localhost:3000
app.use('/update', updateRouter);   //localhost:3000/update
app.use('/select', selectRouter);   //localhost:3000/select

app.listen(PORT, () => {
    console.log('Example app listening at http://localhost:${PORT}')   //3000포트로 리스닝
})