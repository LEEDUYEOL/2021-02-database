import express from "express";
import { insertSql } from "../database/sql";

const router = express.Router();

router.get('/', (req,res) => {
    res.render('userInsert'); //userInsert.hbs
});

router.post('/', (req,res) => { 
    const vars = req.body;  //가져온 값 저장
    const var_length = Object.keys(req.body).length;    //넘어온 개수 확인
    
    //예약 삽입
    console.log(req.body);
    if(req.body.seat_number != null){ 
        console.log("check20"); 
        const data = {
            Flight_number: vars.flight_number,
            Leg_number: vars.leg_number,
            Date: vars.date,
            Seat_number: vars.seat_number,
            Customer_name: vars.customer_name,
            Customer_phone: vars.customer_phone
        };
        
        insertSql.setReservation(data);    //불러오기
    }

    res.redirect('/userInsert');  //입력하고 홈화면으로 돌아감(페이지 이동 x)
})

module.exports = router;