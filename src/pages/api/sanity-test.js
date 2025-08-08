export async function GET() {
  try {
    // Test Sanity connection
    const response = await fetch(
      `https://oxjbgkqf.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == "company"][0]`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Sanity connection successful',
      projectId: 'oxjbgkqf',
      dataset: 'production',
      data: data.result
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Sanity connection failed',
      error: error.message,
      projectId: 'oxjbgkqf',
      dataset: 'production'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
