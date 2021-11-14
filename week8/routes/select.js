
import express from "express";
import { selectSql } from "../database/sql";    //selectSql 사용

const router = express.Router();

// '/' = '/select'
router.get('/', async function(req, res) {
    const employee = await selectSql.getEmployee(); //getEmployee() 가져와서 사용
    const department = await selectSql.getDepartment(); //getDepartment() 가져와서 사용
    
    //데이터 넘겨받음
    res.render('select', {
       title: '직원 테이블',
       title2: '부서 테이블',
       employee,
       department 
    });
});

module.exports = router;