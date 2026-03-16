import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Extract page parameter from query string
    const page = request.nextUrl.searchParams.get('page') || '1'
    
    console.log('[v0] API Route: Fetching page', page)
    
    const response = await fetch(`http://34.87.56.13:1605/v1/properties?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `External API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('[v0] API Route: Received data for page', page)
    return NextResponse.json(data)
  } catch (error) {
    console.error('[v0] API Route Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
