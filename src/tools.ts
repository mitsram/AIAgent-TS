import chalk from "chalk";


export function check_appointment_availability(datetime: string){
    console.log(chalk.green("Calling check_appointment_availability ", datetime))
    return true;
}

export function schedule_appointment(datetime: string, name: string, email: string){
    console.log(chalk.green("Calling schedule_appointment ", datetime, name, email))
    return true;
}

export function delete_appointment(datetime: string, name: string, email: string){
    console.log(chalk.green("Calling delete_appointment ", datetime, name, email))
    return true;
}
