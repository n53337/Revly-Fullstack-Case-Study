import db from "@/db";
import { usersTable } from "@/db/schema";
import { updateUserStatusValidator } from "@/validators/users.validator";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status } = await request.json();
    const validated = updateUserStatusValidator.parse({ status });

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, Number(id)),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db
      .update(usersTable)
      .set({
        is_active: validated.status ? 1 : 0,
      })
      .where(eq(usersTable.id, Number(id)));

    return NextResponse.json({ message: "User status updated successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
