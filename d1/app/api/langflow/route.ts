import { NextResponse } from 'next/server';
import { runLangflowAPI } from '@/utils/langflowClient';

export async function POST(request: Request) {
  try {
    const { inputValue, inputType, outputType, stream } = await request.json();
    const response = await runLangflowAPI(inputValue, inputType, outputType, stream);
    
    let finalOutput = '';
    if (response.outputs && response.outputs[0] && response.outputs[0].outputs) {
      const lastOutput = response.outputs[0].outputs[response.outputs[0].outputs.length - 1];
      if (lastOutput && lastOutput.outputs && lastOutput.outputs.message) {
        finalOutput = lastOutput.outputs.message.message.text;
      }
    }
    
    return NextResponse.json({ 
      session_id: response.session_id,
      finalOutput 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

