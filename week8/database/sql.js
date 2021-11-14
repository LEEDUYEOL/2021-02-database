import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'week8',
        password: 'afrw966312@',    //사용자 설정 비밀번호
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

// async / await 사용
const promisePool = pool.promise();

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