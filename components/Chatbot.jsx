"use client";
import { AiChat } from "@nlux/react";
import { useChatAdapter } from "@nlux/langchain-react";
import "@nlux/themes/nova.css";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { generatedRecipeState } from "./providers/stateStore";

const adapterOptions = {
  url: "https://pynlux.api.nlux.ai/pirate-speak",
};

export const Chatbot = () => {
  //const [generatedRecipe, setGeneratedRecipe] = useState("");
  const nlbridgeAdapter = useChatAdapter(adapterOptions);
  const [generatedRecipe, setGeneratedRecipe] =
    useRecoilState(generatedRecipeState);

  const messageReceivedCallback = useCallback(
    (message) => setGeneratedRecipe(message),
    []
  );
  if (generatedRecipe) {
    console.log(generatedRecipe);
  }

  return (
    <AiChat
      adapter={nlbridgeAdapter}
      conversationOptions={{
        historyPayloadSize: 10,
        scrollWhenGenerating: true,
        streamingAnimationSpeed: 20,
      }}
      promptBoxOptions={{
        placeholder: "How can I help you today?",
      }}
      events={{
        messageReceived: messageReceivedCallback,
      }}
    />
  );
};
