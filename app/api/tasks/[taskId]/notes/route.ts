import { createNoteSchema } from '@/schemas/noteSchema';
import type { Note } from '@/types/note';
import { NextRequest, NextResponse } from 'next/server';
import { getNotesForTask, notesStore } from '../../notesStore';

// GET /api/tasks/[taskId]/notes
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;
    const notes = getNotesForTask(taskId);
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

// POST /api/tasks/[taskId]/notes
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;
    const body = await request.json();

    // Validate request body
    const validationResult = createNoteSchema.safeParse({
      ...body,
      taskId,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { text } = validationResult.data;

    // Create new note
    const newNote: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      taskId,
      createdAt: Date.now(),
    };

    // Add note to store
    const notes = getNotesForTask(taskId);
    notes.push(newNote);
    notesStore.set(taskId, notes);

    return NextResponse.json({ note: newNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
