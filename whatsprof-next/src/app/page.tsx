import prisma from "@/lib/prisma";
import { Users, LayoutGrid, Database } from "lucide-react";

export default async function Home() {
  // بنجيب بس الداتا اللي موجودة فعلياً في نيون دلوقتي عشان الصفحة تفتح
  const [contactsCount, audienceCount] = await Promise.all([
    prisma.contact.count(),
    prisma.audience.count(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 font-sans text-right" dir="rtl">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-right">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            لوحة تحكم واتس بروف 🚀
          </h1>
          <p className="text-zinc-500 mt-2">
            بيانات حية ومباشرة من قاعدة بيانات Neon + Prisma
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Contacts */}
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3 justify-end">
              <h2 className="font-medium">جهات الاتصال</h2>
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-5xl font-bold text-zinc-900 dark:text-white">
              {contactsCount.toLocaleString("ar-EG")}
            </p>
          </div>

          {/* Audiences */}
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3 justify-end">
              <h2 className="font-medium">الجماهير (Audiences)</h2>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <LayoutGrid className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-5xl font-bold text-zinc-900 dark:text-white">
              {audienceCount.toLocaleString("ar-EG")}
            </p>
          </div>

        </div>

        {/* Footer status */}
        <div className="mt-10 flex items-center gap-2 text-sm text-zinc-500 justify-end">
          <span>متصل بنجاح بقاعدة بيانات Neon PostgreSQL</span>
          <Database className="w-4 h-4 text-green-500" />
        </div>

      </div>
    </div>
  );
}