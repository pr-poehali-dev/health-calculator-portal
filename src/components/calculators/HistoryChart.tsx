import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '@/components/ui/icon';

interface HistoryChartProps {
  storageKey: string;
  dataKey: string;
  label: string;
}

export function HistoryChart({ storageKey, dataKey, label }: HistoryChartProps) {
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
