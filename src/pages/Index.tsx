import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '@/components/ui/icon';
import { 
  Calculator, 
  Activity, 
  Baby, 
  Scale, 
  Ruler, 
  Heart,
  Utensils,
  TrendingUp,
  History,
  Menu,
  X
} from 'lucide-react';

const calculators = [
  { id: 'bmi', name: 'Индекс массы тела', icon: Scale, category: 'anthropometry' },
  { id: 'pregnancy', name: 'Дата родов', icon: Baby, category: 'gynecology' },
  { id: 'calories', name: 'БЖУ в калории', icon: Utensils, category: 'nutrition' },
  { id: 'waist-height', name: 'Талия к росту', icon: Ruler, category: 'anthropometry' },
  { id: 'waist-hip', name: 'Талия к бёдрам', icon: Ruler, category: 'anthropometry' },
  { id: 'shoe-size', name: 'Размер обуви', icon: Ruler, category: 'anthropometry' },
  { id: 'step-male', name: 'Длина шага (муж)', icon: Activity, category: 'anthropometry' },
  { id: 'step-female', name: 'Длина шага (жен)', icon: Activity, category: 'anthropometry' },
  { id: 'daily-diet', name: 'Дневной рацион', icon: Utensils, category: 'nutrition' },
  { id: 'daily-macros', name: 'Дневное БЖУ', icon: Utensils, category: 'nutrition' },
  { id: 'body-fat', name: 'Процент жира', icon: Scale, category: 'anthropometry' },
  { id: 'energy-need', name: 'Потребность в энергии', icon: Activity, category: 'nutrition' },
  { id: 'weight-goal', name: 'Достижение веса', icon: TrendingUp, category: 'nutrition' },
  { id: 'exercise-calories', name: 'Расход при нагрузке', icon: Activity, category: 'fitness' },
  { id: 'walking-calories', name: 'Расход при ходьбе', icon: Activity, category: 'fitness' },
  { id: 'activity-calories', name: 'Расход по видам деятельности', icon: Activity, category: 'fitness' },
  { id: 'training-calories', name: 'Расход при тренировке', icon: Activity, category: 'fitness' },
  { id: 'heart-rate', name: 'Частота сердечных сокращений', icon: Heart, category: 'cardiology' },
  { id: 'child-height', name: 'Рост будущего ребёнка', icon: Baby, category: 'gynecology' },
  { id: 'converter', name: 'Конвертер величин', icon: Calculator, category: 'tools' }
];

