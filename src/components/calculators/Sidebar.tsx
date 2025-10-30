import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { categories } from './types';

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({ 
  selectedCategory, 
  setSelectedCategory, 
  mobileMenuOpen,
  setMobileMenuOpen 
}: SidebarProps) {
  return (
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
  );
}
