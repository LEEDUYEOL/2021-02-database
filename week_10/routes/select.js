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
import { selectSql } from "../database/sql";

const router = express.Router();

// '/' = '/select'
router.get('/', async function(req, res) {

    const department = await selectSql.getDepartment(); 
    const project = await selectSql.getProject();   //임의의 테이블 추가

    //데이터 넘겨받음
    res.render('select', {
        title: 'IT 공대',
        title2: '프로젝트', //프로젝트 추가
        department,
        project
    });
    
    
});

module.exports = router;