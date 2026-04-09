import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Send,
  Plus,
  Search,
  Calendar,
  Clock,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Play,
  BarChart3,
  Eye,
  RotateCcw,
  ChevronLeft
} from 'lucide-react';

const campaignsData = [
  { 
    id: 1, 
    name: 'حملة العروض الربيعية', 
    status: 'sent',
    sent: 5000,
    delivered: 4850,
    read: 3200,
    failed: 150,
    audience: 'جميع العملاء',
    template: 'عرض خاص',
    date: '2024-04-07',
    time: '10:00 ص'
  },
  { 
    id: 2, 
    name: 'ترحيب العملاء الجدد', 
    status: 'scheduled',
    sent: 0,
    delivered: 0,
    read: 0,
    failed: 0,
    audience: 'عملاء جدد',
    template: 'رسالة ترحيب',
    date: '2024-04-10',
    time: '09:00 ص'
  },
  { 
    id: 3, 
    name: 'تذكير بالمواعيد', 
    status: 'sending',
    sent: 1250,
    delivered: 1180,
    read: 890,
    failed: 70,
    audience: 'عملاء VIP',
    template: 'تذكير موعد',
    date: '2024-04-07',
    time: 'الآن'
  },
  { 
    id: 4, 
    name: 'استطلاع رأي المنتج', 
    status: 'failed',
    sent: 1000,
    delivered: 200,
    read: 150,
    failed: 800,
    audience: 'عملاء نشطون',
    template: 'استطلاع رأي',
    date: '2024-04-05',
    time: '14:00 م'
  },
];

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'sent':
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 ml-1" /> تم الإرسال</Badge>;
    case 'scheduled':
      return <Badge className="bg-blue-100 text-blue-700"><Calendar className="w-3 h-3 ml-1" /> مجدولة</Badge>;
    case 'sending':
      return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 ml-1" /> جاري الإرسال</Badge>;
    case 'failed':
      return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 ml-1" /> فاشلة</Badge>;
    default:
      return null;
  }
};

const getStatusIcon = (status: string) => {
  switch(status) {
    case 'sent':
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case 'scheduled':
      return <Calendar className="w-5 h-5 text-blue-600" />;
    case 'sending':
      return <Clock className="w-5 h-5 text-yellow-600" />;
    case 'failed':
      return <XCircle className="w-5 h-5 text-red-600" />;
    default:
      return null;
  }
};

