const db = require("../Database/db");
const deleteUser = require("../deleteUser");
const bcrypt = require('bcryptjs');

test("Delete User that exists", () =>{
    let username = 'deleteTest';
    let pass = 'Qwerty2022';
    let email = 'test@gmail.com';
    let phone = '9999999999';
    createUser(username,pass,phone,email,function(id){
        deleteUser(id,function(passOrFail){
            expect(passOrFail).toBe(1);
        })
    })
})

test("Delete User that exists", () =>{
    let username = 'deleteTest2';
    let pass = "AbCdEfGhIjKlMnO2022";
    let email = "fakeEmail@gmail.com";
    let phone = "111111111111";
    createUser(username,pass,phone,email,function(id){
        deleteUser(id,function(passOrFail){
            expect(passOrFail).toBe(1);
        })
    })
})

test("Delete Where User Doesn't Exist", () =>{
    deleteUser(0,function(passOrFail){
        expect(passOrFail).toBe(1);
    })
})

async function createUser(username,pass,phone,email, callback){

        const hash = await  bcrypt.hash(pass,12)
         db.query('INSERT INTO EMPLOYEE (Emp_Username, Emp_PasswordHash) VALUES (?)', [[username,hash]], (error,result) => {
            if(error) throw error;
            getUserId(username,function(id){
                db.query('INSERT INTO PHONE (Emp_ID, EMP_PHONE ) VALUES (?)', [[id, phone]], (error) => {
                    if(error) throw error;
                    db.query('INSERT INTO EMAIL (Emp_ID, EMP_EMAIL ) VALUES (?)', [[id, email]], (error) => {
                        if(error) throw error;
                        return callback(id)
                    });
                    
                });
            })

        });
}

function getUserId(username,callback){
    db.query('SELECT EMP_ID FROM EMPLOYEE WHERE EMP_USERNAME = ?', username, (error,result) =>{
        if(error) throw error;
        Object.keys(result).forEach(function(key){
            let row = result[key];
            return callback(row.EMP_ID);
        });
    })
}