const categories = [
  { id: 'all', name: 'Все калькуляторы', icon: Calculator },
  { id: 'anthropometry', name: 'Антропометрия', icon: Ruler },
  { id: 'nutrition', name: 'Питание', icon: Utensils },
  { id: 'fitness', name: 'Фитнес', icon: Activity },
  { id: 'cardiology', name: 'Кардиология', icon: Heart },
  { id: 'gynecology', name: 'Гинекология', icon: Baby },
  { id: 'tools', name: 'Инструменты', icon: Calculator }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCalculators = selectedCategory === 'all' 
    ? calculators 
    : calculators.filter(calc => calc.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-xl p-2">
                <Icon name="Activity" className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">МедКалькуляторы</h1>
                <p className="text-sm text-muted-foreground">Профессиональные медицинские расчёты</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              <Icon name="History" className="w-4 h-4" />
              История расчётов
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className={`lg:block ${mobileMenuOpen ? 'block' : 'hidden'} space-y-2`}>
            <Card className="p-4">
              <h2 className="font-semibold mb-4 text-foreground">Категории</h2>
              <nav className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  );
                })}
              </nav>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            {!selectedCalculator ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCalculators.map((calc) => {
                  const Icon = calc.icon;
                  return (
                    <Card
                      key={calc.id}
                      className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
                      onClick={() => setSelectedCalculator(calc.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 rounded-lg p-3">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 text-foreground">{calc.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Нажмите для расчёта
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div>
                <Button 
                  variant="ghost" 
                  className="mb-4"
                  onClick={() => setSelectedCalculator(null)}
                >
                  ← Вернуться к списку
                </Button>
                {selectedCalculator === 'bmi' && <BMICalculator />}
                {selectedCalculator === 'pregnancy' && <PregnancyCalculator />}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [result, setResult] = useState<any>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w && h) {
      const bmi = w / (h * h);
      let category = '';
      let recommendation = '';

      if (bmi < 18.5) {
        category = 'Недостаточный вес';
        recommendation = 'Рекомендуется консультация диетолога';
      } else if (bmi < 25) {
        category = 'Нормальный вес';
        recommendation = 'Поддерживайте здоровый образ жизни';
      } else if (bmi < 30) {
        category = 'Избыточный вес';
        recommendation = 'Рекомендуется консультация эндокринолога и диетолога';
      } else {
        category = 'Ожирение';
        recommendation = 'Необходима консультация специалистов: эндокринолог, гастроэнтеролог';
        if (gender === 'female') {
          recommendation += ', гинеколог';
        }
      }

      const newResult = {
        bmi: bmi.toFixed(1),
        category,
        recommendation,
        date: new Date().toISOString(),
        weight: w,
        height: height
      };

      setResult(newResult);

      const history = JSON.parse(localStorage.getItem('bmi-history') || '[]');
      history.unshift(newResult);
      localStorage.setItem('bmi-history', JSON.stringify(history.slice(0, 10)));
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Калькулятор индекса массы тела</h2>
          <p className="text-muted-foreground">
            Рассчитайте ИМТ в зависимости от роста, веса и пола
          </p>
        </div>

        <Tabs value={gender} onValueChange={setGender}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="male">Мужчина</TabsTrigger>
            <TabsTrigger value="female">Женщина</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Вес (кг)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Рост (см)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculateBMI} className="w-full">
          Рассчитать ИМТ
        </Button>

        {result && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{result.bmi}</div>
                <div className="text-xl font-semibold text-foreground">{result.category}</div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Рекомендации:</p>
                <p className="text-foreground">{result.recommendation}</p>
              </div>
            </div>
          </Card>
        )}

        <BMIHistory />
      </div>
    </Card>
  );
}

function BMIHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bmi-history') || '[]');
    setHistory(stored);
  }, []);

  if (history.length === 0) return null;

  const chartData = history.slice(0, 10).reverse().map((item, index) => ({
    date: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
    bmi: parseFloat(item.bmi),
    weight: item.weight
  }));

  return (
    <Card className="p-6 bg-muted/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2 text-foreground">
          <Icon name="History" className="w-5 h-5" />
          История расчётов
        </h3>
        {history.length >= 2 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowChart(!showChart)}
          >
            <Icon name="TrendingUp" className="w-4 h-4 mr-2" />
            {showChart ? 'Список' : 'График'}
          </Button>
        )}
      </div>

      {showChart && history.length >= 2 ? (
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                className="text-xs" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="bmi" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="ИМТ"
                dot={{ fill: 'hsl(var(--primary))' }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="Вес (кг)"
                dot={{ fill: 'hsl(var(--accent))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="space-y-3">
          {history.slice(0, 5).map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <div className="font-semibold text-foreground">ИМТ: {item.bmi}</div>
                <div className="text-sm text-muted-foreground">
                  {item.weight} кг, {item.height} см
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(item.date).toLocaleDateString('ru-RU')}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function PregnancyCalculator() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculatePregnancy = () => {
    if (lastPeriod) {
      const lmp = new Date(lastPeriod);
      const dueDate = new Date(lmp);
      dueDate.setDate(dueDate.getDate() + 280);
      
      const today = new Date();
      const diffTime = today.getTime() - lmp.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;

      const conceptionDate = new Date(lmp);
      conceptionDate.setDate(conceptionDate.getDate() + 14);

      const newResult = {
        dueDate: dueDate.toLocaleDateString('ru-RU'),
        weeks,
        days,
        conceptionDate: conceptionDate.toLocaleDateString('ru-RU'),
        date: new Date().toISOString()
      };

      setResult(newResult);

      const history = JSON.parse(localStorage.getItem('pregnancy-history') || '[]');
      history.unshift(newResult);
      localStorage.setItem('pregnancy-history', JSON.stringify(history.slice(0, 10)));
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Калькулятор даты родов</h2>
          <p className="text-muted-foreground">
            Рассчитайте предполагаемую дату родов и срок беременности
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastPeriod">Дата начала последней менструации</Label>
          <Input
            id="lastPeriod"
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
          />
        </div>

        <Button onClick={calculatePregnancy} className="w-full">
          Рассчитать
        </Button>

        {result && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Предполагаемая дата родов</div>
                <div className="text-3xl font-bold text-primary">{result.dueDate}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Срок беременности</div>
                  <div className="text-xl font-semibold text-foreground">
                    {result.weeks} недель {result.days} дней
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Дата зачатия</div>
                  <div className="text-xl font-semibold text-foreground">{result.conceptionDate}</div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}