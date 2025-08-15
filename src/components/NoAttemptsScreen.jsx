const NoAttemptsScreen = ({ userId }) => {
  return (
    <div className="min-h-screen bg-[#1F1F1F] flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-bold text-white mb-4">Сорі!</h2>
        <p className="text-white/80 mb-6">
          Ви використали всі 3 спроби цього місяця.
        </p>
        <p className="text-white/60 mb-4">
          Поверніться наступного місяця за новими спробами!
        </p>
        <div className="text-sm text-white/40 mt-6 p-3 bg-white/5 rounded-lg">
          <p>Telegram ID: {userId}</p>
          <p>Спроби оновлюються 1 числа кожного місяця</p>
        </div>
      </div>
    </div>
  );
};

export default NoAttemptsScreen;