export async function handleAsk(request, env) {
  let prompt;
  try {
    const body = await request.json();
    prompt = body.prompt;
    if (!prompt) {
      throw new Error('Missing prompt');
    }
  } catch (err) {
    console.error('Error parsing JSON:', err);
    return new Response(
      JSON.stringify({ error: 'Invalid JSON or missing prompt' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await groqRes.json();
    const answer = data.choices?.[0]?.message?.content || 'No response';

    return new Response(JSON.stringify({ answer }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
