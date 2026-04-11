import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} Not Allowed`,
    });
  }

  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const formatted = campaigns.map((c) => ({
      id: c.id,
      name: c.name || "بدون اسم",
      status: c.status || "unknown",
      sentCount: c.sentCount ?? 0,
      deliveredCount: c.deliveredCount ?? 0,
      failedCount: c.failedCount ?? 0,
      createdAt: c.createdAt,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Database Error:", error);

    return res.status(500).json({
      error: "مشكلة في قراءة البيانات",
    });
  }
}