import { h } from 'preact';

const Icon = ({ name, className = '', style = {}, ...props }) => {
  return (
    <img 
      src={`/icons/${name}.svg`} 
      alt="" 
      className={`email-icon ${className}`}
      style={{ 
        width: '1em', 
        height: '1em', 
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style 
      }}
      {...props}
    />
  );
};

export default Icon;