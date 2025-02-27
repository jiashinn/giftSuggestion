interface Props {
  option: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({ option, name, onChange }: Props) => {
  return (
    <>
      <label
        htmlFor={option}
        className="font-medium h-5 hover:bg-zinc-100 flex items-center justify-content px-3 gap-3 rounded-lg has-[:checked]:text-white has-[:checked]:bg-[#634647] has-[:checked]:ring-bg-[#634647] has-[:checked]:ring-1 select-none text-[#634647] text-md"
      >
        <input
          type="radio"
          name={name}
          value={option}
          className="w-4 h-4  accent-current"
          id={option}
          onChange={(e) => {
            onChange(e);
          }}
          required
        />
        {option}
      </label>
    </>
  );
};

export default Radio;
