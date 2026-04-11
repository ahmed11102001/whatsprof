import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function Reports() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/reports");

        if (!res.ok) throw new Error("فشل في تحميل البيانات");

        const result = await res.json();

        setData(Array.isArray(result) ? result : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ✅ كل الحسابات في useMemo (أداء أعلى)
  const totals = useMemo(() => {
    return data.reduce(
      (acc, curr) => ({
        sent: acc.sent + (curr.sentCount || 0),
        delivered: acc.delivered + (curr.deliveredCount || 0),
        failed: acc.failed + (curr.failedCount || 0),
      }),
      { sent: 0, delivered: 0, failed: 0 }
    );
  }, [data]);

  // نسبة النجاح
  const successRate =
    totals.sent > 0
      ? ((totals.delivered / totals.sent) * 100).toFixed(1)
      : 0;

  if (isLoading) {
    return (
      <div className="p-10 text-center">جاري تحليل البيانات...</div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        حصل خطأ: {error}
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">التقارير والإحصائيات</h1>
        <p className="text-gray-600">تحليل أداء الحملات</p>
      </div>

      {/* No Data */}
      {data.length === 0 ? (
        <Card className="border-dashed border-2 py-20">
          <CardContent className="flex flex-col items-center">
            <BarChart3 className="w-10 h-10 text-gray-400 mb-4" />
            <h2 className="text-lg font-bold">مفيش بيانات لسه</h2>
            <p className="text-gray-500 mt-2">
              أول حملة هتظهر هنا
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Sent */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">إجمالي المرسل</p>
                <p className="text-2xl font-bold">
                  {totals.sent.toLocaleString("ar-EG")}
                </p>
              </CardContent>
            </Card>

            {/* Delivered */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">تم التسليم</p>
                <p className="text-2xl font-bold text-green-600">
                  {totals.delivered.toLocaleString("ar-EG")}
                </p>
                <p className="text-xs text-green-600 font-medium">
                  نسبة النجاح {successRate}%
                </p>
              </CardContent>
            </Card>

            {/* Failed */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">فشل</p>
                <p className="text-2xl font-bold text-red-500">
                  {totals.failed.toLocaleString("ar-EG")}
                </p>
              </CardContent>
            </Card>

          </div>

        </div>
      )}
    </div>
  );
}