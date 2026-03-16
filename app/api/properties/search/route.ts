export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log('[v0] Search API received:', body)

    const response = await fetch('http://34.87.56.13:1605/v1/properties/ai-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      console.error('[v0] API error status:', response.status)
      return Response.json(
        { error: 'Failed to search properties' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('[v0] API response:', data)

    return Response.json(data)
  } catch (error) {
    console.error('[v0] Search API error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
