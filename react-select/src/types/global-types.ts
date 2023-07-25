import { Key } from "react";
import { ClassName, UseSelectProps } from "../components/CustomSelect/utils";

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


export interface Category {
  categoryId: string;
  parentId: string;
  name: string;
}
