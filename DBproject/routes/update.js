import express from "express";
import { selectSql, updateSql } from "../database/sql"; //export 있어야 가져올 수 있음

const router = express.Router();

//localhost:3000/update
// 기존의 입력 값 불러오기
router.get('/', async (req, res) => {
    const airport_res = await selectSql.getAirport();  //이름 마음대로 할 수 있음
    const airplane_res = await selectSql.getAirplane();
    const flight_res = await selectSql.getFlight();
    res.render('update', {
        title: "공항 수정",
        title2: "항공기 수정",  
        title3: "항공편 수정",
        airport_res,
        airplane_res,
        flight_res
    });
});


// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post('/', async (req, res) => {

    //salary 수정 가능하게 변수 지정해서 업데이트
    const vars = req.body;
    console.log(vars.body);
    if(vars.airport_code != null){
        const data = {
            Airport_code: vars.airport_code,
            Name: vars.name,
            City: vars.city,
            State: vars.state
        }
    
        await updateSql.updateAirport(data);
    }else if(vars.airplane_id != null){
        const data = {
            Airplane_id: vars.airplane_id,
            Total_number_of_seats: vars.total_number_of_seats,
            Airplane_type: vars.airplane_type
        }

        await updateSql.updateAirplane(data);
    } else if(vars.flight_number != null){
        const data = {
            Flight_number: vars.flight_number,
            Airline: vars.airline,
            Weekdays: vars.weekdays
        }

        await updateSql.updateFlight(data);
    }
    
    

    res.redirect('/update');
});


module.exports = router;