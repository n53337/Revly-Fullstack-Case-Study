import db from "@/db";
import { users_vendors, usersTable } from "@/db/schema";
import { getUsersValidator } from "@/validators/users.validator";
import { count, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit } = getUsersValidator.parse({
      page: Number(searchParams.get("page")),
      limit: Number(searchParams.get("limit")),
    });

    const users = await db.query.usersTable.findMany({
      limit,
      offset: (page - 1) * limit,
      with: {
        vendors: {
          columns: {
            vendor_id: true,
            display_name: true,
          },
          where: eq(users_vendors.is_enabled, 1),
        },
      },
    });

    const total = await db.select({ count: count() }).from(usersTable);
    const totalPages = Math.ceil(total[0].count / limit);

    return NextResponse.json({
      page,
      limit,
      total: totalPages,
      totalPages,
      data: users,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
