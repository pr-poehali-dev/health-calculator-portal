import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function WalkingCaloriesCalculator() {
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

export function HeartRateCalculator() {
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
