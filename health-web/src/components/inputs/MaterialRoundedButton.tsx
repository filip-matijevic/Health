type Props = {
    label?: string;
    onClick?: ()=>void;
  };
  
  export default function MaterialRoundedButton({ label, onClick }: Props) {
    return (
      <button
        className="bg-primary-a20
        shadow-inner shadow-primary-a10
        w-fit h-11 px-8 rounded-full font-medium text-[16px] text-dark-a0"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  