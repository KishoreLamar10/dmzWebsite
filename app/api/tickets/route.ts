import { NextResponse } from 'next/server'

// Phase 2: implement ticket booking
export function GET() {
  return NextResponse.json({ message: 'Ticket booking coming in Phase 2.' }, { status: 501 })
}

export function POST() {
  return NextResponse.json({ message: 'Ticket booking coming in Phase 2.' }, { status: 501 })
}
