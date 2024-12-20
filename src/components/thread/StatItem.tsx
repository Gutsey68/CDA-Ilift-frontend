type StatItemProps = {
  label: string;
  value: number;
  border?: string;
  onClick?: () => void;
};

function StatItem({ label, value, border, onClick }: StatItemProps) {
  return (
    <div onClick={onClick} className={`flex w-1/3 flex-col items-center justify-center gap-1 ${border} ${onClick ? 'cursor-pointer hover:text-green-11' : ''}`}>
      <p className="text-xs text-neutral-11">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default StatItem;
