'use client';
import { useState } from 'react';
import { Icon } from './icons';

interface AccordionItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

export function PdpAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.key ?? null);

  return (
    <div className="accordion">
      {items.map(item => (
        <div key={item.key} className={`accordion-item${open === item.key ? ' open' : ''}`}>
          <button
            className="accordion-trigger"
            onClick={() => setOpen(open === item.key ? null : item.key)}
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
