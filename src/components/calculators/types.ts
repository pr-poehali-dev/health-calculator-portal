export const calculators = [
  { id: 'bmi', name: 'Индекс массы тела', icon: 'Scale', category: 'anthropometry', desc: 'Рассчитайте ИМТ по росту и весу' },
  { id: 'pregnancy', name: 'Дата родов', icon: 'Baby', category: 'gynecology', desc: 'Определите дату родов' },
  { id: 'calories', name: 'БЖУ в калории', icon: 'Utensils', category: 'nutrition', desc: 'Конвертируйте БЖУ в калории' },
  { id: 'waist-height', name: 'Талия к росту', icon: 'Ruler', category: 'anthropometry', desc: 'Соотношение талии к росту' },
  { id: 'waist-hip', name: 'Талия к бёдрам', icon: 'Ruler', category: 'anthropometry', desc: 'Индекс талии и бедер' },
  { id: 'walking-calories', name: 'Расход при ходьбе', icon: 'Activity', category: 'fitness', desc: 'Калории при ходьбе' },
  { id: 'heart-rate', name: 'ЧСС', icon: 'Heart', category: 'cardiology', desc: 'Зоны пульса для тренировок' },
  { id: 'child-height', name: 'Рост ребёнка', icon: 'Baby', category: 'gynecology', desc: 'Прогноз роста будущего ребёнка' }
];

export const categories = [
  { id: 'all', name: 'Все калькуляторы', icon: 'Calculator' },
  { id: 'anthropometry', name: 'Антропометрия', icon: 'Ruler' },
  { id: 'nutrition', name: 'Питание', icon: 'Utensils' },
  { id: 'fitness', name: 'Фитнес', icon: 'Activity' },
  { id: 'cardiology', name: 'Кардиология', icon: 'Heart' },
  { id: 'gynecology', name: 'Гинекология', icon: 'Baby' }
];
