interface MockPlaceholderProps {
  className?: string;
}

export const MockPlaceholder = ({ className = '' }: MockPlaceholderProps) => {
  return (
    <div className="sc-jss-empty-placeholder">
      <div
        className={`flex h-25 w-full min-w-12 cursor-pointer items-center justify-center border-2 border-dashed border-[#969696] bg-white/60 p-5 hover:bg-[#e9e7ff] ${className}`}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-[#5548d9]">
          <span className="text-3xl text-white">+</span>
        </div>
      </div>
    </div>
  );
};

export const renderStorybookPlaceholder = () => {
  return {
    componentName: 'MockPlaceholder',
    dataSource: '',
    params: {},
    fields: {},
    placeholders: {},
  };
};
