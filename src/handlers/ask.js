export async function handleAsk(request) {
  try {
    const { prompt } = await request.json();

    const answer = `You asked: ${prompt}`;
    return new Response(JSON.stringify({ answer }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error parsing JSON:', err);
    return new Response(
      JSON.stringify({ error: 'Invalid JSON or missing prompt' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
