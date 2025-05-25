interface NumbersProps {
  title: string;
  text: string;
}

export default function Numbers({ title, text }: NumbersProps) {
  return (
    <div className="flex flex-col w-[320px] h-[220px] ">
      <h1 className="text-green-700 text-8xl">{title}</h1>
      <p className="text-lg">{text}</p>
    </div>
  );
}
