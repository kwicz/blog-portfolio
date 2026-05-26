'use client';
import { useState } from 'react';
import { Icon } from './icons';

interface AccordionItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

export function PdpAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set(items.map(i => i.key)));

  const toggle = (key: string) => {
    setOpen(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="accordion">
      {items.map(item => (
        <div key={item.key} className={`accordion-item${open.has(item.key) ? ' open' : ''}`}>
          <button
            className="accordion-trigger"
            onClick={() => toggle(item.key)}
          >
            {item.label}
            <Icon name="chevron-down" size={18} className="accordion-chev" />
          </button>
          <div className="accordion-body">{item.content}</div>
        </div>
      ))}
    </div>
  );
}
