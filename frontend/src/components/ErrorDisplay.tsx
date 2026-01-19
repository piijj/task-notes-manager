interface ErrorDisplayProps {
  message: string;
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
      <p className="text-red-700">{message}</p>
    </div>
  );
}
