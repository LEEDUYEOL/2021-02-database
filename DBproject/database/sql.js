import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'DBPROJECT_12151595_LDY',
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
  getAirport : async () => {
    const [rows] = await promisePool.query(`select * from airport`); //공항 불러옴

    return rows
  },
  getAirplane : async () => {
    const [rows] = await promisePool.query(`select * from airplane`); //공항 불러옴

    return rows
  },
  getFlight : async () => {
    const [rows] = await promisePool.query(`select * from flight`); //공항 불러옴

    return rows
  },
  getReservation : async () => {
    const [rows] = await promisePool.query(`select * from SEAT_RESERVATION`); //공항 불러옴

    return rows
  },
}



// insert query
//조회만이 아니라 입력도 해야함
export const insertSql = {
  // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
  setAirport : async (data) => {
      const sql = `insert into airport values (
          "${data.Airport_code}", "${data.Name}", "${data.City}", "${data.State}")`;

          await promisePool.query(sql);   //쿼리문에 넘겨줌
  },
  setAirplane : async (data) => {
      console.log("check4")
      console.log(data);
      console.log(data.Total_number_of_seats);
      const sql = `insert into airplane values (
          "${data.Airplane_id}", "${data.Total_number_of_seats}", "${data.Airplane_type}" )`;

          await promisePool.query(sql);   //쿼리문에 넘겨줌
  },
  setFlight : async (data) => {
    const sql = `insert into flight values (
        "${data.Flight_number}", "${data.Airline}", "${data.Weekdays}" )`;

        await promisePool.query(sql);   //쿼리문에 넘겨줌
  },
  setReservation : async (data) => {
    const sql = `insert into Seat_reservation values (
        "${data.Flight_number}", "${data.Leg_number}", "${data.Date}", "${data.Seat_number}", "${data.Customer_name}", "${data.Customer_phone}" )`;

        await promisePool.query(sql);   //쿼리문에 넘겨줌
  },
}

//update query
export const updateSql = {
  updateAirport : async (data) => {
      // where 조건을 만족하는 행에 대해서 salary 수정
      //const sql = `update employee set salary = 500 where Minit = "F"`;
      console.log("check6")
      console.log(data)
      /*
      const sql = `update airport set Name = "${data.Name}" where Airport_code = "${data.Airport_code}"`;
      const sql2 = `update airport set City = "${data.City}" where Airport_code = "${data.Airport_code}"`;
      const sql3 = `update airport set State = "${data.State}" where Airport_code = "${data.Airport_code}"`;
      */
      const sql = `update airport set Name = "${data.Name}", City = "${data.City}", State = "${data.State}"  where Airport_code = "${data.Airport_code}"`;
      await promisePool.query(sql);
  },

  updateAirplane : async (data) => {
    // where 조건을 만족하는 행에 대해서 salary 수정
    //const sql = `update employee set salary = 500 where Minit = "F"`;
    console.log("check7")
    console.log(data)
   
    const sql = `update airplane set Total_number_of_seats = "${data.Total_number_of_seats}", Airplane_type = "${data.Airplane_type}" where Airplane_id = "${data.Airplane_id}"`;
    await promisePool.query(sql);
  },

  updateFlight : async (data) => {
    // where 조건을 만족하는 행에 대해서 salary 수정
    //const sql = `update employee set salary = 500 where Minit = "F"`;
    console.log("check8")
    console.log(data)
    /*
    const sql = `update airport set Name = "${data.Name}" where Airport_code = "${data.Airport_code}"`;
    const sql2 = `update airport set City = "${data.City}" where Airport_code = "${data.Airport_code}"`;
    const sql3 = `update airport set State = "${data.State}" where Airport_code = "${data.Airport_code}"`;
    */
    const sql = `update flight set Flight_number = "${data.Flight_number}", Airline = "${data.Airline}", Weekdays = "${data.Weekdays}"  where Flight_number = "${data.Flight_number}"`;
    await promisePool.query(sql);
  },





  /*
  updateDepartment : async (data) => {
      const sql = `update department set dname = "${data.Dname}" where Dnumber = 0`;  //조건에 따른 수행
      await promisePool.query(sql);   //데이터 받아서 업데이트

  },
  */
}




// delete query
//삭제 버튼을 누르면 해당 항목 삭제
export const deleteSql = {
  /*
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
  */
  deleteAirport : async (data) => {
    console.log('deleteSql.deleteAirport:', data.Airport_code)
    // where 조건을 만족하는 행에 대해서 삭제
    //Dnumber 받아서 찾아 삭제
    //const sql = `delete from department where Dnumber = "${data.Dnumber}" `; 
    const sql = `delete from AIRPORT where Airport_code = "${data.Airport_code}" `; 

    await promisePool.query(sql); //쿼리문에 넘겨줌

  },
  deleteAirplane : async (data) => {
    console.log('deleteSql.deleteAirplane:', data.Airport_code)
    // where 조건을 만족하는 행에 대해서 삭제
    //Dnumber 받아서 찾아 삭제
    //const sql = `delete from department where Dnumber = "${data.Dnumber}" `; 
    const sql = `delete from AIRPLANE where Airplane_id = "${data.Airplane_id}" `; 

    await promisePool.query(sql); //쿼리문에 넘겨줌

  },
  deleteFlight : async (data) => {
    console.log('deleteSql.deleteFlight:', data.Flight_number)
    // where 조건을 만족하는 행에 대해서 삭제
    //Dnumber 받아서 찾아 삭제
    //const sql = `delete from department where Dnumber = "${data.Dnumber}" `; 
    const sql = `delete from FLIGHT where Flight_number = "${data.Flight_number}" `; 

    await promisePool.query(sql); //쿼리문에 넘겨줌

  },
  deleteReservation : async (data) => {
    console.log('deleteSql.deleteReservationt:', data.Seat_number)

    const sql = `delete from SEAT_RESERVATION where Seat_number = "${data.Seat_number}" `; 

    await promisePool.query(sql); //쿼리문에 넘겨줌

  },
}