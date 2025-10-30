import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CaloriesCalculator() {
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
