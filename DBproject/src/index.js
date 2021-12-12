//필요한 것들 import
import express from "express";
import logger from "morgan";
import path from "path";

import loginRouter from "../routes/login";  //홈 기능
//import deleteRouter from "../routes/delete";    //삭제 기능
import deleteRouter from "../routes/delete";    //삭제 기능
import insertRouter from "../routes/insert";
import updateRouter from "../routes/update";
import userSelectRouter from "../routes/userSelect";
import userInsertRouter from "../routes/userInsert";
import userDeleteRouter from "../routes/userDelete";

const PORT = 3000;  //포트번호 설정

const app = express();  //http 매핑

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

app.use(logger("dev"));

//기본 라우터 주소 설정
app.use('/', loginRouter);  //localhost:3000
app.use('/delete', deleteRouter);   //localhost:3000/delete
app.use('/insert', insertRouter);   //localhost:3000/insert
app.use('/update', updateRouter);   //localhost:3000/update
app.use('/userSelect', userSelectRouter);   //localhost:3000/userSelect
app.use('/userInsert', userInsertRouter);   //localhost:3000/userInsert
app.use('/userDelete', userDeleteRouter);   //localhost:3000/userDelete

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)    //3000포트로 리스닝
})