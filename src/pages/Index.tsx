import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '@/components/ui/icon';

const calculators = [
  { id: 'bmi', name: 'Индекс массы тела', icon: 'Scale', category: 'anthropometry', desc: 'Рассчитайте ИМТ по росту и весу' },
  { id: 'pregnancy', name: 'Дата родов', icon: 'Baby', category: 'gynecology', desc: 'Определите дату родов' },
  { id: 'calories', name: 'БЖУ в калории', icon: 'Utensils', category: 'nutrition', desc: 'Конвертируйте БЖУ в калории' },
  { id: 'waist-height', name: 'Талия к росту', icon: 'Ruler', category: 'anthropometry', desc: 'Соотношение талии к росту' },
  { id: 'waist-hip', name: 'Талия к бёдрам', icon: 'Ruler', category: 'anthropometry', desc: 'Индекс талии и бедер' },
  { id: 'walking-calories', name: 'Расход при ходьбе', icon: 'Activity', category: 'fitness', desc: 'Калории при ходьбе' },
  { id: 'heart-rate', name: 'ЧСС', icon: 'Heart', category: 'cardiology', desc: 'Зоны пульса для тренировок' },
  { id: 'child-height', name: 'Рост ребёнка', icon: 'Baby', category: 'gynecology', desc: 'Прогноз роста будущего ребёнка' }
];

