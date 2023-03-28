require('dotenv').config();
const { EmbedBuilder } = require("discord.js");


module.exports = (bot) => {
    bot.askGPT = async (question) => {

        const channel = bot.channels.cache.find(
            (channel) => channel.name === "ask-gpt"
        );

        const { Configuration, OpenAIApi } = require("openai");

        const MODEL = 'gpt-3.5-turbo';
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        async function run() {
            const start = Date.now();

            const completion = await openai.createChatCompletion({
                model: MODEL,
                messages: [{ role: "user", content: `${question}` }],
            });
            // console.log(completion.data.choices[0].message.content);
            const output = completion.data.choices[0].message.content;
            const answer = output.replace("As an AI language model, ", "");

            const end = Date.now();
            const elapsed = end - start;
            const seconds = Math.floor(elapsed / 1000);
            const milliseconds = elapsed % 1000;
            const formattedTime = `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0').slice(0, 2)}`;


            const embed = new EmbedBuilder()
                .setColor("#0b5394")
                .setTitle("🤖 • __Chat-GPT__")
                .setDescription(answer)
                .setTimestamp()
                .setFooter({ text: `Model: ${MODEL} | Response Time: ${formattedTime} seconds` });

            await channel.send({ embeds: [embed] }).catch(console.error);

            // const message = "Chat-GPT: \n\t" + completion.data.choices[0].message.content;
            // await channel.send({ content: message }).catch(console.error);
        }

        run();

    };
};