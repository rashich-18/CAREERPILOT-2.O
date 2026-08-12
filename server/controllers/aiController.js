import { testGemini } from "../services/aiService.js";

export const testAI = async (req, res) => {
  try {
    const result = await testGemini();

    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Gemini AI failed",
      error: error.message,
    });
  }
};