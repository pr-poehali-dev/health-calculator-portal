import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Header } from '@/components/calculators/Header';
import { Sidebar } from '@/components/calculators/Sidebar';
import { BMICalculator } from '@/components/calculators/BMICalculator';
import { PregnancyCalculator } from '@/components/calculators/PregnancyCalculator';
import { CaloriesCalculator } from '@/components/calculators/CaloriesCalculator';
import { WaistHeightCalculator, WaistHipCalculator } from '@/components/calculators/AnthropometryCalculators';
import { WalkingCaloriesCalculator, HeartRateCalculator } from '@/components/calculators/FitnessCalculators';
import { ChildHeightCalculator } from '@/components/calculators/ChildHeightCalculator';
import { calculators } from '@/components/calculators/types';

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCalculators = selectedCategory === 'all' 
    ? calculators 
    : calculators.filter(calc => calc.category === selectedCategory);

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case 'bmi':
        return <BMICalculator />;
      case 'pregnancy':
        return <PregnancyCalculator />;
      case 'calories':
        return <CaloriesCalculator />;
      case 'waist-height':
        return <WaistHeightCalculator />;
      case 'waist-hip':
        return <WaistHipCalculator />;
      case 'walking-calories':
        return <WalkingCaloriesCalculator />;
      case 'heart-rate':
        return <HeartRateCalculator />;
      case 'child-height':
        return <ChildHeightCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Sidebar 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

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
                {renderCalculator()}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
