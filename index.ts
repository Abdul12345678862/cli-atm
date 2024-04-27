import inquirer from "inquirer";
import chalk from "chalk";

async function ATM() {
  let user = "n";

  const pin = 1234;
  let balance = 10000;

  const password = await inquirer.prompt([
    {
      name: "pin",
      type: "number",
      message: "Enter your pin",
    },
  ]);
  if (password.pin == pin) {
    console.log(chalk.green("Login Successful"));
    while (user === "n") {
      const option = await inquirer.prompt([
        {
          name: "option",
          type: "list",
          choices: ["Balance Inquiry", "Withdraw", "Deposit"],
          message: "Select an option",
        },
      ]);
      if (option.option == "Balance Inquiry") {
        console.log(chalk.green(`Your balance is ${balance}`));
      } else if (option.option == "Withdraw") {
        const withdraws = await inquirer.prompt([
          {
            name: "withdraw",
            type: "number",
            message: "Enter the amount to withdraw",
          },
        ]);
        if (withdraws.withdraw <= balance) {
          balance -= withdraws.withdraw;
          console.log(chalk.green(`You withdraw ${withdraws.withdraw}`)); 
          console.log(chalk.green(`Your New balance is ${balance}`));
        } else {
          console.log(chalk.red("Insufficient balance"));
        }
      } else if (option.option == "Deposit") {
        const deposite = await inquirer.prompt([
          {
            name: "deposit",
            type: "number",
            message: "Enter the amount to deposit",
          },
        ]);
        balance += deposite.deposit;
        console.log(chalk.green(`You deposited ${deposite.deposit}`));
        console.log(chalk.green(`Your new balance is ${balance}`));
      } else {
        console.log(chalk.red("Invalid Pin"));
      }
      const newuser = await inquirer.prompt([
        {
          name: "user",
          type: "list",
          choices: ["y", "n"],
          message: "Do you want to exit",
        },
      ]);
      user = newuser.user;
    }
    console.log(chalk.red("Thank you for using our ATM"));
  }
}
ATM();
