import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PregnancyCalculator() {
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
