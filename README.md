# 2021-02-database
- 데이터베이스 설계

<br><br>

## 3주차 실습 실행 방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) git clone git@github.com:LEEDUYEOL/2021-02-database.git
    - (token을 사용하는 경우) git clone https://github/LEEDUYEOL/2021-02-database.git
2. week_3 폴더로 이동
    > cd week_3
3. 콘솔창(powershell)에서 npm package 설치
    > npm install
4. database/sql.js에서 본인의 데이터베이스 정보 입력(주석 부분) 후 STUDENT 테이블 가져올 수 있도록 추가
<pre>
<code>
const pool = mysql.createPool(
    process.env.JAWSDB_URL ??{
        host: 'localhost',
        user: 'root', // 본인의 mysql user id
        database: 'tutorial', //본인의 mysql password
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
)

const promisePool = pool.promise();

const sql = {

  getUsers : async () => {
    const [rows] = await promisePool.query(`
      SELECT * FROM student
    `)
    
    return rows
  },
}
</code>
</pre>

5. routes/index.js에서 express 모듈을 import 후 사용자 목록 가져옴
<pre>
<code>
import express from "express";
import sql from "../database/sql";

const router = express.Router();
router.get('/', async function(req, res, next) {
  
  const users = await sql.getUsers()
  console.log(users);
  res.render('users', { 
    title: '사용자 목록',
    users
  });
});

module.exports = router;
</code>
</pre>

<br>
6. users.hbs에서 num, id, grade 등 데이터베이스의 정보들을 가져올 수 있도록 함

```hbs
<h1>{{ title }}</h1>

<ul>
  {{#each users}}
    <li>
        {{ num }} / {{ id }} / {{ grade }} / {{ major }} / {{ admission_year }} / {{ mail }}
      </a>
    </li>
  {{/each}}
</ul>
```

## <span style="color:red">사용자 목록</span>

학번|이름|학년|전공|입학년도|이메일
---|---|---|---|---|---|
12151595|이두열|4|정보통신공학과|Wed Mar 02 2019 00:00:00 GMT+0900 (대한민국표준시)|dylee910@inha.edu
12171975|김윤서|3|전자공학과|Mon Mar 02 2019 00:00:00 GMT+0900 (대한민국 표준시)|yunkim43@gmail.com
12201465|이하나|2|정치외교학과|Wed Mar 02 2020 00:00:00 GMT+0900 (대한민국표준시)|oneone11@inha.edu

<br><br>

## 3주차 실습 실행 방법


















## <span style="color:red">테이블 작성법</span>

이름|과|전공|학번
---|---|---|---|
김영희|정보통신공학과|정보통신|12201111|
홍길동|컴퓨터공학과|데이터베이스|12191111|
이순신|인공지능학과|인공지능|12181111

## 텍스트 강조

- **데이터베이스** 실습은 재미 ~~없어요~~있어요.#