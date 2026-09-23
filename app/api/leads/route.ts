import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PipelineStage, LeadSource } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, stage, program, source } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    // Safely cast or fallback to valid schema Enums
    const validStage = Object.values(PipelineStage).includes(stage)
      ? (stage as PipelineStage)
      : PipelineStage.Inquiry;

    const validSource = Object.values(LeadSource).includes(source)
      ? (source as LeadSource)
      : LeadSource.Email;

    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || '',
        program: program || 'General Inquiry',
        stage: validStage,
        source: validSource,
      },
    });

    return NextResponse.json(
      { message: 'Lead created successfully', lead: newLead },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process incoming lead payload' },
      { status: 500 }
    );
  }
}