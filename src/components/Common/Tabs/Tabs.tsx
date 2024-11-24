import React, { FC, useState } from "react";
import { TabItem } from "./Tabs.types";
import styles from "./Tabs.module.scss";
import Text from "@/UI-Kit/Text/Text";
import { ICssModule } from "@/types/common.types";
interface IProps {
  items: TabItem[];
  defaultActiveKey: string;
  onChange: (key: string) => void;
  containerClassName?: ICssModule;
}
const Tabs: FC<IProps> = ({
  defaultActiveKey,
  items,
  onChange,
  containerClassName
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const handleChange = (key: string) => {
    setActiveKey(key);
    onChange(key);
  };

  return (
    <div className={containerClassName && ""}>
      <div className={styles.tabListContainer}>
        {items.map((item) => (
          <button
            className={`${styles.tabItemContainer} ${
              activeKey === item.key ? styles.activeTabItem : ""
            }`}
            key={item.key}
            onClick={() => handleChange(item.key)}
          >
            <Text as="p" className={styles.tabItem}>
              {item.title}
            </Text>
          </button>
        ))}
      </div>
      <div className={styles.tabContentContainer}>
        {items.map((item) =>
          activeKey === item.key ? (
            <div key={item.key}>{item.children}</div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
