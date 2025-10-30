import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HistoryChart } from './HistoryChart';

export function BMICalculator() {
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
