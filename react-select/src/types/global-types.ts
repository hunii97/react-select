import { Key } from "react";

const classNames = [
    'root',
    'overlay',
    'selectionHeader',
    'selectionEntries',
    'levelEntry',
    'levelItem',
    'levelSelectedItem',
  ] as const;
  
  export interface MultipleLevelSelectionProps<TItem>
    extends UseSelectProps<TItem> {
    getItemKey: (item: TItem) => Key; // React key generator based on item
    classes?: Partial<Record<ClassName, string>>; // Custom classe names
  }


export class CustomSelectItem {
  id!: string;
  parentId!: string;
  name!: string;
  type!: Type;
  value!: object;
}

export type ClassName = typeof classNames[number];

export enum Type {'separator', 'parent', 'selectable'}

export interface UseSelectProps<TItem> {
  initialItems: TItem[]; // Initial items (Level 1 items)
  placeholder: string; // Placeholder show on no item selected
  getItemLabel: (item: TItem) => string;
  getNestedItems: (item: TItem, level: number) => Promise<TItem[]> | TItem[]; // Get the nested level of current item & level
  hasNestedItems: (item: TItem, level: number) => boolean; // Check if the current item at level still has nested level items
  isSeparator: (item:TItem) => boolean;
  isEqual: (item?: TItem, item2?: TItem) => boolean;
  onChange?: (item: TItem) => void;
}
