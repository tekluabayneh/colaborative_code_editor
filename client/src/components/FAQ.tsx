"use client"
import { Plus } from "lucide-react"
import { useState } from 'react';
import {faqItems } from "../data/FQA_data"
const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);


  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-background text-foreground min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">FAQ</h1>
        <p className="text-muted-foreground text-lg">
          Here you can find most frequent asked questions. Feel free to{' '}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors">contact me</a>{' '}
          if you still have a different one.
        </p>
      </div>

      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-border">
            <button
              onClick={() => toggleItem(index)}
              className="w-full py-6 px-4 flex justify-between items-center text-left hover:bg-accent/50 transition-colors"
            >
              <span className="text-lg font-medium text-foreground">{item.question}</span>
              <div className="w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 flex items-center justify-center">
                {openItems.includes(index) ? '−' : <Plus className="w-4 h-4" />}
              </div>
            </button>
            {openItems.includes(index) && (
              <div className="px-4 pb-6">
                <p className="text-muted-foreground leading-relaxed animation transition-transform">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
