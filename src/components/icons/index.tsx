import React, { AriaRole, CSSProperties } from 'react';

interface IconsProps {
    width: number;
    color?: string;
    className?: string;
    style?: CSSProperties;
    onClick?: React.MouseEventHandler<SVGSVGElement>
    role? : AriaRole
}

const Sort = (props: IconsProps) => {
  const {
    width, color = '#3FC4B6', className = '', style = {}, onClick, role,
  } = props;
  return (
    <svg width={width} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} onClick={onClick} role={role}>
      <path id="Menu" fillRule="evenodd" clipRule="evenodd" d="M0 1.25C0 0.559644 0.559644 0 1.25 0H18.75C19.4404 0 20 0.559644 20 1.25C20 1.94036 19.4404 2.5 18.75 2.5H1.25C0.559644 2.5 0 1.94036 0 1.25ZM0 8.25C0 7.55964 0.559644 7 1.25 7H18.75C19.4404 7 20 7.55964 20 8.25C20 8.94036 19.4404 9.5 18.75 9.5H1.25C0.559644 9.5 0 8.94036 0 8.25ZM11.25 14C10.5596 14 10 14.5596 10 15.25C10 15.9404 10.5596 16.5 11.25 16.5H18.75C19.4404 16.5 20 15.9404 20 15.25C20 14.5596 19.4404 14 18.75 14H11.25Z" fill={color} />
    </svg>

  );
};

export const Icons = {
  Sort: React.memo(Sort),
};
