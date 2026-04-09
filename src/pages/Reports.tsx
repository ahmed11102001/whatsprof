import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  CheckCircle, 
  XCircle,
  Eye,
  Calendar,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const messageData = [
  { name: 'يناير', sent: 4000, delivered: 3800, read: 2800 },
  { name: 'فبراير', sent: 4500, delivered: 4200, read: 3100 },
  { name: 'مارس', sent: 5200, delivered: 4900, read: 3600 },
  { name: 'أبريل', sent: 4800, delivered: 4600, read: 3400 },
];

const engagementData = [
  { name: 'الأسبوع 1', rate: 65 },
  { name: 'الأسبوع 2', rate: 72 },
  { name: 'الأسبوع 3', rate: 68 },
  { name: 'الأسبوع 4', rate: 78 },
];

const contactsGrowthData = [
  { name: 'يناير', contacts: 1200 },
  { name: 'فبراير', contacts: 1500 },
  { name: 'مارس', contacts: 1900 },
  { name: 'أبريل', contacts: 2341 },
];

const statusData = [
  { name: 'مستلمة', value: 4850, color: '#25D366' },
  { name: 'مقروءة', value: 3200, color: '#128C7E' },
  { name: 'فاشلة', value: 150, color: '#ef4444' },
];

const campaignPerformance = [
  { name: 'حملة العروض', sent: 5000, delivered: 4850, read: 3200 },
  { name: 'ترحيب جديد', sent: 800, delivered: 780, read: 650 },
  { name: 'تذكير موعد', sent: 1200, delivered: 1180, read: 890 },
  { name: 'استطلاع رأي', sent: 2000, delivered: 950, read: 420 },
];

export default function Reports() {
  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">التقارير والإحصائيات</h1>
          <p className="text-gray-600">تحليل أداء حملاتك ورسائلك</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="month">
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 ml-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="quarter">هذا الربع</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي الرسائل</p>
                <p className="text-2xl font-bold">18,500</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">نسبة التسليم</p>
                <p className="text-2xl font-bold">97.8%</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+2.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">نسبة القراءة</p>
                <p className="text-2xl font-bold">68.5%</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+5.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">نسبة الحظر</p>
                <p className="text-2xl font-bold">2.2%</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingDown className="w-4 h-4" />
                  <span>-0.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="campaigns">أداء الحملات</TabsTrigger>
          <TabsTrigger value="engagement">معدل التفاعل</TabsTrigger>
          <TabsTrigger value="growth">نمو جهات الاتصال</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Messages Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                الرسائل عبر الزمن
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={messageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sent" name="مرسلة" fill="#34B7F1" />
                    <Bar dataKey="delivered" name="مستلمة" fill="#25D366" />
                    <Bar dataKey="read" name="مقروءة" fill="#128C7E" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع حالة الرسائل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {statusData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء الشهر الحالي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>نسبة التسليم</span>
                    <span className="font-bold">97.8%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '97.8%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>نسبة القراءة</span>
                    <span className="font-bold">68.5%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '68.5%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>نسبة الاستجابة</span>
                    <span className="font-bold">42.3%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '42.3%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>أداء الحملات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="sent" name="مرسلة" fill="#34B7F1" />
                    <Bar dataKey="delivered" name="مستلمة" fill="#25D366" />
                    <Bar dataKey="read" name="مقروءة" fill="#128C7E" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">الحملة</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">مرسلة</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">مستلمة</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">مقروءة</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">نسبة النجاح</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformance.map((campaign, index) => (
                      <tr key={index} className="border-b border-gray-50 last:border-0">
                        <td className="py-4 px-4 font-medium">{campaign.name}</td>
                        <td className="py-4 px-4">{campaign.sent.toLocaleString()}</td>
                        <td className="py-4 px-4 text-green-600">{campaign.delivered.toLocaleString()}</td>
                        <td className="py-4 px-4 text-blue-600">{campaign.read.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <Badge className="bg-green-100 text-green-700">
                            {Math.round((campaign.delivered / campaign.sent) * 100)}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>معدل التفاعل الأسبوعي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      name="معدل التفاعل %" 
                      stroke="#25D366" 
                      fill="#25D366" 
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                نمو جهات الاتصال
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={contactsGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="contacts" 
                      name="جهات الاتصال" 
                      stroke="#128C7E" 
                      strokeWidth={3}
                      dot={{ fill: '#128C7E', r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">+841</p>
                  <p className="text-sm text-gray-500">نمو هذا الشهر</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold">2,341</p>
                  <p className="text-sm text-gray-500">إجمالي جهات الاتصال</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">56%</p>
                  <p className="text-sm text-gray-500">نسبة النمو</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
