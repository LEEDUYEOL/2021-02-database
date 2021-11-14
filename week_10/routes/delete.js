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
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();


//localhost:3000/delete
// 기존의 입력 값 불러오기
router.get('/', async (req, res) => {
    const department = await selectSql.getDepartment();
    const project = await selectSql.getProject();   //임의 테이블 추가

    res.render('delete', {
        title: "삭제 기능",
        title2: "삭제 기능2",   //삭제 기능2로 추가
        department,
        project
    })
});


/*
// 기존의 입력 값 불러오기
router.get('/', async (req, res) => {
    const department = await selectSql.getDepartment();


    res.render('delete', {
        title: "삭제 기능",
        department
    })
});


router.get('/', async (req, res) => {

    const project = await selectSql.getProject();

    res.render('delete2', {
        title2: "삭제 기능",
        project
    })
});
*/


/*
// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post('/', async (req, res) => {
    console.log('delte router:',req.body.delBtn);
    console.log('delte2 router:',req.body.delBtn2);

    const data = {
        Dnumber: req.body.delBtn,
    }
    await deleteSql.deleteDepartment(data);

    res.redirect('/delete'); // localhost:3000/select
});
*/

// 수정 버튼을 눌렀을 경우 delete query를 실행하며 조회 페이지로 이동
router.post('/', async (req, res) => {
    console.log('delte router:',req.body.delBtn);   //department = delBtn
    console.log('delte2 router:',req.body.delBtn2); //project = delBtn2

    //조건문을 통해 Department 삭제인지 Project 삭제인지 확인
    if (req.body.delBtn!=null){ //department 입력 있으면 수행
        console.log('delete Department');
        const data = {
            Dnumber: req.body.delBtn,
        }
        await deleteSql.deleteDepartment(data);
    }
    else{   //delete Project 수행
        console.log('delete Project');
        const data = {
            Pnumber: req.body.delBtn2,
        }
        await deleteSql.deleteProject(data);
    }


    res.redirect('/delete'); // localhost:3000/delete
});



/*
router.post('/', async (req, res) => {
    console.log('delte2 router:',req.body.delBtn2);

    const data = {
        Pnumber: req.body.delBtn,
    }
    await deleteSql.deleteProject(data);

    res.redirect('/delete'); // localhost:3000/select
});
*/

module.exports = router;