const categories = [
  { id: 'all', name: 'Все калькуляторы', icon: 'Calculator' },
  { id: 'anthropometry', name: 'Антропометрия', icon: 'Ruler' },
  { id: 'nutrition', name: 'Питание', icon: 'Utensils' },
  { id: 'fitness', name: 'Фитнес', icon: 'Activity' },
  { id: 'cardiology', name: 'Кардиология', icon: 'Heart' },
  { id: 'gynecology', name: 'Гинекология', icon: 'Baby' }
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
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} />
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
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icon name={category.icon} className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                ))}
              </nav>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            {!selectedCalculator ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCalculators.map((calc) => (
                  <Card
                    key={calc.id}
                    className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
                    onClick={() => setSelectedCalculator(calc.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <Icon name={calc.icon} className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-foreground">{calc.name}</h3>
                        <p className="text-sm text-muted-foreground">{calc.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
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
                {selectedCalculator === 'calories' && <CaloriesCalculator />}
                {selectedCalculator === 'waist-height' && <WaistHeightCalculator />}
                {selectedCalculator === 'waist-hip' && <WaistHipCalculator />}
                {selectedCalculator === 'walking-calories' && <WalkingCaloriesCalculator />}
                {selectedCalculator === 'heart-rate' && <HeartRateCalculator />}
                {selectedCalculator === 'child-height' && <ChildHeightCalculator />}
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
    if (w && h && w > 0 && h > 0) {
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
        height: parseFloat(height)
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
          <p className="text-muted-foreground">Рассчитайте ИМТ в зависимости от роста, веса и пола</p>
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

        <Button onClick={calculateBMI} className="w-full">Рассчитать ИМТ</Button>

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

        <HistoryChart storageKey="bmi-history" dataKey="bmi" label="ИМТ" />
      </div>
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

      setResult({
        dueDate: dueDate.toLocaleDateString('ru-RU'),
        weeks,
        days,
        conceptionDate: conceptionDate.toLocaleDateString('ru-RU')
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Калькулятор даты родов</h2>
          <p className="text-muted-foreground">Рассчитайте предполагаемую дату родов и срок беременности</p>
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

        <Button onClick={calculatePregnancy} className="w-full">Рассчитать</Button>

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

function CaloriesCalculator() {
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(protein) || 0;
    const f = parseFloat(fat) || 0;
    const c = parseFloat(carbs) || 0;

    const proteinCal = p * 4;
    const fatCal = f * 9;
    const carbsCal = c * 4;
    const total = proteinCal + fatCal + carbsCal;

    setResult({
      proteinCal: proteinCal.toFixed(1),
      fatCal: fatCal.toFixed(1),
      carbsCal: carbsCal.toFixed(1),
      total: total.toFixed(1),
      proteinPercent: total > 0 ? ((proteinCal / total) * 100).toFixed(1) : 0,
      fatPercent: total > 0 ? ((fatCal / total) * 100).toFixed(1) : 0,
      carbsPercent: total > 0 ? ((carbsCal / total) * 100).toFixed(1) : 0
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Перевод БЖУ в калории</h2>
          <p className="text-muted-foreground">Рассчитайте калорийность и соотношение БЖУ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Белки (г)</Label>
            <Input type="number" placeholder="100" value={protein} onChange={(e) => setProtein(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Жиры (г)</Label>
            <Input type="number" placeholder="80" value={fat} onChange={(e) => setFat(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Углеводы (г)</Label>
            <Input type="number" placeholder="200" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
          </div>
        </div>

        <Button onClick={calculate} className="w-full">Рассчитать</Button>

        {result && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{result.total} ккал</div>
                <div className="text-sm text-muted-foreground">Общая калорийность</div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{result.proteinCal}</div>
                  <div className="text-xs text-muted-foreground">Белки ({result.proteinPercent}%)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{result.fatCal}</div>
                  <div className="text-xs text-muted-foreground">Жиры ({result.fatPercent}%)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{result.carbsCal}</div>
                  <div className="text-xs text-muted-foreground">Углеводы ({result.carbsPercent}%)</div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}

function WaistHeightCalculator() {
  const [waist, setWaist] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(waist);
    const h = parseFloat(height);
    if (w && h && w > 0 && h > 0) {
      const ratio = w / h;
      let category = '';
      let risk = '';

      if (ratio < 0.4) {
        category = 'Недостаточный вес';
        risk = 'Низкий риск';
      } else if (ratio < 0.5) {
        category = 'Здоровый вес';
        risk = 'Низкий риск';
      } else if (ratio < 0.6) {
        category = 'Избыточный вес';
        risk = 'Повышенный риск';
      } else {
        category = 'Ожирение';
        risk = 'Высокий риск';
      }

      setResult({ ratio: ratio.toFixed(2), category, risk });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Соотношение талии к росту</h2>
          <p className="text-muted-foreground">Оценка рисков для здоровья</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Окружность талии (см)</Label>
            <Input type="number" placeholder="80" value={waist} onChange={(e) => setWaist(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Рост (см)</Label>
            <Input type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
        </div>

        <Button onClick={calculate} className="w-full">Рассчитать</Button>

        {result && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">{result.ratio}</div>
              <div className="text-xl font-semibold text-foreground">{result.category}</div>
              <div className="text-sm text-muted-foreground">{result.risk}</div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}

function WaistHipCalculator() {
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [gender, setGender] = useState('male');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(waist);
    const h = parseFloat(hip);
    if (w && h && w > 0 && h > 0) {
      const ratio = w / h;
      let risk = '';

      if (gender === 'male') {
        risk = ratio < 0.9 ? 'Низкий риск' : ratio < 1.0 ? 'Умеренный риск' : 'Высокий риск';
      } else {
        risk = ratio < 0.8 ? 'Низкий риск' : ratio < 0.85 ? 'Умеренный риск' : 'Высокий риск';
      }

      setResult({ ratio: ratio.toFixed(2), risk });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Соотношение талии к бёдрам</h2>
          <p className="text-muted-foreground">Оценка распределения жира</p>
        </div>

        <Tabs value={gender} onValueChange={setGender}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="male">Мужчина</TabsTrigger>
            <TabsTrigger value="female">Женщина</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Окружность талии (см)</Label>
            <Input type="number" placeholder="80" value={waist} onChange={(e) => setWaist(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Окружность бёдер (см)</Label>
            <Input type="number" placeholder="100" value={hip} onChange={(e) => setHip(e.target.value)} />
          </div>
        </div>

        <Button onClick={calculate} className="w-full">Рассчитать</Button>

        {result && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">{result.ratio}</div>
              <div className="text-lg text-muted-foreground">{result.risk}</div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}

function WalkingCaloriesCalculator() {
  const [weight, setWeight] = useState('');
  const [time, setTime] = useState('');
  const [speed, setSpeed] = useState('medium');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const t = parseFloat(time);
    if (w && t && w > 0 && t > 0) {
      let met = 3.5;
      if (speed === 'slow') met = 2.5;
      if (speed === 'medium') met = 3.5;
      if (speed === 'fast') met = 5.0;

      const calories = ((met * w * 3.5) / 200) * t;
      setResult({ calories: calories.toFixed(0), speed });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Расход калорий при ходьбе</h2>
          <p className="text-muted-foreground">Рассчитайте затраты энергии</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Ваш вес (кг)</Label>
            <Input type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Время ходьбы (минуты)</Label>
            <Input type="number" placeholder="30" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Скорость ходьбы</Label>
            <Select value={speed} onValueChange={setSpeed}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Медленная (3 км/ч)</SelectItem>
                <SelectItem value="medium">Средняя (5 км/ч)</SelectItem>
                <SelectItem value="fast">Быстрая (6-7 км/ч)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculate} className="w-full">Рассчитать</Button>

        {result && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{result.calories}</div>
              <div className="text-lg text-muted-foreground">калорий сожжено</div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}

function HeartRateCalculator() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const a = parseFloat(age);
    if (a && a > 0 && a < 120) {
      const maxHR = 220 - a;
      setResult({
        max: maxHR,
        warmup: Math.round(maxHR * 0.5),
        fatburn: Math.round(maxHR * 0.6),
        cardio: Math.round(maxHR * 0.7),
        peak: Math.round(maxHR * 0.85)
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Частота сердечных сокращений</h2>
          <p className="text-muted-foreground">Зоны пульса для тренировок</p>
        </div>

        <div className="space-y-2">
          <Label>Ваш возраст (лет)</Label>
          <Input type="number" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <Button onClick={calculate} className="w-full">Рассчитать</Button>

        {result && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Максимальный пульс</span>
                <span className="text-xl font-bold text-primary">{result.max} уд/мин</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Разминка (50%)</span>
                <span className="text-lg font-semibold">{result.warmup} уд/мин</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Жиросжигание (60%)</span>
                <span className="text-lg font-semibold">{result.fatburn} уд/мин</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Кардио (70%)</span>
                <span className="text-lg font-semibold">{result.cardio} уд/мин</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Пиковая (85%)</span>
                <span className="text-lg font-semibold">{result.peak} уд/мин</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}

function ChildHeightCalculator() {
  const [fatherHeight, setFatherHeight] = useState('');
  const [motherHeight, setMotherHeight] = useState('');
  const [childGender, setChildGender] = useState('male');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const f = parseFloat(fatherHeight);
    const m = parseFloat(motherHeight);
    if (f && m && f > 0 && m > 0) {
      let predicted = 0;
      if (childGender === 'male') {
        predicted = (f + m + 13) / 2;
      } else {
        predicted = (f + m - 13) / 2;
      }
      setResult({
        height: predicted.toFixed(1),
        min: (predicted - 8).toFixed(1),
        max: (predicted + 8).toFixed(1)
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Рост будущего ребёнка</h2>
          <p className="text-muted-foreground">Прогноз на основе роста родителей</p>
        </div>

        <Tabs value={childGender} onValueChange={setChildGender}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="male">Мальчик</TabsTrigger>
            <TabsTrigger value="female">Девочка</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Рост отца (см)</Label>
            <Input type="number" placeholder="180" value={fatherHeight} onChange={(e) => setFatherHeight(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Рост матери (см)</Label>
            <Input type="number" placeholder="165" value={motherHeight} onChange={(e) => setMotherHeight(e.target.value)} />
          </div>
        </div>

        <Button onClick={calculate} className="w-full">Рассчитать</Button>

        {result && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="text-center space-y-3">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{result.height} см</div>
                <div className="text-sm text-muted-foreground">Прогнозируемый рост</div>
              </div>
              <div className="pt-3 border-t">
                <div className="text-lg text-foreground">Диапазон: {result.min} - {result.max} см</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}

function HistoryChart({ storageKey, dataKey, label }: { storageKey: string; dataKey: string; label: string }) {
  const [history, setHistory] = useState<any[]>([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setHistory(stored);
  }, [storageKey]);

  if (history.length === 0) return null;

  const chartData = history.slice(0, 10).reverse().map((item) => ({
    date: new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
    value: parseFloat(item[dataKey]),
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
          <Button variant="outline" size="sm" onClick={() => setShowChart(!showChart)}>
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
              <XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
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
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name={label}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
              {chartData[0].weight && (
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  name="Вес (кг)"
                  dot={{ fill: 'hsl(var(--accent))' }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="space-y-3">
          {history.slice(0, 5).map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <div className="font-semibold text-foreground">
                  {label}: {item[dataKey]}
                </div>
                {item.weight && (
                  <div className="text-sm text-muted-foreground">{item.weight} кг, {item.height} см</div>
                )}
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
