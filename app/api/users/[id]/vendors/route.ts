import db from "@/db";
import { users_vendors, usersTable } from "@/db/schema";
import { assignVendorsValidator } from "@/validators/users.validator";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = await request.json();

    const validated = assignVendorsValidator.parse(payload);

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, Number(id)),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db.transaction(async (tx) => {
      const existing_vendor = await tx
        .select()
        .from(users_vendors)
        .where(
          and(
            eq(users_vendors.user_id, Number(id)),
            eq(users_vendors.vendor_id, validated.vendor_id)
          )
        )
        .limit(1);

      if (existing_vendor.length > 0) {
        await tx
          .update(users_vendors)
          .set({
            display_name: validated.display_name,
            is_enabled: validated.is_enabled ? 1 : 0,
          })
          .where(eq(users_vendors.id, existing_vendor[0].id));
      } else {
        await tx.insert(users_vendors).values({
          display_name: validated.display_name,
          user_id: Number(id),
          vendor_id: validated.vendor_id,
          is_enabled: validated.is_enabled ? 1 : 0,
        });
      }
    });

    return NextResponse.json({ message: "Vendors assigned successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
