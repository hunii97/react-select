
import React, { memo } from 'react';

import { useSelect, useClassNames } from './utils';
import './styles.css';
import { CustomSelectProps } from '../../types/global-types';
import Box from '@mui/material/Box';
import { List, ListItem } from '@mui/material';

export function CustomSelectComponent<TItem = string>({
  classes,
  getItemKey,
  getItemLabel,
  hasNestedItems,
  isSeparator,
  ...rest
}: CustomSelectProps<TItem>) {
  const {
    open,
    label,
    renderingItems,
    toggle,
    handleClickItem,
    isSelectedItem,
  } = useSelect({
    ...rest,
    getItemLabel,
    hasNestedItems,
    isSeparator
  });

  const classesNames = useClassNames(classes);

  return (
    <Box className={classesNames.root()}>
      <Box className={classesNames.overlay(open)} onClick={toggle} />
      <Box className={classesNames.selectionHeader()} onMouseEnter={toggle} onClick={toggle}>
        {label}
      </Box>
      {renderingItems && (
        <Box className={classesNames.selectionEntries(open)}>
          <Box className="flex flex-row">
            {Object.keys(renderingItems).map((level: string) => (
              <List
                key={`entry-level-${level}`}
                className={classesNames.levelEntry()}
              >
                {renderingItems[+level].map((item) => {
                  const selected = isSelectedItem(item, +level);
                  const nestable = hasNestedItems(item, +level);
                  if (!isSeparator(item)) {
                    return (
                      <ListItem
                        key={getItemKey(item)}
                        className={classesNames.levelItem({
                          nestable,
                          selected,
                        })}
                        title={getItemLabel(item)}
                        onClick={handleClickItem(item, +level)}
                      >
                        {getItemLabel(item)}
                      </ListItem>
                    );
                  } else {
                    return (
                      <ListItem key={getItemKey(item)}
                        className={classesNames.separator()}>
                      {getItemLabel(item)}
                    </ListItem>
                    )
                  }
                })}
              </List>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

const CustomSelect = memo(
  CustomSelectComponent,
) as typeof CustomSelectComponent & React.ComponentType<any>;
CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;