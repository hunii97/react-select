
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

  const [opened, setOpened] = useState<boolean | null>(
    false
  )

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  const handlePopoverOpen = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!open) {
      setOpened(false);
      setAnchorEl(event.currentTarget);
      toggle(true);
      await timeout(1000);
      setOpened(true);
    }
  }

  const handlePopoverClose = () => {
    if (open && opened) {
      toggle(false);
      setOpened(false)
      setAnchorEl(null);
    }
  }

  const classesNames = useClassNames(classes);

  return (
    <Box className={classesNames.root()} onClick={() => toggle(false)}>
      <Box className={classesNames.overlay(open)}
      />
      <Box className="button-box">
        <Button className={classesNames.selectionHeader()} onMouseEnter={handlePopoverOpen}>
          {icon} {label}
        </Button>
      </Box>
      {renderingItems && (
        <Box className={classesNames.selectionEntries(open)}>
          <Popover
            anchorOrigin={anchor}
            transformOrigin={transform}
            anchorEl={anchorEl}
            open={open}>
            <Box className="flex flex-row" onMouseLeave={handlePopoverClose}>
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

function timeout(arg0: number) {
  throw new Error('Function not implemented.');
}
