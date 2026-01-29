interface Props {
  value: string;
  onChange: (v: any) => void;
}

export default function SessionSort({ value, onChange }: Props) {
  return (
    <div>
      <label className="text-sm">Sort</label>
      <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="input w-48 cursor-pointer"
    >
      <option value="latest">Latest</option>
      <option value="priceLowHigh">Price: Low → High</option>
      <option value="priceHighLow">Price: High → Low</option>
    </select>
    </div>
    
  );
}
