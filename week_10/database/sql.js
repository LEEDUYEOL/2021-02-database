import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'week10',
    password: 'afrw966312@',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// select query //동기화
export const selectSql = {
  getUsers : async () => {
    const [rows] = await promisePool.query(`select * from user`); //user 불러옴
    console.log(rows)
    return rows
  },
  getDepartment : async () => {
    const [rows] = await promisePool.query(`select * from department`); //department 불러옴

    return rows
  },
  getProject : async () => {
    const [rows] = await promisePool.query(`select * from project`);  //project 불러옴

    return rows
  },
}



// delete query
//삭제 버튼을 누르면 해당 항목 삭제
export const deleteSql = {
  deleteDepartment : async (data) => {
    console.log('deleteSql.deleteDepartment:', data.Dnumber)
    // where 조건을 만족하는 행에 대해서 삭제
    //Dnumber 받아서 찾아 삭제
    const sql = `delete from department where Dnumber = "${data.Dnumber}" `; 

    await promisePool.query(sql); //쿼리문에 넘겨줌

  },

  deleteProject : async (data) => {
    console.log('deleteSql.deleteProject:', data.Pnumber)
    // where 조건을 만족하는 행에 대해서 삭제
    //Pnumber 받아서 찾아 삭제, Pnumber 10 이상일 때만 삭제
    const sql = `delete from project where Pnumber = "${data.Pnumber}" and Pnumber >= 10`;

    await promisePool.query(sql); //쿼리문에 넘겨줌

  },

}