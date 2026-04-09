import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
  Sparkles,
  Variable,
  MessageSquare,
  Eye
} from 'lucide-react';

const templatesData = [
  { 
    id: 1, 
    name: 'رسالة ترحيب', 
    content: 'مرحباً {{name}}! 🎉 نحن سعداء بانضمامك إلينا. كيف يمكننا مساعدتك اليوم؟',
    status: 'approved',
    category: 'ترحيب',
    usage: 1250
  },
  { 
    id: 2, 
    name: 'عرض خاص', 
    content: 'أهلاً {{name}}! 🎁 لدينا عرض خاص لك: {{offer}}. سارع بالاستفادة!',
    status: 'approved',
    category: 'تسويق',
    usage: 890
  },
  { 
    id: 3, 
    name: 'تذكير موعد', 
    content: 'تذكير {{name}}: لديك موعد غداً {{date}} الساعة {{time}}. نراك قريباً!',
    status: 'pending',
    category: 'تذكير',
    usage: 0
  },
  { 
    id: 4, 
    name: 'شكر للشراء', 
    content: 'شكراً {{name}} على ثقتك! 🙏 تم تأكيد طلبك رقم {{order}}. سنتواصل معك قريباً.',
    status: 'approved',
    category: 'شكر',
    usage: 567
  },
  { 
    id: 5, 
    name: 'استطلاع رأي', 
    content: 'مرحباً {{name}}! نود معرفة رأيك في {{product}}. هل يمكنك الإجابة على بعض الأسئلة؟',
    status: 'rejected',
    category: 'استطلاع',
    usage: 0
  },
];

const variables = [
  { name: '{{name}}', description: 'اسم العميل' },
  { name: '{{phone}}', description: 'رقم الجوال' },
  { name: '{{date}}', description: 'التاريخ' },
  { name: '{{time}}', description: 'الوقت' },
  { name: '{{order}}', description: 'رقم الطلب' },
  { name: '{{offer}}', description: 'العرض' },
  { name: '{{product}}', description: 'المنتج' },
];

export default function Templates() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [templateContent, setTemplateContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templatesData.filter(template => 
    template.name.includes(searchQuery) || template.category.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 ml-1" /> معتمد</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 ml-1" /> قيد المراجعة</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 ml-1" /> مرفوض</Badge>;
      default:
        return null;
    }
  };

  const insertVariable = (variable: string) => {
    setTemplateContent(prev => prev + ' ' + variable);
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">القوالب</h1>
          <p className="text-gray-600">إدارة قوالب الرسائل الجاهزة</p>
        </div>
        <Button className="bg-whatsapp-gradient" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 ml-2" />
          إنشاء قالب جديد
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي القوالب</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">معتمدة</p>
                <p className="text-2xl font-bold">18</p>
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
                <p className="text-sm text-gray-500">قيد المراجعة</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">مرفوضة</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="approved">معتمدة</TabsTrigger>
          <TabsTrigger value="pending">قيد المراجعة</TabsTrigger>
          <TabsTrigger value="smart">ذكية</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="البحث في القوالب..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{template.category}</Badge>
                    </div>
                    {getStatusBadge(template.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{template.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MessageSquare className="w-4 h-4" />
                      {template.usage} استخدام
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setIsPreviewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.filter(t => t.status === 'approved').map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{template.category}</Badge>
                    </div>
                    {getStatusBadge(template.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{template.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MessageSquare className="w-4 h-4" />
                      {template.usage} استخدام
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.filter(t => t.status === 'pending').map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{template.category}</Badge>
                    </div>
                    {getStatusBadge(template.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{template.content}</p>
                  <p className="text-yellow-600 text-sm">قيد انتظار موافقة واتساب</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="smart">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                القوالب الذكية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                  <h4 className="font-bold mb-2">🎯 قالب توصية شخصية</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    مرحباً {'{name}'}! بناءً على اهتماماتك بـ {'{product}'}، ننصحك بـ {'{recommendation}'}
                  </p>
                  <Badge className="bg-purple-100 text-purple-700">ذكي</Badge>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                  <h4 className="font-bold mb-2">🎂 قالب عيد الميلاد</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    كل عام وأنت بخير {'{name}'}! 🎉 نتمنى لك سنة سعيدة مليئة بالنجاح
                  </p>
                  <Badge className="bg-green-100 text-green-700">ذكي</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Template Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إنشاء قالب جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>اسم القالب</Label>
              <Input placeholder="مثال: رسالة ترحيب" />
            </div>
            <div className="space-y-2">
              <Label>التصنيف</Label>
              <div className="flex gap-2 flex-wrap">
                {['ترحيب', 'تسويق', 'تذكير', 'شكر', 'استطلاع'].map((cat) => (
                  <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-gray-100">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>المتغيرات المتاحة</Label>
              <div className="flex gap-2 flex-wrap">
                {variables.map((variable) => (
                  <Badge 
                    key={variable.name} 
                    className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200"
                    onClick={() => insertVariable(variable.name)}
                  >
                    <Variable className="w-3 h-3 ml-1" />
                    {variable.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>نص القالب</Label>
              <Textarea 
                placeholder="اكتب نص القالب هنا..."
                rows={5}
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
              />
              <p className="text-sm text-gray-500">انقر على المتغير لإضافته للنص</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <Label className="text-sm text-gray-500">معاينة</Label>
              <p className="mt-2">
                {templateContent.replace(/{{name}}/g, 'أحمد').replace(/{{offer}}/g, 'خصم 20%')}
              </p>
            </div>
            <Button className="w-full bg-whatsapp-gradient">
              <Plus className="w-4 h-4 ml-2" />
              إنشاء القالب
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>معاينة القالب</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4 pt-4">
              <div className="p-4 bg-[#DCF8C6] rounded-2xl rounded-tr-none">
                <p>{selectedTemplate.content.replace(/{{name}}/g, 'أحمد').replace(/{{offer}}/g, 'خصم 20%')}</p>
                <span className="text-xs text-gray-500 mt-2 block text-left">10:30 ص ✓✓</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">المتغيرات المستخدمة:</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedTemplate.content.match(/{{\w+}}/g)?.map((v: string, i: number) => (
                    <Badge key={i} variant="outline">{v}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
