const db = require("../Database/db");
const deleteUser = require("../deleteUser");
const bcrypt = require('bcryptjs');


tester()


async function tester(){
    let testType = "unit test"

    await createUser('deleteTest', 'Qwerty2022', '9999999999', 'test@gmail.com',async function(res){
        await deleteUserWhereUserExists(res, testType)

        // a second call should fail as the user does not exist thats why the pass and fail for this is swapped
        await deleteUserWhereUserNotExists(res, testType)
    });
}

async function deleteUserWhereUserExists(res, testType){
    let start = await performance.now()
    deleteUser(res,async function(result){

        let time = (await performance.now() - start) / 1000
        time = await time.toFixed(2); 

        await console.log("*".repeat(15))
        await console.log("Test Number: %d", 1)
        await console.log("Test Type: %s", testType)
        await console.log("Test Function Call: delete user when user exist")
        await console.log("Time Taken: %d secs", time)

        if(result == true){
            await console.log("Passed/Failed: passed")
            passed += 1;
        }
        else{
            await console.log("Passed/Failed: failed")
            failed += 1;
        }
    });
}

async function deleteUserWhereUserNotExists(res, testType){
    let start = await performance.now()
    deleteUser(res,async function(result){

        let time = (await performance.now() - start) / 1000
        time = await time.toFixed(2); 
        await console.log("*".repeat(15))
        await console.log("Test Number: %d", 2)
        await console.log("Test Type: %s", testType)
        await console.log("Test Function Call: delete user when user does not exists")
        await console.log("Time Taken: %d secs", time)

        if(result == true){
            await console.log("Passed/Failed: failed")
            failed += 1;
        }
        else{
            await console.log("Passed/Failed: passed")
            passed += 1;
        }
        await console.log("*".repeat(15))
    });
}

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
