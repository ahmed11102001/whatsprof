export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { numbers } = req.body;

  if (!numbers || !Array.isArray(numbers)) {
    return res.status(400).json({ error: "يرجى إرسال مصفوفة أرقام صحيحة" });
  }

  try {
    const results = [];

    for (const number of numbers) {
      const response = await fetch("https://graph.facebook.com/v19.0/979565035250717/messages", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.WA_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: number,
          type: "template",
          template: {
            name: "welcome_message",
            language: { code: "ar" }
          }
        })
      });

      const data = await response.json();
      results.push({ 
        number, 
        success: response.ok, 
        status: response.status,
        response: data
      });

      // تأخير 2 ثانية بين كل رسالة
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return res.status(200).json({ 
      success: true, 
      processedCount: numbers.length,
      results 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}