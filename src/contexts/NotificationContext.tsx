/* eslint-disable react-hooks/exhaustive-deps */

import YakuIcon from '@/components/Icons/YakuIcon';
import dayjs from 'dayjs';
import { Notification } from 'konsta/react';
import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
export const NotificationContext = createContext<any>(null);
export const NotificationHandlerProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showNotify, setShowNotify] = useState(false);
  const [notification, setNotification] = useState<{
    title?: string;
    subtitle?: string;
    text?: string;
  }>({});
  dayjs.extend(relativeTime);
  useEffect(() => {
    let timer: any;
    if (showNotify) {
      timer = setTimeout(() => {
        setShowNotify(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showNotify]);
  return (
    <NotificationContext.Provider
      value={{
        setShowNotify,
        setNotification,
      }}
    >
      <Notification
        opened={showNotify}
        icon={<YakuIcon />}
        title={notification?.title ?? 'Yaku.gg'}
        titleRightText={dayjs().fromNow()}
        subtitle={notification?.subtitle}
        text={notification?.text}
      />
      {children}
    </NotificationContext.Provider>
  );
};
