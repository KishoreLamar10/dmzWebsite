import { NextResponse } from 'next/server'

// Phase 2: implement NextAuth
export function GET() {
  return NextResponse.json({ message: 'Authentication coming in Phase 2.' }, { status: 501 })
}

export function POST() {
  return NextResponse.json({ message: 'Authentication coming in Phase 2.' }, { status: 501 })
}
