import express from "express";
import { selectSql, updateSql } from "../database/sql"; //export 있어야 가져올 수 있음

const router = express.Router();

//localhost:3000/update/employee
// 기존의 입력 값 불러오기
router.get('/employee', async (req, res) => {
    const emp_res = await selectSql.getEmployee();  //이름 마음대로 할 수 있음
    res.render('updateEmployee', {
        title: "직원 테이블 갱신",
        emp_res
    });
});

// 기존의 입력 값 불러오기
router.get('/department', async (req, res) => {
    const dept_res = await selectSql.getDepartment();   //이름 마음대로 할 수 있음
    res.render('updateDepartment', {
        title: "부서 테이블 갱신",
        dept_res
    })
});

// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post('/employee', async (req, res) => {

    //salary 수정 가능하게 변수 지정해서 업데이트
    const vars = req.body;
    console.log(vars.salary);
    const data = {
        Salary: vars.salary   //salary만 받아서 업데이트
    }

    await updateSql.updateEmployee(data);

    res.redirect('/select');
});

// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post('/department', async (req, res) => {
    const vars = req.body;
    console.log(vars.dname);

    const data = {
        Dname: vars.dname   //Dname만 받아서 업데이트
    }
    await updateSql.updateDepartment(data);

    res.redirect('/select');    //localhost:3000/select
});

module.exports = router;