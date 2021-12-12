import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();


//localhost:3000/delete
// 기존의 입력 값 불러오기
router.get('/', async (req, res) => {
    const airport = await selectSql.getAirport();
    const airplane = await selectSql.getAirplane();
    const flight = await selectSql.getFlight();
    //const project = await selectSql.getProject();   //임의 테이블 추가

    res.render('delete', {
        title: "공항 삭제",
        title2: "항공기 삭제",  
        title3: "항공편 삭제",
        airport,
        airplane,
        flight
    })
});


// 수정 버튼을 눌렀을 경우 delete query를 실행하며 조회 페이지로 이동
router.post('/', async (req, res) => {
    console.log('delte router:',req.body.delBtn);   
    console.log('delte2 router:',req.body.delBtn2); 
    console.log('delte3 router:',req.body.delBtn3); 

    //조건문을 통해 어떤 테이블 삭제인지 판별
    if (req.body.delBtn!=null){ 
        console.log('delete Airport');
        const data = {
            Airport_code: req.body.delBtn,
        }
        await deleteSql.deleteAirport(data);
    }
    else if(req.body.delBtn2!=null){   
        console.log('delete Airplane');
        const data = {
            Airplane_id: req.body.delBtn2,
        }
        await deleteSql.deleteAirplane(data);
    }
    else if(req.body.delBtn3!=null){   
        console.log('delete Flight');
        const data = {
            Flight_number: req.body.delBtn3,
        }
        await deleteSql.deleteFlight(data);
    }


    res.redirect('/delete'); // localhost:3000/delete
});



module.exports = router;