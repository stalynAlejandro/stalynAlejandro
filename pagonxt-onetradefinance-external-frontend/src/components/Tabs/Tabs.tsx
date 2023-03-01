import React, { useEffect, useState } from 'react';

import { StTabsList, StTabItem } from './TabsStyled';

interface TabItemProps {
  key: string;
  label: string;
}

interface TabsProps {
  activeTab?: string;
  className?: string;
  items: TabItemProps[];
  onTabClick?: (tabKey: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  activeTab,
  className,
  items,
  onTabClick,
}) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleClick = (key: string) => {
    setSelectedTab(key);
    onTabClick?.(key);
  };

  useEffect(() => {
    if (!activeTab) {
      handleClick(items[0].key);
    } else {
      setSelectedTab(activeTab);
    }
  }, [activeTab]);

  return (
    <StTabsList className={className} data-testid="tab-list">
      {items.map((item) => (
        <StTabItem
          key={`tab-item-${item.key}`}
          data-isactive={selectedTab === item.key}
          data-testid="tab-item"
          isActive={selectedTab === item.key}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleClick(item.key)}
            onKeyDown={() => handleClick(item.key)}
          >
            <span>{item.label}</span>
          </div>
        </StTabItem>
      ))}
    </StTabsList>
  );
};

Tabs.defaultProps = {
  activeTab: '',
  className: '',
  onTabClick: undefined,
};

export default Tabs;
