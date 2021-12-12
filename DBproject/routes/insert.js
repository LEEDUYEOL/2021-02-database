import express from "express";
import { insertSql } from "../database/sql";

const router = express.Router();

router.get('/', (req,res) => {
    res.render('insert'); //insert.hbs
});


//사용자 삽입
router.post('/', (req,res) => { //insert.hbs에서 post로 보냄
    const vars = req.body;  //가져온 값 저장
    const var_length = Object.keys(req.body).length;    //넘어온 개수 확인
    
    //조건문 통해 어느 테이블 삽입인지 확인
    if(req.body.airport_code != null){ 
        console.log("check2"); 
        const data = {
            Airport_code: vars.airport_code,
            Name: vars.name,
            City: vars.city,
            State: vars.state
        };
        
        insertSql.setAirport(data);    
    } else if(req.body.airplane_id != null){
        console.log("check3")
        console.log(req.body);
        const data = {  
            Airplane_id: vars.airplane_id,
            Total_number_of_seats: vars.total_number_of_seats,
            Airplane_type: vars.airplane_type
        };
        console.log(data);
        insertSql.setAirplane(data); 
    } else if(req.body.flight_number != null){
        console.log("check5")
        console.log(req.body);
        const data = {  
            Flight_number: vars.flight_number,
            Airline: vars.airline,
            Weekdays: vars.weekdays
        };
        console.log(data);
        insertSql.setFlight(data);  //불러오기
    }

    res.redirect('/insert');  //입력하고 홈화면으로 돌아감(페이지 이동 x)
})

module.exports = router;