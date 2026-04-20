/**
 * ============================================
 * AI PALM READER - AI SERVICE (FINAL PRODUCTION FIX)
 * ============================================
 */

// Hardcoded Base URL to prevent any env variable issues
const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

// Get API Key safely
const getApiKey = () => {
  // Try standard Vite env
  let key = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  // Basic validation
  if (!key || key.includes("your_openrouter")) {
    console.error("❌ CRITICAL: API Key is missing or invalid in .env file");
    return null;
  }
  return key;
};

// Generic API Caller
const callAI = async (payload) => {
  const apiKey = getApiKey();
  if (!apiKey) return { success: false, error: "API Key Config Error" };

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin, // Dynamic origin
        "X-Title": "AI Palm Reader",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`❌ API Error (${response.status}):`, errText);
      return { success: false, error: `Server Error: ${response.status}` };
    }

    const data = await response.json();
    return { 
      success: true, 
      content: data.choices?.[0]?.message?.content || "No response text" 
    };

  } catch (error) {
    console.error("❌ Network Error:", error);
    return { success: false, error: "Network Connection Failed" };
  }
};

// ============================================
// 1. PALM READING
// ============================================
export const generatePalmReading = async ({ imageBase64, handType, language }) => {
  // Fix Base64 Format if needed
  const validImage = imageBase64.startsWith("data:") 
    ? imageBase64 
    : `data:image/jpeg;base64,${imageBase64}`;

  const prompt = `Analyze this ${handType} palm image. Language: ${language}.
  Return detailed readings for Heart, Head, Life, and Fate lines.
  
  Format:
  HEART LINE: [Details]
  HEAD LINE: [Details]
  LIFE LINE: [Details]
  FATE LINE: [Details]`;

  const payload = {
    model: "allenai/molmo-2-8b:free", // Free Vision Model
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: validImage } }
        ]
      }
    ]
  };

  const result = await callAI(payload);
  
  if (!result.success) return result;

  // Simple parser
  const text = result.content;
  const getPart = (key) => {
    const match = text.match(new RegExp(`${key}:(.*?)(?=(HEART|HEAD|LIFE|FATE|$))`, "is"));
    return match ? match[1].trim() : "Line unclear in image.";
  };

  return {
    success: true,
    reading: {
      heartLine: getPart("HEART LINE"),
      headLine: getPart("HEAD LINE"),
      lifeLine: getPart("LIFE LINE"),
      fateLine: getPart("FATE LINE"),
      fullText: text
    }
  };
};

// ============================================
// 2. TAROT READING
// ============================================
export const generateTarotReading = async ({ card, category, language }) => {
  const prompt = `Interpret Tarot Card: ${card.name} (${card.reversed ? "Reversed" : "Upright"}).
  Context: ${category}. Language: ${language}.
  Provide spiritual guidance.`;

  const payload = {
    model: "liquid/lfm-2.5-1.2b-thinking:free", // Free Text Model
    messages: [{ role: "user", content: prompt }]
  };

  const result = await callAI(payload);
  if (result.success) {
    return { success: true, reading: result.content };
  }
  return result;
};

// ============================================
// 3. CHAT
// ============================================
export const generateChatResponse = async ({ messages, language }) => {
  const systemMsg = { role: "system", content: `You are a mystic guide. Language: ${language}` };
  
  const payload = {
    model: "liquid/lfm-2.5-1.2b-thinking:free",
    messages: [systemMsg, ...messages]
  };

  const result = await callAI(payload);
  if (result.success) {
    return { success: true, message: result.content };
  }
  return result;
};

// ============================================
// 4. HOROSCOPE
// ============================================
export const generateHoroscope = async ({ zodiacSign, language }) => {
  const prompt = `Daily Horoscope for ${zodiacSign.name}. Language: ${language}.`;
  
  const payload = {
    model: "liquid/lfm-2.5-1.2b-thinking:free",
    messages: [{ role: "user", content: prompt }]
  };

  const result = await callAI(payload);
  if (result.success) {
    return { success: true, horoscope: result.content, zodiacSign };
  }
  return result;
};

// ============================================
// 5. DAILY GUIDANCE
// ============================================
export const generateDailyGuidance = async ({ language }) => {
  const prompt = `Daily Spiritual Guidance. Language: ${language}. Sections: Energy, Focus, Embrace.`;
  
  const payload = {
    model: "liquid/lfm-2.5-1.2b-thinking:free",
    messages: [{ role: "user", content: prompt }]
  };

  const result = await callAI(payload);
  if (result.success) {
    return { success: true, guidance: result.content };
  }
  return result;
};

// ============================================
// 6. LOVE READING
// ============================================
export const generateLoveReading = async ({ question, language }) => {
  const prompt = `Love Reading: ${question || "General Guidance"}. Language: ${language}.`;
  
  const payload = {
    model: "liquid/lfm-2.5-1.2b-thinking:free",
    messages: [{ role: "user", content: prompt }]
  };

  const result = await callAI(payload);
  if (result.success) {
    return { success: true, reading: result.content };
  }
  return result;
};

export default {
  generatePalmReading,
  generateTarotReading,
  generateChatResponse,
  generateHoroscope,
  generateDailyGuidance,
  generateLoveReading
};
