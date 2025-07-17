import notFoundImg from '@app/assets/images/not-found.png';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="
      min-h-screen w-full flex flex-col items-center 
      justify-center bg-gradient-to-b from-slate-900 to-black p-4
    ">
      <img src={notFoundImg} alt="Página não encontrada" className="w-80 max-w-full mb-8 drop-shadow-2xl animate-bounce" />
      <h1 className="text-4xl font-bold text-default mb-4 text-center">Ops! Página não encontrada</h1>
      <p className="text-slate-300 text-lg mb-8 text-center max-w-md">
        Parece que você se perdeu no caminho...<br />
        A página que você procura não existe ou foi movida.<br />
        Que tal voltar para o início e continuar explorando?
      </p>
      <button
        onClick={() => navigate('/')}
        className="
          px-6 py-2 rounded-lg bg-default text-white 
          font-semibold shadow hover:bg-sky-700 transition-colors duration-200
        ">
        Voltar para a página principal
      </button>
    </div>
  );
} 