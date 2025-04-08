import { FaExclamationTriangle } from 'react-icons/fa';

export default function ErrorComponent() {
  return (
    <div 
      className="flex flex-col items-center justify-center bg-red-100 px-4"
      style={{ minHeight: 'calc(100vh - 78px)' }}
    >
      <FaExclamationTriangle
        size={60}
        className="text-red-500 mb-4 animate-bounce"
      />
      <h1 className="text-3xl font-bold text-red-700 mb-2">
        Ops! Algo deu errado.
      </h1>
      <p className="text-lg text-red-600 text-center">
        Erro ao carregar os dados. Por favor, tente novamente mais tarde.
      </p>
    </div>
  );
}
