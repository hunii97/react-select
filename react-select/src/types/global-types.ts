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
  
  export interface CustomSelectProps<TItem>
    extends UseSelectProps<TItem> {
    getItemKey: (item: TItem) => Key; // React key generator based on item
    classes?: Partial<Record<ClassName, string>>; // Custom classe names
  }

export type ClassName = typeof classNames[number];

export interface UseSelectProps<TItem> {
  initialItems: TItem[];
  placeholder: string;
  getItemLabel: (item: TItem) => string;
  getNestedItems: (item: TItem, level: number) => Promise<TItem[]> | TItem[];
  hasNestedItems: (item: TItem, level: number) => boolean;
  isSeparator: (item:TItem) => boolean;
  isEqual: (item?: TItem, item2?: TItem) => boolean;
  onChange?: (item: TItem) => void;
}
