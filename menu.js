
const { createAmount, withdraw, deposite, checkBalance } =require("./db");
const { createInterface } =require( "readline");
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("\n 🎉 Welcome To Banking System in CLI 🎉")
console.log("\n1. Create Your Account ");
console.log("\n2. Deposite Amount");
console.log("\n3. Withdraw Amount");
console.log("\n4. Show Balance");
console.log("\n5. Exit");


let ip = (msg) => {
    return new Promise((resolve, reject) => {
        rl.question(`\n👉 ${msg}`, ch => {
            resolve(ch)
        });
    }
    )
}

let start = async () => {
    while (true) {
        let choice = await ip("Enter Your Choice");
        if (choice == 1) {
            
            console.log("\n ✅ Create Account");
            const aNm=await ip("Enter your name: ");
            console.log(aNm);
            const acId=Math.floor(Math.random()*100000)+1;
            console.log(`your Account is ${acId}`);
            let balances=0;
            console.log(`Your current balance is ${balances}`)
            createAmount({ac_id:acId,ac_nm:aNm,amount:balances});  
        }
        else if (choice == 2) {
            console.log("\n ✅ Deposite Amount");
            const ac_id=parseInt(await ip("Enter Account No:"));
            const money=parseFloat(await ip("Enter Amount:"));
            deposite({ac_id:ac_id, amount:money});

        } else if (choice == 3) {
            console.log("\n ✅ Withdraw Amount");
            const ac_id=parseInt(await ip("Enter Account No:"));
            const money=parseFloat(await ip("Enter Amount:"));
            withdraw({ac_id:ac_id, amount:money});

        } else if (choice == 4) {
            console.log("\n ✅ Show Balance");
            const ac_id=parseInt(await ip("Enter Account No:"));
            checkBalance({ac_id:ac_id})
        }
        if (choice >= 5) {
            console.log("BYE-BYE")
            process.exit(0);

        }
    }
}
start();




