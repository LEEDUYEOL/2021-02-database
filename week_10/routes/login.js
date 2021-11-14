// Copyright 2021 kms
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from "express";
import { selectSql } from "../database/sql";    //selectSql로 변경

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');    //login.hbs
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUsers();   //유저 정보 가져옴
    let whoAmI = '' //누가 로그인 했는지 저장
    let checkLogin = false; //로그인 성공 여부

    //for(let i =0; i < users.length; i++){
    //    if (vars.id === user[i].id && vars.password === user[i].password){
    //        ;
    //    }
    //}
    
    //map 함수로 callback 함수 받아 기능 수행
    //for문 없이 자동 비교
    users.map((user) => {
        if (vars.id === user.Id && vars.password == user.Password){
            checkLogin = true;
            if(vars.id === 'admin'){    //관리자 계정
                whoAmI = 'admin';
            } else {
                whoAmI = 'users';   //일반 계정
            }
        }
    })

    console.log('whoAmI:',whoAmI);  //출력으로 확인

    if(checkLogin && whoAmI === 'admin'){   //관리자 계정이면 delete
        res.redirect('/delete');
    } else if (checkLogin && whoAmI === 'users'){   //일반 계정이면 select
        res.redirect('/select');
    } else {
        console.log('login failed!');   //로그인 실패
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>");
    }

})

module.exports = router;