import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Employee,
  Category,
  UnitOfMeasure,
  InventoryItem,
  SerializedItem,
  Movement,
  Phone,
  Chip,
  Line,
  Allocation,
} from '@/types';
import { mockEmployees } from '@/data/mockEmployees';
import { mockCategories, mockUnits, mockItems, mockSerializedItems } from '@/data/mockInventory';
import { mockPhones, mockChips, mockLines } from '@/data/mockPhones';
import { mockMovements, mockAllocations } from '@/data/mockMovements';

interface InventoryContextType {
  // Employees
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id' | 'createdAt'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Units
  units: UnitOfMeasure[];
  addUnit: (unit: Omit<UnitOfMeasure, 'id'>) => void;
  updateUnit: (id: string, unit: Partial<UnitOfMeasure>) => void;
  deleteUnit: (id: string) => void;
  
  // Items
  items: InventoryItem[];
  serializedItems: SerializedItem[];
  addItem: (item: Omit<InventoryItem, 'id' | 'createdAt'>) => void;
  updateItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  addSerializedItem: (item: Omit<SerializedItem, 'id' | 'createdAt'>) => void;
  
  // Movements
  movements: Movement[];
  addMovement: (movement: Omit<Movement, 'id'>) => void;
  
  // Phones
  phones: Phone[];
  addPhone: (phone: Omit<Phone, 'id' | 'createdAt'>) => void;
  updatePhone: (id: string, phone: Partial<Phone>) => void;
  deletePhone: (id: string) => void;
  
  // Chips
  chips: Chip[];
  addChip: (chip: Omit<Chip, 'id' | 'createdAt'>) => void;
  updateChip: (id: string, chip: Partial<Chip>) => void;
  deleteChip: (id: string) => void;
  
  // Lines
  lines: Line[];
  addLine: (line: Omit<Line, 'id' | 'createdAt'>) => void;
  updateLine: (id: string, line: Partial<Line>) => void;
  deleteLine: (id: string) => void;
  
  // Allocations
  allocations: Allocation[];
  addAllocation: (allocation: Omit<Allocation, 'id'>) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [units, setUnits] = useState<UnitOfMeasure[]>(mockUnits);
  const [items, setItems] = useState<InventoryItem[]>(mockItems);
  const [serializedItems, setSerializedItems] = useState<SerializedItem[]>(mockSerializedItems);
  const [movements, setMovements] = useState<Movement[]>(mockMovements);
  const [phones, setPhones] = useState<Phone[]>(mockPhones);
  const [chips, setChips] = useState<Chip[]>(mockChips);
  const [lines, setLines] = useState<Line[]>(mockLines);
  const [allocations, setAllocations] = useState<Allocation[]>(mockAllocations);

  // Employee operations
  const addEmployee = (employee: Omit<Employee, 'id' | 'createdAt'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: string, employee: Partial<Employee>) => {
    setEmployees(employees.map((e) => (e.id === id ? { ...e, ...employee } : e)));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  // Category operations
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = { ...category, id: Date.now().toString() };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, ...category } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  // Unit operations
  const addUnit = (unit: Omit<UnitOfMeasure, 'id'>) => {
    const newUnit: UnitOfMeasure = { ...unit, id: Date.now().toString() };
    setUnits([...units, newUnit]);
  };

  const updateUnit = (id: string, unit: Partial<UnitOfMeasure>) => {
    setUnits(units.map((u) => (u.id === id ? { ...u, ...unit } : u)));
  };

  const deleteUnit = (id: string) => {
    setUnits(units.filter((u) => u.id !== id));
  };

  // Item operations
  const addItem = (item: Omit<InventoryItem, 'id' | 'createdAt'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, item: Partial<InventoryItem>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...item } : i)));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const addSerializedItem = (item: Omit<SerializedItem, 'id' | 'createdAt'>) => {
    const newItem: SerializedItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setSerializedItems([...serializedItems, newItem]);
  };

  // Movement operations
  const addMovement = (movement: Omit<Movement, 'id'>) => {
    const newMovement: Movement = { ...movement, id: Date.now().toString() };
    setMovements([...movements, newMovement]);
  };

  // Phone operations
  const addPhone = (phone: Omit<Phone, 'id' | 'createdAt'>) => {
    const newPhone: Phone = {
      ...phone,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setPhones([...phones, newPhone]);
  };

  const updatePhone = (id: string, phone: Partial<Phone>) => {
    setPhones(phones.map((p) => (p.id === id ? { ...p, ...phone } : p)));
  };

  const deletePhone = (id: string) => {
    setPhones(phones.filter((p) => p.id !== id));
  };

  // Chip operations
  const addChip = (chip: Omit<Chip, 'id' | 'createdAt'>) => {
    const newChip: Chip = {
      ...chip,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setChips([...chips, newChip]);
  };

  const updateChip = (id: string, chip: Partial<Chip>) => {
    setChips(chips.map((c) => (c.id === id ? { ...c, ...chip } : c)));
  };

  const deleteChip = (id: string) => {
    setChips(chips.filter((c) => c.id !== id));
  };

  // Line operations
  const addLine = (line: Omit<Line, 'id' | 'createdAt'>) => {
    const newLine: Line = {
      ...line,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setLines([...lines, newLine]);
  };

  const updateLine = (id: string, line: Partial<Line>) => {
    setLines(lines.map((l) => (l.id === id ? { ...l, ...line } : l)));
  };

  const deleteLine = (id: string) => {
    setLines(lines.filter((l) => l.id !== id));
  };

  // Allocation operations
  const addAllocation = (allocation: Omit<Allocation, 'id'>) => {
    const newAllocation: Allocation = { ...allocation, id: Date.now().toString() };
    setAllocations([...allocations, newAllocation]);
  };

  const value: InventoryContextType = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    units,
    addUnit,
    updateUnit,
    deleteUnit,
    items,
    serializedItems,
    addItem,
    updateItem,
    deleteItem,
    addSerializedItem,
    movements,
    addMovement,
    phones,
    addPhone,
    updatePhone,
    deletePhone,
    chips,
    addChip,
    updateChip,
    deleteChip,
    lines,
    addLine,
    updateLine,
    deleteLine,
    allocations,
    addAllocation,
  };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};
