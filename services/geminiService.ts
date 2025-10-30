
import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const initializeChat = (): Chat => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'You are a friendly and helpful assistant for a teacher using a digital teaching journal application. Answer their questions clearly and concisely.',
      },
    });
  }
  return chat;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chatInstance = initializeChat();
    const response = await chatInstance.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Maaf, terjadi kesalahan saat menghubungi asisten AI. Silakan coba lagi.";
  }
};
