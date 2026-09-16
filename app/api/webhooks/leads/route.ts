import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PipelineStage } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, program, source, notes } = body;

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        program,
        source: source || 'Instagram',
stage: PipelineStage.Inquiry,        notes: notes
          ? {
              create: [
                {
                  text: notes,
                },
              ],
            }
          : undefined,
      },
      include: {
        notes: true,
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}