interface NumbersProps {
  title: string;
  text: string;
}

export default function Numbers({ title, text }: NumbersProps) {
  return (
    <div className="flex flex-col w-[320px] h-[220px] space-y-3 ">
      <h1 className="text-green-700 text-8xl">{title}</h1>
      <p className="text-lg font-medium">{text}</p>
    </div>
  );
}
