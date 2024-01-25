import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export type TimelinePropsItem = Omit<
  TimelineItemProps,
  'isActive' | 'isActiveBullet' | 'bulletSize' | 'lineSize'
> & {
  bulletSize?: number;
};

export type TimelineProps = {
  items: TimelinePropsItem[];
  activeItem: number;
  bulletSize?: number;
  lineSize?: number;
};

/*
  No bullet or line is active when activeItem is -1
  First bullet is active only if activeItem is 0 or more
  First line is active only if activeItem is 1 or more
*/

export const Timeline = ({
  items,
  activeItem,
  bulletSize = 16,
  lineSize = 2,
}: TimelineProps) => {
  return (
    <ul
      style={{
        paddingLeft: bulletSize / 2,
      }}
    >
      {items.map((item, index) => {
        return (
          <TimelineItem
            key={index}
            title={item.title}
            bullet={item.bullet}
            isLast={index === items.length - 1}
            isActive={activeItem === -1 ? false : activeItem >= index + 1}
            isActiveBullet={activeItem === -1 ? false : activeItem >= index}
            bulletSize={bulletSize}
            lineSize={lineSize}
            className={cn(item.className)}
          >
            {item.children}
          </TimelineItem>
        );
      })}
    </ul>
  );
};

export type TimelineItemProps = {
  title: ReactNode;
  bullet?: ReactNode;
  children: ReactNode;
  isLast?: boolean;
  isActive: boolean;
  isActiveBullet: boolean;
  className?: string;
  bulletSize: number;
  lineSize: number;
};

export const TimelineItemBullet = ({
  children,
  isActive,
  bulletSize,
  lineSize,
}: {
  children?: ReactNode;
  isActive?: boolean;
  bulletSize: number;
  lineSize: number;
}) => {
  return (
    <div
      className={cn(
        'absolute border top-0 rounded-full bg-background flex items-center justify-center translate-y-2/4',
        isActive && 'border-primary'
      )}
      style={{
        width: bulletSize,
        height: bulletSize,
        left: -bulletSize / 2 - lineSize / 2,
        borderWidth: lineSize,
      }}
      aria-hidden='true'
    >
      {children}
    </div>
  );
};

export const TimelineItemTitle = ({ children }: { children: ReactNode }) => {
  return (
    <div className='font-semibold text-base leading-none mb-1'>{children}</div>
  );
};

export const TimelineItem = ({
  children,
  bullet,
  title,
  isLast,
  isActive,
  isActiveBullet,
  bulletSize,
  className,
  lineSize,
  ...props
}: TimelineItemProps) => {
  return (
    <li
      className={cn(
        'pl-8 pb-8 relative border-l',
        isLast && 'border-l-transparent pb-0',
        isActive && !isLast && 'border-l-primary',
        className
      )}
      style={{
        borderLeftWidth: lineSize,
      }}
      {...props}
    >
      <TimelineItemBullet
        lineSize={lineSize}
        bulletSize={bulletSize}
        isActive={isActiveBullet}
      >
        {bullet}
      </TimelineItemBullet>
      <TimelineItemTitle>{title}</TimelineItemTitle>
      {children}
    </li>
  );
};

export const TimelineItemDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
  );
};

export const TimelineItemSmallText = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className='text-xs pt-1'>{children}</div>;
};
