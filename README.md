# AIAgent-TS

A simple AI Agent using Typescript

## Setup

You need an API key/token to use this agent. Currently, the default is Anthropic and OpenAI is commented. You can enable it any time. To set the API key, create a .env file at the root folder and set the API key:

```
ANTHROPIC_API_KEY=<your api key>
```

## Sample user prompt

#### Scheduling an appointment
```
Can you schedule an appointment for me for tomorrow at 10AM
```
Output: 
Should call `check_appointment_availability` and `check_appointment_availability` functions

#### Re-scheduling an appointment
```
Can you re-schedule my appointment tomorrow to 11AM
```
Output:
Should call all three functions


