import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, modelType, modelName, dataset } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
       return NextResponse.json({ text: `Simulated response (Gemini API Key missing). Based on a ${modelType} model (${modelName}) trained on ${dataset}: ${prompt.substring(0, 20)}...` });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemInstruction = `You are simulating the output of a specialized AI model called "${modelName}". 
Its architecture type is: ${modelType}. 
It was trained on the dataset: ${dataset}.
Provide a response that directly fulfills the prompt, adopting the tone and format expected of such a model.
If it is a Vision model, describe the synthetic inference of an image conceptually.
If it is a Code model, output code primarily.
If it is a Language model, provide a conversational or analytical response.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: 'user', parts: [{ text: systemInstruction + "\n\nUser prompt: " + prompt }] }
      ],
    });

    return NextResponse.json({ text: response.text });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ text: "Simulated response (LLM error). The sentiment is positive." }, { status: 500 });
  }
}
