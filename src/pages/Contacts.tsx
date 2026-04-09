import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Upload,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MessageSquare,
  RefreshCw,
  Download
} from 'lucide-react';

const contactsData = [
  { id: 1, name: 'أحمد محمد', phone: '+966 50 123 4567', tag: 'VIP', lastInteraction: '2024-04-07', messagesSent: 15, status: 'active' },
  { id: 2, name: 'سارة عبدالله', phone: '+966 55 234 5678', tag: 'عالي', lastInteraction: '2024-04-06', messagesSent: 8, status: 'active' },
  { id: 3, name: 'خالد العمري', phone: '+966 54 345 6789', tag: 'متوسط', lastInteraction: '2024-04-05', messagesSent: 3, status: 'inactive' },
  { id: 4, name: 'نورة الفهد', phone: '+966 53 456 7890', tag: 'VIP', lastInteraction: '2024-04-07', messagesSent: 22, status: 'active' },
  { id: 5, name: 'فهد السالم', phone: '+966 52 567 8901', tag: 'منخفض', lastInteraction: '2024-04-03', messagesSent: 1, status: 'active' },
  { id: 6, name: 'لمياء الرشيد', phone: '+966 51 678 9012', tag: 'متوسط', lastInteraction: '2024-04-04', messagesSent: 5, status: 'active' },
];

const segments = [
  { name: 'VIP', count: 245, color: 'bg-purple-100 text-purple-700' },
  { name: 'عالي', count: 567, color: 'bg-green-100 text-green-700' },
  { name: 'متوسط', count: 892, color: 'bg-blue-100 text-blue-700' },
  { name: 'منخفض', count: 637, color: 'bg-gray-100 text-gray-700' },
];

export default function Contacts() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const filteredContacts = contactsData.filter(contact => {
    const matchesSearch = contact.name.includes(searchQuery) || contact.phone.includes(searchQuery);
    const matchesTag = selectedTag === 'all' || contact.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">جهات الاتصال</h1>
          <p className="text-gray-600">إدارة وتحليل جهات اتصالك</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="w-4 h-4 ml-2" />
            رفع ملف
          </Button>
          <Button className="bg-whatsapp-gradient" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة جهة
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {segments.map((segment, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedTag(segment.name)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{segment.name}</p>
                  <p className="text-2xl font-bold">{segment.count}</p>
                </div>
                <Badge className={segment.color}>{segment.name}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="management">الإدارة</TabsTrigger>
          <TabsTrigger value="segments">التقسيم</TabsTrigger>
          <TabsTrigger value="failed">فاشلة</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="البحث بالاسم أو الرقم..."
                    className="pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedTag} onValueChange={setSelectedTag}>
                  <SelectTrigger className="w-full lg:w-48">
                    <Filter className="w-4 h-4 ml-2" />
                    <SelectValue placeholder="التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="عالي">عالي</SelectItem>
                    <SelectItem value="متوسط">متوسط</SelectItem>
                    <SelectItem value="منخفض">منخفض</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contacts Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">قائمة جهات الاتصال</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">الاسم</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">الرقم</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">التصنيف</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">آخر تفاعل</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">الرسائل</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">الحالة</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white font-bold">
                              {contact.name.charAt(0)}
                            </div>
                            <span className="font-medium">{contact.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{contact.phone}</td>
                        <td className="py-4 px-4">
                          <Badge className={
                            contact.tag === 'VIP' ? 'bg-purple-100 text-purple-700' :
                            contact.tag === 'عالي' ? 'bg-green-100 text-green-700' :
                            contact.tag === 'متوسط' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }>
                            {contact.tag}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{contact.lastInteraction}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                            {contact.messagesSent}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={contact.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {contact.status === 'active' ? 'نشط' : 'غير نشط'}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsUploadDialogOpen(true)}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">رفع ملف Excel / CSV</h3>
                <p className="text-gray-600 text-sm">استيراد جهات اتصال من ملف</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsAddDialogOpen(true)}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">إضافة يدوية</h3>
                <p className="text-gray-600 text-sm">إضافة جهة اتصال جديدة</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <Edit className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">تعديل / حذف</h3>
                <p className="text-gray-600 text-sm">إدارة جهات الاتصال الموجودة</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments">
          <div className="grid md:grid-cols-2 gap-6">
            {segments.map((segment, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{segment.name}</h3>
                      <p className="text-gray-600">{segment.count} جهة اتصال</p>
                    </div>
                    <Badge className={segment.color}>{segment.name}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">نسبة التفاعل</span>
                      <span className="font-medium">{Math.floor(Math.random() * 30 + 70)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">الرسائل المرسلة</span>
                      <span className="font-medium">{Math.floor(Math.random() * 1000 + 500)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="failed">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <RefreshCw className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">لا توجد رسائل فاشلة</h3>
                <p className="text-gray-600 mb-4">جميع رسائلك تم إرسالها بنجاح</p>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إعادة المحاولة للكل
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Contact Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة جهة اتصال جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>الاسم</Label>
              <Input placeholder="اسم جهة الاتصال" />
            </div>
            <div className="space-y-2">
              <Label>رقم الجوال</Label>
              <Input placeholder="+966 50 123 4567" />
            </div>
            <div className="space-y-2">
              <Label>التصنيف</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>وسم مخصص</Label>
              <Input placeholder="مثال: عميل مميز" />
            </div>
            <Button className="w-full bg-whatsapp-gradient">
              <Plus className="w-4 h-4 ml-2" />
              إضافة جهة الاتصال
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>رفع ملف جهات الاتصال</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">اسحب الملف هنا أو انقر للاختيار</p>
              <p className="text-gray-400 text-sm">Excel أو CSV فقط</p>
            </div>
            <div className="space-y-2">
              <Label>التصنيف الافتراضي</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-whatsapp-gradient">
              <Upload className="w-4 h-4 ml-2" />
              رفع الملف
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
