const LoseModal = ({ isVisible, attemptsLeft, onRetry }) => { // модалка при поразці
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😞</div>
          <h3 className="text-xl font-bold text-white-600 mb-2">Спроба не вдалась</h3>
          <p className="text-gray-700 mb-4">Не всі карточки правильні</p>
          <div className="bg-gray-100 text-white-800 py-2 px-4 rounded-lg mb-4 text-sm">
            Залишилось спроб: {attemptsLeft}
          </div>
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full"
          >
            Повторити
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoseModal;