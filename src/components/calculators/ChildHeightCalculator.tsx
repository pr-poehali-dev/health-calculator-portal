import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ChildHeightCalculator() {
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
