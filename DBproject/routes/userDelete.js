import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();


//localhost:3000/delete
// 기존의 입력 값 불러오기
router.get('/', async (req, res) => {
    const reservation = await selectSql.getReservation();
    //const project = await selectSql.getProject();   //임의 테이블 추가

    res.render('userDelete', {
        title: "예약 삭제",
        reservation
    })
});

router.post('/', async (req, res) => {
    console.log('delte router:',req.body.delBtn);   

    //예약 삭제
    if (req.body.delBtn!=null){ 
        console.log('delete Reservation');
        const data = {
            Seat_number: req.body.delBtn,
        }
        await deleteSql.deleteReservation(data);
    }


    res.redirect('/userDelete'); // localhost:3000/userDelete
});



module.exports = router;