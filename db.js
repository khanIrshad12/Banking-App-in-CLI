const { Client } = require("pg");
const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "irshad",
    database: "bankdb",
    port: 5432
});
client.connect(err => {
    if (err) {
        console.log("❌Not conected ")
    } else {
        console.log("\n DataBase conection succesfull")
    }
})


const createAmount = ({ ac_id, ac_nm, amount }) => {
    client.query(`insert into account values ($1,$2,$3)`, [ac_id, ac_nm, amount], (err, res) => {
        if (!err) {
            console.log("\n ✅Account Created Sucessfull");
        } else {
            console.log(err)
        }
    })
}
const withdraw = ({ ac_id, amount }) => {
    client.query(`select balance from account where ac_id=$1`, [ac_id], (err, res) => {
        if (!err) {
            const balance = parseFloat(res.rows[0].balance);
            const newBalance = balance - amount;
            if (newBalance <= 0) {
                console.log(`\n Your account do not have sufficient Amount☹️☹️`);
                console.log(`\n your Exisiting balance is ${balance}`)
            } else {
                client.query(`update account set balance = $1 where ac_id=$2`, [newBalance, ac_id], (err, res) => {
                    if (!err) {
                        console.log(`\n succesfully withdraw amount ${amount} `);
                        console.log(`\n your Current Balance ${newBalance}`)

                    } else {
                        console.log("\n Withdraw failled!!");
                    }
                })

            }
        } else {
            console.log("\n not found balance")
        }

    });
}

const deposite = ({ ac_id, amount }) => {
    client.query(`select balance from account where ac_id=$1`, [ac_id], (err, res) => {
        if (!err) {
            const balance = parseFloat(res.rows[0].balance);
            if (amount <= 0) {
                console.log(`\n Please enter the positive integer`);
                
            } else {
                console.log(`\n Your previous balance was ${balance}`);
                const newBalance = balance + amount;
                console.log(`\n Your current balanace is ${newBalance}`)
                client.query(`update account set balance = $1 where ac_id=$2`, [newBalance, ac_id], (err, res) => {
                    if (!err) {
                        console.log(`\n ✅succesfully deposite amount ${amount} `);

                    } else {
                        console.log("\n deposite failled!!");
                    }
                })
            }
        } else {
            console.log("\n not found balance")
        }

    });
}
const checkBalance = ({ ac_id }) => {
    client.query(`select balance,ac_nm from account where ac_id=$1`, [ac_id], (err, res) => {
        if (!err) {

            const balance = parseFloat(res.rows[0].balance);
            const name = res.rows[0].ac_nm;
            console.log(`\n ${name} your existing balance is ${balance}`);
        } else {
            console.log("\n ❌something went wrong!,while checking balance")
        }
    })
}


module.exports = {
    createAmount, withdraw, deposite, checkBalance
} 