import OpenAI from "openai";
import readline from "readline";
import { config } from "dotenv";
config();
import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "./system-prompt";
import { check_appointment_availability, delete_appointment, schedule_appointment } from "./tools";
import { processLlmResponse } from "./response";
import chalk from "chalk";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [] as any;
// messages.push({ role: "system", content: systemPrompt });

export const function_map = {
    'check_appointment_availability': check_appointment_availability,
    'schedule_appointment': schedule_appointment,
    'delete_appointment': delete_appointment
} as any


export async function sendToLlm(prompt: string) {

    messages.push({ role: "user", content: prompt });

    // const response = await client.chat.completions.create({
    //     messages,
    //     model: "gpt-4o",
    // });
    // messages.push(response.choices[0].message);
    // return response.choices[0].message.content;

    const response = await client.messages.create({
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 1000,
        temperature: 1,
        system: systemPrompt,
        messages,
    });

    // Extract text from content blocks that have a 'text' property
    const textContent = response.content
        .filter((block: any) => typeof block.text === "string")
        .map((block: any) => block.text)
        .join("\n");
    messages.push({ role: "assistant", content: textContent });
    return textContent;
    
    
}

async function main() {
    while (true) {
        const input: string  =  await new Promise((resolve) => {
            rl.question(chalk.magentaBright("\nWhat would you like to do? "), (answer) => {
                resolve(answer);
            });
        });
        const response = await sendToLlm(input);
        await processLlmResponse(response);
        // console.log(response);
    }
}

main();