import { matiasContext } from '../data/profiles/matias-context';

export interface ChatMessage {
  text: string;
  isUser: boolean;
}

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Store conversation history per session
const conversationHistory: Map<string, ConversationMessage[]> = new Map();

const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

let currentSessionId = generateSessionId();

export const resetSession = () => {
  currentSessionId = generateSessionId();
  conversationHistory.delete(currentSessionId);
};

export const sendMessageToOpenAI = async (
  message: string,
  language: 'es' | 'en' = 'es'
): Promise<ChatMessage> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return {
      text: language === 'es'
        ? '⚠️ El asistente no está configurado. Contacta a través del formulario de contacto.'
        : '⚠️ The assistant is not configured. Please use the contact form.',
      isUser: false,
    };
  }

  try {
    // Get the appropriate context based on language
    const systemPrompt = matiasContext[language];

    // Get or initialize conversation history
    if (!conversationHistory.has(currentSessionId)) {
      conversationHistory.set(currentSessionId, []);
    }
    const history = conversationHistory.get(currentSessionId)!;

    // Add user message to history
    history.push({ role: 'user', content: message });

    // Build messages array with system prompt and conversation history
    const messages: ConversationMessage[] = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-10) // Keep last 10 messages for context
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cost-effective and fast
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Error en la API de OpenAI');
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || '';

    // Add assistant response to history
    history.push({ role: 'assistant', content: assistantMessage });

    return {
      text: assistantMessage,
      isUser: false,
    };
  } catch (error) {
    console.error('Error sending message to OpenAI:', error);

    return {
      text: language === 'es'
        ? '❌ Hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.'
        : '❌ There was an error processing your message. Please try again.',
      isUser: false,
    };
  }
};

// Check if OpenAI is configured
export const isOpenAIConfigured = (): boolean => {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
};
