import db from "@/db";
import { vendorsTable } from "@/db/schema";
import { getVendorsValidator } from "@/validators/vendors.validator";
import { count, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit } = getVendorsValidator.parse({
      page: Number(searchParams.get("page")),
      limit: Number(searchParams.get("limit")),
    });

    const vendors = await db.query.vendorsTable.findMany({
      limit,
      offset: (page - 1) * limit,
      with: {
        chain: {
          columns: {
            name: true,
            id: true,
          },
        },
      },
    });

    const total = await db.select({ count: count() }).from(vendorsTable);
    const totalPages = Math.ceil(total[0].count / limit);

    return NextResponse.json({
      page,
      limit,
      total: totalPages,
      totalPages,
      data: vendors,
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
