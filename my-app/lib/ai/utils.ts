import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Helper function to encode text
function encodeText(text) {
  return new TextEncoder().encode(text)
}

export async function streamAIResponse(req, res, messages, context) {
  try {
    const systemMessage = {
      role: "system",
      content: `You are ConsultAI, an expert consultation assistant. 
      Current consultation context:
      Title: ${context.title}
      Description: ${context.description}
      Category: ${context.category}
      Priority: ${context.priority}
      
      Provide clear, professional responses that are relevant to the consultation context.
      For technical queries, include code examples when appropriate.
      For business queries, provide actionable insights and recommendations.
      Always maintain a helpful and professional tone.`
    }

    const conversationHistory = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...conversationHistory],
      temperature: 0.7,
      max_tokens: 1000,
      stream: true
    })

    // Stream the response
    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || ""
      if (content) {
        yield content
      }
    }
  } catch (error) {
    console.error('Error in AI response:', error)
    throw error
  }
}

export async function generateCompletion(messages, context) {
  try {
    const systemMessage = {
      role: "system",
      content: `You are ConsultAI, an expert consultation assistant.
      Current consultation context:
      Title: ${context.title}
      Description: ${context.description}
      Category: ${context.category}
      Priority: ${context.priority}`
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return response.choices[0]?.message?.content || ""
  } catch (error) {
    console.error('Error generating completion:', error)
    throw error
  }
}
