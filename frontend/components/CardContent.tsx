import QuestionSection from "./QuestionSection";
import Radio from "./Radio";

interface Option {
  label: string;
  name: string;
}

interface Props {
  question: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardContent = ({ question, options, onChange }: Props) => {
  return (
    <div className="">
      <QuestionSection question={question} />

      <div className="space-y-2">
        {options.map(({ label, name }) => (
          <Radio key={label} option={label} name={name} onChange={onChange} />
        ))}
      </div>
    </div>
  );
};

export default CardContent;
