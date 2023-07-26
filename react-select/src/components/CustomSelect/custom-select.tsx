
import React, { memo, useState } from 'react';

import { useSelect, useClassNames } from './utils';
import './styles.css';
import { CustomSelectProps } from '../../types/global-types';
import Box from '@mui/material/Box';
import { Button, List, ListItem, Popover } from '@mui/material';

export function CustomSelectComponent<TItem = string>({
  classes,
  anchor,
  transform,
  getItemKey,
  getItemLabel,
  hasNestedItems,
  isSeparator,
  getIcon,
  ...rest
}: CustomSelectProps<TItem>) {
  const {
    open,
    label,
    icon,
    renderingItems,
    toggle,
    handleClickItem,
    handleHoverItem,
    isSelectedItem,
  } = useSelect({
    ...rest,
    anchor,
    transform,
    getItemLabel,
    hasNestedItems,
    isSeparator,
    getIcon,
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(
    null
  )

  const handleApprovePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggle(true);
  }

  const classesNames = useClassNames(classes);

  return (
    <Box className={classesNames.root()} onClick={() => toggle(false)} >
      <Box className={classesNames.overlay(open)} />
      <Button className={classesNames.selectionHeader()} onMouseEnter={handleApprovePopoverOpen}>
        {icon} {label}
      </Button>
      {renderingItems && (
        <Box className={classesNames.selectionEntries(open)}>
          <Popover
            anchorOrigin={anchor}
            transformOrigin={transform}
            anchorEl={anchorEl}
            open={open}>
            <Box className="flex flex-row" onMouseLeave={() => toggle(false)}>
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
                          onMouseEnter={handleHoverItem(item, +level)}
                          onClick={handleClickItem(item, +level)}
                        >
                          {
                            getIcon ?
                              <div className="icon-div">
                                {getIcon(item)}
                              </div>
                              : null
                          }
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
          </Popover>
        </Box>
      )
      }
    </Box >
  );
}

const CustomSelect = memo(
  CustomSelectComponent,
) as typeof CustomSelectComponent & React.ComponentType<any>;
CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;