export default function Campaigns() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [step, setStep] = useState(1);

  const filteredCampaigns = campaignsData.filter(campaign => 
    campaign.name.includes(searchQuery)
  );

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">الحملات</h1>
          <p className="text-gray-600">إنشاء وإدارة حملاتك التسويقية</p>
        </div>
        <Button className="bg-whatsapp-gradient" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 ml-2" />
          إنشاء حملة جديدة
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي الحملات</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">تم الإرسال</p>
                <p className="text-2xl font-bold">36</p>
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
                <p className="text-sm text-gray-500">مجدولة</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">نسبة النجاح</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="sent">تم الإرسال</TabsTrigger>
          <TabsTrigger value="scheduled">مجدولة</TabsTrigger>
          <TabsTrigger value="sending">جاري الإرسال</TabsTrigger>
          <TabsTrigger value="failed">فاشلة</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="البحث في الحملات..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Campaigns List */}
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                        {getStatusIcon(campaign.status)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{campaign.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {campaign.audience}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {campaign.template}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {campaign.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(campaign.status)}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setIsDetailsDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 ml-2" />
                        التفاصيل
                      </Button>
                    </div>
                  </div>

                  {campaign.status !== 'scheduled' && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">مرسلة</p>
                          <p className="font-bold">{campaign.sent.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">مستلمة</p>
                          <p className="font-bold text-green-600">{campaign.delivered.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">مقروءة</p>
                          <p className="font-bold text-blue-600">{campaign.read.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">فاشلة</p>
                          <p className="font-bold text-red-600">{campaign.failed.toLocaleString()}</p>
                        </div>
                      </div>
                      {campaign.status === 'sending' && (
                        <div className="mt-4">
                          <Progress value={(campaign.delivered / campaign.sent) * 100} className="h-2" />
                          <p className="text-sm text-gray-500 mt-1 text-center">
                            {Math.round((campaign.delivered / campaign.sent) * 100)}% اكتمل
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <div className="space-y-4">
            {filteredCampaigns.filter(c => c.status === 'sent').map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{campaign.name}</h3>
                      <p className="text-sm text-gray-500">{campaign.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">نسبة التسليم</p>
                        <p className="font-bold text-green-600">
                          {Math.round((campaign.delivered / campaign.sent) * 100)}%
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 ml-2" />
                        إعادة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="space-y-4">
            {filteredCampaigns.filter(c => c.status === 'scheduled').map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{campaign.name}</h3>
                      <p className="text-sm text-gray-500">مجدولة في: {campaign.date} - {campaign.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 ml-2" />
                        إرسال الآن
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="failed">
          <div className="space-y-4">
            {filteredCampaigns.filter(c => c.status === 'failed').map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{campaign.name}</h3>
                      <p className="text-sm text-red-600">{campaign.failed} رسالة فاشلة</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 ml-2" />
                      إعادة المحاولة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Campaign Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إنشاء حملة جديدة</DialogTitle>
          </DialogHeader>
          
          {/* Steps */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-[#25D366] text-white' : 'bg-gray-200'}`}>1</div>
            <div className="flex-1 h-1 bg-gray-200 rounded"><div className={`h-full bg-[#25D366] rounded ${step >= 2 ? 'w-full' : 'w-0'}`} /></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-[#25D366] text-white' : 'bg-gray-200'}`}>2</div>
            <div className="flex-1 h-1 bg-gray-200 rounded"><div className={`h-full bg-[#25D366] rounded ${step >= 3 ? 'w-full' : 'w-0'}`} /></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 3 ? 'bg-[#25D366] text-white' : 'bg-gray-200'}`}>3</div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>اسم الحملة</Label>
                <Input placeholder="مثال: حملة العروض الربيعية" />
              </div>
              <div className="space-y-2">
                <Label>اختيار الجمهور</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة المستهدفة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع العملاء</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="active">عملاء نشطون</SelectItem>
                    <SelectItem value="new">عملاء جدد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-whatsapp-gradient" onClick={() => setStep(2)}>
                التالي
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>اختيار القالب</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر قالب الرسالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">رسالة ترحيب</SelectItem>
                    <SelectItem value="offer">عرض خاص</SelectItem>
                    <SelectItem value="reminder">تذكير موعد</SelectItem>
                    <SelectItem value="survey">استطلاع رأي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <Label className="text-sm text-gray-500">معاينة الرسالة</Label>
                <p className="mt-2">مرحباً! لدينا عرض خاص لك: خصم 20% على جميع المنتجات. سارع بالاستفادة!</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  السابق
                </Button>
                <Button className="flex-1 bg-whatsapp-gradient" onClick={() => setStep(3)}>
                  التالي
                  <ChevronLeft className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>وقت الإرسال</Label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Clock className="w-4 h-4 ml-2" />
                    إرسال الآن
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="w-4 h-4 ml-2" />
                    جدولة
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>التاريخ والوقت</Label>
                <Input type="datetime-local" />
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h4 className="font-bold mb-2">ملخص الحملة</h4>
                <div className="space-y-1 text-sm">
                  <p>الجمهور: جميع العملاء (2,341)</p>
                  <p>القالب: عرض خاص</p>
                  <p>الوقت: 2024-04-10 09:00 ص</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                  السابق
                </Button>
                <Button className="flex-1 bg-whatsapp-gradient" onClick={() => setIsCreateDialogOpen(false)}>
                  <Send className="w-4 h-4 ml-2" />
                  إنشاء الحملة
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Campaign Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الحملة</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl">{selectedCampaign.name}</h3>
                {getStatusBadge(selectedCampaign.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">الجمهور</p>
                  <p className="font-medium">{selectedCampaign.audience}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">القالب</p>
                  <p className="font-medium">{selectedCampaign.template}</p>
                </div>
              </div>

              {selectedCampaign.status !== 'scheduled' && (
                <>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <p className="text-2xl font-bold">{selectedCampaign.sent}</p>
                      <p className="text-sm text-gray-500">مرسلة</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <p className="text-2xl font-bold text-green-600">{selectedCampaign.delivered}</p>
                      <p className="text-sm text-gray-500">مستلمة</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <p className="text-2xl font-bold text-purple-600">{selectedCampaign.read}</p>
                      <p className="text-sm text-gray-500">مقروءة</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-xl">
                      <p className="text-2xl font-bold text-red-600">{selectedCampaign.failed}</p>
                      <p className="text-sm text-gray-500">فاشلة</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>نسبة النجاح</span>
                      <span>{Math.round((selectedCampaign.delivered / selectedCampaign.sent) * 100)}%</span>
                    </div>
                    <Progress value={(selectedCampaign.delivered / selectedCampaign.sent) * 100} className="h-3" />
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
