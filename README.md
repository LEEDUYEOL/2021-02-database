# 2021-02-database
- 데이터베이스 설계

<br><br>

## 3주차 실습 실행 방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) git clone git@github.com:LEEDUYEOL/2021-02-database.git
    - (token을 사용하는 경우) git clone https://github/LEEDUYEOL/2021-02-database.git
2. week3 폴더로 이동
    > cd week3
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

7. STUDENT 테이블에서 학과, 학번, 이름 등 정보 저장
### <span style="color:red">사용자 목록</span>

학번|이름|학년|전공|입학년도|이메일
---|---|---|---|---|---|
12151595|이두열|4|정보통신공학과|Wed Mar 02 2019 00:00:00 GMT+0900 (대한민국표준시)|dylee910@inha.edu
12171975|김윤서|3|전자공학과|Mon Mar 02 2019 00:00:00 GMT+0900 (대한민국 표준시)|yunkim43@gmail.com
12201465|이하나|2|정치외교학과|Wed Mar 02 2020 00:00:00 GMT+0900 (대한민국표준시)|oneone11@inha.edu





<br><br>





## 8주차 실습 실행 방법
1. week8 폴더 생성 후 package.json 생성
    > cd week3
    > npm init
    > npm install
2. /routes/home.js에서 home 작성
```javascript
router.get('/', (req,res) => {
    res.render('home'); //home.hbs
});

router.post('/', (req,res) => { //home.hbs에서 post로 보냄
    const vars = req.body;  //가져온 값 저장
    const var_length = Object.keys(req.body).length;    //넘어온 개수 확인

    if(var_length > 4){ //넘어오는 개수로 employee 확인
        const data = {
            Fname: vars.fname,
            Minit: vars.minit,
            Lname: vars.lname,
            Ssn: vars.ssn,
            Bdate: vars.bdate,
            Address: vars.address,
            Sex: vars.sex,
            Salary: vars.salary,
            Super_ssn: vars.super_ssn,
            Dno: vars.dno
        };
        
        insertSql.setEmployee(data);    //불러오기
    } else {
        const data = {  //넘어오는 개수로 department 확인
            Dname: vars.dname,
            Dnumber: vars.dnumber,
            Mgr_ssn: vars.mgr_ssn,
            Mgr_start_date: vars.mgr_start_date
        };

        insertSql.setDepartment(data);  //불러오기
    }

    res.redirect('/');  //입력하고 홈화면으로 돌아감(페이지 이동 x)
})
```

3. 마찬가지 방법으로 /routes/select.js, /routes/update.js 작성
4. /database/sql.js에서 insert, update, select 기능 구현
<code>
</pre>
// select query //동기화
export const selectSql = {
    getEmployee : async () => {
        const [rows] = await promisePool.query(`select * from employee`);   //employee 불러옴
        console.log(rows)
        return rows
    },
    getDepartment : async() => {
        const [rows] = await promisePool.query(`select * from department`); //department 불러옴
        
        return rows
    },
}

// insert query
//조회만이 아니라 입력도 해야함
export const insertSql = {
    // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    setEmployee : async (data) => {
        const sql = `insert into employee values (
            "${data.Fname}", "${data.Minit}", "${data.Lname}", "${data.Ssn}", "${data.Bdate}",
            "${data.Address}", "${data.Sex}", "${data.Salary}", "${data.Super_ssn}", "${data.Dno}")`;

            await promisePool.query(sql);   //쿼리문에 넘겨줌
    },

    setDepartment : async (data) => {
        const sql = `insert into department values (
            "${data.Dname}", "${data.Dnumber}", "${data.Mgr_ssn}", "${data.Mgr_start_date}" )`;

            await promisePool.query(sql);   //쿼리문에 넘겨줌
    },
}

//update query
export const updateSql = {
    updateEmployee : async (data) => {
        // where 조건을 만족하는 행에 대해서 salary 수정
        //const sql = `update employee set salary = 500 where Minit = "F"`;
        const sql = `update employee set salary = "${data.Salary}" where Salary > 0`;   //사실상 모든 조건
        await promisePool.query(sql);

    },
    updateDepartment : async (data) => {
        const sql = `update department set dname = "${data.Dname}" where Dnumber = 0`;  //조건에 따른 수행
        await promisePool.query(sql);   //데이터 받아서 업데이트

    },
}
</code>
</pre>

5. /views/layout.hbs로 보여질 정보를 작성
```hbs
<!DOCTYPE html>
<html>
    <head>
        <title>{{title}}</title>
        <link rel='stylesheet' href='/stylesheets/style.css' />
        <style type="text/css">
            table{border-collapse:collapse}
            th,td{border:1px solid black;width:100px;height:20px}
        </style>
        </head>
        <body>
            {{{body}}}
        </body>
    </head>
</html>
```

