import express from "express";
import { insertSql } from "../database/sql"; //selectSql 사용 안함

const router = express.Router();

router.get('/', (req,res) => {
    res.render('home'); //home.hbs
});

router.post('/', (req,res) => { //home.hbs에서 post로 보냄
    const vars = req.body;  //가져온 값 저장
    const var_length = Object.keys(req.body).length;    //넘어온 개수 확인

    if(var_length > 4){ //넘어오는 개수로 employee 확인
        const data = {
            Fname: vars.fname,
            Minit: vars.minit,
            Lname: vars.lname,
            Ssn: vars.ssn,
            Bdate: vars.bdate,
            Address: vars.address,
            Sex: vars.sex,
            Salary: vars.salary,
            Super_ssn: vars.super_ssn,
            Dno: vars.dno
        };
        
        insertSql.setEmployee(data);    //불러오기
    } else {
        const data = {  //넘어오는 개수로 department 확인
            Dname: vars.dname,
            Dnumber: vars.dnumber,
            Mgr_ssn: vars.mgr_ssn,
            Mgr_start_date: vars.mgr_start_date
        };

        insertSql.setDepartment(data);  //불러오기
    }

    res.redirect('/');  //입력하고 홈화면으로 돌아감(페이지 이동 x)
})

module.exports = router;