import { api } from './api';

export const fetchRecommendations = async (userId: string): Promise<{ recommendations: string }> => {
  const { data } = await api.get(`https://mapminds-backend-sandy.vercel.app/api/ai/recommendations?userId=${userId}`);
  return data;
};

export interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

export interface StreamChatPayload {
  message: string;
  userMessageId: string
}
export async function sendChatMessage(payload: {
  message: string;
  userMessageId: string;
}): Promise<string> {
  const res = await fetch('https://mapminds-backend-sandy.vercel.app/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to reach the assistant.');
  }

  return data.reply ?? data.message ?? '';
}
export async function streamChat(
  payload: { message: string },
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
) {
  const res = await fetch('https://mapminds-backend-sandy.vercel.app/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
    signal,
  });

  if (!res.ok || !res.body) {
    const errText = await res.text().catch(() => '');
    let message = 'Failed to reach the assistant.';
    try {
      const parsed = JSON.parse(errText);
      message = parsed.message || message;
    } catch {
      if (errText) message = errText;
    }
    throw new Error(message);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    if (chunk) onChunk(chunk);
  }
}
