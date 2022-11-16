const db = require('../Database/db')

  test("Testing Inventory: Add Car and Delete Car", async() =>{
    let car = {
      make: "Kia",
      model: "Forte",
      year: 2017,
      price: 20000,
      mileage: 200,
      bodyType: "sedan",
      condition: "like new",
      color: "silver"
    }
  
    let id = await setInventory(car.make,car.model, car.year, car.price, car.mileage, car.bodyType, car.condition, car.color)
    expect(await id).not.toBeUndefined();
    let pulledCar = await getCar(id)
    expect(await pulledCar.Car_Make).toBe(car.make);
    let affectedRowsFromDelete = await deleteInventory(id);
    expect(await affectedRowsFromDelete).toBe(1);
  });

  test("Testing Reviews: Add Review and Delete Review", async () =>{
    let review = {
      comment: "test",
      rating: 4
    }

    let id = await setReview(review.comment,review.rating);
    expect(await id).not.toBeUndefined()
    let pulledReview = await getReview(id)
    expect(await pulledReview.REVIEW_COMMENT).toBe(review.comment)
    let affectedRowsFromDelete = await deleteReview(review.comment)
    expect(await affectedRowsFromDelete).toBe(1)
});

// tested together due to dependencies
  describe("", () => {
  afterEach(()=>{ deleteUser("TestAccount_ME") })
  test("Testing Phone And Email: Add Number/Email and Delete Number/Email", async () =>{
    let employee = {
      username: "TestAccount_ME", 
      pass: "xxxxxx", 
      fname: "John", 
      lname: "Doe", 
      role: "admin"
    }

    let id = await setUser(employee.username, employee.pass, employee.fname, employee.lname, employee.role)
    expect(await setPhone(id, "9999")).not.toBeUndefined()
    let pulledPhone = await getPhone(id)
    expect(await pulledPhone.Emp_ID).toBe(id)
    expect(await setEmail(id, "9999")).not.toBeUndefined()
    let pulledEmail = await getEmail(id)
    expect(await pulledEmail.Emp_ID).toBe(id)
    let affectedRowsFromDelete = await deleteEmail(id)
    expect(await affectedRowsFromDelete).toBe(1);
    affectedRowsFromDelete = await deletePhone(id).then(deleteEmail(id))
    expect(await affectedRowsFromDelete).toBe(1)
  });
  })



async function getReview(id){
    const [rows] = await db.promise().query(
        `SELECT * 
          FROM REVIEW 
          WHERE REVIEW_ID = ?`,
        [id]
      )
    
      return rows[0]
}

async function getPhone(id){
    const [rows] = await db.promise().query(
        `SELECT * 
          FROM PHONE 
          WHERE EMP_ID = ?`,
        [id]
      )
    
      return rows[0]
}

async function getEmail(id){
    const [rows] = await db.promise().query(
        `SELECT * 
          FROM EMAIL 
          WHERE EMP_ID = ?`,
        [id]
      )
    
      return rows[0]
}

async function getCar(id){
    const [rows] = await db.promise().query(
        `SELECT * 
          FROM INVENTORY 
          WHERE CAR_STOCK_NUM = ?`,
        [id]
      )
    
      return rows[0]
}

async function setUser(username, pass, fname, lname, role){
    const [insertId] = await db.promise().query(
        `INSERT INTO EMPLOYEE (Emp_Username, Emp_PasswordHash, Emp_FirstName, Emp_LastName, Emp_Role) 
          VALUES (?, ?, ?, ?, ?)`,
        [username, pass, fname, lname, role]
      )
    
      return insertId.insertId
}

async function setPhone(id, phone){
    const [insertId] = await db.promise().query(
        `INSERT INTO PHONE (Emp_ID, Emp_Phone) 
          VALUES (?, ?)`,
        [id, phone]
      )
    
      return  insertId.insertId
}

async function setEmail(id, email){
    const [insertId] = await db.promise().query(
        `INSERT INTO EMAIL (Emp_ID, Emp_Email) 
          VALUES (?, ?)`,
        [id, email]
      )
    
      return insertId.insertId
}

async function setReview(review,rating){
    const [insertId] = await db.promise().query(
        `INSERT INTO REVIEW (REVIEW_COMMENT, REVIEW_RATING) 
          VALUES (?, ?)`,
        [review, rating]
      )
    
      return await insertId.insertId
}

async function setInventory(make,model,year,price,mileage,bodytype,condition, color){
    const [insertId] = await db.promise().query(
        `INSERT INTO Inventory (Car_Make, Car_Model, Car_Year, Car_Price, Car_Mileage, Car_BodyType, Car_Condition, Car_Color) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [make,model,year,price,mileage,bodytype,condition,color]
      )
      return insertId.insertId
}

async function deletePhone(id){
        const [result] = await db.promise().query(
            'DELETE FROM PHONE WHERE Emp_ID= ?',
            [id]
          )
        
          return result.affectedRows
}

async function deleteEmail(id){
    const [result] = await db.promise().query(
        'DELETE FROM EMAIL WHERE Emp_ID= ?',
        [id]
      )
    
      return result.affectedRows
}

async function deleteReview(review){
  const [result] = await db.promise().query(
    'DELETE FROM REVIEW WHERE REVIEW_COMMENT= ?',
    [review]
  )

  return result.affectedRows
}

async function deleteInventory(Car_Stock_Num){
        const [result] = await db.promise().query(
            'DELETE FROM INVENTORY WHERE Car_Stock_Num= ?',
            [Car_Stock_Num]
          )
        
          return result.affectedRows
}

async function deleteUser(username){
  const [result] = await db.promise().query(
      'DELETE FROM EMPLOYEE WHERE Emp_Username= ?',
      [username]
    )
  
    return result.affectedRows
}