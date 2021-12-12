import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

// '/' = '/select'
router.get('/', async function(req, res) {

    const reservation = await selectSql.getReservation();   //임의의 테이블 추가

    //데이터 넘겨받음
    res.render('userSelect', {
        title: '예약조회',
        reservation
    });
    
    
});

module.exports = router;