6. 마찬가지 방법으로 select.hbs, updateEmploye.hbs, updateDepartment.hbs 작성\
7. update 페이지에서 salary 등 수정 가능
- EMPLOYEE 테이블에서 직원 정보 저장
- DEPARTMENT 테이블에서 부서 정보 저장

### <span style="color:red">직원 테이블 갱신</span>
Fname|Minit|Lname|Ssn|Bdate|Address|Sex|Salary|Super_ssn|Dno|수정
---|---|---|---|---|---|---|---|---|---|---|
두열|가|이|12151595|Tue Mar 12 1996 00:00:00 GMT+0900 (대한민국표준시)|목동|남|[10000]|1|1234|[수정]
혜자|L|추|123456789|Thu May 22 1980 00:00:00 GMT+0900 (대한민국표준시)|순천|여|[6000]| |5|[수정]

### <span style="color:red">부서 테이블 갱신</span>
Dname|Dnumber|Mgr_ssn|Mgr_start_date|수정
---|---|---|---|---|
재정부|0|123456789|Tue May 5 1977 00:00:00 GMT+0900 (대한민국표준시)|[수정]
식품개발부|22|12151595|Thu May 06 1980 00:00:00 GMT+0900 (대한민국표준시)|[수정]



<br><br>




## 10주차 실습 실행 방법
1. Github에서 8주차 실습 자료 clone 후 8주차 자료 사용 (기존 작성 사용해도 무방)
    > git clone https://gitjub.com/LEEDUYEOL/2021-02-database.git
2. /src/index.js에서 프로젝트 소스 수정
<code>
<pre>
import loginRouter from "../routes/login";  //홈 기능
import selectRouter from "../routes/select";    //조회 기능
import deleteRouter from "../routes/delete";    //삭제 기능
</code>
</pre>

3. /database/sql.js에서 user 테이블을 읽도록 수정
<code>
<pre>
export const selectSql = {
  getUsers : async () => {
    const [rows] = await promisePool.query(`select * from user`); //user 불러옴
    console.log(rows)
    return rows
  },
</code>
</pre>

4. /routes/login.js 에서 로그인 정보에 따른 동작을 수행하도록 추가
<code>
<pre>
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
</code>
</pre>

5. /routes/select.js와 /routes/delete.js도 table에 맞게 수정
<code>
<pre>
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
</code>
</pre>

6. views/login.js에서 로그인할 수 있도록 수정, 이후 layout.hbs, select.hbs, delete.hbs도 table에 맞게 수정 
```hbs
</style>
<div class="frame">
    <h1>로그인</h1>
    <form id="deparment" method="post" action='/'>
        <div class="id">
            <input id="id" name="id" type="text" required placeholder="아이디">
        </div>
        <div class="pwd">
            <input id="passwd" name='password' type="password" required  placeholder="비밀번호">
        </div>
        <button class='btn' type="submit">로그인</button>
    </form>
</div>
```
7. 관리자 계정으로 로그인 시 삭제 가능
- USER 테이블에서 로그인 정보 저장
- DEPARTMENT 테이블에서 부서 정보 저장
- PROJECT 테이블에서 프로젝트 정보 저장

### <span style="color:red">user</span>
Id|Password|Role|
---|---|---|
admin|admin1234|[삭제]|
test|test1234|[삭제]|

### <span style="color:red">삭제 기능</span>
Dname|Dnumber|삭제|
---|---|---|
전기공학과|2|[삭제]|
전자공학과|3|[삭제]|
정보통신공학과|0|[삭제]|
컴퓨터공학과|1|[삭제]|

### <span style="color:red">삭제 기능2</span>
Pname|Pnumber|Plocation|Dnum|삭제|
---|---|---|---|---|
ProductX|1|Bellaire|5|[삭제]|
ProductY|2|Sugarland|5|[삭제]|
ProductZ|3|Houston|5|[삭제]|
Computerization|10|Stanfford|4|[삭제]|
Reorganization|20|Houston|1|[삭제]|
Newbenefits|30|Stanfford|4|[삭제]|

<br><br><br><br><br>

## 11주차 실습

## <span style="color:red">테이블 작성법</span>

이름|과|전공|학번
---|---|---|---|
김영희|정보통신공학과|정보통신|12201111|
홍길동|컴퓨터공학과|데이터베이스|12191111|
이순신|인공지능학과|인공지능|12181111

## 텍스트 강조

- **데이터베이스** 실습은 재미 ~~없어요~~있어요.#