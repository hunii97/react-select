
import React, { memo, Key } from 'react';

import { useSelect, useClassNames } from './utils';
import './styles.css';
import { MultipleLevelSelectionProps } from '../../types/global-types';

export function MultipleLevelSelectionComponent<TItem = string>({
  classes,
  getItemKey,
  getItemLabel,
  hasNestedItems,
  isSeparator,
  ...rest
}: MultipleLevelSelectionProps<TItem>) {
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
    <div className={classesNames.root()}>
      <div className={classesNames.overlay(open)} onClick={toggle} />
      <div className={classesNames.selectionHeader()} onMouseEnter={toggle} onClick={toggle}>
        <span>{label}</span>
      </div>
      {renderingItems && (
        <div className={classesNames.selectionEntries(open)}>
          <div className="flex flex-row">
            {Object.keys(renderingItems).map((level: string) => (
              <ul
                key={`entry-level-${level}`}
                className={classesNames.levelEntry()}
              >
                {renderingItems[+level].map((item) => {
                  const selected = isSelectedItem(item, +level);
                  const nestable = hasNestedItems(item, +level);
                  if (!isSeparator(item)) {
                    return (
                      <li
                        key={getItemKey(item)}
                        className={classesNames.levelItem({
                          nestable,
                          selected,
                        })}
                        title={getItemLabel(item)}
                        onClick={handleClickItem(item, +level)}
                      >
                        {getItemLabel(item)}
                      </li>
                    );
                  } else {
                    return (
                      <li key={getItemKey(item)}>
                      {getItemLabel(item)}
                    </li>
                    )
                  }
                })}
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const MultipleLevelSelection = memo(
  MultipleLevelSelectionComponent,
) as typeof MultipleLevelSelectionComponent & React.ComponentType<any>;
MultipleLevelSelection.displayName = 'MultipleLevelSelection';

export default MultipleLevelSelection;