interface Props {
  question: string;
}

const QuestionSection = ({ question }: Props) => {
  return (
    <legend className="text-sm font-semibold mb-2 text-left mr-auto text-zinc-700 select-none">
      {question}
    </legend>
  );
};

export default QuestionSection;
