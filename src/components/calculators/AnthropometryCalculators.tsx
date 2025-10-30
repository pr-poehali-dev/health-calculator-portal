import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function WaistHeightCalculator() {
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

export function WaistHipCalculator() {
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
