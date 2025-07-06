import chalk from "chalk";
import { function_map, sendToLlm } from ".";

export async function processLlmResponse(response: any){
    const parsedJson = JSON.parse(response);

    if(parsedJson.to == 'user'){
        console.log(chalk.blueBright(parsedJson.message));
    }else if(parsedJson.to == 'system'){
        const fn = parsedJson.function_call.function;
        const args = parsedJson.function_call.arguments;

        const functionResponse = function_map[fn](...args);

        await processLlmResponse(await sendToLlm('response is '+functionResponse ? 'true' : 'false'))
    }
}