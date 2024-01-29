import { AiChat } from "@nlux/react";
import { useAdapter } from "@nlux/openai-react";
import "@nlux/themes/nova.css";

// const adapterConfig = {
//   apiKey: process.env.CHAT_API_KEY,
//   systemMessage:
//     "Give sound, tailored financial advice. Explain concepts simply. " +
//     "Write concise answers under 5 sentences. Be funny.",
// };
let openApiKey = "";
if (process.env.CHAT_API_KEY !== undefined) {
  openApiKey = process.env.CHAT_API_KEY;
}
const adapterConfig = {
  apiKey: "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",
  model: "gpt-3.5-turbo-0613",
  dataTransferMode: "stream",
  systemMessage: "I want you to answer anything",
};
export const Chatbot = () => {
  //   let openApiKey = "";
  //   if (process.env.CHAT_API_KEY !== undefined) {
  //     openApiKey = process.env.CHAT_API_KEY;
  //   }
  //   const adapterConfig = {
  //     apiKey: openApiKey,
  //     systemMessage:
  //       "Give sound, tailored financial advice. Explain concepts simply. " +
  //       "Write concise answers under 5 sentences. Be funny.",
  //   };
  console.log(openApiKey);
  const chatGptAdapter = useAdapter(adapterConfig);

  return (
    <AiChat
      adapter={chatGptAdapter}
      promptBoxOptions={{
        placeholder: "How can I help you today?",
      }}
    />
  );
};
