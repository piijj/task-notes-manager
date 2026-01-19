import { NextRequest, NextResponse } from 'next/server';
import { getNotesForTask, notesStore } from '../../../notesStore';

// DELETE /api/tasks/[taskId]/notes/[noteId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string; noteId: string }> }
) {
  try {
    const { taskId, noteId } = await params;
    const notes = getNotesForTask(taskId);

    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    // Remove note immutably
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    notesStore.set(taskId, updatedNotes);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}
